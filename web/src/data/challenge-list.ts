/**
 * Mirage League — 40 challenges.
 * Source: https://craniumviolence.github.io/ (CraniumViolence challenge guide)
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
  autoDetectKey?: string;
}

export const CHALLENGES: Challenge[] = [

  // ── Early Game (1–8) ─────────────────────────────────────────────────────────

  {
    id: "beginners-basics",
    number: 1,
    name: "Beginner's Basics",
    description: "Use an Orb of Transmutation, Orb of Alteration, Orb of Augmentation, and Orb of Alchemy.",
    category: "crafting",
    difficulty: "easy",
    tips: [
      "All four orbs drop commonly in Act 1–2.",
      "Use them on any white/magic item — no specific target needed.",
    ],
  },
  {
    id: "mysterious-mirages",
    number: 2,
    name: "Mysterious Mirages",
    description: "Choose a Wish, Enter a Mirage, and Break the Astral Chain inside a Mirage. (New league mechanic — completable in Act 1.)",
    category: "mechanics",
    difficulty: "easy",
    tips: [
      "Mirages appear in areas throughout the campaign and maps.",
      "Break the Astral Chain by killing the 3 rare monsters surrounding it.",
    ],
  },
  {
    id: "peddlers-produce-1",
    number: 3,
    name: "Peddler's Produce I",
    description: "Complete vendor recipes: Life Flask, Mana Flask, Hybrid Flask, Ruby Ring, Topaz Ring, Sapphire Ring, Agate Amulet, Turquoise Amulet, Citrine Amulet.",
    category: "crafting",
    difficulty: "easy",
    tips: [
      "Resistance rings: sell 1 magic ring + 1 matching gem (Ruby/Topaz/Sapphire) to get that ring.",
      "Hybrid flask: sell a life flask + mana flask of the same level.",
      "Agate/Turquoise/Citrine amulets: vendor a matching pair of rings (Str/Dex/Int combos).",
    ],
  },
  {
    id: "act-adversaries-1",
    number: 4,
    name: "Act Adversaries I",
    description: "Defeat Merveil, Vaal Oversoul, Dominus, Malachai, and Kitava (Act 5).",
    category: "campaign",
    difficulty: "easy",
    tips: [
      "Complete all side quests for extra passive points before each act boss.",
      "Cap resistances as you go — each boss has a primary damage type to prepare for.",
      "Kitava (Act 5) imposes a −30% resistance penalty on kill.",
    ],
  },
  {
    id: "beneficial-bounties",
    number: 5,
    name: "Beneficial Bounties",
    description: "Complete passive-point quests: The Way Forward (Act 2), Through Sacred Ground (Act 2), Victario's Secrets (Act 3), An Indomitable Spirit (Act 4).",
    category: "campaign",
    difficulty: "easy",
    tips: [
      "These are the main quest-line passive-point rewards — do them as you progress.",
      "An Indomitable Spirit (Act 4) requires defeating Kaom and Daresso first.",
    ],
  },
  {
    id: "desecrated-djinn",
    number: 6,
    name: "Desecrated Djinn",
    description: "Choose 5 Wishes, defeat 10 Rare Monsters inside Mirages, and break 15 Astral Chains inside Mirages.",
    category: "mechanics",
    difficulty: "easy",
    tips: [
      "Mirages appear throughout the campaign — you don't need to be in maps.",
      "Break Astral Chains by killing the 3 rares in the circle around the chain.",
    ],
  },
  {
    id: "act-adversaries-2",
    number: 7,
    name: "Act Adversaries II",
    description: "Defeat Tsoagoth (Brine King), Arakaali, Lunaris and Solaris, The Depraved Trinity, and Kitava (Act 10).",
    category: "campaign",
    difficulty: "easy",
    tips: [
      "Acts 6–10 mirror Acts 1–5 — prepare resistances for each encounter.",
      "Kitava (Act 10) applies a second −30% resistance penalty — −60% total from campaign.",
      "Cap all resistances to 75% before entering maps.",
    ],
  },
  {
    id: "helpful-hideaways",
    number: 8,
    name: "Helpful Hideaways",
    description: "Visit: Aspirants' Plaza, Menagerie, Mine Encampment, Forbidden Sanctum, Kingsmarch, Rogue Harbour, and Monastery of the Keepers.",
    category: "misc",
    difficulty: "easy",
    tips: [
      "Use /menagerie, /delve, /sanctum, /kingsmarch, /heist, /monastery commands from any town.",
      "Aspirants' Plaza is the Labyrinth entrance — visit via the Act 3 areas.",
    ],
  },

  // ── Atlas Entry (9–17) ───────────────────────────────────────────────────────

  {
    id: "added-accessories",
    number: 9,
    name: "Added Accessories",
    description: "Complete 30x each of 3 of 6: Essence Monsters, Strongboxes, Shrines, Possessed Monsters, Rogue Exiles, Beyond Rare Monsters.",
    category: "mechanics",
    difficulty: "easy",
    tips: [
      "Pick 3 with the most scarab support or the easiest Atlas passive bonuses.",
      "Essences, Strongboxes, and Shrines are the most common — focus those.",
    ],
  },
  {
    id: "atlas-additions",
    number: 10,
    name: "Atlas Additions",
    description: "Complete 5 of 11 mechanics in maps: Abysses (30), Expeditions (30), Harvest Plots (100), Legion (30), Smuggler's Caches (30), Delirium Mirrors (30), Ultimatum Waves (200), Blights (30), Rituals (100), Ore Deposits (30), Unstable Breaches/Hives (30).",
    category: "atlas",
    difficulty: "easy",
    tips: [
      "Choose 5 mechanics with Atlas passive support and match your scarab stock.",
      "Mirages in maps add +1 to duplicated mechanics inside — speed up progress.",
      "Harvest and Ritual are fastest at 100 — Ultimatum at 200 is slowest.",
    ],
  },
  {
    id: "master-missives",
    number: 11,
    name: "Master Missives",
    description: "Complete 30x each of 2 of 4 Master Missions (T11+ maps): Niko, Einhar, Jun, or Alva.",
    category: "atlas",
    difficulty: "easy",
    tips: [
      "Pick 2 masters with Atlas passive bonuses to get free mission spawns.",
      "Niko and Einhar missions are the fastest to complete.",
    ],
  },
  {
    id: "sacred-sigils",
    number: 12,
    name: "Sacred Sigils",
    description: "Collect 50x each Sigil of Navira, Sigil of Kelari, and Sigil of Ruzhan from Mirage Wishes.",
    category: "mechanics",
    difficulty: "medium",
    tips: [
      "Sigils are granted by specific Mirage Wishes — prioritise Sigil-giving wishes.",
      "Requires roughly 150+ Mirage encounters — happens naturally through mapping.",
    ],
  },
  {
    id: "cartographers-courage",
    number: 13,
    name: "Cartographer's Courage",
    description: "Complete a Rare Map of each Tier from T1 to T16.",
    category: "atlas",
    difficulty: "easy",
    tips: [
      "Happens naturally while progressing through the Atlas.",
      "Alch and go is fine — just need to complete (enter and kill boss) each tier.",
    ],
  },
  {
    id: "crafting-craze",
    number: 14,
    name: "Crafting Craze",
    description: "Use 15 of 19 currency types: Transmutation, Augmentation, Alteration, Chance, Alchemy, Scour, Fusing, Jeweller's, Chromatic, Annulment, Regal, Chaos, Exalted, Blessed, Divine, Sacred, Enkindling/Instilling, Regret, Unmaking.",
    category: "crafting",
    difficulty: "easy",
    tips: [
      "All listed orbs drop in red maps — buy the rare ones (Annulment, Unmaking) from trade.",
      "You can skip 4 of the 19 — skip the most expensive or rarest ones.",
    ],
  },
  {
    id: "maniacal-monsters",
    number: 15,
    name: "Maniacal Monsters",
    description: "Defeat 200 Map Bosses in Rare Maps with at least 80% Item Quantity.",
    category: "atlas",
    difficulty: "easy",
    tips: [
      "Happens naturally while mapping — just keep maps at 80%+ IIQ (Alch+Chaos).",
      "You don't need to kill unique map bosses — any rare map boss counts.",
    ],
  },
  {
    id: "deadly-deeds",
    number: 16,
    name: "Deadly Deeds",
    description: "Complete 5 of 11: Abyssal Depths (5), Logbooks with 10+ Remnants (5), T4 Harvest Seeds (5), Legion 25-reward Domains (3), 4-wing Blueprints (5), Simulacrum 60 Waves, Full Ultimatums (10), Blighted/Blight-Ravaged Maps (5), Ritual+Vessel (10), Atlas Runner rewards (30), Hive Fortresses or Breach Marshals (10).",
    category: "mechanics",
    difficulty: "medium",
    tips: [
      "Abyssal Depths, Logbooks, and Blighted Maps are the most straightforward picks.",
      "Avoid Simulacrum (60 waves) and 4-wing Blueprints unless your build is strong.",
    ],
  },
  {
    id: "empowered-encounters",
    number: 17,
    name: "Empowered Encounters",
    description: "Complete 4 of 11 league mechanics inside Mirages: Abysses (15), Expeditions (15), Harvest (15), Legion (15), Smuggler's Caches (15), Delirium Mirrors (15), Ultimatum Waves (50), Blights (15), Rituals (50), Ore Deposits (15), Unstable Breaches/Hives (15).",
    category: "mechanics",
    difficulty: "medium",
    tips: [
      "Block all non-target mechanics on the Atlas to concentrate Mirage spawns on your chosen 4.",
      "Mirages spawn randomly in maps — pick mechanics that already appear often.",
    ],
  },

  // ── Mid-Game (18–26) ─────────────────────────────────────────────────────────

  {
    id: "achieve-ascension",
    number: 18,
    name: "Achieve Ascension",
    description: "Use the Ascendancy Device in Normal, Cruel, Merciless, and Eternal Labyrinth, and gain a Bloodline Class.",
    category: "campaign",
    difficulty: "easy",
    tips: [
      "Check poelab.com daily for the shortest lab layout and Izaro mechanics.",
      "Bring life flasks and a movement skill for trap sections.",
      "Eternal Lab requires an Offering to the Goddess (drops from T6+ map Trials).",
    ],
  },
  {
    id: "potent-premonitions",
    number: 19,
    name: "Potent Premonitions",
    description: "Turn in divination cards 3 of 4 times: Currency item (20 cards), Gem (10 cards), Two-Implicit Unique (3 cards), Six-Linked Item (2 cards).",
    category: "crafting",
    difficulty: "medium",
    tips: [
      "Currency card sets are easiest — buy cheap currency div cards from trade.",
      "Skip the Six-Linked Item turn-in unless you find the cards naturally.",
      "Use Faustus at Kingsmarch for free div card draws.",
    ],
  },
  {
    id: "peddlers-produce-2",
    number: 20,
    name: "Peddler's Produce II",
    description: "Complete vendor recipes: Unique Item, Orb of Fusing (six-link), Regal Orb (full rare set or triple 20% quality), and Influenced Item.",
    category: "crafting",
    difficulty: "easy",
    tips: [
      "Unique: sell any identified unique item to a vendor.",
      "Six-link Fusing: sell any six-linked item.",
      "Full rare set (lv60+ unidentified) = Chaos; lv75+ unidentified = 2 Chaos.",
    ],
  },
  {
    id: "lethal-leaders",
    number: 21,
    name: "Lethal Leaders",
    description: "Defeat 6 of 8: Uber Atziri, Izaro (Harvest offering), Abyssal Lich, Omnitect, Vox Twins, Beyond Bosses (K'tash/Ghorr/Beidat), Expedition Bosses (Medved/Vorana/Uhtred), Kingsmarch Bosses (Black Knight/Admiral Valerius/Sasan).",
    category: "boss",
    difficulty: "medium",
    tips: [
      "Uber Atziri, Abyssal Lich, and Omnitect are the most accessible picks.",
      "Izaro with Harvest offering and Beyond bosses are straightforward with atlas passives.",
      "Skip Heist/Kingsmarch bosses — too time-consuming for casual play.",
    ],
  },
  {
    id: "coveted-currency",
    number: 22,
    name: "Coveted Currency",
    description: "Use 7 of 11 Mirage currencies: Coin of Knowledge/Power/Skill/Restoration/Desecration (5 each), Volatile Vaal Orb (5), Sinistral or Dextral Catalyst (20), Crystallised Rancour Craft (3), Essence of Desolation (3), Incubators (10), Refracting Fog (5).",
    category: "mechanics",
    difficulty: "medium",
    tips: [
      "Mirage coins and Volatile Vaal Orbs drop from Mirages — complete these naturally.",
      "Catalysts can be purchased from trade if Mirage drops are sparse.",
      "Incubators (10) are easiest — incubators drop in red maps.",
    ],
  },
  {
    id: "remarkable-realms",
    number: 23,
    name: "Remarkable Realms",
    description: "Complete 17 Unique Maps: Vaults of Atziri, Maelström of Chaos, Coward's Trial, Acton's Nightmare, Poorjoy's Asylum, Mao Kun, Oba's Cursed Trove, Olmec's Sanctum, Death and Taxes, Whakawairua Tuahu, The Vinktar Square, Caer Blaidd, The Putrid Cloister, Hallowed Ground, Twilight Temple, Pillars of Arun, Doryani's Machinarium.",
    category: "atlas",
    difficulty: "hard",
    tips: [
      "Buy most unique maps from trade — they rarely drop naturally.",
      "The Vinktar Square has a vendor recipe: use a specific currency combination.",
      "Doryani's Machinarium is a group encounter — consider running with a party.",
      "You need Atlas visibility to enter unique maps — complete maps nearby first.",
    ],
  },
  {
    id: "succinct-scarabs",
    number: 24,
    name: "Succinct Scarabs",
    description: "Complete 30x T14+ Rare Maps each using 8 of 26 different scarab types (~5 progress per map, ~48 maps per type).",
    category: "atlas",
    difficulty: "medium",
    tips: [
      "Pick scarab types you have in stock — buy from trade if needed.",
      "Focus on cheap scarabs: Bestiary, Expedition, Essence, Ritual.",
      "Run T14+ maps for this to count — T16s are ideal for speed.",
    ],
  },
  {
    id: "glorious-gemcraft",
    number: 25,
    name: "Glorious Gemcraft",
    description: "Complete 3 of 4: Corrupt a gem to level 21 or 23% quality, use 40x Gemcutter's Prisms, have 300% total gem quality in your sockets, level an Exceptional gem to level 3.",
    category: "crafting",
    difficulty: "medium",
    tips: [
      "GCP: buy in bulk from trade or farm Armourer's Scraps vendors.",
      "300% total quality: stack quality support gems + Ashes of the Stars amulet.",
      "Corrupt to 21/23%: use a Vaal Orb on a lv20/20% gem — ~50% chance each.",
    ],
  },
  {
    id: "cross-contamination",
    number: 26,
    name: "Cross Contamination",
    description: "Complete 4 of 6 conditional encounters: Breach Marshal while Delirious, Stygian Spire while Shrine active, Essence Monster while Possessed, Blight Boss while Tempest active, Delirium or Beyond Boss in Sacred Grove, Unique Map Boss Possessed in Ritual.",
    category: "mechanics",
    difficulty: "medium",
    tips: [
      "Blight Boss + Tempest and Breach Marshal + Delirium are most manageable.",
      "Sacred Grove + Delirium: use Delirium Mirrors in Harvest maps.",
      "Avoid Unique Map Boss in Ritual — requires precise setup and is very rare.",
    ],
  },

  // ── Late Game (27–35) ────────────────────────────────────────────────────────

  {
    id: "wishful-willing",
    number: 27,
    name: "Wishful Willing",
    description: "Select 13 of 20 Mirage Wishes: Augury, Distant Horizons, Foreknowledge, Fortune, Glittering, Gold, Horizons, Jewels, Knowledge, Prosperity, Pursuit, Risk, Rust, Scarabs, Skittering, Strange Horizons, Terror, Treasures, Trinkets, Wealth.",
    category: "mechanics",
    difficulty: "easy",
    tips: [
      "You don't need to enter or complete a Mirage to select the wish — just choose it.",
      "13 of 20 means you can skip 7 — pick the most useful wishes for your build.",
    ],
  },
  {
    id: "seized-strength",
    number: 28,
    name: "Seized Strength",
    description: "Defeat 7 of 11 Bloodline Class bosses: Trialmaster, King in the Mists, Oshabi, Catarina, Aul (depth 130+), Olroth (lv81+ Knights of the Sun Logbook), Lycia (Sanctum), Farrul (Menagerie), Simulacrum (15 waves), Tul+Esh Breach Fortress, Saresh of the Weeping Black.",
    category: "boss",
    difficulty: "medium",
    tips: [
      "Oshabi, Catarina, Farrul, and King in the Mists are the most accessible.",
      "Trialmaster (Chaos) and Aul (Delve 130+) require some setup but are reliable.",
      "Skip Simulacrum and Lycia unless your build is very strong.",
    ],
  },
  {
    id: "atlas-astrolabes",
    number: 29,
    name: "Atlas Astrolabes",
    description: "Complete 30x T14+ Rare Maps each in 4 of 11 Astrolabe region types (Templar, Fruiting, Lightless, Grasping, Nameless, Fungal, Chaotic, Enshrouded, Timeless, Runic, Prospecting).",
    category: "atlas",
    difficulty: "medium",
    tips: [
      "Astrolabes drop from Memory Chain bosses in the relevant region.",
      "Pick 4 regions close together on the Atlas to minimise travel between them.",
      "~120 total T14+ maps required across 4 regions.",
    ],
  },
  {
    id: "tyrannical-tiers",
    number: 30,
    name: "Tyrannical Tiers",
    description: "Reach 8,000 total Map Tiers completed across your Atlas.",
    category: "atlas",
    difficulty: "medium",
    tips: [
      "No IIQ or rarity requirement — just complete maps.",
      "About half progress comes naturally from Atlas completion; the rest requires ~500 additional maps.",
      "Running T16 maps maximises tier accumulation per run.",
    ],
  },
  {
    id: "magnificent-memories",
    number: 31,
    name: "Magnificent Memories",
    description: "Accumulate 2,500% total Item Quantity in completed Rare Originator-Influenced (T16.5) maps.",
    category: "atlas",
    difficulty: "medium",
    tips: [
      "Originator maps are T16.5 — they appear after unlocking all 4 Voidstones.",
      "Alch+Chaos roll maps to get 50%+ IIQ per map — under 50 maps total needed.",
      "Running these maps is core endgame anyway — progress happens naturally.",
    ],
  },
  {
    id: "sandswept-survivor",
    number: 32,
    name: "Sandswept Survivor",
    description: "Break 150 Astral Chains in Mirages of Rare T14+ Maps with at least 100% Item Quantity.",
    category: "mechanics",
    difficulty: "hard",
    tips: [
      "Break Astral Chains by killing the 3 rare monsters surrounding the chain in the Mirage.",
      "T14+ maps with 100%+ IIQ (Alch+Chaos) are the baseline — run these naturally.",
      "Mirages spawn randomly — Atlas passives boosting Mirage frequency help.",
    ],
  },
  {
    id: "eldritch-evocation",
    number: 33,
    name: "Eldritch Evocation",
    description: "In Astrolabe-affected maps: defeat 100 Witnessed Map Bosses OR activate 200 Eldritch Altars.",
    category: "atlas",
    difficulty: "medium",
    tips: [
      "Eldritch Altars (200) are faster — multiple altars spawn per map.",
      "Both options require Astrolabe-affected maps — get Astrolabes from Memory Chain bosses.",
      "Run T16 maps with an Astrolabe socketed for maximum altar density.",
    ],
  },
  {
    id: "vaulted-valuables",
    number: 34,
    name: "Vaulted Valuables",
    description: "Collect 5x each of 3 of 5 reward types from Memory Vaults: Currency, Unique, Gem, Fragment, Map.",
    category: "mechanics",
    difficulty: "hard",
    tips: [
      "Memory Vaults appear in Astrolabe region content — run Memory Chains.",
      "Requires ~25+ full sets of Astrolabe map clears to generate enough vault entries.",
      "Pick the 3 reward types that overlap with what you need anyway (currency, fragments, maps).",
    ],
  },
  {
    id: "instigative-invitations",
    number: 35,
    name: "Instigative Invitations",
    description: "Complete all 8 invitations with 4+ modifiers: Screaming, Incandescent, The Elderslayers, The Feared, The Forgotten, The Formed, The Remembered, The Twisted.",
    category: "boss",
    difficulty: "hard",
    tips: [
      "Screaming (Eater) and Incandescent (Exarch) require completing their respective influence chains.",
      "The Formed (4 Guardian Maps) is easier — farm T16 Shaper Guardian maps.",
      "Use a Blessed Orb on Twisted invitation to reroll a guardian to an easier one.",
      "The Feared includes Cortex+Sirus+Shaper+Elder+Incarnation of Dread — a true pinnacle encounter.",
    ],
  },

  // ── Endgame (36–40) ──────────────────────────────────────────────────────────

  {
    id: "nightmare-nemeses",
    number: 36,
    name: "Nightmare Nemeses",
    description: "Complete 4 of 5 T17 Maps with 175%+ Item Quantity: Abomination, Citadel, Fortress, Sanctuary, Ziggurat.",
    category: "atlas",
    difficulty: "hard",
    tips: [
      "T17 maps are significantly more dangerous than T16 — ensure your build is ready.",
      "Use a Scarab of Stability in case of disconnect — keeps your portals open.",
      "175%+ IIQ: Alch+Chaos roll then target high-quantity prefix/suffix mods.",
    ],
  },
  {
    id: "weeping-warlords-warfare",
    number: 37,
    name: "Weeping Warlords Warfare",
    description: "Defeat Saresh, the Weeping Black in 3 of 4 ways: without Astral Chains debuff, without Festering Souls, without Gangrenous Mass explosions, without Charged Soul Slam.",
    category: "boss",
    difficulty: "hard",
    tips: [
      "Saresh is the new Mirage pinnacle boss — encounter details not fully known at league start.",
      "Pick the 3 avoidance conditions that match your build's mobility and defences.",
    ],
  },
  {
    id: "tremendous-tempests",
    number: 38,
    name: "Tremendous Tempests",
    description: "Slay Map Bosses in 75 T16 Rare Maps affected by an Atlas Astrolabe with 150%+ Item Quantity.",
    category: "atlas",
    difficulty: "hard",
    tips: [
      "Core endgame farming loop — run T16 maps with Astrolabes socketed.",
      "150%+ IIQ: Alch the map and target high-quantity modifiers.",
      "75 maps is a grind — combine with Magnificent Memories for efficiency.",
    ],
  },
  {
    id: "uber-undertaking",
    number: 39,
    name: "Uber Undertaking",
    description: "Defeat 5 of 10 level 85 Pinnacle Bosses: Sirus, Elder, Maven, Searing Exarch, Eater of Worlds, High Templar Venarius, Shaper, Incarnation of Dread, Incarnation of Fear, Incarnation of Neglect.",
    category: "boss",
    difficulty: "hard",
    tips: [
      "Shaper and The Elder are the most accessible starting points.",
      "Sirus and Venarius require completing Conqueror chains on the Atlas first.",
      "Pinnacle bosses have persistent arena DoT — high DPS to end fights quickly.",
      "Save Uber versions (Dread/Fear/Neglect) for last — require specific fragments.",
    ],
  },
  {
    id: "gallant-grinding-goals",
    number: 40,
    name: "Gallant Grinding Goals",
    description: "Complete 4 of 6: Reach Level 100, use Divine Font 50x, complete 1,000 T16 Rare Maps with Scarabs, complete 50 Shaper+Elder+Conqueror+Memory Guardian Maps at 100%+ IIQ, defeat 250 Rare monsters with 4+ Mods in T16 Maps, defeat 100 Map Bosses in Mirages of T16+ Maps at 80%+ IIQ.",
    category: "misc",
    difficulty: "endgame",
    tips: [
      "Skip Level 100 unless you have infinite time — the XP loss on death above 95 is brutal.",
      "Divine Font 50x and T16 with Scarabs (1,000) are the most achievable grind goals.",
      "250 Rare monsters with 4+ Mods in T16 happens naturally from mapping.",
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
  // Act Adversaries I (#4) — all Acts 1–5 bosses
  "Merveil, the Siren":     [{ id: "act-adversaries-1", number: 4 }],
  "Vaal Oversoul":           [{ id: "act-adversaries-1", number: 4 }],
  "Dominus, High Templar":   [{ id: "act-adversaries-1", number: 4 }],
  "Malachai, The Nightmare": [{ id: "act-adversaries-1", number: 4 }],
  // Kitava appears twice: first occurrence = C4 (Act 5), second = C7 (Act 10)
  "Kitava, the Insatiable":  [{ id: "act-adversaries-1", number: 4 },
                              { id: "act-adversaries-2", number: 7 }],
  // Act Adversaries II (#7) — Acts 6–10 bosses (Kitava handled above)
  "Tsoagoth, The Brine King":   [{ id: "act-adversaries-2", number: 7 }],
  "Arakaali, Spinner of Shadows": [{ id: "act-adversaries-2", number: 7 }],
  "Lunaris, Eternal Moon":      [{ id: "act-adversaries-2", number: 7 }],
  "Solaris, Eternal Sun":       [{ id: "act-adversaries-2", number: 7 }],
  "The Depraved Trinity":       [{ id: "act-adversaries-2", number: 7 }],
  // Uber Undertaking (#39) — pinnacle voidstone bosses
  "The Eater of Worlds":  [{ id: "uber-undertaking", number: 39 }],
  "The Searing Exarch":   [{ id: "uber-undertaking", number: 39 }],
  "The Maven":            [{ id: "uber-undertaking", number: 39 }],
  "The Uber Elder":       [{ id: "uber-undertaking", number: 39 }],
};

/** Ascend version → challenge completed. */
export const ASCEND_CHALLENGE_MAP: Record<string, RouteChallengeRef> = {
  normal:     { id: "achieve-ascension", number: 18 },
  cruel:      { id: "achieve-ascension", number: 18 },
  merciless:  { id: "achieve-ascension", number: 18 },
  eternal:    { id: "achieve-ascension", number: 18 },
};
