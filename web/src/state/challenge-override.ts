import { persistentStorageEffect } from ".";
import { Challenge, CHALLENGES, ChallengeDifficulty } from "../data/challenge-list";
import { NO_MIGRATORS, getPersistent } from "../utility";
import { atom, selector } from "recoil";

const CHALLENGE_TEXT_VERSION = 0;

// ── Difficulty helpers ────────────────────────────────────────────────────────

const TEXT_TO_DIFFICULTY: Record<string, ChallengeDifficulty> = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
  endgame: "endgame",
};

// ── Serialise CHALLENGES → text ───────────────────────────────────────────────

export function challengesToText(challenges: Challenge[]): string {
  return challenges
    .map((c) => {
      const lines: string[] = [];
      lines.push(`# ${c.name}`);
      lines.push(`<div id="ch-${c.number}" markdown="${c.number}">`);
      lines.push(`## ${c.difficulty.charAt(0).toUpperCase() + c.difficulty.slice(1)}`);
      if (c.requires != null) {
        lines.push(`<h2 class="req">${c.requires}/${c.steps.length} required</h2>`);
      } else {
        lines.push(`<h2 class="req">All required</h2>`);
      }
      c.steps.forEach((step, i) => {
        lines.push(` - [.ggg] ${step}`);
        const hints = c.stepHints?.[i];
        if (hints) hints.forEach((h) => lines.push(`\t- [.com] ${h}`));
      });
      if (c.tips) c.tips.forEach((t) => lines.push(t));
      lines.push("</div>");
      lines.push("");
      return lines.join("\n");
    })
    .join("\n");
}

// ── Parse text → Challenge[] ──────────────────────────────────────────────────

export function textToChallenges(text: string): Challenge[] {
  const challenges: Challenge[] = [];
  const divBlocks = text.split(/<div id="ch-(\d+)" markdown="\d+">/);

  // divBlocks[0] = everything before first div (preamble, challenge names)
  // divBlocks[1] = ch number, divBlocks[2] = div body, divBlocks[3] = ch number, etc.
  // We also need to extract the # name from just before each <div>

  // Rebuild by scanning line-by-line
  const lines = text.split("\n");
  let currentName: string | null = null;
  let currentNumber: number | null = null;
  let inDiv = false;
  let difficulty: ChallengeDifficulty = "easy";
  let requires: number | undefined;
  let totalSteps = 0;
  let steps: string[] = [];
  let tips: string[] = [];
  let stepHints: Record<number, string[]> = {};

  const flush = () => {
    if (currentName != null && currentNumber != null && steps.length > 0) {
      // derive id from name
      const id = currentName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      const challenge: Challenge = {
        id,
        number: currentNumber,
        name: currentName,
        steps,
        difficulty,
        category: "misc",
      };
      if (requires != null && requires < steps.length) challenge.requires = requires;
      if (Object.keys(stepHints).length > 0) challenge.stepHints = stepHints;
      if (tips.length > 0) challenge.tips = tips;
      challenges.push(challenge);
    }
    currentName = null;
    currentNumber = null;
    inDiv = false;
    difficulty = "easy";
    requires = undefined;
    totalSteps = 0;
    steps = [];
    tips = [];
    stepHints = {};
  };

  for (const line of lines) {
    const divOpen = /^<div id="ch-(\d+)"/.exec(line);
    const divClose = /^<\/div>/.test(line);
    const isName = /^# (.+)$/.exec(line);
    const isDiff = /^## (.+)$/.exec(line);
    const isReq = /class="req">(\d+)\/(\d+)/.exec(line);
    const isStep = /^ - \[\.ggg\] (.+)$/.exec(line);
    const isHint = /^\t- \[\.com\] (.+)$/.exec(line);

    if (isName) {
      if (inDiv) flush();
      currentName = isName[1].trim();
    } else if (divOpen) {
      currentNumber = parseInt(divOpen[1], 10);
      inDiv = true;
    } else if (inDiv && isDiff) {
      const key = isDiff[1].trim().toLowerCase();
      difficulty = TEXT_TO_DIFFICULTY[key] ?? "easy";
    } else if (inDiv && isReq) {
      requires = parseInt(isReq[1], 10);
      totalSteps = parseInt(isReq[2], 10);
    } else if (inDiv && isStep) {
      steps.push(isStep[1].trim());
    } else if (inDiv && isHint) {
      const idx = steps.length - 1;
      if (idx >= 0) {
        if (!stepHints[idx]) stepHints[idx] = [];
        stepHints[idx].push(isHint[1].trim());
      }
    } else if (divClose) {
      flush();
    } else if (inDiv && line.trim() && !line.startsWith("<")) {
      // paragraph text inside div = challenge tip
      tips.push(line.trim());
    }
  }
  // flush any remaining
  flush();

  return challenges;
}

// ── Atom & selector ───────────────────────────────────────────────────────────

export const challengeTextAtom = atom<string | null>({
  key: "challengeTextAtom",
  default: getPersistent<string>(
    "challenge-text",
    CHALLENGE_TEXT_VERSION,
    NO_MIGRATORS
  ),
  effects: [
    persistentStorageEffect<string>("challenge-text", CHALLENGE_TEXT_VERSION),
  ],
});

/** Returns parsed override challenges if saved, otherwise built-in CHALLENGES. */
export const challengeListSelector = selector<Challenge[]>({
  key: "challengeListSelector",
  get: ({ get }) => {
    const text = get(challengeTextAtom);
    if (!text) return CHALLENGES;
    try {
      const parsed = textToChallenges(text);
      return parsed.length > 0 ? parsed : CHALLENGES;
    } catch {
      return CHALLENGES;
    }
  },
});
