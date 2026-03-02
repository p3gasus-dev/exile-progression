import { persistentStorageEffect } from ".";
import { NO_MIGRATORS, getPersistent } from "../utility";
import { DefaultValue, atom, selector } from "recoil";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface BuildSettings {
  /** Selected major god id, e.g. "lunaris" */
  pantheonMajor: string;
  /** Selected minor god id, e.g. "abberath" */
  pantheonMinor: string;
}

// ── State ─────────────────────────────────────────────────────────────────────

const BUILD_SETTINGS_VERSION = 0;

const DEFAULT_BUILD_SETTINGS: BuildSettings = {
  pantheonMajor: "",
  pantheonMinor: "",
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
