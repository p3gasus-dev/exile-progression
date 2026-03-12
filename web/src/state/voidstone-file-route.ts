import { selectorFamily } from "recoil";

const VOIDSTONE_ROUTE_KEYS = [
  "./routes/voidstone-1.txt",
  "./routes/voidstone-2.txt",
  "./routes/voidstone-3.txt",
  "./routes/voidstone-4.txt",
] as const;

/**
 * Parses a single voidstone route file by index (0–3).
 * Always uses the compiled-in default route source.
 * Used by the Atlas container to show VOIDSTONE 1–4 tabs.
 */
export const voidstoneFileRouteSelector = selectorFamily({
  key: "voidstoneFileRouteSelector",
  get: (index: number) => async () => {
    const [{ Data }, { initializeRouteState, parseRoute, getRouteFiles }] =
      await Promise.all([
        import("../../../common/data"),
        import("../../../common/route-processing"),
      ]);
    const src = await Data.RouteSourceLookup[VOIDSTONE_ROUTE_KEYS[index]];
    const routeFiles = getRouteFiles([src]);
    return parseRoute(routeFiles, initializeRouteState());
  },
});
