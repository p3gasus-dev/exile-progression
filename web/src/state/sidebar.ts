import { gemLinksSelector } from "./gem-links";
import { searchStringsSelector } from "./search-strings";
import { urlTreesSelector } from "./tree/url-tree";
import { selector } from "recoil";

/**
 * True when the sidebar would render visible content (build imported with
 * gem links, skill tree, or search strings). Used by the Route container to
 * conditionally apply padding-right so the route content is centred when
 * no build is loaded.
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
