import { CHALLENGES } from "../data/challenge-list";
import { DefaultValue, selector, selectorFamily } from "recoil";
import { buildToggleState } from "./toggle-state";

const CHALLENGE_STEP_PROGRESS_VERSION = 0;
const [
  challengeStepProgressSelectorFamily,
  ,
  useClearChallengeStepProgress,
] = buildToggleState(CHALLENGE_STEP_PROGRESS_VERSION, "challenge-step-progress");

const CHALLENGE_MAP = new Map(CHALLENGES.map((c) => [c.id, c]));

/** How many steps are done for a given challenge. */
export const challengeDoneCountSelectorFamily = selectorFamily<number, string>({
  key: "challengeDoneCountSelectorFamily",
  get: (challengeId) => ({ get }) => {
    const challenge = CHALLENGE_MAP.get(challengeId);
    if (!challenge) return 0;
    let done = 0;
    for (let i = 0; i < challenge.steps.length; i++) {
      if (get(challengeStepProgressSelectorFamily(`${challengeId}:${i}`))) done++;
    }
    return done;
  },
});

/**
 * Is a specific challenge complete?
 * True when done steps >= required amount.
 * Settable: set(true) marks all steps done; set(false) clears all steps.
 */
export const challengeProgressSelectorFamily = selectorFamily<boolean, string>({
  key: "challengeProgressSelectorFamily",
  get: (challengeId) => ({ get }) => {
    const challenge = CHALLENGE_MAP.get(challengeId);
    if (!challenge) return false;
    const needed = challenge.requires ?? challenge.steps.length;
    return get(challengeDoneCountSelectorFamily(challengeId)) >= needed;
  },
  set: (challengeId) => ({ set }, newValue) => {
    const challenge = CHALLENGE_MAP.get(challengeId);
    if (!challenge) return;
    const mark = !(newValue instanceof DefaultValue) && (newValue as boolean);
    for (let i = 0; i < challenge.steps.length; i++) {
      set(challengeStepProgressSelectorFamily(`${challengeId}:${i}`), mark);
    }
  },
});

/** Total challenges completed across all categories. */
export const challengeCountSelector = selector({
  key: "challengeCountSelector",
  get: ({ get }) =>
    CHALLENGES.filter((c) => get(challengeProgressSelectorFamily(c.id))).length,
});

export {
  challengeStepProgressSelectorFamily,
  useClearChallengeStepProgress,
};
