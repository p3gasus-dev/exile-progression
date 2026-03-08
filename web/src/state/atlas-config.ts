import { persistentStorageEffect } from ".";
import { NO_MIGRATORS, getPersistent } from "../utility";
import { DefaultValue, atom, selector } from "recoil";

export interface AtlasConfig {
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
   * Whether to show unique item drop badges on atlas route steps.
   */
  showUniqueDrops: boolean;

  /**
   * Whether to show the Voidstone 1-4 route tab in Route.
   */
  showVoidstoneRoute: boolean;

  /**
   * Whether to show the Labyrinth Tracker section.
   */
  showLabTracker: boolean;
}

const ATLAS_CONFIG_VERSION = 0;

const DEFAULT_ATLAS_CONFIG: AtlasConfig = {
  runBothEarlyBosses: false,
  voidstoneOrder: [0, 1, 2, 3],
  showUniqueDrops: true,
  showVoidstoneRoute: true,
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
