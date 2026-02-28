import { persistentStorageEffect } from ".";
import { NO_MIGRATORS, getPersistent } from "../utility";
import { DefaultValue, atom, selector } from "recoil";

export interface UniqueItem {
  name: string;
  base: string;
  manuallyAdded?: boolean;
}

const UNIQUE_ITEMS_VERSION = 0;

const uniqueItemsAtom = atom<UniqueItem[] | null>({
  key: "uniqueItemsAtom",
  default: getPersistent("unique-items", UNIQUE_ITEMS_VERSION, NO_MIGRATORS),
  effects: [persistentStorageEffect("unique-items", UNIQUE_ITEMS_VERSION)],
});

export const uniqueItemsSelector = selector<UniqueItem[]>({
  key: "uniqueItemsSelector",
  get: ({ get }) => {
    return get(uniqueItemsAtom) ?? [];
  },
  set: ({ set }, newValue) => {
    const value = newValue instanceof DefaultValue ? null : newValue;
    set(uniqueItemsAtom, value);
  },
});

/**
 * Returns only unique items that have a known drop source in endgame content.
 * Used to annotate route steps.
 */
export const uniqueItemsWithSourceSelector = selector<UniqueItem[]>({
  key: "uniqueItemsWithSourceSelector",
  get: async ({ get }) => {
    const items = get(uniqueItemsSelector);
    const { UNIQUE_DROP_SOURCES } = await import("../data/unique-drop-sources");
    return items.filter(
      (item) => UNIQUE_DROP_SOURCES[item.name.toLowerCase()] !== undefined
    );
  },
});
