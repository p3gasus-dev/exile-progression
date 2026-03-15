import { persistentStorageEffect } from ".";
import { RouteData } from "../../../common/route-processing/types";
import { NO_MIGRATORS, getPersistent } from "../utility";
import { DefaultValue, atom, selector } from "recoil";

const VOIDSTONE_ROUTE_VERSION = 1;

const VOIDSTONE_KEYS = [
  "./routes/voidstone-1.txt",
  "./routes/voidstone-2.txt",
  "./routes/voidstone-3.txt",
  "./routes/voidstone-4.txt",
] as const;

async function loadDefaultVoidstoneRouteFiles() {
  const [{ Data }, { getRouteFiles }] = await Promise.all([
    import("../../../common/data"),
    import("../../../common/route-processing"),
  ]);

  const routeSources = await Promise.all(
    VOIDSTONE_KEYS.map((k) => Data.RouteSourceLookup[k])
  );

  return getRouteFiles(routeSources);
}

const voidstoneRouteFilesAtom = atom<RouteData.RouteFile[] | null>({
  key: "voidstoneRouteFilesAtom",
  default: getPersistent(
    "voidstone-route-files",
    VOIDSTONE_ROUTE_VERSION,
    NO_MIGRATORS
  ),
  effects: [
    persistentStorageEffect("voidstone-route-files", VOIDSTONE_ROUTE_VERSION),
  ],
});

export const voidstoneRouteFilesSelector = selector<RouteData.RouteFile[]>({
  key: "voidstoneRouteFilesSelector",
  get: ({ get }) => {
    const saved = get(voidstoneRouteFilesAtom);
    if (saved) return saved;
    return loadDefaultVoidstoneRouteFiles();
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) set(voidstoneRouteFilesAtom, null);
    else set(voidstoneRouteFilesAtom, newValue);
  },
});
