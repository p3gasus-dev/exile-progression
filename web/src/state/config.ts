import { persistentStorageEffect } from ".";
import { NO_MIGRATORS, getPersistent } from "../utility";
import { DefaultValue } from "recoil";
import { atom, selector } from "recoil";

export interface Config {
  gemsOnly: boolean;
  showSubsteps: boolean;
  showCraftingRecipes: boolean;
  showStatHints: boolean;
  showChallenges: boolean;
}

const CONFIG_VERSION = 0;

const configAtom = atom<Config | null>({
  key: "configAtom",
  default: getPersistent("config", CONFIG_VERSION, NO_MIGRATORS),
  effects: [persistentStorageEffect("config", CONFIG_VERSION)],
});

export const configSelector = selector<Config>({
  key: "configSelector",
  get: ({ get }) => {
    const value = get(configAtom);
    if (value === null)
      return { gemsOnly: false, showSubsteps: true, showCraftingRecipes: true, showStatHints: true, showChallenges: true };
    return {
      gemsOnly: value.gemsOnly ?? false,
      showSubsteps: value.showSubsteps ?? true,
      showCraftingRecipes: value.showCraftingRecipes ?? true,
      showStatHints: value.showStatHints ?? true,
      showChallenges: value.showChallenges ?? true,
    };
  },
  set: ({ set }, newValue) => {
    const value = newValue instanceof DefaultValue ? null : newValue;
    set(configAtom, value);
  },
});
