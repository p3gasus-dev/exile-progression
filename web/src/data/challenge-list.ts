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

export type ChallengeDifficulty = "easy" | "medium" | "hard" | "endgame";

export interface Challenge {
  id: string;
  number: number;
  name: string;
  description: string;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  tips?: string[];
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
    difficulty: "easy",
    tips: [
      "Do all side quests for passive points and skill gems.",
      "Merveil has two phases — Cold res helps significantly.",
      "Pick up a movement skill early (Flame Dash or Dash).",
    ],
  },
  {
    id: "complete-act-2",
    number: 2,
    name: "Complete Act 2",
    description: "Defeat Vaal Oversoul and complete Act 2.",
    category: "campaign",
    difficulty: "easy",
    tips: [
      "Do the Alira / Oak / Kraityn bandit quest for rewards (Alira gives resists).",
      "Prioritise the Weaver and Chamber of Sins for quest passives.",
      "Stock up on life flasks — sustain matters here.",
    ],
  },
  {
    id: "complete-act-3",
    number: 3,
    name: "Complete Act 3",
    description: "Defeat Dominus, Ascendant and complete Act 3.",
    category: "campaign",
    difficulty: "easy",
    tips: [
      "Unlock the Library and Scriptorium for additional quest passives.",
      "Dominus phase 2 does Lightning damage — Lightning res helps.",
      "Pick up Searing Bond or utility gems from Act 3 vendors.",
    ],
  },
  {
    id: "complete-act-4",
    number: 4,
    name: "Complete Act 4",
    description: "Defeat Malachai, The Nightmare and complete Act 4.",
    category: "campaign",
    difficulty: "easy",
    tips: [
      "Kill Daresso and Kaom before Malachai — both are required.",
      "Malachai has Fire, Cold, and Lightning attacks — cap resists.",
      "Chaos Inoculation builds are immune to his Chaos DoT phase.",
    ],
  },
  {
    id: "complete-act-5",
    number: 5,
    name: "Complete Act 5",
    description: "Defeat Kitava (Act 5) and complete Act 5.",
    category: "campaign",
    difficulty: "easy",
    tips: [
      "Kitava (Act 5) applies a -30% to all resistances penalty on kill.",
      "Re-cap your resists immediately after defeating Kitava.",
      "The Avarius and Innocence fights precede Kitava — don't skip.",
    ],
  },
  {
    id: "complete-acts-6-10",
    number: 6,
    name: "Complete Acts 6–10",
    description: "Defeat Kitava (Act 10) and enter maps.",
    category: "campaign",
    difficulty: "easy",
    tips: [
      "Kitava (Act 10) applies a second -30% penalty — -60% total.",
      "Cap all resists (75%) before entering maps.",
      "Acts 6–10 mirror Acts 1–5 areas with tougher monsters.",
    ],
  },
  {
    id: "complete-normal-lab",
    number: 7,
    name: "Complete Normal Labyrinth",
    description: "Defeat Izaro and claim your first Ascendancy.",
    category: "campaign",
    difficulty: "easy",
    tips: [
      "Available from Act 3 after completing all three Trials.",
      "Use poelab.com for the daily layout — saves time.",
      "Izaro's damage depends on which enchantment phases you fail.",
    ],
  },
  {
    id: "complete-cruel-lab",
    number: 8,
    name: "Complete Cruel Labyrinth",
    description: "Defeat Izaro in the Cruel Labyrinth.",
    category: "campaign",
    difficulty: "easy",
    tips: [
      "Requires level 40+ and completion of all Cruel Trials.",
      "Check poelab.com daily for the shortest layout.",
      "Bring life flasks and a movement skill for traps.",
    ],
  },
  {
    id: "complete-merciless-lab",
    number: 9,
    name: "Complete Merciless Labyrinth",
    description: "Defeat Izaro in the Merciless Labyrinth.",
    category: "campaign",
    difficulty: "medium",
    tips: [
      "Requires level 55+ and all Merciless Trials (found in Acts 6–10).",
      "Izaro hits much harder here — prioritise life and resists.",
      "Divine Font is unlocked — save it for a useful helm enchant.",
    ],
  },
  {
    id: "complete-eternal-lab",
    number: 10,
    name: "Complete Eternal Labyrinth",
    description: "Defeat Izaro in the Eternal Labyrinth and earn all 8 Ascendancy points.",
    category: "campaign",
    difficulty: "medium",
    tips: [
      "Requires level 68+ and an Offering to the Goddess.",
      "Obtain the Offering by completing a Trial in a T6+ map.",
      "Uber Lab Izaro is dangerous — consider running it on a strong character.",
      "Check poelab.com daily for layout and Izaro mechanics.",
    ],
  },

  // ── Atlas Progression (11–20) ────────────────────────────────────────────────
  {
    id: "complete-white-maps",
    number: 11,
    name: "Complete 10 White Maps",
    description: "Complete 10 T1–T5 maps.",
    category: "atlas",
    difficulty: "easy",
    tips: [
      "Happens naturally — just enter maps from your Map Device after Act 10.",
      "Alch or transmute maps to add quantity before running.",
    ],
  },
  {
    id: "complete-yellow-maps",
    number: 12,
    name: "Complete 10 Yellow Maps",
    description: "Complete 10 T6–T10 maps.",
    category: "atlas",
    difficulty: "easy",
    tips: [
      "Upgrade your maps with Alchemy Orbs for yellow (T6–T10) tier.",
      "Try to complete the bonus objective in each map (kill boss).",
    ],
  },
  {
    id: "complete-red-maps",
    number: 13,
    name: "Complete 10 Red Maps",
    description: "Complete 10 T11–T16 maps.",
    category: "atlas",
    difficulty: "medium",
    tips: [
      "Cap your resists and have strong life/ES before running red maps.",
      "Alch + Chaos rolling maps can be dangerous — know your build limits.",
      "Progress naturally by completing yellow maps to unlock red ones.",
    ],
  },
  {
    id: "unlock-atlas-passives",
    number: 14,
    name: "Earn 30 Atlas Passive Points",
    description: "Complete enough maps to earn 30 Atlas passive skill points.",
    category: "atlas",
    difficulty: "medium",
    tips: [
      "Each unique map completion grants 1 Atlas passive point.",
      "Focus on completing new map types to maximise passive gain.",
      "Specialise passives into your farming strategy (e.g. Breach, Expedition).",
    ],
  },
  {
    id: "complete-t16-map",
    number: 15,
    name: "Complete a Tier 16 Map",
    description: "Complete any Tier 16 map.",
    category: "atlas",
    difficulty: "medium",
    tips: [
      "Alch and go a T16 — or buy one from trade if you haven't found one.",
      "Common T16s: Burial Chambers, Crimson Temple, Toxic Sewer.",
      "Make sure your DPS and defences are solid before attempting.",
    ],
  },
  {
    id: "complete-favourite-maps",
    number: 16,
    name: "Set 4 Favourite Maps",
    description: "Unlock and set 4 favourite map slots on your Atlas.",
    category: "atlas",
    difficulty: "easy",
    tips: [
      "Favourite map slots unlock as you progress the Atlas.",
      "Choose maps with good layouts and boss loot for your build.",
    ],
  },
  {
    id: "complete-unique-maps",
    number: 17,
    name: "Complete 5 Unique Maps",
    description: "Complete 5 different unique maps.",
    category: "atlas",
    difficulty: "medium",
    tips: [
      "Unique maps: Maelström of Chaos, Maze of the Minotaur, The Coward's Trial, etc.",
      "Buy cheap unique maps from trade if you don't find them naturally.",
      "Each unique map has special mechanics — read their descriptions.",
    ],
  },
  {
    id: "complete-conqueror-maps",
    number: 18,
    name: "Complete 20 Map Types",
    description: "Complete 20 different map types on your Atlas.",
    category: "atlas",
    difficulty: "easy",
    tips: [
      "Happens naturally while mapping — try different map names.",
      "Completing a new map type lights it up on the Atlas.",
    ],
  },
  {
    id: "complete-bonus-objective",
    number: 19,
    name: "Complete 10 Map Bonus Objectives",
    description: "Complete the bonus objective in 10 different maps.",
    category: "atlas",
    difficulty: "easy",
    tips: [
      "Bonus objective = kill the map boss.",
      "Completing the bonus grants an extra Atlas passive point.",
    ],
  },
  {
    id: "open-sextant-sockets",
    number: 20,
    name: "Apply 5 Voidstone Enchants",
    description: "Apply 5 Sextants to socketed Voidstones.",
    category: "atlas",
    difficulty: "medium",
    tips: [
      "Socket Voidstones first, then use Awakened Sextants on them.",
      "Sextants add modifiers to maps in their radius — use them strategically.",
      "Buy cheap Sextants from trade for this challenge.",
    ],
  },

  // ── Boss Kills (21–30) ───────────────────────────────────────────────────────
  {
    id: "kill-eater-of-worlds",
    number: 21,
    name: "Defeat The Eater of Worlds",
    description: "Defeat The Eater of Worlds and earn the Grasping Voidstone.",
    category: "boss",
    difficulty: "hard",
    autoDetectKey: "voidstone-progress:The Eater of Worlds",
    tips: [
      "Requires a Screaming Invitation (drop from Eater-influenced maps).",
      "He deals Cold and Physical damage — Cold res and armour help.",
      "Avoid the tentacle slams and ground degens. Keep moving.",
      "The Grasping Voidstone rewards 1 additional map drop per socketed stone.",
    ],
  },
  {
    id: "kill-searing-exarch",
    number: 22,
    name: "Defeat The Searing Exarch",
    description: "Defeat The Searing Exarch and earn the Omniscient Voidstone.",
    category: "boss",
    difficulty: "hard",
    autoDetectKey: "voidstone-progress:The Searing Exarch",
    tips: [
      "Requires a Polaric Invitation (drop from Exarch-influenced maps).",
      "He deals Fire and Chaos damage — high Fire res and Chaos res recommended.",
      "Watch out for his Meteor and Ball of Fire — dodge sideways.",
      "The Omniscient Voidstone rewards 1 additional map drop per socketed stone.",
    ],
  },
  {
    id: "kill-maven",
    number: 23,
    name: "Defeat The Maven",
    description: "Defeat The Maven and earn the Ceremonial Voidstone.",
    category: "boss",
    difficulty: "hard",
    autoDetectKey: "voidstone-progress:The Maven",
    tips: [
      "Requires completing Maven's Crucible (witness 10 map bosses).",
      "She deals Cold, Lightning, and Chaos damage.",
      "The Memory Game phase requires memorising and repeating a sequence.",
      "Phase 2 adds a Cascade of Pain maze — stay calm and navigate carefully.",
    ],
  },
  {
    id: "kill-uber-elder",
    number: 24,
    name: "Defeat The Uber Elder",
    description: "Defeat The Uber Elder and earn the Decayed Voidstone.",
    category: "boss",
    difficulty: "hard",
    autoDetectKey: "voidstone-progress:The Uber Elder",
    tips: [
      "Requires defeating both The Shaper and The Elder first.",
      "Use a Shaper/Elder fragment set to access The Shaper's Realm with Elder.",
      "Cold and Chaos res are critical — he deals both heavily.",
      "Watch for Shaper beam + Elder slam overlaps — the deadliest combo.",
    ],
  },
  {
    id: "socket-4-voidstones",
    number: 25,
    name: "Socket All 4 Voidstones",
    description: "Socket all 4 Voidstones into your Atlas Map Device.",
    category: "boss",
    difficulty: "hard",
    tips: [
      "Defeat all 4 voidstone bosses: Eater, Exarch, Maven, Uber Elder.",
      "Each additional voidstone raises the tier of maps dropped in the Atlas.",
      "4 voidstones = all maps become T16 max tier drops.",
    ],
  },
  {
    id: "kill-shaper",
    number: 26,
    name: "Defeat The Shaper",
    description: "Defeat The Shaper in The Shaper's Realm.",
    category: "boss",
    difficulty: "hard",
    tips: [
      "Collect all 4 Shaper Guardian fragments to forge the Shaper fragment set.",
      "The Shaper deals Cold and Physical damage — high Cold res helps.",
      "Dodge his slam, balls, and beam attacks. Move constantly.",
      "Phase 3 adds clones — focus the real Shaper (he's slightly brighter).",
    ],
  },
  {
    id: "kill-elder",
    number: 27,
    name: "Defeat The Elder",
    description: "Defeat The Elder in The Elder's Realm.",
    category: "boss",
    difficulty: "hard",
    tips: [
      "Spawn Elder by surrounding his influence on the Atlas.",
      "Collect all 4 Elder Guardian fragments + Shaper fragment for Uber Elder.",
      "He deals Cold, Physical, and Chaos damage.",
      "Phase 2 spawns all 4 guardians simultaneously — focus Elder first.",
    ],
  },
  {
    id: "kill-all-guardians",
    number: 28,
    name: "Defeat All 8 Guardians",
    description: "Defeat all 4 Shaper Guardians and all 4 Elder Guardians.",
    category: "boss",
    difficulty: "hard",
    tips: [
      "Shaper Guardians: Minotaur (T16), Hydra (T16), Chimera (T16), Phoenix (T16).",
      "Elder Guardians: The Enslaver, Eradicator, Constrictor, Purifier (T14–T16).",
      "Each Guardian drops a fragment needed for Shaper/Elder/Uber Elder access.",
      "Guardians have complex mechanics — look up each fight before attempting.",
    ],
  },
  {
    id: "kill-map-boss-100",
    number: 29,
    name: "Defeat 100 Map Bosses",
    description: "Defeat 100 unique map bosses across your Atlas.",
    category: "boss",
    difficulty: "medium",
    tips: [
      "Happens naturally while completing map bonus objectives.",
      "Each distinct boss type counts once — run varied maps.",
    ],
  },
  {
    id: "complete-maven-crucible",
    number: 30,
    name: "Complete Maven's Crucible",
    description: "Complete a Maven's Invitation encounter in the Maven's Crucible.",
    category: "boss",
    difficulty: "hard",
    tips: [
      "Witness 10 different map bosses with Maven present to fill the invitation.",
      "Maven appears when you use her Orb in a map — she watches and records boss kills.",
      "The Crucible fight spawns all witnessed bosses — bring strong AoE.",
      "Completing this unlocks access to The Maven herself.",
    ],
  },

  // ── League Mechanics (31–36) ─────────────────────────────────────────────────
  {
    id: "complete-delirium",
    number: 31,
    name: "Complete a Delirium Encounter",
    description: "Complete a Delirium mirror encounter in a map.",
    category: "mechanics",
    difficulty: "easy",
    tips: [
      "Delirium mirrors spawn in maps randomly — just enter and activate.",
      "Stay inside the mist as long as possible for more Simulacrum Splinters.",
      "Monsters deal more damage the deeper you go — pull back if overwhelmed.",
    ],
  },
  {
    id: "complete-expedition",
    number: 32,
    name: "Complete an Expedition",
    description: "Complete an Expedition encounter in a map.",
    category: "mechanics",
    difficulty: "easy",
    tips: [
      "Place explosives to uncover Expedition chests and monsters.",
      "Chain explosions for maximum area coverage and loot.",
      "Trade Expedition currency with Rog, Tujen, Dannig, or Gwennen.",
    ],
  },
  {
    id: "complete-ritual",
    number: 33,
    name: "Complete a Ritual",
    description: "Complete a Ritual encounter and spend favour.",
    category: "mechanics",
    difficulty: "easy",
    tips: [
      "Activate ritual altars in maps and survive the monster waves.",
      "Spend Tribute (favour) to buy items from the ritual vendor.",
      "Defer items to bring them to future rituals for a cheaper price.",
    ],
  },
  {
    id: "complete-heist",
    number: 34,
    name: "Complete a Heist",
    description: "Complete a Heist contract.",
    category: "mechanics",
    difficulty: "easy",
    tips: [
      "Contracts drop in maps — take them to the Rogue Harbour.",
      "Hire a Rogue with the right skill for the contract (e.g. Lockpicking).",
      "Loot chests quickly and escape before the alarm fills completely.",
    ],
  },
  {
    id: "complete-bestiary",
    number: 35,
    name: "Craft via Bestiary",
    description: "Capture a beast and craft an item using Einhar's bestiary.",
    category: "mechanics",
    difficulty: "easy",
    tips: [
      "Einhar missions spawn in maps — weaken beasts then Einhar captures them.",
      "Visit the Menagerie (via Einhar) to access the Bestiary crafting bench.",
      "Bestiary crafting can add implicit modifiers not available elsewhere.",
    ],
  },
  {
    id: "complete-betrayal",
    number: 36,
    name: "Complete a Betrayal Safehouse",
    description: "Complete an Immortal Syndicate Safehouse.",
    category: "mechanics",
    difficulty: "medium",
    tips: [
      "Interrogate Syndicate members found in maps to rank them up.",
      "Once a Safehouse is ready, enter and kill the leader for rewards.",
      "Catarina as Research leader = Crafting Bench crafts; aim for that.",
      "Janus Perandus in Transportation = bulk Exalts/Divines.",
    ],
  },

  // ── Crafting & Currency (37–39) ───────────────────────────────────────────────
  {
    id: "use-orb-of-annulment",
    number: 37,
    name: "Use an Orb of Annulment",
    description: "Remove a modifier from a magic or rare item.",
    category: "crafting",
    difficulty: "medium",
    tips: [
      "Orbs of Annulment randomly remove one modifier from an item.",
      "Use on items with one bad mod to try to improve them.",
      "Can be combined with Harvest crafting to target-annul specific mods.",
    ],
  },
  {
    id: "use-divine-orb",
    number: 38,
    name: "Use a Divine Orb",
    description: "Re-roll the values of an item's explicit modifiers.",
    category: "crafting",
    difficulty: "medium",
    tips: [
      "Divines re-roll the numeric values of all explicit modifiers.",
      "Useful on items with the right mods but bad rolls.",
      "Very valuable — don't waste them on items you won't use long-term.",
    ],
  },
  {
    id: "use-orb-of-alteration-x100",
    number: 39,
    name: "Use 100 Orbs of Alteration",
    description: "Craft extensively — use 100 Orbs of Alteration.",
    category: "crafting",
    difficulty: "hard",
    tips: [
      "Alterations re-roll a magic item's modifiers — buy in bulk from vendors.",
      "Alt-spam is a classic crafting method for rings, amulets, and belts.",
      "Combine with Blessed Orbs to re-roll implicit values after finding a good base.",
    ],
  },

  // ── Misc (40) ─────────────────────────────────────────────────────────────────
  {
    id: "reach-level-100",
    number: 40,
    name: "Reach Level 100",
    description: "Reach the maximum character level of 100.",
    category: "misc",
    difficulty: "endgame",
    tips: [
      "XP gain slows massively above level 95 — expect dozens of hours.",
      "Death above level 95 removes significant XP — don't die.",
      "Run Delirium-affected T16 maps for the best XP per hour.",
      "Avoid rippy map mods above level 97 — the XP loss is brutal.",
    ],
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

// ── Route challenge markers ───────────────────────────────────────────────────
//
// Maps kill-fragment boss names and ascend versions to the challenge(s) they
// complete. Used by ActRoute and VoidstoneRoute to render C# badges.
//
// "Kitava, the Insatiable" appears twice (Act 5 = C5, Act 10 = C6).
// Callers must handle it by tracking occurrence order.

export interface RouteChallengeRef {
  id: string;
  number: number;
}

/** Boss name (as it appears in `kill` route fragments) → challenge(s) completed. */
export const BOSS_CHALLENGE_MAP: Record<string, RouteChallengeRef[]> = {
  "Merveil, the Siren":     [{ id: "complete-act-1",       number: 1  }],
  "Vaal Oversoul":           [{ id: "complete-act-2",       number: 2  }],
  "Dominus, High Templar":   [{ id: "complete-act-3",       number: 3  }],
  "Malachai, The Nightmare": [{ id: "complete-act-4",       number: 4  }],
  // Two occurrences: first = C5 (Act 5), second = C6 (Acts 6–10)
  "Kitava, the Insatiable":  [{ id: "complete-act-5",       number: 5  },
                              { id: "complete-acts-6-10",   number: 6  }],
  "The Eater of Worlds":     [{ id: "kill-eater-of-worlds", number: 21 }],
  "The Searing Exarch":      [{ id: "kill-searing-exarch",  number: 22 }],
  "The Maven":               [{ id: "kill-maven",           number: 23 }],
  "The Uber Elder":          [{ id: "kill-uber-elder",      number: 24 }],
};

/** Ascend version → challenge completed. */
export const ASCEND_CHALLENGE_MAP: Record<string, RouteChallengeRef> = {
  normal:     { id: "complete-normal-lab",     number: 7  },
  cruel:      { id: "complete-cruel-lab",      number: 8  },
  merciless:  { id: "complete-merciless-lab",  number: 9  },
  eternal:    { id: "complete-eternal-lab",    number: 10 },
};
