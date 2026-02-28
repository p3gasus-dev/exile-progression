import { buildToggleState } from "./toggle-state";

const VOIDSTONE_PROGRESS_VERSION = 0;
const [
  voidstoneProgressSelectorFamily,
  voidstoneProgressKeys,
  useClearVoidstoneProgress,
] = buildToggleState(VOIDSTONE_PROGRESS_VERSION, "voidstone-progress");

export {
  voidstoneProgressSelectorFamily,
  voidstoneProgressKeys,
  useClearVoidstoneProgress,
};
