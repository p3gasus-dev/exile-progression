import { persistentStorageEffect } from ".";
import { Challenge, CHALLENGES } from "../data/challenge-list";
import { NO_MIGRATORS, getPersistent } from "../utility";
import { atom, selector } from "recoil";

const CHALLENGE_OVERRIDE_VERSION = 0;

export const challengeOverrideAtom = atom<Challenge[] | null>({
  key: "challengeOverrideAtom",
  default: getPersistent<Challenge[]>(
    "challenge-override",
    CHALLENGE_OVERRIDE_VERSION,
    NO_MIGRATORS
  ),
  effects: [
    persistentStorageEffect<Challenge[]>(
      "challenge-override",
      CHALLENGE_OVERRIDE_VERSION
    ),
  ],
});

/** Returns user-edited override if saved, otherwise built-in CHALLENGES. */
export const challengeListSelector = selector<Challenge[]>({
  key: "challengeListSelector",
  get: ({ get }) => get(challengeOverrideAtom) ?? CHALLENGES,
});
