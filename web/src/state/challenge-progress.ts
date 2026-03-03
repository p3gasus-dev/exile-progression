import { CHALLENGES } from "../data/challenge-list";
import { selector } from "recoil";
import { buildToggleState } from "./toggle-state";

const CHALLENGE_PROGRESS_VERSION = 0;
const [
  challengeProgressSelectorFamily,
  challengeProgressKeys,
  useClearChallengeProgress,
] = buildToggleState(CHALLENGE_PROGRESS_VERSION, "challenge-progress");

/** Total challenges completed across all categories. */
export const challengeCountSelector = selector({
  key: "challengeCountSelector",
  get: ({ get }) =>
    CHALLENGES.filter((c) => get(challengeProgressSelectorFamily(c.id))).length,
});

export {
  challengeProgressSelectorFamily,
  challengeProgressKeys,
  useClearChallengeProgress,
};
