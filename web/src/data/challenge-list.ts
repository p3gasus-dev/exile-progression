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
      "Right-click the orb then right-click any item in your inventory or stash.",
      "All four orbs drop commonly in Act 1–2 — no specific target needed.",
    ],
  },
  {
    id: "mysterious-mirages",
    number: 2,
    name: "Mysterious Mirages",
    description: "Choose a Wish, Enter a Mirage, and Break the Astral Chain in a Mirage. (New league mechanic — completable in Act 1.)",
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
    description: "Complete vendor recipes to receive: any Life or Mana Flask, any Hybrid Flask, a Ruby/Topaz/Sapphire Ring, and an Agate/Turquoise/Citrine Amulet.",
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
    description: "Defeat Act 1: Merveil, the Twisted — Act 2: Vaal Oversoul — Act 3: Dominus, Ascendant — Act 4: Malachai, The Nightmare — Act 5: Kitava, the Insatiable.",
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
    description: "Complete passive-point quests: The Way Forward (Act 2), Through Sacred Ground (Act 2), Victario's Secrets (Act 3), An Indomitable Spirit (Act 4).",
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
    description: "Choose Wishes (0/5), Defeat Rare Monsters in Mirages (0/10), and Break the Astral Chain in Mirages (0/15).",
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
    description: "Defeat Act 6: Tsoagoth, The Brine King — Act 7: Arakaali, Spinner of Shadows — Act 8: Lunaris, Eternal Moon and Solaris, Eternal Sun — Act 9: The Depraved Trinity — Act 10: Kitava, the Insatiable.",
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
    description: "Visit: Aspirants' Plaza (Act 3), Menagerie (/menagerie), Mine Encampment (/delve), Forbidden Sanctum (/sanctum), Kingsmarch (/kingsmarch), Rogue Harbour (/heist), Monastery of the Keepers (/monastery).",
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
    description: "Complete 30x each of 3 of 6: Defeat Monsters with Essence, Open Strongboxes, Activate Shrines, Defeat Possessed Monsters, Defeat Rogue Exiles, Defeat Rare Beyond Monsters.",
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
    description: "Complete 5 of 11 mechanics the specified number of times: Abysses (30), Expeditions (30), Harvest Plots (100), Legion (30), Smuggler's Caches (30), Delirium Mirrors (30), Ultimatum Waves (200), Blights (30), Rituals (100), Ore Deposits (30), Unstable Breaches/Hives (30).",
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
    description: "Complete 30x each of 2 of 4 Master Missions in Tier 11+ Maps: Niko, Einhar, Jun, or Alva.",
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
    description: "Choose Wishes with Djinn Sigils: Sigil of Navira (0/50), Sigil of Kelari (0/50), Sigil of Ruzhan (0/50).",
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
    description: "Complete a Rare Map of each Tier from T1 to T16.",
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
    description: "Use 15 of 19 currency items: Transmutation (40), Augmentation (30), Alteration (20), Chance (20), Alchemy (20), Scouring (30), Fusing (20), Jeweller's (20), Chromatic (20), Annulment (3), Regal (20), Chaos (20), Exalted, Blessed (20), Divine, Sacred, Enkindling/Instilling (20), Regret (20), Unmaking (20).",
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
    description: "Defeat 200 Map Bosses in Rare Maps while they have at least 80% Item Quantity.",
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
    description: "Complete 5 of 11 at area level 81+: Abyssal Depths (5), Logbooks with 10+ Remnants (5), T4 Harvest Seeds (5), Legion 25-reward Domains (3), 4-wing Blueprints (5), Simulacrum Waves (60), Full Ultimatums (10), Blighted/Blight-Ravaged Maps (5), Ritual+Vessel (10), Atlas Runner rewards (30), Hive Fortresses or Breach Marshals (10).",
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
    description: "Complete 4 of 11 league mechanics inside Mirages: Abysses (15), Expeditions (15), Harvest Plots (50), Legion (15), Smuggler's Caches (15), Delirium Mirrors (15), Ultimatum Waves (50), Blights (15), Rituals (25), Ore Deposits (15), Unstable Breaches/Hives (15).",
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
    description: "Use the Ascendancy Device in Normal, Cruel, Merciless, and Eternal Labyrinth, and Gain a Bloodline Class.",
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
    description: "Turn in divination cards for 3 of 4 reward types: Currency item (0/20), Gem (0/10), Two-Implicit Unique (0/3), Six-Linked Item (0/2).",
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
    description: "Complete vendor recipes to receive: a Unique Item, an Orb of Fusing, a Regal Orb, and an Item with Influence.",
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
    description: "Defeat 6 of 8 bosses at level 80+: Uber Atziri, Izaro (with Harvest offering), Abyssal Lich, Omnitect, Vox Twins, K'tash/Ghorr/Beidat (Beyond), Medved/Vorana/Uhtred (Expedition Logbooks), The Black Knight/Admiral Valerius/Sasan (Kingsmarch).",
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
    description: "Use 7 of 11 Mirage currency items or crafts: Coin of Knowledge/Power/Skill/Restoration/Desecration (5 each), Volatile Vaal Orb (5), Sinistral or Dextral Catalyst (20), Crystallised Rancour Craft (3), Essence of Desolation (3), Honoured/Sacred/Miraged Incubator (10), Refracting Fog (5).",
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
    description: "Complete all 17 Unique Maps: Vaults of Atziri, Maelström of Chaos, The Coward's Trial, Acton's Nightmare, Poorjoy's Asylum, Mao Kun, Oba's Cursed Trove, Olmec's Sanctum, Death and Taxes, Whakawairua Tuahu, The Vinktar Square, Caer Blaidd, The Putrid Cloister, Hallowed Ground, The Twilight Temple, Pillars of Arun, Doryani's Machinarium.",
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
    description: "Complete T14+ Rare Maps using 8 of 26 scarab types (30x each): Cartography, Divination, Titanic, Bestiary, Betrayal, Delve, Incursion, Anarchy, Domination, Essence, Strongbox, Torment, Influence, Abyss, Beyond, Blight, Breach, Delirium, Expedition, Harvest, Kalguuran, Legion, Ritual, Ultimatum, Misc, Horned.",
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
    description: "Complete 3 of 4: Corrupt a gem to level 21 or 23% quality, Use 40x Gemcutter's Prisms, Have 300% total gem quality socketed across all gear, Level an Exceptional Gem to level 3.",
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
    description: "Complete 4 of 6: Breach Marshal while Delirious, Stygian Spire while Shrine active, Essence Monster while Possessed, Blight Boss while Tempest active, Delirium or Beyond Boss in Sacred Grove, Unique Map Boss Possessed while in Ritual.",
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
    description: "Select 13 of 20 Mirage Wishes: Augury, Distant Horizons, Foreknowledge, Fortune, Glittering, Gold, Horizons, Jewels, Knowledge, Prosperity, Pursuit, Risk, Rust, Scarabs, Skittering, Strange Horizons, Terror, Treasures, Trinkets, Wealth.",
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
    description: "Defeat 7 of 11: Trialmaster (lv81+ Ultimatum), King in the Mists (Audience With The King), Oshabi (Sacred Blossom), Catarina (Syndicate Medallion), Aul (Delve depth 130+), Olroth (Knights of the Sun Logbook lv81+), Lycia (Forbidden Sanctum), Farrul (Menagerie), Simulacrum (all 15 waves), It That Was Tul and Esh (Breach Fortress), Saresh of the Weeping Black.",
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
    description: "Complete 30x T14+ Rare Maps in 4 of 11 Astrolabe region types: Templar, Fruiting, Lightless, Grasping, Nameless, Fungal, Chaotic, Enshrouded, Timeless, Runic, Prospecting.",
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
    description: "Reach a total of 8,000 Map Tiers completed.",
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
    description: "Complete Rare Originator-Influenced (T16.5) maps with a total of 2,500% Item Quantity.",
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
    description: "Break 150 Astral Chains in Mirages of Maps that are Rare, at least Tier 14, and have at least 100% Item Quantity.",
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
    description: "In Astrolabe-affected maps: Defeat 100 Witnessed Map Bosses OR Activate 200 Eldritch Altars.",
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
    description: "Collect 5x each of 3 of 5 reward types from Memory Vaults: Currency, Unique, Gem, Fragment, Map.",
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
    description: "Complete all 8 invitations with 4+ modifiers: Screaming (Eater), Incandescent (Exarch), The Elderslayers (4 Conquerors), The Feared (Shaper/Elder/Cortex/Sirus/Dread), The Forgotten (4 Distant Memories), The Formed (4 Shaper Guardian Maps), The Remembered (3 penultimate memory bosses), The Twisted (4 Elder Guardian Maps).",
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
    description: "Complete 4 of 5 T17 (Nightmare) Maps with at least 175% Item Quantity: Abomination, Citadel, Fortress, Sanctuary, Ziggurat.",
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
    description: "Defeat Saresh, The Weeping Black in 3 of 4 ways: without being affected by Astral Chains, without being affected by Festering Souls, without being hit by any Gangrenous Mass explosions, without being hit by Charged Soul Slam.",
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
    description: "Slay Map Bosses in 75 T16 Rare Maps affected by an Atlas Astrolabe with at least 150% Item Quantity.",
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
    description: "Defeat 5 of 10 level 85 Pinnacle Bosses: Sirus, The Elder, The Maven, The Searing Exarch, The Eater of Worlds, High Templar Venarius, The Shaper, Incarnation of Dread, Incarnation of Fear, Incarnation of Neglect.",
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
    description: "Complete 4 of 6: Reach Level 100, Use Divine Font in Eternal Lab (0/50), Complete T16 Rare Maps with Scarabs (0/1000), Complete Shaper/Elder/Conqueror/Memory Guardian Maps at 100%+ IIQ (0/50), Defeat 4-Mod Rares in T16 Maps (0/250), Defeat Map Bosses in Mirages of T16+ Maps at 80%+ IIQ (0/100).",
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
