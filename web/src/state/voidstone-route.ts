import { voidstoneRouteFilesSelector } from "./voidstone-route-files";
import { selector } from "recoil";

/**
 * Parses the 4 voidstone route files into a structured Route.
 * Unlike the ACT route, voidstone routes have no gem injection or
 * build-dependent steps — they are static task lists with unique item
 * annotations added at render time.
 */
export const voidstoneRouteSelector = selector({
  key: "voidstoneRouteSelector",
  get: async ({ get }) => {
    const { initializeRouteState, parseRoute } = await import(
      "../../../common/route-processing"
    );

    const routeFiles = get(voidstoneRouteFilesSelector);
    const routeState = initializeRouteState();

    return parseRoute(routeFiles, routeState);
  },
});
