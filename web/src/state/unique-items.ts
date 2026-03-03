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
