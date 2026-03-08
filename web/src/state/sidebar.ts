import { gemLinksSelector } from "./gem-links";
import { searchStringsSelector } from "./search-strings";
import { urlTreesSelector } from "./tree/url-tree";
import { atom, selector } from "recoil";

/** Whether the sidebar panel is currently expanded (open). */
export const sidebarExpandedAtom = atom<boolean>({
  key: "sidebarExpanded",
  default: true,
});

/**
 * True when the sidebar has content to show (build imported with gem links,
 * skill tree, or search strings). Used by the Route container to conditionally
 * apply padding-right so the route is centred when no build is loaded.
 */
export const sidebarVisibleSelector = selector({
  key: "sidebarVisibleSelector",
  get: async ({ get }) => {
    const { urlTrees } = await get(urlTreesSelector);
    const gemLinks = get(gemLinksSelector);
    const searchStrings = await get(searchStringsSelector);
    return (
      urlTrees.length > 0 ||
      gemLinks.length > 0 ||
      (searchStrings !== null && searchStrings.length > 0)
    );
  },
});
