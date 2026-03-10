import { persistentStorageEffect } from ".";
import { Challenge, CHALLENGES, ChallengeDifficulty } from "../data/challenge-list";
import { NO_MIGRATORS, getPersistent } from "../utility";
import { atom, selector } from "recoil";

const CHALLENGE_TEXT_VERSION = 1;

// ── Difficulty helpers ────────────────────────────────────────────────────────

const TEXT_TO_DIFFICULTY: Record<string, ChallengeDifficulty> = {
  "very-easy": "very-easy",
  easy: "easy",
  medium: "medium",
  hard: "hard",
  endgame: "endgame",
};

// ── Serialise CHALLENGES → route-style text ───────────────────────────────────
//
// Format (mirrors act-1.txt style):
//
//   #section N. Challenge Name
//   #easy | #medium | #hard | #endgame
//   [#req N]
//   Step text
//       #sub Hint for the step above
//   #tip Challenge-level tip
//

export function challengesToText(challenges: Challenge[]): string {
  return challenges
    .map((c) => {
      const lines: string[] = [];
      lines.push(`#section ${c.number}. ${c.name}`);
      lines.push(`#${c.difficulty}`);
      if (c.requires != null) {
        lines.push(`#req ${c.requires}`);
      }
      c.steps.forEach((step, i) => {
        lines.push(step);
        const hints = c.stepHints?.[i];
        if (hints) hints.forEach((h) => lines.push(`    #sub ${h}`));
      });
      if (c.tips) c.tips.forEach((t) => lines.push(`#tip ${t}`));
      return lines.join("\n");
    })
    .join("\n\n");
}

// ── Parse route-style text → Challenge[] ─────────────────────────────────────

export function textToChallenges(text: string): Challenge[] {
  const challenges: Challenge[] = [];

  // Split on #section lines; each block starts with "#section N. Name"
  const blocks = text.split(/(?=^#section )/m).filter((s) => s.trim().length > 0);

  for (const block of blocks) {
    const lines = block.split("\n");
    const sectionLine = lines[0].trim();
    const sectionMatch = /^#section (\d+)\.\s+(.+)$/.exec(sectionLine);
    if (!sectionMatch) continue;

    const number = parseInt(sectionMatch[1], 10);
    const name = sectionMatch[2].trim();
    const id = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    let difficulty: ChallengeDifficulty = "easy";
    let requires: number | undefined;
    const steps: string[] = [];
    const tips: string[] = [];
    const stepHints: Record<number, string[]> = {};

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trimEnd();

      // #very-easy / #easy / #medium / #hard / #endgame
      const diffMatch = /^#(very-easy|easy|medium|hard|endgame)$/.exec(trimmed);
      if (diffMatch) {
        difficulty = TEXT_TO_DIFFICULTY[diffMatch[1]];
        continue;
      }

      // #req N
      const reqMatch = /^#req (\d+)$/.exec(trimmed);
      if (reqMatch) {
        requires = parseInt(reqMatch[1], 10);
        continue;
      }

      // #tip text
      const tipMatch = /^#tip (.+)$/.exec(trimmed);
      if (tipMatch) {
        tips.push(tipMatch[1]);
        continue;
      }

      // #sub hint (indented)
      const subMatch = /^ {4}#sub (.+)$/.exec(trimmed);
      if (subMatch) {
        const idx = steps.length - 1;
        if (idx >= 0) {
          if (!stepHints[idx]) stepHints[idx] = [];
          stepHints[idx].push(subMatch[1]);
        }
        continue;
      }

      // plain step text (non-empty, not a # directive)
      if (trimmed && !trimmed.startsWith("#")) {
        steps.push(trimmed);
      }
    }

    if (steps.length === 0) continue;

    const challenge: Challenge = {
      id,
      number,
      name,
      steps,
      difficulty,
      category: "misc",
    };
    if (requires != null && requires < steps.length) challenge.requires = requires;
    if (Object.keys(stepHints).length > 0) challenge.stepHints = stepHints;
    if (tips.length > 0) challenge.tips = tips;
    challenges.push(challenge);
  }

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
