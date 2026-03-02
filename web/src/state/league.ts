import { persistentStorageEffect } from ".";
import { NO_MIGRATORS, getPersistent } from "../utility";
import { DefaultValue, atom, selector } from "recoil";

export const LEAGUES = [
  "Mirage",
  "Mirage HC",
  "Mirage SSF",
  "Mirage HC SSF",
  "Standard",
  "Hardcore",
] as const;

export type League = (typeof LEAGUES)[number];

const LEAGUE_VERSION = 0;

const leagueAtom = atom<League | null>({
  key: "leagueAtom",
  default: getPersistent("league", LEAGUE_VERSION, NO_MIGRATORS),
  effects: [persistentStorageEffect("league", LEAGUE_VERSION)],
});

export const leagueSelector = selector<League>({
  key: "leagueSelector",
  get: ({ get }) => get(leagueAtom) ?? "Mirage",
  set: ({ set }, newValue) => {
    set(leagueAtom, newValue instanceof DefaultValue ? null : newValue);
  },
});
