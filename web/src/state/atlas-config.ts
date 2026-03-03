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

  /**
   * Order in which to complete the 4 voidstones.
   * Values 0–3 map to: 0=Eater, 1=Exarch, 2=Maven, 3=Uber Elder.
   * Default: [0, 1, 2, 3] (recommended order).
   */
  voidstoneOrder: [number, number, number, number];

  /**
   * Whether to show the Atlas full-completion checklist below the voidstone route.
   */
  showAtlasGuide: boolean;

  /**
   * Whether to show unique item drop badges on atlas route steps.
   */
  showUniqueDrops: boolean;

  /**
   * Scarab priority strategy for atlas farming.
   */
  scarabStrategy: "bulk" | "boss" | "content" | "none";
}

const ATLAS_CONFIG_VERSION = 0;

const DEFAULT_ATLAS_CONFIG: AtlasConfig = {
  passiveStrategy: "balanced",
  kiracMissionsEarly: false,
  runBothEarlyBosses: false,
  voidstoneOrder: [0, 1, 2, 3],
  showAtlasGuide: false,
  showUniqueDrops: true,
  scarabStrategy: "boss",
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
