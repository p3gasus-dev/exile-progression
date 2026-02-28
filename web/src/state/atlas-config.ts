import { persistentStorageEffect } from ".";
import { NO_MIGRATORS, getPersistent } from "../utility";
import { DefaultValue, atom, selector } from "recoil";

export interface AtlasConfig {
  /**
   * Atlas passive tree strategy focus.
   * boss-rush: prioritise atlas points into boss nodes early
   * map-sustain: prioritise map quantity/return nodes first
   * balanced: spread evenly
   */
  passiveStrategy: "boss-rush" | "map-sustain" | "balanced";

  /**
   * Run Kirac missions early for bonus atlas passive points.
   * Slows map progression slightly but gives extra passive points.
   */
  kiracMissionsEarly: boolean;

  /**
   * Spec into both Eater and Exarch early for double atlas passive books,
   * rather than focusing a single boss first.
   */
  runBothEarlyBosses: boolean;
}

const ATLAS_CONFIG_VERSION = 0;

const DEFAULT_ATLAS_CONFIG: AtlasConfig = {
  passiveStrategy: "balanced",
  kiracMissionsEarly: false,
  runBothEarlyBosses: false,
};

const atlasConfigAtom = atom<AtlasConfig | null>({
  key: "atlasConfigAtom",
  default: getPersistent("atlas-config", ATLAS_CONFIG_VERSION, NO_MIGRATORS),
  effects: [persistentStorageEffect("atlas-config", ATLAS_CONFIG_VERSION)],
});

export const atlasConfigSelector = selector<AtlasConfig>({
  key: "atlasConfigSelector",
  get: ({ get }) => get(atlasConfigAtom) ?? DEFAULT_ATLAS_CONFIG,
  set: ({ set }, newValue) => {
    set(atlasConfigAtom, newValue instanceof DefaultValue ? null : newValue);
  },
});
