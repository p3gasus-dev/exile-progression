import { persistentStorageEffect } from ".";
import { NO_MIGRATORS, getPersistent } from "../utility";
import { DefaultValue, atom, selector } from "recoil";

export interface AtlasConfig {
  /**
   * Whether to show the Labyrinth Tracker section.
   */
  showLabTracker: boolean;
}

const ATLAS_CONFIG_VERSION = 0;

const DEFAULT_ATLAS_CONFIG: AtlasConfig = {
  showLabTracker: false,
};

const atlasConfigAtom = atom<AtlasConfig | null>({
  key: "atlasConfigAtom",
  default: getPersistent("atlas-config", ATLAS_CONFIG_VERSION, NO_MIGRATORS),
  effects: [persistentStorageEffect("atlas-config", ATLAS_CONFIG_VERSION)],
});

export const atlasConfigSelector = selector<AtlasConfig>({
  key: "atlasConfigSelector",
  get: ({ get }) => {
    const stored = get(atlasConfigAtom);
    if (stored === null) return DEFAULT_ATLAS_CONFIG;
    return { ...DEFAULT_ATLAS_CONFIG, ...stored };
  },
  set: ({ set }, newValue) => {
    set(atlasConfigAtom, newValue instanceof DefaultValue ? null : newValue);
  },
});
