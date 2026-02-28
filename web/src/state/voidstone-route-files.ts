import { RouteData } from "../../../common/route-processing/types";
import { selector } from "recoil";

/**
 * Loads the 4 voidstone route files and returns them as RouteFile[].
 *
 * Unlike the ACT route files, voidstone routes are NOT user-editable and do
 * NOT need to be persisted to localStorage. This is a plain async selector.
 */
export const voidstoneRouteFilesSelector = selector<RouteData.RouteFile[]>({
  key: "voidstoneRouteFilesSelector",
  get: async () => {
    const [{ Data }, { getRouteFiles }] = await Promise.all([
      import("../../../common/data"),
      import("../../../common/route-processing"),
    ]);

    const routeSources = await Promise.all([
      Data.RouteSourceLookup["./routes/voidstone-1.txt"],
      Data.RouteSourceLookup["./routes/voidstone-2.txt"],
      Data.RouteSourceLookup["./routes/voidstone-3.txt"],
      Data.RouteSourceLookup["./routes/voidstone-4.txt"],
    ]);

    return getRouteFiles(routeSources);
  },
});
