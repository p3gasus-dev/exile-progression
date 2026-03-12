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
        id: "white-coverage",
        label: "Complete 10+ different white map types",
        detail: "Unlocks atlas passive points and map bonus objectives.",
      },
      {
        id: "astrolabe-intro",
        label: "Apply your first Arcane Astrolabe to an Atlas quadrant",
        detail: "Astrolabes add a content type to all maps in that region. Clear influenced maps to escalate rewards.",
      },
      {
        id: "shrines",
        label: "Spec into the Shrine wheel for movement speed and survivability",
        detail: "Guaranteed shrine per map; grab duration and effect nodes.",
      },
    ],
  },
  {
    phase: "Phase 2 — Yellow Maps & Eldritch Voidstone",
    steps: [
      {
        id: "yellow-coverage",
        label: "Complete 10+ different yellow map types (T6–T10)",
      },
      {
        id: "eater-kill",
        label: "Defeat Eater of Worlds",
        detail: "Enable Eldritch influence, run influenced T1–T15 maps until Screaming Invitation drops.",
      },
      {
        id: "exarch-kill",
        label: "Defeat Searing Exarch",
        detail: "Enable Searing Exarch influence, farm Incandescent Invitation from T13–T15 maps.",
      },
      {
        id: "eldritch-voidstone",
        label: "Take the Eldritch Voidstone — requires BOTH Eater and Exarch kills",
        detail: "Eldritch Altars now have 25% chance for an extra modifier from the other influence type.",
      },
      {
        id: "passive-30",
        label: "Reach 30 Atlas Passive points; spec both Eldritch boss trees",
      },
    ],
  },
  {
    phase: "Phase 3 — Red Maps & Originator Voidstone",
    steps: [
      {
        id: "red-coverage",
        label: "Complete 10+ different red maps (T11–T15)",
      },
      {
        id: "reverent-fragments",
        label: "Collect 5 Reverent Fragments from Eldritch boss drops",
        detail: "Screaming and Incandescent Invitations both yield Reverent Fragments.",
      },
      {
        id: "incarnation-kill",
        label: "Defeat Incarnation of Dread — earn Originator Voidstone",
        detail: "Use 5 Reverent Fragments. Survive rose phases at 75% / 50% / 25% HP.",
      },
      {
        id: "bonus-objectives",
        label: "Complete bonus objectives in 10+ different maps",
        detail: "Grants additional Atlas passive points.",
      },
    ],
  },
  {
    phase: "Phase 4 — Uber Elder, Maven & Full Completion",
    steps: [
      {
        id: "shaper-guardians",
        label: "Defeat all 4 Shaper Guardians (Minotaur, Phoenix, Hydra, Chimera)",
        detail: "Farm T14+ maps for the 4 Shaper Guardian maps.",
      },
      {
        id: "shaper-kill",
        label: "Defeat The Shaper",
      },
      {
        id: "elder-guardians",
        label: "Defeat all 4 Elder Guardians",
        detail: "Elder Guardians spawn as extra bosses in T14–T16 maps.",
      },
      {
        id: "uber-elder-kill",
        label: "Defeat Uber Elder — earn Decayed Voidstone",
        detail: "Combine Shaper + Elder fragments. Both bosses fight simultaneously.",
      },
      {
        id: "witness-bosses",
        label: "Witness 10 unique boss kills to summon The Maven",
        detail: "Run maps with natural bosses; Maven witnesses automatically.",
      },
      {
        id: "maven-kill",
        label: "Defeat The Maven — earn Ceremonial Voidstone",
        detail: "Maven-witnessed bosses can now drop Maven Chisels.",
      },
      {
        id: "all-voidstones",
        label: "Socket all 4 Voidstones — maps drop at maximum tier",
      },
      {
        id: "astrolabes-full",
        label: "Apply Astrolabes to all Atlas quadrants for maximum content density",
        detail: "Escalate Astrolabe modifiers by clearing influenced maps in each region.",
      },
      {
        id: "passives-full",
        label: "Fully allocate all available Atlas Passive points",
        detail: "Respec passives to match your chosen farming strategy.",
      },
    ],
  },
];
