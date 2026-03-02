import { buildToggleState } from "./toggle-state";

const ATLAS_COMPLETION_VERSION = 0;
const [
  atlasCompletionProgressSelectorFamily,
  atlasCompletionProgressKeys,
  useClearAtlasCompletion,
] = buildToggleState(ATLAS_COMPLETION_VERSION, "atlas-completion");

export {
  atlasCompletionProgressSelectorFamily,
  atlasCompletionProgressKeys,
  useClearAtlasCompletion,
};

// ── Guide data ────────────────────────────────────────────────────────────────

export interface AtlasGuideStep {
  id: string;
  label: string;
  detail?: string;
}

export interface AtlasGuidePhase {
  phase: string;
  steps: AtlasGuideStep[];
}

export const ATLAS_GUIDE: AtlasGuidePhase[] = [
  {
    phase: "Phase 1 — White Maps",
    steps: [
      {
        id: "passive-quantity",
        label: "Allocate first passives into map quantity & pack size",
        detail: "Prioritise the generic quantity cluster before specialising.",
      },
      {
        id: "kirac-missions",
        label: "Complete all Kirac missions each time they reset",
        detail: "Each completion grants a free bonus Atlas Passive point.",
      },
      {
        id: "favourite-2",
        label: "Set 2 Favourite Maps (dense T5–T7 layouts)",
        detail: "Crimson Temple, Crimson Township, or Underground River are solid picks.",
      },
      {
        id: "white-coverage",
        label: "Complete 10+ different white map types",
        detail: "Unlocks atlas passive points and map bonus objectives.",
      },
    ],
  },
  {
    phase: "Phase 2 — Yellow Maps & First Voidstones",
    steps: [
      {
        id: "yellow-coverage",
        label: "Complete 10+ different yellow map types (T6–T10)",
      },
      {
        id: "first-boss",
        label: "Defeat Eater of Worlds or Searing Exarch — earn 1st Voidstone",
        detail: "Spec several passives into the chosen boss tree first.",
      },
      {
        id: "second-boss",
        label: "Defeat the other early pinnacle boss — earn 2nd Voidstone",
      },
      {
        id: "passive-30",
        label: "Reach 30 Atlas Passive points; spec both early boss trees",
        detail: "Running both early bosses grants double passive books.",
      },
      {
        id: "favourite-4",
        label: "Unlock and set all 4 Favourite Map slots",
      },
    ],
  },
  {
    phase: "Phase 3 — Red Maps & The Maven",
    steps: [
      {
        id: "red-coverage",
        label: "Complete 10+ different red maps (T11–T15)",
      },
      {
        id: "t16-complete",
        label: "Complete a Tier 16 map",
        detail: "Use Sextants and Scarabs for your first T16 to ensure completion.",
      },
      {
        id: "witness-bosses",
        label: "Witness 10 unique boss kills to summon The Maven",
        detail: "Run maps with natural bosses; Maven witnesses automatically.",
      },
      {
        id: "maven-kill",
        label: "Defeat The Maven — earn 3rd Voidstone",
      },
      {
        id: "bonus-objectives",
        label: "Complete bonus objectives in 10+ different maps",
        detail: "Completing bonus objectives on the Atlas grants passive points.",
      },
    ],
  },
  {
    phase: "Phase 4 — Uber Elder & Full Completion",
    steps: [
      {
        id: "elder-kill",
        label: "Defeat The Uber Elder — earn 4th Voidstone",
        detail: "Requires activating both Shaper and Elder influence on the Atlas.",
      },
      {
        id: "all-voidstones",
        label: "Socket all 4 Voidstones into the Map Device",
        detail: "All maps now drop at +4 tiers, maximising juice.",
      },
      {
        id: "map-types-20",
        label: "Complete 20+ different map types for full atlas coverage",
      },
      {
        id: "sextants",
        label: "Apply Sextants to all socketed Voidstones for maximum returns",
        detail: "Awakened Sextants on Voidstones give the most value.",
      },
      {
        id: "passives-full",
        label: "Fully allocate all available Atlas Passive points",
        detail: "Respect passives to match your chosen strategy once objectives are done.",
      },
    ],
  },
];
