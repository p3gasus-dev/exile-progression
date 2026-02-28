import { persistentStorageEffect } from ".";
import { NO_MIGRATORS, getPersistent } from "../utility";
import { OilName } from "../data/oil-data";
import { DefaultValue, atom, selector } from "recoil";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Anoint {
  /** Notable passive name as shown in-game, e.g. "Charisma" */
  notable: string;
  oil1: OilName;
  oil2: OilName;
  oil3: OilName;
}

export interface BuildSettings {
  /** Selected major god id, e.g. "lunaris" */
  pantheonMajor: string;
  /** Selected minor god id, e.g. "abberath" */
  pantheonMinor: string;
  /** Amulet anointments the build needs */
  anoints: Anoint[];
  /** Free-text special mod notes (one per entry) */
  specialMods: string[];
}

// ── State ─────────────────────────────────────────────────────────────────────

const BUILD_SETTINGS_VERSION = 0;

const DEFAULT_BUILD_SETTINGS: BuildSettings = {
  pantheonMajor: "",
  pantheonMinor: "",
  anoints: [],
  specialMods: [],
};

const buildSettingsAtom = atom<BuildSettings | null>({
  key: "buildSettingsAtom",
  default: getPersistent("build-settings", BUILD_SETTINGS_VERSION, NO_MIGRATORS),
  effects: [persistentStorageEffect("build-settings", BUILD_SETTINGS_VERSION)],
});

export const buildSettingsSelector = selector<BuildSettings>({
  key: "buildSettingsSelector",
  get: ({ get }) => get(buildSettingsAtom) ?? DEFAULT_BUILD_SETTINGS,
  set: ({ set }, newValue) => {
    set(buildSettingsAtom, newValue instanceof DefaultValue ? null : newValue);
  },
});
