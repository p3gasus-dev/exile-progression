import { buildToggleState } from "./toggle-state";

const LAB_PROGRESS_VERSION = 0;
const [
  labProgressSelectorFamily,
  labProgressKeys,
  useClearLabProgress,
] = buildToggleState(LAB_PROGRESS_VERSION, "lab-progress");

export type LabTier = "normal" | "cruel" | "merciless" | "uber";

export const LAB_TIERS: LabTier[] = ["normal", "cruel", "merciless", "uber"];

export const LAB_LABELS: Record<LabTier, string> = {
  normal: "Normal Lab",
  cruel: "Cruel Lab",
  merciless: "Merciless Lab",
  uber: "Uber Lab",
};

export const LAB_UNLOCK_CONDITION: Record<LabTier, string> = {
  normal: "Complete Act 3 — find 3 Trials in Acts 1–3",
  cruel: "Complete Act 6 — find 3 Trials in Acts 4–6",
  merciless: "Complete Act 9 — find 3 Trials in Acts 7–9",
  uber: "Obtain an Offering to the Goddess",
};

export const LAB_URL: Record<LabTier, string> = {
  normal: "https://www.poelab.com",
  cruel: "https://www.poelab.com",
  merciless: "https://www.poelab.com",
  uber: "https://www.poelab.com",
};

export {
  labProgressSelectorFamily,
  labProgressKeys,
  useClearLabProgress,
};
