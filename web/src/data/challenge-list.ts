/**
 * 40-challenge template for Exile Progression.
 *
 * These are league-agnostic challenge definitions designed to cover the
 * standard PoE challenge categories. Replace/extend this list each league
 * by modifying or importing a new challenge set.
 *
 * autoDetectKey: when set, the challenge auto-completes if the referenced
 * toggle-state key is checked (e.g. a voidstone boss kill step).
 * Future: wire these keys to route/voidstone progress state.
 */

export type ChallengeCategory =
  | "campaign"
  | "atlas"
  | "boss"
  | "mechanics"
  | "crafting"
  | "misc";

export interface Challenge {
  id: string;
  number: number;
  name: string;
  description: string;
  category: ChallengeCategory;
  /** Optional: key in toggle-state that auto-completes this challenge */
  autoDetectKey?: string;
}

export const CHALLENGES: Challenge[] = [
  // ── Campaign (1–10) ──────────────────────────────────────────────────────────
  {
    id: "complete-act-1",
    number: 1,
    name: "Complete Act 1",
    description: "Defeat Merveil, the Twisted and complete Act 1.",
    category: "campaign",
  },
  {
    id: "complete-act-2",
    number: 2,
    name: "Complete Act 2",
    description: "Defeat Vaal Oversoul and complete Act 2.",
    category: "campaign",
  },
  {
    id: "complete-act-3",
    number: 3,
    name: "Complete Act 3",
    description: "Defeat Dominus, Ascendant and complete Act 3.",
    category: "campaign",
  },
  {
    id: "complete-act-4",
    number: 4,
    name: "Complete Act 4",
    description: "Defeat Malachai, The Nightmare and complete Act 4.",
    category: "campaign",
  },
  {
    id: "complete-act-5",
    number: 5,
    name: "Complete Act 5",
    description: "Defeat Kitava (Act 5) and complete Act 5.",
    category: "campaign",
  },
  {
    id: "complete-acts-6-10",
    number: 6,
    name: "Complete Acts 6–10",
    description: "Defeat Kitava (Act 10) and enter maps.",
    category: "campaign",
  },
  {
    id: "complete-normal-lab",
    number: 7,
    name: "Complete Normal Labyrinth",
    description: "Defeat Izaro and claim your first Ascendancy.",
    category: "campaign",
  },
  {
    id: "complete-cruel-lab",
    number: 8,
    name: "Complete Cruel Labyrinth",
    description: "Defeat Izaro in the Cruel Labyrinth.",
    category: "campaign",
  },
  {
    id: "complete-merciless-lab",
    number: 9,
    name: "Complete Merciless Labyrinth",
    description: "Defeat Izaro in the Merciless Labyrinth.",
    category: "campaign",
  },
  {
    id: "complete-eternal-lab",
    number: 10,
    name: "Complete Eternal Labyrinth",
    description: "Defeat Izaro in the Eternal Labyrinth and earn all 8 Ascendancy points.",
    category: "campaign",
  },

  // ── Atlas Progression (11–20) ────────────────────────────────────────────────
  {
    id: "complete-white-maps",
    number: 11,
    name: "Complete 10 White Maps",
    description: "Complete 10 T1–T5 maps.",
    category: "atlas",
  },
  {
    id: "complete-yellow-maps",
    number: 12,
    name: "Complete 10 Yellow Maps",
    description: "Complete 10 T6–T10 maps.",
    category: "atlas",
  },
  {
    id: "complete-red-maps",
    number: 13,
    name: "Complete 10 Red Maps",
    description: "Complete 10 T11–T16 maps.",
    category: "atlas",
  },
  {
    id: "unlock-atlas-passives",
    number: 14,
    name: "Earn 30 Atlas Passive Points",
    description: "Complete enough maps to earn 30 Atlas passive skill points.",
    category: "atlas",
  },
  {
    id: "complete-t16-map",
    number: 15,
    name: "Complete a Tier 16 Map",
    description: "Complete any Tier 16 map.",
    category: "atlas",
  },
  {
    id: "complete-favourite-maps",
    number: 16,
    name: "Set 4 Favourite Maps",
    description: "Unlock and set 4 favourite map slots on your Atlas.",
    category: "atlas",
  },
  {
    id: "complete-unique-maps",
    number: 17,
    name: "Complete 5 Unique Maps",
    description: "Complete 5 different unique maps.",
    category: "atlas",
  },
  {
    id: "complete-conqueror-maps",
    number: 18,
    name: "Complete 20 Map Types",
    description: "Complete 20 different map types on your Atlas.",
    category: "atlas",
  },
  {
    id: "complete-bonus-objective",
    number: 19,
    name: "Complete 10 Map Bonus Objectives",
    description: "Complete the bonus objective in 10 different maps.",
    category: "atlas",
  },
  {
    id: "open-sextant-sockets",
    number: 20,
    name: "Apply 5 Voidstone Enchants",
    description: "Apply 5 Sextants to socketed Voidstones.",
    category: "atlas",
  },

  // ── Boss Kills (21–30) ───────────────────────────────────────────────────────
  {
    id: "kill-eater-of-worlds",
    number: 21,
    name: "Defeat The Eater of Worlds",
    description: "Defeat The Eater of Worlds and earn the Grasping Voidstone.",
    category: "boss",
    autoDetectKey: "voidstone-progress:The Eater of Worlds",
  },
  {
    id: "kill-searing-exarch",
    number: 22,
    name: "Defeat The Searing Exarch",
    description: "Defeat The Searing Exarch and earn the Omniscient Voidstone.",
    category: "boss",
    autoDetectKey: "voidstone-progress:The Searing Exarch",
  },
  {
    id: "kill-maven",
    number: 23,
    name: "Defeat The Maven",
    description: "Defeat The Maven and earn the Ceremonial Voidstone.",
    category: "boss",
    autoDetectKey: "voidstone-progress:The Maven",
  },
  {
    id: "kill-uber-elder",
    number: 24,
    name: "Defeat The Uber Elder",
    description: "Defeat The Uber Elder and earn the Decayed Voidstone.",
    category: "boss",
    autoDetectKey: "voidstone-progress:The Uber Elder",
  },
  {
    id: "socket-4-voidstones",
    number: 25,
    name: "Socket All 4 Voidstones",
    description: "Socket all 4 Voidstones into your Atlas Map Device.",
    category: "boss",
  },
  {
    id: "kill-shaper",
    number: 26,
    name: "Defeat The Shaper",
    description: "Defeat The Shaper in The Shaper's Realm.",
    category: "boss",
  },
  {
    id: "kill-elder",
    number: 27,
    name: "Defeat The Elder",
    description: "Defeat The Elder in The Elder's Realm.",
    category: "boss",
  },
  {
    id: "kill-all-guardians",
    number: 28,
    name: "Defeat All 8 Guardians",
    description: "Defeat all 4 Shaper Guardians and all 4 Elder Guardians.",
    category: "boss",
  },
  {
    id: "kill-map-boss-100",
    number: 29,
    name: "Defeat 100 Map Bosses",
    description: "Defeat 100 unique map bosses across your Atlas.",
    category: "boss",
  },
  {
    id: "complete-maven-crucible",
    number: 30,
    name: "Complete Maven's Crucible",
    description: "Complete a Maven's Invitation encounter in the Maven's Crucible.",
    category: "boss",
  },

  // ── League Mechanics (31–36) ─────────────────────────────────────────────────
  {
    id: "complete-delirium",
    number: 31,
    name: "Complete a Delirium Encounter",
    description: "Complete a Delirium mirror encounter in a map.",
    category: "mechanics",
  },
  {
    id: "complete-expedition",
    number: 32,
    name: "Complete an Expedition",
    description: "Complete an Expedition encounter in a map.",
    category: "mechanics",
  },
  {
    id: "complete-ritual",
    number: 33,
    name: "Complete a Ritual",
    description: "Complete a Ritual encounter and spend favour.",
    category: "mechanics",
  },
  {
    id: "complete-heist",
    number: 34,
    name: "Complete a Heist",
    description: "Complete a Heist contract.",
    category: "mechanics",
  },
  {
    id: "complete-bestiary",
    number: 35,
    name: "Craft via Bestiary",
    description: "Capture a beast and craft an item using Einhar's bestiary.",
    category: "mechanics",
  },
  {
    id: "complete-betrayal",
    number: 36,
    name: "Complete a Betrayal Safehouse",
    description: "Complete an Immortal Syndicate Safehouse.",
    category: "mechanics",
  },

  // ── Crafting & Currency (37–39) ───────────────────────────────────────────────
  {
    id: "use-orb-of-annulment",
    number: 37,
    name: "Use an Orb of Annulment",
    description: "Remove a modifier from a magic or rare item.",
    category: "crafting",
  },
  {
    id: "use-divine-orb",
    number: 38,
    name: "Use a Divine Orb",
    description: "Re-roll the values of an item's explicit modifiers.",
    category: "crafting",
  },
  {
    id: "use-orb-of-alteration-x100",
    number: 39,
    name: "Use 100 Orbs of Alteration",
    description: "Craft extensively — use 100 Orbs of Alteration.",
    category: "crafting",
  },

  // ── Misc (40) ─────────────────────────────────────────────────────────────────
  {
    id: "reach-level-100",
    number: 40,
    name: "Reach Level 100",
    description: "Reach the maximum character level of 100.",
    category: "misc",
  },
];

export const CHALLENGE_CATEGORIES: Record<ChallengeCategory, string> = {
  campaign: "Campaign",
  atlas: "Atlas",
  boss: "Boss Kills",
  mechanics: "League Mechanics",
  crafting: "Crafting & Currency",
  misc: "Misc",
};
