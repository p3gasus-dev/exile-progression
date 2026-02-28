import { buildToggleState } from "./toggle-state";

const CHALLENGE_PROGRESS_VERSION = 0;
const [
  challengeProgressSelectorFamily,
  challengeProgressKeys,
  useClearChallengeProgress,
] = buildToggleState(CHALLENGE_PROGRESS_VERSION, "challenge-progress");

export {
  challengeProgressSelectorFamily,
  challengeProgressKeys,
  useClearChallengeProgress,
};
