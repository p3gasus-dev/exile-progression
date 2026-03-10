/**
 * Mirage League — 40 challenges.
 * Source: https://craniumviolence.github.io/ (CraniumViolence challenge guide)
 * league.txt / league-toc.txt
 */

export type ChallengeCategory =
  | "campaign"
  | "atlas"
  | "boss"
  | "mechanics"
  | "crafting"
  | "misc";

export type ChallengeDifficulty = "easy" | "medium" | "hard" | "endgame";

export type ChallengeQuestType =
  | "required"
  | "new-content"
  | "currency-sink"
  | "grind-heavy";

export interface Challenge {
  id: string;
  number: number;
  name: string;
  /** Each entry is one distinct task or selectable option within the challenge. */
  steps: string[];
  /** How many steps must be completed (omit if all are required). */
  requires?: number;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  /** Optional activity classification shown as a colored badge in the header. */
  questType?: ChallengeQuestType;
  tips?: string[];
  /** Per-step hints keyed by 0-based step index. */
  stepHints?: Record<number, string[]>;
  autoDetectKey?: string;
}

export const CHALLENGES: Challenge[] = [

  // ── Early Game (1–8) ─────────────────────────────────────────────────────────

  {
    id: "beginners-basics",
    number: 1,
    name: "Beginner's Basics",
    steps: [
      "Use an Orb of Transmutation",
      "Use an Orb of Alteration",
      "Use an Orb of Augmentation",
      "Use an Orb of Alchemy",
    ],
    category: "crafting",
    difficulty: "easy",
    tips: [
      "You right click them, then you right click an item in your inventory. Or your stash. Or a strongbox.",
    ],
  },
  {
    id: "mysterious-mirages",
    number: 2,
    name: "Mysterious Mirages",
    steps: [
      "Choose a Wish",
      "Enter a Mirage",
      "Break the Astral Chain in a Mirage",
    ],
    category: "mechanics",
    difficulty: "easy",
    stepHints: {
      0: ["Select one of the three options on interacting with the league's NPC"],
      1: ["Enter the portal created on the above interaction"],
      2: ["Find a circle of three rare monsters around chains going into the sky and kill them"],
    },
    tips: [
      "Incredibly basic league mechanic interactions you can complete in Act 1.",
    ],
  },
  {
    id: "peddlers-produce-1",
    number: 3,
    name: "Peddler's Produce I",
    steps: [
      "Any Mana or Life Flask",
      "Any Hybrid Flask",
      "Ruby, Topaz or Sapphire Ring",
      "Agate, Turquoise or Citrine Amulet",
    ],
    category: "crafting",
    difficulty: "easy",
    stepHints: {
      0: ["Three of a single type of Life or Mana Flask will upgrade into the next tier for this"],
      1: ["Vendor a Life Flask, Mana Flask and an Orb of Fusing"],
      2: ["Vendor an Iron Ring and Any Skill Gem"],
      3: ["Vendor any two of Amber Amulet, Lapis Amulet and Jade Amulet alongside an Orb of Transmutation"],
    },
  },
  {
    id: "act-adversaries-1",
    number: 4,
    name: "Act Adversaries I",
    steps: [
      "Act 1: Merveil, the Twisted",
      "Act 2: Vaal Oversoul",
      "Act 3: Dominus, Ascendant",
      "Act 4: Malachai, The Nightmare",
      "Act 5: Kitava, the Insatiable",
    ],
    category: "campaign",
    difficulty: "easy",
    tips: [
      "Completely normal compulsory progression.",
    ],
  },
  {
    id: "beneficial-bounties",
    number: 5,
    name: "Beneficial Bounties",
    steps: [
      "The Way Forward",
      "Through Sacred Ground",
      "Victario's Secrets",
      "An Indomitable Spirit",
    ],
    category: "campaign",
    difficulty: "easy",
    stepHints: {
      0: ["Act 2 passive point quest, turn it in to Eramir in Act 1"],
      1: ["Act 2 passive point quest, obtain the Golden Hand"],
      2: ["Act 3 passive point quest, collect busts"],
      3: ["Act 4 passive point quest, save Deshret's spirit"],
    },
  },
  {
    id: "desecrated-djinn",
    number: 6,
    name: "Desecrated Djinn",
    steps: [
      "Choose Wishes (0/5)",
      "Defeat Rare Monsters in Mirages (0/10)",
      "Break the Astral Chain in Mirages (0/15)",
    ],
    category: "mechanics",
    difficulty: "easy",
    tips: [
      "Basic interaction with the league mechanic. You will complete this in 15 mirages because you are required to do the other two steps first for every Mirage completion.",
    ],
  },
  {
    id: "act-adversaries-2",
    number: 7,
    name: "Act Adversaries II",
    steps: [
      "Act 6: Tsoagoth, The Brine King",
      "Act 7: Arakaali, Spinner of Shadows",
      "Act 8: Lunaris, Eternal Moon and Solaris, Eternal Sun",
      "Act 9: The Depraved Trinity",
      "Act 10: Kitava, the Insatiable",
    ],
    category: "campaign",
    difficulty: "easy",
    tips: [
      "Completely normal compulsory progression.",
    ],
  },
  {
    id: "helpful-hideaways",
    number: 8,
    name: "Helpful Hideaways",
    steps: [
      "Aspirants' Plaza",
      "Menagerie",
      "Mine Encampment",
      "Forbidden Sanctum",
      "Kingsmarch",
      "Rogue Harbour",
      "Monastery of the Keepers",
    ],
    category: "misc",
    difficulty: "easy",
    stepHints: {
      0: ["Unlocked in Act 3 for ascending"],
      1: ["Unlocked in Act 2 through interacting with Einhar", "The command /menagerie takes you there from safe zones"],
      2: ["Unlocked in Act 4 through interacting with Niko", "The command /delve takes you there from safe zones"],
      3: ["Unlocked in Act 10 through interacting with Divinia", "The command /sanctum takes you there from safe zones"],
      4: ["Unlocked in the Epilogue through interacting with Johan in Kauri Shores", "The command /kingsmarch takes you there from safe zones"],
      5: ["Unlocked by using a Rogue's Marker any time after entering Act 6", "The command /heist takes you there from safe zones"],
      6: ["Unlocked by talking to Ailith in Act 6", "The command /monastery takes you there from safe zones"],
    },
    tips: [
      "Freebie, just normal areas that have shortcuts on waypoints.",
    ],
  },

  // ── Atlas Entry (9–17) ───────────────────────────────────────────────────────

  {
    id: "added-accessories",
    number: 9,
    name: "Added Accessories",
    steps: [
      "Defeat Monsters with Essence (0/30)",
      "Open Strongboxes (0/30)",
      "Activate Shrines (0/30)",
      "Defeat Possessed Monsters (0/30)",
      "Defeat Rogue Exiles (0/30)",
      "Defeat Rare Beyond Monsters (0/30)",
    ],
    requires: 3,
    category: "mechanics",
    difficulty: "easy",
    stepHints: {
      0: [
        "Atlas points can guarantee at least 1 monster each map",
        "Essence Scarab adds 2 monsters up to a max of 10 while using five",
        "Essence Scarab of Calcification converts all rare monsters in a map to be imprisoned",
      ],
      1: [
        "Atlas points can guarantee at least 1 strongbox each map",
        "Ambush Scarab will add 4 to a map up to a max of 12 while using three",
      ],
      2: [
        "Atlas points can guarantee at least 1 shrine a map",
        "Domination Scarab adds 2 shrines to a map up to a max of 8 while using four",
        "Domination Scarab of Apparitions adds 2 Apparition Shrines to a map",
        "Domination Scarab of Evolution adds 1 Evolving Shrine up to a maximum of 2 while using two",
      ],
      3: [
        "Atlas points can add at least 1 Tormented Spirit — pairing with Rogue Exiles is sensible as Exiled Will causes Rogue Exiles to be possessed",
        "Torment Scarab of Possession grants a fixed 25% chance for each rare in an area to be possessed up to a maximum of 75%",
        "Torment Scarab adds 3 additional Tormented Spirits to an area",
        "Do not take Speaker of the Dead if you want to complete this",
        "This is an obvious skip because it's awkward compared to the rest",
      ],
      4: [
        "Atlas points can add 1 Rogue Exile and can cause them to appear in pairs or spawn extras with a map boss",
        "Anarchy Scarab adds 4 Rogue Exiles up to a maximum of 20 while using five",
        "Anarchy Scarab of Partnership is a 50% chance for Rogue Exiles to appear in pairs",
      ],
      5: [
        "A Beyond Scarab and the Atlas can all enable Beyond monsters spawning",
        "Atlas points can lower requirements for spawning monsters and Endless Tide makes it so you cannot spawn bosses (bosses stop further beyond monster spawns by default)",
        "Beyond Scarab of Haemophilia and Beyond Scarab of the Invasion both make spawning Beyond monsters easier",
      ],
    },
  },
  {
    id: "atlas-additions",
    number: 10,
    name: "Atlas Additions",
    steps: [
      "Complete Abysses (0/30)",
      "Complete Expeditions (0/30)",
      "Complete Harvest Plots (0/100)",
      "Complete Legion Encounters (0/30)",
      "Open Smuggler's Caches (0/30)",
      "Pass through Mirrors of Delirium (0/30)",
      "Complete Ultimatum Waves (0/200)",
      "Complete Blights (0/30)",
      "Complete Rituals (0/100)",
      "Complete Ore Deposit Encounters (0/30)",
      "Complete Unstable Breaches or Hives (0/30)",
    ],
    requires: 5,
    category: "atlas",
    difficulty: "easy",
    stepHints: {
      0: ["You have to actually chase down the Abyss but you can push a lot of Abysses into a single map"],
      1: ["Requires reading to avoid bricking encounters, truly not for the faint of heart"],
      2: ["You will get multiple plots per harvest making this about equal to everything else"],
      3: ["As many per map as you push onto it"],
      4: ["Very unobtrusive, simply click the caches as you see them while doing anything else"],
      5: ["One a map, you can immediately end it because it's just passing through"],
      6: ["You can get 10 to 13 waves per Ultimatum, this seems balanced around"],
      7: ["One a map"],
      8: ["3 or 4 per map"],
      9: ["As many per map as you push onto it"],
      10: ["As many per map as you push onto it, one to five deterministically"],
    },
    tips: [
      "Normal content completion challenge. Mirages should presumably add 1+ to each mechanic you can duplicate.",
    ],
  },
  {
    id: "master-missives",
    number: 11,
    name: "Master Missives",
    steps: [
      "Niko Missions (0/30)",
      "Einhar Missions (0/30)",
      "Jun Missions (0/30)",
      "Alva Missions (0/30)",
    ],
    requires: 2,
    category: "atlas",
    difficulty: "easy",
    stepHints: {
      0: ["Tagging all Sulphite nodes in a map"],
      1: ["Capturing all Beasts in a map"],
      2: ["Completing all Syndicate Encounters in a map"],
      3: ["Completing all Incursions in a map"],
    },
    tips: [
      "Red Maps but no tier requirement beyond that, spec into them on the Atlas and you can get 100% chance or simply use their Scarabs.",
    ],
  },
  {
    id: "sacred-sigils",
    number: 12,
    name: "Sacred Sigils",
    steps: [
      "Sigil of Navira (0/50)",
      "Sigil of Kelari (0/50)",
      "Sigil of Ruzhan (0/50)",
    ],
    category: "mechanics",
    difficulty: "medium",
    stepHints: {
      0: ["Blue choices", "The icon is a Blue Water Jug"],
      1: ["White Choices", "The icon is a White Dagger"],
      2: ["Red Choices", "The icon is a Red Sword"],
    },
    tips: [
      "You will likely find yourself biased towards some of these, they can all appear at all stages of the game so you can simply run whatever content you are comfortable with to get these completed.",
    ],
  },
  {
    id: "cartographers-courage",
    number: 13,
    name: "Cartographer's Courage",
    steps: [
      "Tier 1",
      "Tier 2",
      "Tier 3",
      "Tier 4",
      "Tier 5",
      "Tier 6",
      "Tier 7",
      "Tier 8",
      "Tier 9",
      "Tier 10",
      "Tier 11",
      "Tier 12",
      "Tier 13",
      "Tier 14",
      "Tier 15",
      "Tier 16",
    ],
    category: "atlas",
    difficulty: "easy",
    tips: [
      "Do rare maps. I believe in you!",
      "You might unironically end up needing to buy lower tier maps depending on how you progressed if you didn't run everything rare from Tier 1.",
    ],
  },
  {
    id: "crafting-craze",
    number: 14,
    name: "Crafting Craze",
    steps: [
      "Orb of Transmutation (0/40)",
      "Orb of Augmentation (0/30)",
      "Orb of Alteration (0/20)",
      "Orb of Chance (0/20)",
      "Orb of Alchemy (0/20)",
      "Orb of Scouring (0/30)",
      "Orb of Fusing (0/20)",
      "Jeweller's Orb (0/20)",
      "Chromatic Orb (0/20)",
      "Orb of Annulment (0/3)",
      "Regal Orb (0/20)",
      "Chaos Orb (0/20)",
      "Exalted Orb",
      "Blessed Orb (0/20)",
      "Divine Orb",
      "Sacred Orb",
      "Enkindling or Instilling Orb (0/20)",
      "Orb of Regret (0/20)",
      "Orb of Unmaking (0/20)",
    ],
    requires: 15,
    category: "crafting",
    difficulty: "easy",
    tips: [
      "It's just consuming normal currency in moderate amounts and doesn't even force Divines or other expensive currencies. This is free if you are going for challenge rewards in general realistically.",
    ],
  },
  {
    id: "maniacal-monsters",
    number: 15,
    name: "Maniacal Monsters",
    steps: [
      "Defeat 200 Map Bosses in Rare Maps while they have at least 80% Item Quantity",
    ],
    category: "atlas",
    difficulty: "easy",
    tips: [
      "This is just literally normal mapping. Destructive Play will help as will maps with multiple bosses.",
    ],
  },
  {
    id: "deadly-deeds",
    number: 16,
    name: "Deadly Deeds",
    steps: [
      "Abyssal Depths (0/5)",
      "Logbooks with at least 10 Remnants active (0/5)",
      "Tier 4 Harvest Seeds (0/5)",
      "Domains of Timeless Conflict with at least 25 rewards (0/3)",
      "Blueprints with 4 revealed wings (0/5)",
      "Simulacrum Waves (0/60)",
      "Fully Completed Ultimatums (0/10)",
      "Blighted or Blight Ravaged Maps (0/5)",
      "All Rituals in Maps with at least one Blood-filled Vessel applied (0/10)",
      "Claim rewards from Rare Maps successfully completed by your Atlas Runners (0/30)",
      "Complete Hive Fortresses or Defeat Breach Marshals (0/10)",
    ],
    requires: 5,
    category: "mechanics",
    difficulty: "medium",
    stepHints: {
      0: ["There's a new Abyss Scarab of Descending that forces Depths spawns but it might not be cheap"],
      1: [
        "You can simply buy these and then it's as simple as playing them normally",
        "These are just the modifiers that activate as you blow things up",
      ],
      2: [
        "Crop Rotation can get you Tier 4s relatively even if it's not completely consistent",
        "The Harvest Scarab of Cornucopia exists and allows you to force at least one Tier 4 monster to spawn",
      ],
      3: [
        "Can be done in a four or five-way fairly easily as long as your build is decent at clearing, simply get the emblems",
        "Buying into a five-way rota will obviously complete this for you while also levelling you but is a lot more than simply buying the emblems if your character can handle it",
        "This might sound hard if you are unfamiliar with the content, but it is legitimately not even a single full row of rewards and it does not take a notable build to reach this amount",
      ],
      4: [
        "Requires engaging with Heist as all the blueprint will require that you have levelled up your Rogues to be taken",
        "Search trade for area level 81 and set the heist section to include four revealed wings",
      ],
      5: [
        "Simply waves, doesn't need you to complete them",
        "Avoid attrition grinding if you can't do at least 10 waves and do something else instead as you will ultimately just be wasting money otherwise",
      ],
      6: ["This is a full set of 10 or more waves depending on your atlas tree, not too bad but a lot of builds will struggle with T14 and full ten waves"],
      7: [
        "Can be cleared on any build even with zero DPS because of how the systems work",
        "Clear Oil, Sepia Oil and Amber Oil can Slow Monsters, Increase Tower Damage and Make Towers Cheaper respectively",
        "Ring anoint for Meteor Burning Ground and Chilling Towers Freeze Enemies",
        "Avoid immune to stun, chance to avoid elemental ailments and cannot be slowed below base speed as modifiers",
        "Blight Ravaged is a lot harder but can still be managed with just those two ring anoints if you don't get a really bad layout",
      ],
      8: [
        "Needs Ritual Vessels made from 100x Ritual Splinters",
        "Use them on completed rituals to fill them up",
        "Use filled ones as a map fragment when opening a portal to add the monsters to rituals",
        "This is a fairly big undertaking compared to some of the others, you cannot fill vessels from rituals that used vessels making this a lot more than 20 in most cases",
      ],
      9: [
        "Basic Kingsmarch interaction, map runners are purely a gold sink you want highest level possible for",
        "It is rare maps only so you can transmute and regal maps for highest clear chances",
      ],
      10: ["Stack unstable breaches, disable hives and run the Breach Scarab of the Marshal and you can do this in two to three maps"],
    },
  },
  {
    id: "empowered-encounters",
    number: 17,
    name: "Empowered Encounters",
    steps: [
      "Complete Abysses (0/15)",
      "Complete Expeditions (0/15)",
      "Complete Harvest Plots (0/50)",
      "Complete Legion Encounters (0/15)",
      "Open Smuggler's Caches (0/15)",
      "Pass through Mirrors of Delirium (0/15)",
      "Complete Ultimatum Waves (0/50)",
      "Complete Blights (0/15)",
      "Complete Rituals (0/25)",
      "Complete Ore Deposit Encounters (0/15)",
      "Complete Unstable Breaches or Hives (0/15)",
    ],
    requires: 4,
    category: "mechanics",
    difficulty: "medium",
    tips: [
      "Mirages spawn next to other league content, to target farm you should use the Atlas Tree Points and Scarabs for your mechanic of choice and consider blocking anything you've already completed.",
    ],
  },

  // ── Mid-Game (18–26) ─────────────────────────────────────────────────────────

  {
    id: "achieve-ascension",
    number: 18,
    name: "Achieve Ascension",
    steps: [
      "Use the Ascendancy Device in the Labyrinth",
      "Use the Ascendancy Device in the Cruel Labyrinth",
      "Use the Ascendancy Device in the Merciless Labyrinth",
      "Use the Ascendancy Device in the Eternal Labyrinth",
      "Gain a Bloodline Class",
    ],
    category: "campaign",
    difficulty: "easy",
    stepHints: {
      4: ["Refer to the Seized Strength challenge for info on all the locations"],
    },
    tips: [
      "Normal progression, this is just getting all of your ascendancy points and doing a boss with a Bloodline attached.",
    ],
  },
  {
    id: "potent-premonitions",
    number: 19,
    name: "Potent Premonitions",
    steps: [
      "Currency item (0/20)",
      "Gem (0/10)",
      "Two-Implicit Unique item (0/3)",
      "Six-Linked Item (0/2)",
    ],
    requires: 3,
    category: "crafting",
    difficulty: "medium",
    tips: [
      "Faustus makes this easy enough. It's three of four so you can skip one.",
    ],
  },
  {
    id: "peddlers-produce-2",
    number: 20,
    name: "Peddler's Produce II",
    steps: [
      "Unique Item",
      "Orb of Fusing",
      "Regal Orb",
      "Item with Influence",
    ],
    category: "crafting",
    difficulty: "easy",
    stepHints: {
      0: [
        "You can vendor three of any non-corrupted Unique Item in order to get a fresh copy back with new rolls",
      ],
      1: ["Vendor a six-link item"],
      2: [
        "Vendor a full set of rare items either IDed or otherwise with a minimum level of 75",
        "Vendor three rares with identical names at 20% quality or higher",
      ],
      3: [
        "Vendor an influenced amulet (not an onyx) and a gem of each colour (not white)",
        "Vendor an influenced Iron Ring and any colour gem",
        "Vendor any Normal Rarity Influenced Boots with an Augmentation Orb and a Quicksilver Flask",
        "Vendor any Normal Rarity Influenced Weapon, Rustic Sash and a Whetstone (adds Increased Physical Damage)",
        "Vendor any Normal Rarity Influenced Weapon, Chain Belt and a Whetstone (adds Increased Spell Damage)",
      ],
    },
  },
  {
    id: "lethal-leaders",
    number: 21,
    name: "Lethal Leaders",
    steps: [
      "Uber Atziri",
      "Izaro",
      "Abyssal Lich",
      "Omnitect",
      "Vox Twins",
      "K'tash, Ghorr or Beidat",
      "Medved, Vorana or Uhtred",
      "The Black Knight, Admiral Valerius or Sasan",
    ],
    requires: 6,
    category: "boss",
    difficulty: "medium",
    stepHints: {
      0: ["Running a set of Mortal Fragments will always meet the level requirement"],
      1: [
        "Requires use of one of the Harvest offerings — Dedication to the Goddess buffs Traps, Tribute to the Goddess buffs Monsters, Gift to the Goddess buffs Izaro",
      ],
      2: [
        "Run Abyss in T14s or higher and get an Abyssal Depths",
        "Kurgal, the Blackblooded the lich found in Delve does not count towards this challenge",
      ],
      3: ["You can simply buy a Chronicle of Atzoatl with the Temple Apex unlocked at level 80 or higher for this"],
      4: ["Heist content"],
      5: ["Beyond bosses, fairly easy to have happen by just using a beyond tree"],
      6: ["Expedition Logbook bosses, you can just buy Logbooks which force these"],
      7: [
        "The Black Knight can appear in any map that has ore spawn on it in place of an ore node, simply spam maps with them at a high level",
        "Admiral Valerius is a random encounter that can happen to any deployed shipment in Kingsmarch",
        "Sasan is a random encounter that can happen to any deployed mappers in Kingsmarch",
      ],
    },
    tips: [
      "This is a direct copy of last league's. If you don't run Heist they are a very obvious skip and Kingsmarch is much more RNG reliant than the others making that a good second option for skipping.",
    ],
  },
  {
    id: "coveted-currency",
    number: 22,
    name: "Coveted Currency",
    steps: [
      "Coin of Knowledge (0/5)",
      "Coin of Power (0/5)",
      "Coin of Skill (0/5)",
      "Coin of Restoration (0/5)",
      "Coin of Desecration (0/5)",
      "Volatile Vaal Orb (0/5)",
      "Sinistral or Dextral Catalyst (0/20)",
      "Any Crystallised Rancour Craft (0/3)",
      "Essence of Desolation (0/3)",
      "Honoured, Sacred or Miraged Incubator (0/10)",
      "Refracting Fog (0/5)",
    ],
    requires: 7,
    category: "mechanics",
    difficulty: "medium",
    stepHints: {
      0: ["Moderate"],
      1: ["Moderate"],
      2: ["Moderate"],
      3: ["Cheap"],
      4: ["Cheap"],
      5: ["Somewhat expensive"],
      6: ["Moderate"],
      7: ["Cheap"],
      8: ["Cheap"],
      9: ["Honoured are cheap"],
      10: ["Moderate"],
    },
    tips: [
      "This is the new content, the quantities might give some idea of rarity but we'll see. It's likely this ends up as a currency sink but it's only 7 of 11 at least.",
    ],
  },
  {
    id: "remarkable-realms",
    number: 23,
    name: "Remarkable Realms",
    steps: [
      "Vaults of Atziri",
      "Maelström of Chaos",
      "The Coward's Trial",
      "Acton's Nightmare",
      "Poorjoy's Asylum",
      "Mao Kun",
      "Oba's Cursed Trove",
      "Olmec's Sanctum",
      "Death and Taxes",
      "Whakawairua Tuahu",
      "The Vinktar Square",
      "Caer Blaidd, Wolfpack's Den",
      "The Putrid Cloister",
      "Hallowed Ground",
      "The Twilight Temple",
      "Pillars of Arun",
      "Doryani's Machinarium",
    ],
    category: "atlas",
    difficulty: "hard",
    stepHints: {
      10: ["Vendor Agnerod North, Agnerod East, Agnerod South and Agnerod West to get this map back"],
      16: ["You probably want to try and find a group to split the cost for this"],
    },
    tips: [
      "This is all the maps and there's no more scouting reports which means this one is a bit of a stinker compared to the last few leagues.",
      "Unique Maps need you to be able to see them on the Atlas to open them even if you have the map item.",
    ],
  },
  {
    id: "succinct-scarabs",
    number: 24,
    name: "Succinct Scarabs",
    steps: [
      "Cartography (0/30)",
      "Divination (0/30)",
      "Titanic (0/30)",
      "Bestiary (0/30)",
      "Betrayal (0/30)",
      "Delve (0/30)",
      "Incursion (0/30)",
      "Anarchy (0/30)",
      "Domination (0/30)",
      "Essence (0/30)",
      "Strongbox (0/30)",
      "Torment (0/30)",
      "Influence (0/30)",
      "Abyss (0/30)",
      "Beyond (0/30)",
      "Blight (0/30)",
      "Breach (0/30)",
      "Delirium (0/30)",
      "Expedition (0/30)",
      "Harvest (0/30)",
      "Kalguuran (0/30)",
      "Legion (0/30)",
      "Ritual (0/30)",
      "Ultimatum (0/30)",
      "Misc (0/30)",
      "Horned (0/30)",
    ],
    requires: 8,
    category: "atlas",
    difficulty: "medium",
    tips: [
      "Assuming maximum slots, you can gain 5 progress towards this per map ran. This ends up around 48 maps baseline if you are not wasting any and you can reasonably be expected to get it passively if you run multiple mechanics across the league.",
    ],
  },
  {
    id: "glorious-gemcraft",
    number: 25,
    name: "Glorious Gemcraft",
    steps: [
      "Corrupt a gem to become either level 21 or 23% quality",
      "Use Gemcutter's Prisms (0/40)",
      "Have a total of 300% quality on all socketed gems",
      "Level an Exceptional Gem to level 3",
    ],
    requires: 3,
    category: "crafting",
    difficulty: "medium",
    stepHints: {
      0: [
        "Slam Vaal Orbs on Lv20 or 20% quality gems",
        "Use the Lapidary Lens for better odds (Alva Temples)",
      ],
      1: [
        "Two manually qualitied to 20% gems, this is just a currency sink",
        "You can vendor any single 20% quality gem or set of gems with 40% quality total to get a GCP back",
        "Heist is a solid source of these",
      ],
      2: [
        "This is across every gear piece — simply get gear that would temporarily boost the quality up and you'll get the credit",
        "Fifteen 20% quality gems, not quite a full roster",
        "Quality of Socketed Gems is found in the Armoury Map now and can count as 6-8% per gem",
        "Enhance in a six link is +80% quality with Level 3 and +120% for Level 4",
        "Ashes of the Stars is +20-30% quality for all gems which will instantly finish the challenge if you simply have enough gems socketed",
      ],
      3: ["A lot of experience, you can use Facetor's Lenses to add a chunk of experience to a gem"],
    },
  },
  {
    id: "cross-contamination",
    number: 26,
    name: "Cross Contamination",
    steps: [
      "Defeat a Breach Marshal while Delirious",
      "Defeat a Stygian Spire while affected by a Shrine",
      "Defeat an Essence Monster that is Possessed",
      "Defeat a Blight Boss while affected by a Tempest",
      "Defeat a Delirium or Beyond Boss while in the Sacred Grove",
      "Defeat a Unique Map Boss that is Possessed while in a Ritual",
    ],
    requires: 4,
    category: "mechanics",
    difficulty: "medium",
    stepHints: {
      0: ["You can force breach bosses using the Atlas and you can force Delirium using Scarabs or the Atlas"],
      1: ["Abyss Scarab of Edifice can force a Stygian Spire to spawn and you can pair this with any forced Shrines from Atlas or Scarabs"],
      2: [
        "Essence Scarab of Calcification paired with Torment Scarab of Possession makes getting this straightforward, if expensively",
        "Torment Scarabs can force extra tormented spirits in general as can the Atlas",
      ],
      3: [
        "Scarab of Radiant Storms spawns tempests",
        "Blightspawn on the Atlas Tree forces a blight lane to be all bosses",
      ],
      4: [
        "Luck based, stacking beyond and delirium at the same time probably gets you the best hopes",
        "You can use a Delirium Orb to force delirium for the entire map",
        "Delirium Scarab of Neuroses forces boss spawns, you can spam them in maps with 100% harvest chance and just rush to the harvest grove",
      ],
      5: [
        "This is literal, you need it to get Possessed while in the ritual itself",
        "There is a ritual that spawns Tormented Spirits and Scarabs for more in the wild",
        "Shore was removed this league so you can't abuse that this time around",
      ],
    },
    tips: [
      "Skipping the two Possessed ones is likely the best choice but only the Unique Map Boss one is really bad.",
    ],
  },

  // ── Late Game (27–35) ────────────────────────────────────────────────────────

  {
    id: "wishful-willing",
    number: 27,
    name: "Wishful Willing",
    steps: [
      "Wish for Augury",
      "Wish for Distant Horizons",
      "Wish for Foreknowledge",
      "Wish for Fortune",
      "Wish for Glittering",
      "Wish for Gold",
      "Wish for Horizons",
      "Wish for Jewels",
      "Wish for Knowledge",
      "Wish for Prosperity",
      "Wish for Pursuit",
      "Wish for Risk",
      "Wish for Rust",
      "Wish for Scarabs",
      "Wish for Skittering",
      "Wish for Strange Horizons",
      "Wish for Terror",
      "Wish for Treasures",
      "Wish for Trinkets",
      "Wish for Wealth",
    ],
    requires: 13,
    category: "mechanics",
    difficulty: "easy",
    stepHints: {
      0: ["Breaking the Astral Chain in the Mirage Area will reward a cache of Stacked Decks."],
      1: ["Breaking the Astral Chain in the Mirage Area will reward a cache of Maps."],
      2: ["100% more Divination Cards found in the Mirage Area."],
      3: ["Breaking the Astral Chain in the Mirage Area will reward a cache of Currency."],
      4: ["Skill and Support Gems found in Mirage Area will have a random amount of Quality."],
      5: ["Players in Mirage Area find 80% more Gold from slain Enemies."],
      6: ["100% more Maps found in the Mirage Area."],
      7: ["An additional Bronze, Silver, and Golden Jewel Cache will appear in the Mirage Area."],
      8: ["Players in Mirage Area gain 50% increased Experience."],
      9: ["Mirage Area will contain an additional fountain of wealth."],
      10: ["Enemies in the Mirage Area have a 4% chance to release a Golden Volatile on death."],
      11: ["Mirage Area will contain 12 additional packs of difficult and rewarding monsters."],
      12: ["Map Boss of the Mirage Area will be accompanied by Ridan, of the Afarud."],
      13: ["80% more Scarabs found in the Mirage Area."],
      14: ["Breaking the Astral Chain in the Mirage Area will reward a cache of Scarabs."],
      15: ["Breaking the Astral Chain in the Mirage Area will reward a Unique Map."],
      16: ["Map Boss of the Mirage Area will be accompanied by a Pinnacle Atlas Boss from The Feared."],
      17: ["80% increased Rarity of items found in the Mirage Area."],
      18: ["Jewellery found in Mirage Area will instead drop as Jewels.", "Breaking the Astral Chain in the Mirage Area will reward Rare Jewellery."],
      19: ["100% more Currency found in the Mirage Area."],
    },
    tips: [
      "This is very trivial, simply select differing mirage wishes whenever you see them. You don't even need to go in or complete the mirage.",
    ],
  },
  {
    id: "seized-strength",
    number: 28,
    name: "Seized Strength",
    steps: [
      "The Trialmaster",
      "The King in the Mists",
      "Oshabi",
      "Catarina",
      "Aul",
      "Olroth",
      "Lycia",
      "Farrul",
      "Simulacrum",
      "It That Was Tul and It That Was Esh",
      "Saresh of the Weeping Black",
    ],
    requires: 7,
    category: "boss",
    difficulty: "medium",
    stepHints: {
      0: [
        "For the Chaos Bloodline, defeat The Trialmaster in any map of Area Level 81 or higher through Ultimatums",
        "Can be forced using an Ultimatum Scarab of Dueling",
      ],
      1: ["For the Nameless Bloodline, defeat The King in the Mists using An Audience With The King in the map device"],
      2: ["For the Oshabi Bloodline, defeat Oshabi, Avatar of the Grove using a Sacred Blossom in the map device"],
      3: ["For the Catarina Bloodline, defeat Catarina, Master of Undeath by using a Syndicate Medallion"],
      4: [
        "For the Aul Bloodline, defeat Aul in Delve at a depth of 130 or deeper",
        "The deeper you are the higher your chances",
        "You can presumably buy a taxi for this",
      ],
      5: [
        "For the Olroth Bloodline, defeat Olroth, Origin of the Fall in an Expedition Logbook with Knights of the Sun at Area Level 81 or higher",
        "Logbooks can force bosses, you should get one of those if you aren't farming expedition and want this",
      ],
      6: [
        "For the Lycia Bloodline, defeat Lycia, Herald of the Scourge in the Forbidden Sanctum",
        "This is just completing a Forbidden Tome, doesn't seem to immediately have an area level requirement",
      ],
      7: ["For the Farrul Bloodline, defeat Farrul, First of the Plains in the Menagerie by using a Farric Tiger Alpha to open a portal to his fight"],
      8: [
        "For the Delirious Bloodline by completing a Simulacrum",
        "This is all 15 waves, this is actually rather hard for the vast majority of builds. You might want a carry.",
      ],
      9: [
        "For the Breachlord Bloodline, defeat It That Was Tul and It That Was Esh in a breach fortress",
        "Hivebrain Gland forces this encounter to spawn",
      ],
      10: [
        "The new Mirage boss",
        "Availability has yet to be determined, there are no new fragments so this might be rarer than some of the others",
      ],
    },
    tips: [
      "Engage with the recent bloodlines mechanic, nothing special and you can very much choose your own poison.",
      "You can buy carries for this but most of the bosses aren't too bad. Simulacrum and Lycia are obvious skip choices as they are very specific content with specific build requirements.",
    ],
  },
  {
    id: "atlas-astrolabes",
    number: 29,
    name: "Atlas Astrolabes",
    steps: [
      "Templar Astrolabe (0/30)",
      "Fruiting Astrolabe (0/30)",
      "Lightless Astrolabe (0/30)",
      "Grasping Astrolabe (0/30)",
      "Nameless Astrolabe (0/30)",
      "Fungal Astrolabe (0/30)",
      "Chaotic Astrolabe (0/30)",
      "Enshrouded Astrolabe (0/30)",
      "Timeless Astrolabe (0/30)",
      "Runic Astrolabe (0/30)",
      "Prospecting Astrolabe (0/30)",
    ],
    requires: 4,
    category: "atlas",
    difficulty: "medium",
    tips: [
      "Astrolabes drop from the Memory Chain bosses and everywhere on the Atlas after completing Zana's three memory chains.",
      "This is simply completing Tier 14 or higher maps which makes it very mild realistically and comes out at 120 maps total.",
      "Astrolabe drop rates are nowhere close to being accessible right now so you should be prepared to currency dump to get this done.",
    ],
  },
  {
    id: "tyrannical-tiers",
    number: 30,
    name: "Tyrannical Tiers",
    steps: [
      "Reach a total of 8,000 Map Tiers completing Maps",
    ],
    category: "atlas",
    difficulty: "medium",
    tips: [
      "This is just 500 maps from a nil state. If you are doing full atlas completion you will have knocked out at least a fifth of this before you have to even think about it.",
      "No quantity or rarity reqs means you can just blast it out with normal rarity maps too.",
    ],
  },
  {
    id: "magnificent-memories",
    number: 31,
    name: "Magnificent Memories",
    steps: [
      "Complete Rare Originator Influenced maps with a total of 2,500% Item Quantity",
    ],
    category: "atlas",
    difficulty: "medium",
    tips: [
      "T16.5s are (intended to be) the new de facto endgame grind and have had the worst mods removed, 2,500% item quantity is under 50 moderately rolled maps.",
      "As there's no actual requirements, this can become 'easy' if you simply run very basic maps, you'll just take longer.",
    ],
  },
  {
    id: "sandswept-survivor",
    number: 32,
    name: "Sandswept Survivor",
    steps: [
      "Break 150 Astral Chains in Mirages of Maps that are Rare, at least Tier 14 and have at least 100% Item Quantity",
    ],
    category: "mechanics",
    difficulty: "medium",
    tips: [
      "This is simply engaging with the new Mirage mechanic in any capacity after hitting Tier 14 on decently juiced maps.",
      "Breaking Astral Chains is simply killing the three rare monsters in a circle around a large chain. They can wander off which is awkward but it's just 'kill rares'.",
    ],
  },
  {
    id: "eldritch-evocation",
    number: 33,
    name: "Eldritch Evocation",
    steps: [
      "Defeat Witnessed Map Bosses (0/100)",
      "Activate Eldritch Altars (0/200)",
    ],
    requires: 1,
    category: "atlas",
    difficulty: "medium",
    stepHints: {
      0: [
        "Destructive Play might count",
        "Elderslayer rotas should count as two putting this at 50 maps which has good synergy with the GGG challenge",
      ],
    },
    tips: [
      "Astrolabe synergistic farming challenge. Altars you can get a lot of per map so despite the higher number it is probably better than maven witnessing.",
    ],
  },
  {
    id: "vaulted-valuables",
    number: 34,
    name: "Vaulted Valuables",
    steps: [
      "Currency (0/5)",
      "Unique (0/5)",
      "Gem (0/5)",
      "Fragment (0/5)",
      "Map (0/5)",
    ],
    requires: 3,
    category: "mechanics",
    difficulty: "medium",
    tips: [
      "This looks like at minimum 25 full sets of astrolabe maps, this might end up rather grind heavy but we'll see as the league starts.",
      "This is functionally a currency dump. Each quadrant has multiple outcomes which seem to be biased, Uniques will probably be easiest to accomplish.",
    ],
  },
  {
    id: "instigative-invitations",
    number: 35,
    name: "Instigative Invitations",
    steps: [
      "Screaming",
      "Incandescent",
      "The Elderslayers",
      "The Feared",
      "The Forgotten",
      "The Formed",
      "The Remembered",
      "The Twisted",
    ],
    category: "boss",
    difficulty: "hard",
    stepHints: {
      0: ["The Eater of Worlds"],
      1: ["The Searing Exarch"],
      2: ["Al-Hezmin, the Hunter", "Baran, the Crusader", "Drox, the Warlord", "Veritania, the Redeemer"],
      3: [
        "The Shaper",
        "The Elder",
        "Cortex",
        "Sirus — Set of Elderslayer Crests",
        "Incarnation of Dread — Echo of Reverence boss, itemised memories exist now so this should be less dreadful",
      ],
      4: [
        "Rewritten Distant Memory",
        "Augmented Distant Memory",
        "Altered Distant Memory",
        "Twisted Distant Memory",
        "Very good gold returns for time investment, decent chance of Cortex and a very low chance of jackpot rings",
      ],
      5: [
        "Lair of the Hydra Map",
        "Maze of the Minotaur Map",
        "Forge of the Phoenix Map",
        "Pit of the Chimera Map",
        "Historically, shaper sets mostly cover the cost of the run and Mavens generated will be pure profit",
      ],
      6: [
        "The Neglected Flame in Courtyard of Wasting",
        "The Cardinal of Fear in Chambers of Impurity",
        "The Deceitful God in Theatre of Lies",
        "This is an invitation containing all of the penultimate memory bosses, they are pretty bad to farm but you only need to do it once",
        "Itemised memories should make this much more viable on trade leagues",
      ],
      7: [
        "The Purifier",
        "The Constrictor",
        "The Enslaver",
        "The Eradicator",
        "Using a Blessed Orb can reroll which of the guardians a map has as of 3.28",
        "Selling the fragments generally easily covers the cost of the maps",
      ],
    },
    tips: [
      "Normal invitation challenge, nothing remarkable and doesn't need a notable build since it's just four mods with no quantity so you can roll until you get a baby invitation.",
    ],
  },

  // ── Endgame (36–40) ──────────────────────────────────────────────────────────

  {
    id: "nightmare-nemeses",
    number: 36,
    name: "Nightmare Nemeses",
    steps: [
      "Abomination Map",
      "Citadel Map",
      "Fortress Map",
      "Sanctuary Map",
      "Ziggurat Map",
    ],
    requires: 4,
    category: "atlas",
    difficulty: "medium",
    tips: [
      "The rebranded T17s, this should be easier than previous leagues. They are still basically the same thing despite being downgraded to Tier 16s.",
      "Using a Scarab of Stability can allow for a lot of extra breathing room as it stops portals being consumed.",
      "The Scarab of the Sinistral and Scarab of the Dextral disable Suffixes and buff Prefixes (or vice versa) — it might be viable for rolling carefully to hit 175% IIQ.",
    ],
  },
  {
    id: "weeping-warlords-warfare",
    number: 37,
    name: "Weeping Warlords Warfare",
    steps: [
      "Without being affected by Astral Chains",
      "Without being affected by Festering Souls",
      "Without being hit by any Gangrenous Mass explosions",
      "Without being hit by Charged Soul Slam",
    ],
    requires: 3,
    category: "boss",
    difficulty: "hard",
    tips: [
      "It's a conditional run of the new boss accessed via using The Black Barya on the Atlas. The drop seems fairly rare and the fight has a chase unique which means the pricing is unlikely to be reasonable.",
      "As is generally the case, the higher your DPS the lower your time to make mistakes is.",
    ],
  },
  {
    id: "tremendous-tempests",
    number: 38,
    name: "Tremendous Tempests",
    steps: [
      "Slay the Map Bosses of 75 Maps that are affected by an Atlas Astrolabe while they are Rare and Tier 16 with at least 150% Item Quantity",
    ],
    category: "atlas",
    difficulty: "hard",
    tips: [
      "Astrolabes are disgustingly scarce compared to what was expected and you will average maybe one per two hundred maps. You are likely to spend several divines finishing this up with current prices.",
    ],
  },
  {
    id: "uber-undertaking",
    number: 39,
    name: "Uber Undertaking",
    steps: [
      "Sirus, Awakener of Worlds",
      "The Elder",
      "The Maven",
      "The Searing Exarch",
      "The Eater of Worlds",
      "High Templar Venarius",
      "The Shaper",
      "Incarnation of Dread",
      "Incarnation of Fear",
      "Incarnation of Neglect",
    ],
    requires: 5,
    category: "boss",
    difficulty: "hard",
    tips: [
      "This is four of the seven uber boss variants, if you have a boss killer this should be fine, otherwise you can buy the clears.",
      "Shaper and Cortex are the most reasonable to self-complete with the others varying wildly by your build.",
      "All of the fights have lingering damage over time that lasts the entire fight which makes high DPS crucial.",
    ],
  },
  {
    id: "gallant-grinding-goals",
    number: 40,
    name: "Gallant Grinding Goals",
    steps: [
      "Reach Level 100",
      "Use the Divine Font in the Endgame Labyrinth (0/50)",
      "Complete Tier 16 Rare Maps with Scarabs (0/1,000)",
      "Complete Shaper, Elder, Conqueror or Memory Guardian Maps with at least 100% Item Quantity (0/50)",
      "Defeat Rare monsters with at least 4 Modifiers while in Tier 16 Maps (0/250)",
      "Defeat Map Bosses in Mirages of Rare Maps that are at least Tier 16 and have at least 80% Item Quantity (0/100)",
    ],
    requires: 4,
    category: "misc",
    difficulty: "endgame",
    stepHints: {
      0: [
        "Buying Five Way runs",
        "Coward's Trial is a solid option for XP",
        "Omen of Amelioration stops you losing all your XP on dying, but only once per area — do NOT use in an invitation or uber boss where XP loss cannot happen anyway",
        "Abyss with a basic tree that grabs all nodes except Depths is decent and fairly safe for consistent XP per map",
      ],
      1: ["Running Gift to the Goddess is six uses of the font which would make this eight runs total", "Getting Darkshrines can allow for an additional usage of the font"],
      2: ["It's 1,000 maps using scarabs. T16.5s are still T16s"],
      3: ["Not terribly hard, Maven rotas are always profit and this is simply running around 13 of those from a nil state"],
      4: ["Rather easy realistically, Beasts, Essences, Breach and Nemesis can speed this up a lot"],
      5: ["You can presumably run fully miraged maps to force this"],
    },
    tips: [
      "As is seemingly tradition now, this is actually very easy.",
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

export interface RouteChallengeRef {
  id: string;
  number: number;
}

/** Boss name (as it appears in `kill` route fragments) → challenge(s) completed. */
export const BOSS_CHALLENGE_MAP: Record<string, RouteChallengeRef[]> = {
  // Act Adversaries I (#4) — Acts 1–5 bosses
  "Merveil, the Siren":          [{ id: "act-adversaries-1", number: 4 }],
  "Vaal Oversoul":                [{ id: "act-adversaries-1", number: 4 }],
  "Dominus, High Templar":        [{ id: "act-adversaries-1", number: 4 }],
  "Malachai, The Nightmare":      [{ id: "act-adversaries-1", number: 4 }],
  // Kitava appears twice: first = C4 (Act 5), second = C7 (Act 10)
  "Kitava, the Insatiable":       [{ id: "act-adversaries-1", number: 4 },
                                   { id: "act-adversaries-2", number: 7 }],
  // Act Adversaries II (#7) — Acts 6–10 bosses (Kitava handled above)
  "Tsoagoth, The Brine King":     [{ id: "act-adversaries-2", number: 7 }],
  "Arakaali, Spinner of Shadows": [{ id: "act-adversaries-2", number: 7 }],
  "Lunaris, Eternal Moon":        [{ id: "act-adversaries-2", number: 7 }],
  "Solaris, Eternal Sun":         [{ id: "act-adversaries-2", number: 7 }],
  "The Depraved Trinity":         [{ id: "act-adversaries-2", number: 7 }],
  // Uber Undertaking (#39) — pinnacle bosses
  "The Eater of Worlds":          [{ id: "uber-undertaking", number: 39 }],
  "The Searing Exarch":           [{ id: "uber-undertaking", number: 39 }],
  "The Maven":                    [{ id: "uber-undertaking", number: 39 }],
  "The Uber Elder":               [{ id: "uber-undertaking", number: 39 }],
};

/** Ascend version → challenge completed. */
export const ASCEND_CHALLENGE_MAP: Record<string, RouteChallengeRef> = {
  normal:     { id: "achieve-ascension", number: 18 },
  cruel:      { id: "achieve-ascension", number: 18 },
  merciless:  { id: "achieve-ascension", number: 18 },
  eternal:    { id: "achieve-ascension", number: 18 },
};
