import { persistentStorageEffect } from ".";
import { RouteData } from "../../../common/route-processing/types";
import { NO_MIGRATORS, getPersistent } from "../utility";
import { DefaultValue, atom, selector } from "recoil";

const CHALLENGE_ROUTE_VERSION = 0;

async function loadDefaultChallengeRouteFiles() {
  const [{ Data }, { getRouteFiles }] = await Promise.all([
    import("../../../common/data"),
    import("../../../common/route-processing"),
  ]);

  const routeSource = await Data.RouteSourceLookup["./routes/challenges.txt"];
  return getRouteFiles([routeSource]);
}

const challengeRouteFilesAtom = atom<RouteData.RouteFile[] | null>({
  key: "challengeRouteFilesAtom",
  default: getPersistent(
    "challenge-route-files",
    CHALLENGE_ROUTE_VERSION,
    NO_MIGRATORS
  ),
  effects: [
    persistentStorageEffect("challenge-route-files", CHALLENGE_ROUTE_VERSION),
  ],
});

export const challengeRouteFilesSelector = selector<RouteData.RouteFile[]>({
  key: "challengeRouteFilesSelector",
  get: ({ get }) => {
    const saved = get(challengeRouteFilesAtom);
    if (saved) return saved;
    return loadDefaultChallengeRouteFiles();
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) set(challengeRouteFilesAtom, null);
    else set(challengeRouteFilesAtom, newValue);
  },
});
