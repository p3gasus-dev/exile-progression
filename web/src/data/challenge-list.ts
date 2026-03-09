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
  tips?: string[];
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
      "Right-click the orb then right-click any item in your inventory or stash.",
      "All four orbs drop commonly in Act 1–2 — no specific target needed.",
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
    tips: [
      "Basic league mechanic interactions — completable in Act 1.",
      "Break the Astral Chain by killing the 3 rare monsters in a circle around it.",
    ],
  },
  {
    id: "peddlers-produce-1",
    number: 3,
    name: "Peddler's Produce I",
    steps: [
      "Vendor recipe: any Life or Mana Flask",
      "Vendor recipe: any Hybrid Flask",
      "Vendor recipe: Ruby, Topaz, or Sapphire Ring",
      "Vendor recipe: Agate, Turquoise, or Citrine Amulet",
    ],
    category: "crafting",
    difficulty: "easy",
    tips: [
      "Flask: vendor three of the same type of Life or Mana Flask to upgrade to the next tier.",
      "Hybrid Flask: vendor a Life Flask + Mana Flask + Orb of Fusing.",
      "Ruby/Topaz/Sapphire Ring: vendor an Iron Ring + any Skill Gem.",
      "Agate/Turquoise/Citrine Amulet: vendor two of Amber/Lapis/Jade Amulet + Orb of Transmutation.",
    ],
  },
  {
    id: "act-adversaries-1",
    number: 4,
    name: "Act Adversaries I",
    steps: [
      "Defeat Merveil, the Twisted (Act 1)",
      "Defeat Vaal Oversoul (Act 2)",
      "Defeat Dominus, Ascendant (Act 3)",
      "Defeat Malachai, The Nightmare (Act 4)",
      "Defeat Kitava, the Insatiable (Act 5)",
    ],
    category: "campaign",
    difficulty: "easy",
    tips: [
      "Completely normal compulsory progression.",
      "Cap resistances as you go — each boss has a primary damage type to prepare for.",
      "Kitava (Act 5) imposes a −30% resistance penalty on kill.",
    ],
  },
  {
    id: "beneficial-bounties",
    number: 5,
    name: "Beneficial Bounties",
    steps: [
      "Complete The Way Forward (Act 2)",
      "Complete Through Sacred Ground (Act 2)",
      "Complete Victario's Secrets (Act 3)",
      "Complete An Indomitable Spirit (Act 4)",
    ],
    category: "campaign",
    difficulty: "easy",
    tips: [
      "The Way Forward (Act 2): turn in to Eramir in Act 1 for a passive point.",
      "Through Sacred Ground (Act 2): obtain the Golden Hand.",
      "An Indomitable Spirit (Act 4): save Deshret's spirit — requires clearing Kaom and Daresso first.",
    ],
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
      "Basic interaction with the Mirage league mechanic.",
      "Break Astral Chains by killing the 3 rare monsters surrounding each chain.",
    ],
  },
  {
    id: "act-adversaries-2",
    number: 7,
    name: "Act Adversaries II",
    steps: [
      "Defeat Tsoagoth, The Brine King (Act 6)",
      "Defeat Arakaali, Spinner of Shadows (Act 7)",
      "Defeat Lunaris, Eternal Moon (Act 8)",
      "Defeat Solaris, Eternal Sun (Act 8)",
      "Defeat The Depraved Trinity (Act 9)",
      "Defeat Kitava, the Insatiable (Act 10)",
    ],
    category: "campaign",
    difficulty: "easy",
    tips: [
      "Completely normal compulsory progression.",
      "Kitava (Act 10) applies a second −30% resistance penalty — −60% total from campaign.",
      "Cap all resistances to 75% before entering maps.",
    ],
  },
  {
    id: "helpful-hideaways",
    number: 8,
    name: "Helpful Hideaways",
    steps: [
      "Visit Aspirants' Plaza (Act 3)",
      "Visit Menagerie (/menagerie)",
      "Visit Mine Encampment (/delve)",
      "Visit Forbidden Sanctum (/sanctum)",
      "Visit Kingsmarch (/kingsmarch)",
      "Visit Rogue Harbour (/heist)",
      "Visit Monastery of the Keepers (/monastery)",
    ],
    category: "misc",
    difficulty: "easy",
    tips: [
      "Use /menagerie, /delve, /sanctum, /kingsmarch, /heist, /monastery from any safe zone.",
      "Kingsmarch unlocks in the Epilogue via Johan in Kauri Shores.",
      "Rogue Harbour unlocks by using a Rogue's Marker any time after entering Act 6.",
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
    tips: [
      "Essences, Strongboxes, and Shrines are the most straightforward — pick those three.",
      "Skip Possessed Monsters — it's awkward (don't spec Speaker of the Dead if going for it).",
      "Atlas passive points can guarantee at least 1 of each mechanic per map.",
    ],
  },
  {
    id: "atlas-additions",
    number: 10,
    name: "Atlas Additions",
    steps: [
      "Abysses (0/30)",
      "Expeditions (0/30)",
      "Harvest Plots (0/100)",
      "Legion (0/30)",
      "Smuggler's Caches (0/30)",
      "Delirium Mirrors (0/30)",
      "Ultimatum Waves (0/200)",
      "Blights (0/30)",
      "Rituals (0/100)",
      "Ore Deposits (0/30)",
      "Unstable Breaches or Hives (0/30)",
    ],
    requires: 5,
    category: "atlas",
    difficulty: "easy",
    tips: [
      "Normal content completion challenge — pick 5 mechanics you naturally run.",
      "Mirages add +1 to each mechanic they duplicate inside, speeding up progress.",
      "Harvest (100) and Ritual (100) give multiple per map; Ultimatum (200) is slowest.",
    ],
  },
  {
    id: "master-missives",
    number: 11,
    name: "Master Missives",
    steps: [
      "Niko Missions in Tier 11+ Maps (0/30)",
      "Einhar Missions in Tier 11+ Maps (0/30)",
      "Jun Missions in Tier 11+ Maps (0/30)",
      "Alva Missions in Tier 11+ Maps (0/30)",
    ],
    requires: 2,
    category: "atlas",
    difficulty: "easy",
    tips: [
      "Spec into 2 masters on the Atlas for 100% mission chance, or use their Scarabs.",
      "Niko (Sulphite nodes) and Einhar (Beasts) missions are the fastest to complete.",
      "Red maps (T11+) only — no specific tier beyond that.",
    ],
  },
  {
    id: "sacred-sigils",
    number: 12,
    name: "Sacred Sigils",
    steps: [
      "Djinn Sigils of Navira (0/50)",
      "Djinn Sigils of Kelari (0/50)",
      "Djinn Sigils of Ruzhan (0/50)",
    ],
    category: "mechanics",
    difficulty: "medium",
    tips: [
      "New Mirage content — requires roughly 150+ Mirage encounters minimum.",
      "Sigils are granted via specific Mirage Wishes — prioritise Sigil-granting wishes.",
    ],
  },
  {
    id: "cartographers-courage",
    number: 13,
    name: "Cartographer's Courage",
    steps: [
      "Complete a Rare Map of each Tier from T1 to T16",
    ],
    category: "atlas",
    difficulty: "easy",
    tips: [
      "Run all maps as Rare from T1 onward so you don't need to backfill lower tiers.",
      "If you skipped low tiers, you may need to buy them from trade — very cheap.",
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
      "Crafting Bench options also count — easy to complete passively while playing.",
      "You can skip 4 of the 19 — skip Exalted, Divine, Sacred, and Annulment if scarce.",
      "Essentially free if you are playing normally and going for challenge rewards.",
    ],
  },
  {
    id: "maniacal-monsters",
    number: 15,
    name: "Maniacal Monsters",
    steps: [
      "Defeat 200 Map Bosses in Rare Maps with at least 80% Item Quantity",
    ],
    category: "atlas",
    difficulty: "easy",
    tips: [
      "This is just normal mapping — Alch and go to hit 80%+ IIQ.",
      "Destructive Play atlas passive helps. Maps with multiple bosses count each boss.",
    ],
  },
  {
    id: "deadly-deeds",
    number: 16,
    name: "Deadly Deeds",
    steps: [
      "Abyssal Depths (0/5) at area level 81+",
      "Logbooks with 10+ Remnants (0/5) at area level 81+",
      "T4 Harvest Seeds (0/5) at area level 81+",
      "Legion 25-reward Domains (0/3) at area level 81+",
      "4-wing Blueprints (0/5) at area level 81+",
      "Simulacrum Waves (0/60) at area level 81+",
      "Full Ultimatums (0/10) at area level 81+",
      "Blighted or Blight-Ravaged Maps (0/5) at area level 81+",
      "Ritual + Vessel (0/10) at area level 81+",
      "Atlas Runner rewards (0/30) at area level 81+",
      "Hive Fortresses or Breach Marshals (0/10) at area level 81+",
    ],
    requires: 5,
    category: "mechanics",
    difficulty: "medium",
    tips: [
      "Abyssal Depths, T4 Harvest Seeds, and Blighted/Blight-Ravaged Maps are the easiest picks.",
      "Blight strategy: Clear Oil (slow) + ring anoints for freeze/burn towers. Avoid immune-to-stun and cannot-be-slowed mods.",
      "Skip Simulacrum (60 waves) and 4-wing Blueprints unless your build is strong.",
      "Ritual+Vessel (10) requires significant Splinter farming to fill vessels — a big undertaking.",
    ],
  },
  {
    id: "empowered-encounters",
    number: 17,
    name: "Empowered Encounters",
    steps: [
      "Abysses in Mirages (0/15)",
      "Expeditions in Mirages (0/15)",
      "Harvest Plots in Mirages (0/50)",
      "Legion in Mirages (0/15)",
      "Smuggler's Caches in Mirages (0/15)",
      "Delirium Mirrors in Mirages (0/15)",
      "Ultimatum Waves in Mirages (0/50)",
      "Blights in Mirages (0/15)",
      "Rituals in Mirages (0/25)",
      "Ore Deposits in Mirages (0/15)",
      "Unstable Breaches or Hives in Mirages (0/15)",
    ],
    requires: 4,
    category: "mechanics",
    difficulty: "medium",
    tips: [
      "Block all non-target content on the Atlas to concentrate Mirages on your chosen 4 mechanics.",
      "Mirages spawn next to other league content — stack the mechanics you're farming.",
    ],
  },

  // ── Mid-Game (18–26) ─────────────────────────────────────────────────────────

  {
    id: "achieve-ascension",
    number: 18,
    name: "Achieve Ascension",
    steps: [
      "Use the Ascendancy Device in Normal Labyrinth",
      "Use the Ascendancy Device in Cruel Labyrinth",
      "Use the Ascendancy Device in Merciless Labyrinth",
      "Use the Ascendancy Device in Eternal Labyrinth",
      "Gain a Bloodline Class",
    ],
    category: "campaign",
    difficulty: "easy",
    tips: [
      "Check poelab.com for the daily layout and Izaro mechanics.",
      "Bloodline Class: see Seized Strength (#28) for all boss locations.",
      "Eternal Lab requires an Offering to the Goddess (drops from Trials in T6+ maps).",
    ],
  },
  {
    id: "potent-premonitions",
    number: 19,
    name: "Potent Premonitions",
    steps: [
      "Currency item div card turn-ins (0/20)",
      "Gem div card turn-ins (0/10)",
      "Two-Implicit Unique div card turn-ins (0/3)",
      "Six-Linked Item div card turn-ins (0/2)",
    ],
    requires: 3,
    category: "crafting",
    difficulty: "medium",
    tips: [
      "Faustus at Kingsmarch gives free div card draws — use him to progress this.",
      "Currency card turn-ins (20) are easiest — buy cheap currency div cards from trade.",
      "Skip the Six-Linked Item (2) turn-in unless you find those cards naturally.",
    ],
  },
  {
    id: "peddlers-produce-2",
    number: 20,
    name: "Peddler's Produce II",
    steps: [
      "Vendor recipe: a Unique Item",
      "Vendor recipe: an Orb of Fusing",
      "Vendor recipe: a Regal Orb",
      "Vendor recipe: an Item with Influence",
    ],
    category: "crafting",
    difficulty: "easy",
    tips: [
      "Unique: vendor three non-corrupted copies of any unique for a fresh rerolled copy.",
      "Orb of Fusing: vendor any six-linked item.",
      "Regal Orb: vendor a full rare set lv75+ (unidentified), or three identical rares at 20% quality.",
      "Influenced item: vendor an influenced amulet (not Onyx) + one gem of each colour (not white).",
    ],
  },
  {
    id: "lethal-leaders",
    number: 21,
    name: "Lethal Leaders",
    steps: [
      "Defeat Uber Atziri (level 80+)",
      "Defeat Izaro in Lab (Harvest Offering, level 80+)",
      "Defeat an Abyssal Lich (Abyss, level 80+)",
      "Defeat the Omnitect (Incursion, level 80+)",
      "Defeat the Vox Twins (Heist, level 80+)",
      "Defeat K'tash, Ghorr, or Beidat (Beyond, level 80+)",
      "Defeat Medved, Vorana, or Uhtred (Expedition Logbook, level 80+)",
      "Defeat The Black Knight, Admiral Valerius, or Sasan (Kingsmarch, level 80+)",
    ],
    requires: 6,
    category: "boss",
    difficulty: "medium",
    tips: [
      "Uber Atziri (Mortal Fragments), Abyssal Lich (T14+ Depths), Omnitect (Chronicle of Atzoatl) are most accessible.",
      "K'tash/Ghorr/Beidat: use a Beyond atlas tree — fairly easy to trigger.",
      "Izaro: use any Harvest offering (Dedication/Tribute/Gift to the Goddess) — each buffs the lab differently.",
      "Skip Heist (Vox Twins) and Kingsmarch (RNG-reliant) if not already engaging with them.",
    ],
  },
  {
    id: "coveted-currency",
    number: 22,
    name: "Coveted Currency",
    steps: [
      "Use Coin of Knowledge (0/5)",
      "Use Coin of Power (0/5)",
      "Use Coin of Skill (0/5)",
      "Use Coin of Restoration (0/5)",
      "Use Coin of Desecration (0/5)",
      "Use Volatile Vaal Orb (0/5)",
      "Use Sinistral or Dextral Catalyst (0/20)",
      "Craft via Crystallised Rancour (0/3)",
      "Use Essence of Desolation (0/3)",
      "Use Honoured, Sacred, or Miraged Incubator (0/10)",
      "Use Refracting Fog (0/5)",
    ],
    requires: 7,
    category: "mechanics",
    difficulty: "medium",
    tips: [
      "New Mirage content — quantities hint at rarity, actual drop rates unknown until league starts.",
      "Coins and Volatile Vaal Orbs drop from Mirages — complete these naturally.",
      "Catalysts (20) can be bought from trade if Mirage drops are insufficient.",
    ],
  },
  {
    id: "remarkable-realms",
    number: 23,
    name: "Remarkable Realms",
    steps: [
      "Complete Vaults of Atziri",
      "Complete Maelström of Chaos",
      "Complete The Coward's Trial",
      "Complete Acton's Nightmare",
      "Complete Poorjoy's Asylum",
      "Complete Mao Kun",
      "Complete Oba's Cursed Trove",
      "Complete Olmec's Sanctum",
      "Complete Death and Taxes",
      "Complete Whakawairua Tuahu",
      "Complete The Vinktar Square",
      "Complete Caer Blaidd",
      "Complete The Putrid Cloister",
      "Complete Hallowed Ground",
      "Complete The Twilight Temple",
      "Complete Pillars of Arun",
      "Complete Doryani's Machinarium",
    ],
    category: "atlas",
    difficulty: "hard",
    tips: [
      "Buy most unique maps from trade — they rarely drop naturally. No scouting reports this league.",
      "The Vinktar Square: vendor Agnerod North + East + South + West to receive the map.",
      "Doryani's Machinarium: find a group to split the cost — expensive to solo.",
      "You must be able to see the map on the Atlas to open it even if you have the item.",
    ],
  },
  {
    id: "succinct-scarabs",
    number: 24,
    name: "Succinct Scarabs",
    steps: [
      "Use Cartography Scarab (0/30) in T14+ Rare Maps",
      "Use Divination Scarab (0/30) in T14+ Rare Maps",
      "Use Titanic Scarab (0/30) in T14+ Rare Maps",
      "Use Bestiary Scarab (0/30) in T14+ Rare Maps",
      "Use Betrayal Scarab (0/30) in T14+ Rare Maps",
      "Use Delve Scarab (0/30) in T14+ Rare Maps",
      "Use Incursion Scarab (0/30) in T14+ Rare Maps",
      "Use Anarchy Scarab (0/30) in T14+ Rare Maps",
      "Use Domination Scarab (0/30) in T14+ Rare Maps",
      "Use Essence Scarab (0/30) in T14+ Rare Maps",
      "Use Strongbox Scarab (0/30) in T14+ Rare Maps",
      "Use Torment Scarab (0/30) in T14+ Rare Maps",
      "Use Influence Scarab (0/30) in T14+ Rare Maps",
      "Use Abyss Scarab (0/30) in T14+ Rare Maps",
      "Use Beyond Scarab (0/30) in T14+ Rare Maps",
      "Use Blight Scarab (0/30) in T14+ Rare Maps",
      "Use Breach Scarab (0/30) in T14+ Rare Maps",
      "Use Delirium Scarab (0/30) in T14+ Rare Maps",
      "Use Expedition Scarab (0/30) in T14+ Rare Maps",
      "Use Harvest Scarab (0/30) in T14+ Rare Maps",
      "Use Kalguuran Scarab (0/30) in T14+ Rare Maps",
      "Use Legion Scarab (0/30) in T14+ Rare Maps",
      "Use Ritual Scarab (0/30) in T14+ Rare Maps",
      "Use Ultimatum Scarab (0/30) in T14+ Rare Maps",
      "Use Misc Scarab (0/30) in T14+ Rare Maps",
      "Use Horned Scarab (0/30) in T14+ Rare Maps",
    ],
    requires: 8,
    category: "atlas",
    difficulty: "medium",
    tips: [
      "Max 5 progress per map — ~48 maps per scarab type at maximum slots.",
      "Pick scarab types you already have in stock or run naturally.",
      "Completable passively if you run multiple mechanics throughout the league.",
    ],
  },
  {
    id: "glorious-gemcraft",
    number: 25,
    name: "Glorious Gemcraft",
    steps: [
      "Corrupt a gem to level 21 or 23% quality",
      "Use 40 Gemcutter's Prisms",
      "Have 300% total gem quality socketed across all gear",
      "Level an Exceptional Gem to level 3",
    ],
    requires: 3,
    category: "crafting",
    difficulty: "medium",
    tips: [
      "Corrupt to lv21/23%: Vaal Orb a lv20 or 20% quality gem. Use Lapidary Lens (Alva temples) for better odds.",
      "300% quality: Ashes of the Stars (+20-30% per gem) instantly finishes this with enough gems socketed.",
      "GCP (40): vendor any 20% quality gem, or gems totalling 40% quality, to get one GCP back.",
      "Armoury Map mod adds +6-8% quality per gem and counts toward the 300% total.",
    ],
  },
  {
    id: "cross-contamination",
    number: 26,
    name: "Cross Contamination",
    steps: [
      "Defeat Breach Marshal while Delirious",
      "Defeat Stygian Spire while a Shrine is active",
      "Defeat an Essence Monster while Possessed",
      "Defeat Blight Boss while a Tempest is active",
      "Defeat a Delirium or Beyond Boss in Sacred Grove",
      "Defeat Unique Map Boss Possessed while in Ritual",
    ],
    requires: 4,
    category: "mechanics",
    difficulty: "medium",
    tips: [
      "Blight Boss + Tempest: Scarab of Radiant Storms + Blightspawn atlas node (forces all-boss lane).",
      "Breach Marshal + Delirium: force both with Atlas passives and Delirium Scarabs.",
      "Delirium Boss in Sacred Grove: Delirium Scarab of Neuroses forces boss spawns — run in Harvest maps.",
      "Skip Unique Map Boss Possessed in Ritual — Shore map removed this league, making it harder.",
    ],
  },

  // ── Late Game (27–35) ────────────────────────────────────────────────────────

  {
    id: "wishful-willing",
    number: 27,
    name: "Wishful Willing",
    steps: [
      "Choose Augury Wish",
      "Choose Distant Horizons Wish",
      "Choose Foreknowledge Wish",
      "Choose Fortune Wish",
      "Choose Glittering Wish",
      "Choose Gold Wish",
      "Choose Horizons Wish",
      "Choose Jewels Wish",
      "Choose Knowledge Wish",
      "Choose Prosperity Wish",
      "Choose Pursuit Wish",
      "Choose Risk Wish",
      "Choose Rust Wish",
      "Choose Scarabs Wish",
      "Choose Skittering Wish",
      "Choose Strange Horizons Wish",
      "Choose Terror Wish",
      "Choose Treasures Wish",
      "Choose Trinkets Wish",
      "Choose Wealth Wish",
    ],
    requires: 13,
    category: "mechanics",
    difficulty: "easy",
    tips: [
      "You don't even need to enter or complete the Mirage — just select the wish.",
      "13 of 20 means you can skip 7 — pick the wishes most useful for your build.",
    ],
  },
  {
    id: "seized-strength",
    number: 28,
    name: "Seized Strength",
    steps: [
      "Defeat Trialmaster (Ultimatum, lv81+)",
      "Defeat King in the Mists (Delirium, lv81+)",
      "Defeat Oshabi (Harvest, lv81+)",
      "Defeat Catarina (Betrayal Syndicate, lv81+)",
      "Defeat Aul (Delve, depth 130+)",
      "Defeat Olroth (Expedition Logbook, lv81+)",
      "Defeat Lycia (Sanctum, lv81+)",
      "Defeat Farrul (Beast Menagerie, lv81+)",
      "Complete Simulacrum (all 15 waves)",
      "Defeat It That Was Tul and Esh (Breach Fortress, lv81+)",
      "Defeat Saresh of the Weeping Black (lv81+)",
    ],
    requires: 7,
    category: "boss",
    difficulty: "medium",
    tips: [
      "Oshabi, Catarina, Farrul, and King in the Mists are the most accessible.",
      "Trialmaster: force with Ultimatum Scarab of Dueling. Aul: buy a taxi to Delve depth 130+.",
      "Skip Simulacrum (all 15 waves — very hard for most builds) and Lycia unless experienced with Sanctum.",
    ],
  },
  {
    id: "atlas-astrolabes",
    number: 29,
    name: "Atlas Astrolabes",
    steps: [
      "Complete 30x T14+ Maps in Templar region",
      "Complete 30x T14+ Maps in Fruiting region",
      "Complete 30x T14+ Maps in Lightless region",
      "Complete 30x T14+ Maps in Grasping region",
      "Complete 30x T14+ Maps in Nameless region",
      "Complete 30x T14+ Maps in Fungal region",
      "Complete 30x T14+ Maps in Chaotic region",
      "Complete 30x T14+ Maps in Enshrouded region",
      "Complete 30x T14+ Maps in Timeless region",
      "Complete 30x T14+ Maps in Runic region",
      "Complete 30x T14+ Maps in Prospecting region",
    ],
    requires: 4,
    category: "atlas",
    difficulty: "medium",
    tips: [
      "Astrolabes drop from Memory Chain bosses and everywhere after completing Zana's three chains.",
      "~120 total T14+ maps across 4 regions — very mild once you reach endgame.",
      "Pick 4 regions near each other on the Atlas to minimise travel.",
    ],
  },
  {
    id: "tyrannical-tiers",
    number: 30,
    name: "Tyrannical Tiers",
    steps: [
      "Reach a total of 8,000 Map Tiers completed",
    ],
    category: "atlas",
    difficulty: "medium",
    tips: [
      "~500 maps from zero; full Atlas completion knocks out about half passively.",
      "No IIQ or rarity requirement — run normal rarity maps if needed to grind it out.",
    ],
  },
  {
    id: "magnificent-memories",
    number: 31,
    name: "Magnificent Memories",
    steps: [
      "Complete Rare Originator-Influenced (T16.5) Maps with a total of 2,500% Item Quantity",
    ],
    category: "atlas",
    difficulty: "medium",
    tips: [
      "T16.5s (Originator maps) are the new endgame grind — worst mods removed.",
      "Under 50 moderately rolled maps — happens naturally as the core farming loop.",
    ],
  },
  {
    id: "sandswept-survivor",
    number: 32,
    name: "Sandswept Survivor",
    steps: [
      "Break 150 Astral Chains in Mirages of Rare T14+ Maps with at least 100% Item Quantity",
    ],
    category: "mechanics",
    difficulty: "medium",
    tips: [
      "Break Astral Chains by killing the 3 rare monsters in a circle around the chain.",
      "T14+ Rare maps with 100%+ IIQ (Alch+Chaos) are the baseline — happens naturally.",
      "Rares can wander off — kill them quickly before they stray from the chain.",
    ],
  },
  {
    id: "eldritch-evocation",
    number: 33,
    name: "Eldritch Evocation",
    steps: [
      "Defeat 100 Witnessed Map Bosses in Astrolabe-affected Maps",
      "Activate 200 Eldritch Altars in Astrolabe-affected Maps",
    ],
    requires: 1,
    category: "atlas",
    difficulty: "medium",
    tips: [
      "Eldritch Altars (200) are faster — multiple spawn per map.",
      "Elderslayer rotas count as two bosses each, putting Witnessed Bosses at ~50 maps.",
      "Requires Astrolabe-affected maps — get Astrolabes from Memory Chain bosses.",
    ],
  },
  {
    id: "vaulted-valuables",
    number: 34,
    name: "Vaulted Valuables",
    steps: [
      "Collect 5 Currency rewards from Memory Vaults",
      "Collect 5 Unique rewards from Memory Vaults",
      "Collect 5 Gem rewards from Memory Vaults",
      "Collect 5 Fragment rewards from Memory Vaults",
      "Collect 5 Map rewards from Memory Vaults",
    ],
    requires: 3,
    category: "mechanics",
    difficulty: "medium",
    tips: [
      "New content — at minimum ~25 full sets of Astrolabe maps required.",
      "Pick Currency, Fragment, and Map — most useful and likely most common reward types.",
    ],
  },
  {
    id: "instigative-invitations",
    number: 35,
    name: "Instigative Invitations",
    steps: [
      "Complete Screaming Invitation (Eater, 4+ mods)",
      "Complete Incandescent Invitation (Exarch, 4+ mods)",
      "Complete The Elderslayers (4 Conquerors, 4+ mods)",
      "Complete The Feared (Shaper/Elder/Cortex/Sirus/Dread, 4+ mods)",
      "Complete The Forgotten (4 Distant Memories, 4+ mods)",
      "Complete The Formed (4 Shaper Guardian Maps, 4+ mods)",
      "Complete The Remembered (3 Penultimate memory bosses, 4+ mods)",
      "Complete The Twisted (4 Elder Guardian Maps, 4+ mods)",
    ],
    category: "boss",
    difficulty: "hard",
    tips: [
      "4 modifiers only — no IIQ required, so roll for easy/cheap mods.",
      "The Formed (Shaper Guardian maps) historically covers run costs with Mavens generated.",
      "The Twisted: Blessed Orb rerolls which Elder Guardian a map has — reroll bad ones.",
      "The Feared includes Cortex/Sirus/Incarnation of Dread — itemised memories make this more viable on trade.",
    ],
  },

  // ── Endgame (36–40) ──────────────────────────────────────────────────────────

  {
    id: "nightmare-nemeses",
    number: 36,
    name: "Nightmare Nemeses",
    steps: [
      "Complete Abomination (T17, 175%+ IIQ)",
      "Complete Citadel (T17, 175%+ IIQ)",
      "Complete Fortress (T17, 175%+ IIQ)",
      "Complete Sanctuary (T17, 175%+ IIQ)",
      "Complete Ziggurat (T17, 175%+ IIQ)",
    ],
    requires: 4,
    category: "atlas",
    difficulty: "medium",
    tips: [
      "T17s (rebranded Nightmare maps) should be easier than previous leagues.",
      "Use a Scarab of Stability to prevent portals being consumed on disconnect.",
      "Roll maps to avoid the worst mods — 175% IIQ is achievable with moderate rolling.",
    ],
  },
  {
    id: "weeping-warlords-warfare",
    number: 37,
    name: "Weeping Warlords Warfare",
    steps: [
      "Defeat Saresh without being affected by Astral Chains",
      "Defeat Saresh without being affected by Festering Souls",
      "Defeat Saresh without being hit by any Gangrenous Mass explosions",
      "Defeat Saresh without being hit by Charged Soul Slam",
    ],
    requires: 3,
    category: "boss",
    difficulty: "hard",
    tips: [
      "New Mirage boss — rarity and difficulty unknown at league start.",
      "Pick the 3 avoidance conditions that match your build's mobility and defences.",
      "Higher DPS = less time to make mistakes. Burst the boss down quickly.",
    ],
  },
  {
    id: "tremendous-tempests",
    number: 38,
    name: "Tremendous Tempests",
    steps: [
      "Defeat Map Bosses in 75 T16 Rare Maps with Atlas Astrolabe and at least 150% Item Quantity",
    ],
    category: "atlas",
    difficulty: "medium",
    tips: [
      "This is just the new core endgame mapping loop after getting Voidstones.",
      "150%+ IIQ: Alch the map and target high-quantity mods.",
      "Combine with Magnificent Memories (#31) for efficiency — both need T16 maps.",
    ],
  },
  {
    id: "uber-undertaking",
    number: 39,
    name: "Uber Undertaking",
    steps: [
      "Defeat Sirus, Awakener of Worlds (level 85)",
      "Defeat The Elder (level 85)",
      "Defeat The Maven (level 85)",
      "Defeat The Searing Exarch (level 85)",
      "Defeat The Eater of Worlds (level 85)",
      "Defeat High Templar Venarius (level 85)",
      "Defeat The Shaper (level 85)",
      "Defeat Incarnation of Dread (level 85)",
      "Defeat Incarnation of Fear (level 85)",
      "Defeat Incarnation of Neglect (level 85)",
    ],
    requires: 5,
    category: "boss",
    difficulty: "hard",
    tips: [
      "The Shaper and Cortex are the most reasonable to self-complete.",
      "All pinnacle fights have persistent arena DoT — high DPS is crucial to limit exposure time.",
      "Buy carries for the Incarnation bosses (Dread/Fear/Neglect) if your build isn't a boss killer.",
    ],
  },
  {
    id: "gallant-grinding-goals",
    number: 40,
    name: "Gallant Grinding Goals",
    steps: [
      "Reach Level 100",
      "Use Divine Font in Eternal Lab (0/50)",
      "Complete T16 Rare Maps with Scarabs (0/1000)",
      "Complete Shaper/Elder/Conqueror/Memory Guardian Maps at 100%+ IIQ (0/50)",
      "Defeat 4-Mod Rares in T16 Maps (0/250)",
      "Defeat Map Bosses in Mirages of T16+ Maps at 80%+ IIQ (0/100)",
    ],
    requires: 4,
    category: "misc",
    difficulty: "endgame",
    tips: [
      "Divine Font (50): run Gift to the Goddess for 6 font uses per run — ~8 runs total.",
      "T16 with Scarabs (1000) and 4-Mod Rares (250): happens naturally over the league.",
      "Skip Level 100 unless committed — XP loss above 95 is brutal.",
      "Omen of Amelioration stops XP loss once per area — do NOT use in invitations/uber bosses where XP loss can't happen anyway.",
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
