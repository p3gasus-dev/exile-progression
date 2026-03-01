/**
 * Maps lowercase unique item names to their drop source(s) in endgame content.
 *
 * ── DIVINATION CARD RULE ─────────────────────────────────────────────────────
 * Div card recipes are NEVER shown as an acquisition method unless
 * `divCardOnly: true` — meaning no reliable direct drop source exists.
 * If a direct boss/area drop exists, always prefer that over a div card.
 *
 * ── GLOBAL DROP RULE ─────────────────────────────────────────────────────────
 * Items not in this map are treated as "Global Drop" in the UI.
 * Items with no drop restriction on the wiki = global drop = omitted here.
 * Drop-disabled and event-only items are also omitted.
 *
 * ── MULTIPLE SOURCES ─────────────────────────────────────────────────────────
 * `bosses` accepts an array for items that drop from several endgame bosses.
 * `areas`  accepts an array for items tied to specific zones/encounters.
 * All entries in both arrays are shown in the UI.
 *
 * ── SOURCE TYPE ──────────────────────────────────────────────────────────────
 * `sourceType` drives colour-coding in the UI:
 *   "pinnacle" — Shaper, Elder, Uber Elder, Maven, Searing Exarch, Eater of
 *                Worlds, Sirus, Atziri, Venarius, Incarnation bosses, and all
 *                Uber variants.
 *   "guardian" — Shaper Guardian map bosses (Hydra, Phoenix, Minotaur, Chimera).
 *   "league"   — League-mechanic encounters: Breach, Delve, Legion, Betrayal,
 *                Incursion, Heist, Ritual, Ultimatum, Blight, Abyss, Labyrinth,
 *                Sanctum, Viridian Wildwood, Kingsmarch, Warbands, etc.
 *
 * ── BOSS NAME CONVENTION ─────────────────────────────────────────────────────
 * Boss names in `bosses[]` match `kill` fragment strings in route txt files
 * where possible (e.g. "The Shaper", "The Maven"). Uber/non-route bosses use
 * their display names (e.g. "Uber Shaper", "Uber Maven") — these show in the
 * Dashboard but do not annotate route steps.
 *
 * ── ARMOUR TYPES ─────────────────────────────────────────────────────────────
 * Body armours, boots, gloves, helmets, and most shields/quivers are omitted
 * intentionally. Exceptions already present (e.g. Surrender, Voidfletcher,
 * Atziri's Mirror) are retained for completeness.
 *
 * Sources: poewiki.net/wiki/List_of_unique_* (verified 2026-03)
 */

export interface UniqueDropSource {
  /**
   * One or more boss names matching `kill` fragments in route files,
   * or Uber/non-route boss display names.
   * Used for voidstone boss route annotation and Dashboard display.
   */
  bosses?: string[];
  /**
   * One or more area/encounter names where this item drops outside of a
   * specific boss kill (e.g. league mechanic encounters, map areas).
   * Shown in Dashboard but does NOT annotate route steps.
   */
  areas?: string[];
  /** Short acquisition note shown in the source chip tooltip. */
  notes?: string;
  /**
   * The divination card name that yields this item.
   * Stored for reference; NEVER shown in UI unless divCardOnly is true.
   */
  divCard?: string;
  /**
   * True when a divination card trade is the ONLY practical acquisition method.
   * When true, the div card IS shown as the source.
   */
  divCardOnly?: boolean;
  /**
   * True when this item is an unrestricted world drop.
   * Renders as "Global Drop" in the UI.
   * Items NOT in this map are also treated as global drops by default.
   */
  globalDrop?: boolean;
  /**
   * Visual category used for colour-coding the source chip in the UI.
   *   "pinnacle" — endgame pinnacle/Uber bosses
   *   "guardian" — Shaper Guardian map bosses
   *   "league"   — league-mechanic encounters
   */
  sourceType?: "pinnacle" | "guardian" | "league";
}

export const UNIQUE_DROP_SOURCES: Record<string, UniqueDropSource> = {

  // ════════════════════════════════════════════════════════════════════════════
  // DIV-CARD-ONLY
  // No reliable direct drop source. The div card IS shown in the UI.
  // ════════════════════════════════════════════════════════════════════════════

  headhunter: {
    divCard: "The Doctor",
    divCardOnly: true,
    notes: "Obtain via 8× The Doctor divination cards",
  },
  mageblood: {
    divCard: "The Apothecary",
    divCardOnly: true,
    notes: "Obtain via 5× The Apothecary divination cards",
  },
  "mirror of kalandra": {
    divCard: "The Reflection",
    divCardOnly: true,
    notes: "Obtain via 9× The Reflection divination cards",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // THE SHAPER  (route: kill|The Shaper)
  // ════════════════════════════════════════════════════════════════════════════

  starforge: {
    bosses: ["The Shaper"],
    notes: "Infernal Sword",
    divCard: "The Shaper",
    sourceType: "pinnacle",
  },

  // ── Uber Shaper ───────────────────────────────────────────────────────────

  "the tides of time": {
    bosses: ["Uber Shaper"],
    notes: "Leather Belt",
    sourceType: "pinnacle",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // THE UBER ELDER  (route: kill|The Uber Elder)
  // ════════════════════════════════════════════════════════════════════════════

  "watcher's eye": {
    bosses: ["The Uber Elder"],
    notes: "Prismatic Jewel",
    divCard: "The Enlightened",
    sourceType: "pinnacle",
  },
  "bottled faith": {
    bosses: ["The Uber Elder"],
    notes: "Sulphur Flask",
    sourceType: "pinnacle",
  },
  disintegrator: {
    bosses: ["The Uber Elder"],
    areas: ["The Shaper's Realm"],
    notes: "Malachai's Metronome (Warstaff)",
    sourceType: "pinnacle",
  },
  // Quiver — already in file; fixed from wrong "The Shaper" entry
  voidfletcher: {
    bosses: ["The Uber Elder"],
    areas: ["The Shaper's Realm"],
    notes: "Penetrating Arrow Quiver",
    sourceType: "pinnacle",
  },

  // ── Uber Uber Elder ───────────────────────────────────────────────────────

  "call of the void": {
    bosses: ["Uber Uber Elder"],
    notes: "Two-Stone Ring",
    sourceType: "pinnacle",
  },
  voidforge: {
    bosses: ["Uber Uber Elder"],
    notes: "Infernal Sword (2H Sword)",
    sourceType: "pinnacle",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // THE MAVEN  (route: kill|The Maven)
  // ════════════════════════════════════════════════════════════════════════════

  "the devoted": {
    bosses: ["The Maven"],
    notes: "Karui Chopper",
    sourceType: "pinnacle",
  },
  // Forbidden Flame/Flesh — boss killed determines which ascendancy node rolls
  "forbidden flame": {
    bosses: ["The Maven", "The Searing Exarch", "The Eater of Worlds"],
    notes: "Crimson Jewel — boss killed determines the ascendancy node rolled",
    sourceType: "pinnacle",
  },
  "forbidden flesh": {
    bosses: ["The Maven", "The Searing Exarch", "The Eater of Worlds"],
    notes: "Viridian Jewel — boss killed determines the ascendancy node rolled",
    sourceType: "pinnacle",
  },

  // ── Uber Maven ────────────────────────────────────────────────────────────

  progenesis: {
    bosses: ["Uber Maven"],
    notes: "Experimenter's Sulphur Flask",
    sourceType: "pinnacle",
  },
  "grace of the goddess": {
    bosses: ["Uber Maven"],
    notes: "Prophecy Wand",
    sourceType: "pinnacle",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // THE SEARING EXARCH  (route: kill|The Searing Exarch)
  // ════════════════════════════════════════════════════════════════════════════
  // (Forbidden Flame/Flesh listed above under Maven — multi-boss)

  // ── Uber Searing Exarch ───────────────────────────────────────────────────

  "the annihilating light": {
    bosses: ["Uber Searing Exarch"],
    notes: "Aetheric Warstaff",
    sourceType: "pinnacle",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // THE EATER OF WORLDS  (route: kill|The Eater of Worlds)
  // ════════════════════════════════════════════════════════════════════════════

  "dissolution of the flesh": {
    bosses: ["The Eater of Worlds"],
    notes: "Viridian Jewel",
    sourceType: "pinnacle",
  },

  // ── Uber Eater of Worlds ──────────────────────────────────────────────────

  "ashes of the stars": {
    bosses: ["Uber Eater of Worlds"],
    notes: "Turquoise Amulet",
    sourceType: "pinnacle",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // SIRUS, AWAKENER OF WORLDS
  // ════════════════════════════════════════════════════════════════════════════

  "the saviour": {
    bosses: ["Uber Sirus"],
    notes: "Legion Sword (1H)",
    sourceType: "pinnacle",
  },
  "oriath's end": {
    bosses: ["Uber Sirus"],
    notes: "Granite Flask",
    sourceType: "pinnacle",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // ATZIRI, QUEEN OF THE VAAL
  // Regular Atziri = Apex of Sacrifice / Throne of Atziri (Incursion)
  // Uber Atziri   = Alluring Abyss
  // ════════════════════════════════════════════════════════════════════════════

  "atziri's promise": {
    bosses: ["Atziri, Queen of the Vaal"],
    areas: ["Apex of Sacrifice", "Throne of Atziri"],
    notes: "Amethyst Flask",
    sourceType: "pinnacle",
  },
  "breath of the council": {
    bosses: ["Atziri, Queen of the Vaal"],
    areas: ["Apex of Sacrifice", "Throne of Atziri"],
    notes: "Lathi (Staff)",
    sourceType: "pinnacle",
  },
  "pledge of hands": {
    bosses: ["Atziri, Queen of the Vaal"],
    areas: ["Apex of Sacrifice", "Throne of Atziri"],
    notes: "Judgement Staff",
    sourceType: "pinnacle",
  },
  "doryani's invitation": {
    bosses: ["Atziri, Queen of the Vaal"],
    areas: ["Apex of Sacrifice", "Throne of Atziri"],
    notes: "Heavy Belt",
    sourceType: "pinnacle",
  },
  // Uber Atziri only
  "atziri's disfavour": {
    bosses: ["Uber Atziri"],
    areas: ["Alluring Abyss"],
    notes: "Great Axe (2H)",
    sourceType: "pinnacle",
  },
  "atziri's rule": {
    bosses: ["Uber Atziri"],
    areas: ["Alluring Abyss"],
    notes: "Judgement Staff (Warstaff)",
    sourceType: "pinnacle",
  },
  // Shield — armor type but retained from prior data; updated to Uber Atziri
  "atziri's mirror": {
    bosses: ["Uber Atziri"],
    areas: ["Alluring Abyss"],
    notes: "Tarnished Spirit Shield",
    sourceType: "pinnacle",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // VENARIUS
  // ════════════════════════════════════════════════════════════════════════════

  nebulis: {
    bosses: ["Uber Venarius"],
    notes: "Void Sceptre",
    sourceType: "pinnacle",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // INCARNATION BOSSES
  // Uber-tier Eater/Exarch-influenced endgame map bosses
  // ════════════════════════════════════════════════════════════════════════════

  "coiling whisper": {
    bosses: ["Uber Incarnation of Fear"],
    notes: "Unset Ring",
    sourceType: "pinnacle",
  },
  "wing of the wyvern": {
    bosses: ["Uber Incarnation of Fear"],
    notes: "Assassin's Bow",
    sourceType: "pinnacle",
  },
  "wellwater phylactery": {
    bosses: ["Uber Incarnation of Dread"],
    notes: "Sanctified Mana Flask",
    sourceType: "pinnacle",
  },
  "the golden charlatan": {
    bosses: ["Uber Incarnation of Dread"],
    notes: "Ezomyte Blade (2H Sword)",
    sourceType: "pinnacle",
  },
  "festering resentment": {
    bosses: ["Uber Incarnation of Neglect"],
    notes: "Rune Dagger",
    sourceType: "pinnacle",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // SHAPER GUARDIANS  (route: kill|The Shaper Guardian (X))
  // ════════════════════════════════════════════════════════════════════════════

  "dying sun": {
    bosses: ["The Shaper Guardian (Hydra)"],
    areas: ["Lair of the Hydra"],
    notes: "Ruby Flask",
    divCard: "The Flask",
    sourceType: "guardian",
  },
  "taste of hate": {
    bosses: ["The Shaper Guardian (Phoenix)"],
    areas: ["Forge of the Phoenix"],
    notes: "Sapphire Flask",
    sourceType: "guardian",
  },
  // Shield — armor type but retained from prior data
  surrender: {
    bosses: ["The Shaper Guardian (Minotaur)"],
    areas: ["Maze of the Minotaur"],
    notes: "Ezomyte Tower Shield",
    sourceType: "guardian",
  },
  // Amulet — jewelry, correctly included
  impresence: {
    bosses: ["The Shaper Guardian (Chimera)"],
    areas: ["Pit of the Chimera"],
    notes: "Onyx Amulet — any element version",
    sourceType: "guardian",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // BREACH
  // Regular Breach: drops from the named breachlord and their monsters in any
  //   Breach encounter in maps.
  // Flawless Breachstone: dedicated boss fight from a Flawless Breachstone.
  // ════════════════════════════════════════════════════════════════════════════

  // ── Xoph ──────────────────────────────────────────────────────────────────
  "xoph's heart": {
    areas: ["Xoph's Breach"],
    notes: "Turquoise Amulet — drops from Xoph and his Breach monsters",
    sourceType: "league",
  },
  "xoph's inception": {
    areas: ["Xoph's Breach"],
    notes: "Short Bow — drops from Xoph and his Breach monsters",
    sourceType: "league",
  },
  "xoph's nurture": {
    bosses: ["Xoph (Flawless Breachstone)"],
    notes: "Crude Bow — Flawless Breachstone only",
    sourceType: "league",
  },

  // ── Tul ───────────────────────────────────────────────────────────────────
  "the halcyon": {
    areas: ["Tul's Breach"],
    notes: "Blue Pearl Amulet — drops from Tul and her Breach monsters",
    sourceType: "league",
  },
  tulborn: {
    areas: ["Tul's Breach"],
    notes: "Prophecy Wand — drops from Tul and her Breach monsters",
    sourceType: "league",
  },
  tulfall: {
    bosses: ["Tul (Flawless Breachstone)"],
    notes: "Tornado Wand — Flawless Breachstone only",
    sourceType: "league",
  },

  // ── Esh ───────────────────────────────────────────────────────────────────
  "hand of thought and motion": {
    areas: ["Esh's Breach"],
    notes: "Nailed Fist (Claw) — drops from Esh and her Breach monsters",
    sourceType: "league",
  },
  "hand of wisdom and action": {
    bosses: ["Esh (Flawless Breachstone)"],
    notes: "Nailed Fist (Claw) — Flawless Breachstone only",
    sourceType: "league",
  },

  // ── Uul-Netol ─────────────────────────────────────────────────────────────
  "uul-netol's kiss": {
    areas: ["Uul-Netol's Breach"],
    notes: "Vaal Axe (2H) — drops from Uul-Netol and her Breach monsters",
    sourceType: "league",
  },
  "uul-netol's embrace": {
    bosses: ["Uul-Netol (Flawless Breachstone)"],
    notes: "Vaal Axe (2H) — Flawless Breachstone only",
    sourceType: "league",
  },

  // ── Chayula ───────────────────────────────────────────────────────────────
  "presence of chayula": {
    areas: ["Chayula's Breach (Flawless)"],
    notes: "Onyx Amulet — Flawless Breachstone encounter",
    sourceType: "league",
  },
  "severed in sleep": {
    areas: ["Chayula's Breach"],
    notes: "Pecoraro (1H Sword) — drops from Chayula and his Breach monsters",
    sourceType: "league",
  },
  "united in dream": {
    bosses: ["Chayula (Flawless Breachstone)"],
    notes: "Pecoraro (1H Sword) — Flawless Breachstone only",
    sourceType: "league",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // DELVE
  // ════════════════════════════════════════════════════════════════════════════

  "the primordial chain": {
    areas: ["Azurite Mine (Delve)"],
    notes: "Coral Amulet — drops in Delve",
    sourceType: "league",
  },
  "mark of submission": {
    areas: ["Azurite Mine (Delve)"],
    notes: "Paua Ring — drops in Delve",
    sourceType: "league",
  },
  "aul's uprising": {
    bosses: ["Aul, the Crystal King"],
    notes: "Cobalt Jewel — drops from Aul, the Crystal King in Delve",
    sourceType: "league",
  },
  "cerberus limb": {
    bosses: ["Ahuatotli, the Blind"],
    areas: ["Azurite Mine (Delve)"],
    notes: "Crystal Sceptre — drops from Ahuatotli, the Blind in Delve",
    sourceType: "league",
  },
  soulwrest: {
    areas: ["Azurite Mine (Delve)"],
    notes: "Ezomyte Staff (Warstaff) — drops in Delve",
    sourceType: "league",
  },
  "the grey spire": {
    areas: ["Azurite Mine (Delve)"],
    notes: "Highborn Staff (Warstaff) — drops in Delve",
    sourceType: "league",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // LEGION — TIMELESS JEWELS
  // Primary source: the matching legion in Domain of Timeless Conflict (5-way).
  // Secondary source: extremely rare drop from the named general below.
  // Cannot be chanced.
  // ════════════════════════════════════════════════════════════════════════════

  "lethal pride": {
    bosses: ["Queen Hyrri Ngamaku"],
    areas: ["Domain of Timeless Conflict"],
    notes: "Timeless Jewel (Karui) — primarily from Karui legion in 5-way encounters. Cannot be chanced.",
    sourceType: "league",
  },
  "brutal restraint": {
    bosses: ["Nassar, Lion of the Seas"],
    areas: ["Domain of Timeless Conflict"],
    notes: "Timeless Jewel (Maraketh) — primarily from Maraketh legion in 5-way encounters. Cannot be chanced.",
    sourceType: "league",
  },
  "militant faith": {
    bosses: ["High Templar Dominus"],
    areas: ["Domain of Timeless Conflict"],
    notes: "Timeless Jewel (Templar) — primarily from Templar legion in 5-way encounters. Cannot be chanced.",
    sourceType: "league",
  },
  "glorious vanity": {
    bosses: ["Xibaqua"],
    areas: ["Domain of Timeless Conflict"],
    notes: "Timeless Jewel (Vaal) — primarily from Vaal legion in 5-way encounters. Cannot be chanced.",
    sourceType: "league",
  },
  "elegant hubris": {
    bosses: ["Victario, the People's Hero"],
    areas: ["Domain of Timeless Conflict"],
    notes: "Timeless Jewel (Eternal Empire) — primarily from Eternal legion in 5-way encounters. Cannot be chanced.",
    sourceType: "league",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // ABYSS
  // ════════════════════════════════════════════════════════════════════════════

  "darkness enthroned": {
    areas: ["Abyss Encounter"],
    notes: "Stygian Vise (Belt) — drops from Abyssal Liches",
    sourceType: "league",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // BLIGHT
  // ════════════════════════════════════════════════════════════════════════════

  stranglegasp: {
    areas: ["Blight Encounter"],
    notes: "Blue Pearl Amulet — drops after completing a Blight encounter in a Blight-ravaged map",
    sourceType: "league",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // BETRAYAL / IMMORTAL SYNDICATE
  // ════════════════════════════════════════════════════════════════════════════

  hyperboreus: {
    areas: ["Betrayal (Transportation Safehouse)"],
    notes: "Rustic Sash (Belt) — drops from executed Safehouse leaders in Transportation (area level 78+)",
    sourceType: "league",
  },
  "the crimson storm": {
    areas: ["Betrayal (Fortification Safehouse)"],
    notes: "Steelwood Bow — drops from executed Safehouse leaders in Fortification (area level 78+)",
    sourceType: "league",
  },
  paradoxica: {
    areas: ["Betrayal (Intervention Safehouse)"],
    notes: "Jewelled Foil (Thrusting Sword) — drops from executed Safehouse leaders in Intervention (area level 78+)",
    sourceType: "league",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // INCURSION
  // ════════════════════════════════════════════════════════════════════════════

  "sacrificial heart": {
    bosses: ["The Vaal Omnitect"],
    areas: ["Temple of Atzoatl"],
    notes: "Turquoise Amulet — drops from The Vaal Omnitect",
    sourceType: "league",
  },
  "string of servitude": {
    bosses: ["The Vaal Omnitect"],
    areas: ["Temple of Atzoatl"],
    notes: "Chain Belt — drops from The Vaal Omnitect",
    sourceType: "league",
  },
  "coward's chains": {
    areas: ["Hybridisation Chamber (Incursion)"],
    notes: "Rustic Sash (Belt) — chest inside the Tier 3 Incursion room",
    sourceType: "league",
  },
  "soul catcher": {
    bosses: ["The Vaal Omnitect"],
    areas: ["Temple of Atzoatl"],
    notes: "Quartz Flask — drops from The Vaal Omnitect",
    sourceType: "league",
  },
  "story of the vaal": {
    areas: ["Crucible of Flame (Incursion)"],
    notes: "Pecoraro (1H Sword) — chest inside the Tier 3 Incursion room",
    sourceType: "league",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // HEIST — NON-REPLICA
  // ════════════════════════════════════════════════════════════════════════════

  "chains of emancipation": {
    bosses: ["Friedrich Tarollo, Slave Merchant"],
    notes: "Rustic Sash (Belt) — boss of Contract: The Slaver King",
    sourceType: "league",
  },
  "the hidden blade": {
    areas: ["Grand Heist (Curio Display)"],
    notes: "Thin Pointer (Dagger)",
    sourceType: "league",
  },
  "the iron mass": {
    areas: ["Grand Heist (Curio Display)"],
    notes: "Pecoraro (1H Sword)",
    sourceType: "league",
  },
  "the fulcrum": {
    areas: ["Grand Heist (Curio Display)"],
    notes: "Ezomyte Staff (Warstaff)",
    sourceType: "league",
  },
  actum: {
    areas: ["Grand Heist (Curio Display)"],
    notes: "Vaal Axe (1H)",
    sourceType: "league",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // HEIST — REPLICA ITEMS
  // All Replica items drop exclusively from Curio Displays in Grand Heist.
  // ════════════════════════════════════════════════════════════════════════════

  // Belts
  "replica headhunter":       { areas: ["Grand Heist (Curio Display)"], notes: "Leather Belt (Replica)", sourceType: "league" },
  "replica bated breath":     { areas: ["Grand Heist (Curio Display)"], notes: "Chain Belt (Replica)", sourceType: "league" },
  "replica prismweave":       { areas: ["Grand Heist (Curio Display)"], notes: "Rustic Sash (Replica)", sourceType: "league" },
  "replica soul tether":      { areas: ["Grand Heist (Curio Display)"], notes: "Rustic Sash (Replica)", sourceType: "league" },
  // Rings
  "replica doedre's damning": { areas: ["Grand Heist (Curio Display)"], notes: "Paua Ring (Replica)", sourceType: "league" },
  "replica malachai's artifice": { areas: ["Grand Heist (Curio Display)"], notes: "Unset Ring (Replica)", sourceType: "league" },
  "replica emberwake":        { areas: ["Grand Heist (Curio Display)"], notes: "Ruby Ring (Replica)", sourceType: "league" },
  "replica tasalio's sign":   { areas: ["Grand Heist (Curio Display)"], notes: "Sapphire Ring (Replica)", sourceType: "league" },
  "fated end":                { areas: ["Grand Heist (Curio Display)"], notes: "Paua Ring", sourceType: "league" },
  // 1H Axes
  // (Actum listed above under Non-Replica Heist)
  // 2H Axes
  "replica harvest":          { areas: ["Grand Heist (Curio Display)"], notes: "Vaal Axe 2H (Replica)", sourceType: "league" },
  // Bows
  "replica quill rain":       { areas: ["Grand Heist (Curio Display)"], notes: "Short Bow (Replica)", sourceType: "league" },
  "replica iron commander":   { areas: ["Grand Heist (Curio Display)"], notes: "Battle Bow (Replica)", sourceType: "league" },
  "replica infractem":        { areas: ["Grand Heist (Curio Display)"], notes: "Decimation Bow (Replica)", sourceType: "league" },
  // Claws
  "replica last resort":      { areas: ["Grand Heist (Curio Display)"], notes: "Awl (Claw) (Replica)", sourceType: "league" },
  "replica advancing fortress": { areas: ["Grand Heist (Curio Display)"], notes: "Imperial Claw (Replica)", sourceType: "league" },
  // Daggers
  "replica bloodplay":        { areas: ["Grand Heist (Curio Display)"], notes: "Copper Kris (Dagger) (Replica)", sourceType: "league" },
  // 1H Maces
  "replica frostbreath":      { areas: ["Grand Heist (Curio Display)"], notes: "Gavel (Replica)", sourceType: "league" },
  // 2H Maces
  "replica trypanon":         { areas: ["Grand Heist (Curio Display)"], notes: "Gavel 2H (Replica)", sourceType: "league" },
  "replica kongor's undying rage": { areas: ["Grand Heist (Curio Display)"], notes: "Terror Maul (Replica)", sourceType: "league" },
  // Sceptres
  "replica bitterdream":      { areas: ["Grand Heist (Curio Display)"], notes: "Shadow Sceptre (Replica)", sourceType: "league" },
  "replica earendel's embrace": { areas: ["Grand Heist (Curio Display)"], notes: "Kris (Sceptre) (Replica)", sourceType: "league" },
  "replica nebulis":          { areas: ["Grand Heist (Curio Display)"], notes: "Void Sceptre (Replica)", sourceType: "league" },
  // Staves
  "replica blood thorn":      { areas: ["Grand Heist (Curio Display)"], notes: "Gnarled Branch (Staff) (Replica)", sourceType: "league" },
  "replica fencoil":          { areas: ["Grand Heist (Curio Display)"], notes: "Gnarled Branch (Staff) (Replica)", sourceType: "league" },
  // Warstaves
  "replica duskdawn":         { areas: ["Grand Heist (Curio Display)"], notes: "Maelström Staff (Warstaff) (Replica)", sourceType: "league" },
  // 1H Swords
  "replica tempestuous steel": { areas: ["Grand Heist (Curio Display)"], notes: "Jewelled Sword (Replica)", sourceType: "league" },
  "replica innsbury edge":    { areas: ["Grand Heist (Curio Display)"], notes: "Elder Sword (Replica)", sourceType: "league" },
  "replica dreamfeather":     { areas: ["Grand Heist (Curio Display)"], notes: "Elegant Sword (Replica)", sourceType: "league" },
  // Thrusting Swords
  "replica paradoxica":       { areas: ["Grand Heist (Curio Display)"], notes: "Jewelled Foil (Replica)", sourceType: "league" },
  // 2H Swords
  "replica oro's sacrifice":  { areas: ["Grand Heist (Curio Display)"], notes: "Infernal Sword (Replica)", sourceType: "league" },
  // Wands
  "replica midnight bargain": { areas: ["Grand Heist (Curio Display)"], notes: "Imbued Wand (Replica)", sourceType: "league" },
  "replica twyzel":           { areas: ["Grand Heist (Curio Display)"], notes: "Tornado Wand (Replica)", sourceType: "league" },
  "replica tulfall":          { areas: ["Grand Heist (Curio Display)"], notes: "Tornado Wand (Replica)", sourceType: "league" },
  // Utility Flasks
  "replica sorrow of the divine": { areas: ["Grand Heist (Curio Display)"], notes: "Sulphur Flask (Replica)", sourceType: "league" },
  "replica rumi's concoction": { areas: ["Grand Heist (Curio Display)"], notes: "Granite Flask (Replica)", sourceType: "league" },

  // ════════════════════════════════════════════════════════════════════════════
  // RITUAL
  // ════════════════════════════════════════════════════════════════════════════

  "survivor's guilt": {
    areas: ["Ritual Encounter"],
    notes: "Studded Belt — exclusive Ritual reward",
    sourceType: "league",
  },
  nametaker: {
    areas: ["Ritual Encounter", "Viridian Wildwood"],
    notes: "Pecoraro (1H Sword) — drops from Ritual or Viridian Wildwood enemies",
    sourceType: "league",
  },
  "relic of the pact": {
    areas: ["Ultimatum Encounter"],
    notes: "Prophecy Wand — random Ultimatum reward",
    sourceType: "league",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // ULTIMATUM
  // ════════════════════════════════════════════════════════════════════════════

  "ixchel's temptation": {
    bosses: ["The Trialmaster"],
    areas: ["Ultimatum Encounter"],
    notes: "Unset Ring — drops from the Trialmaster",
    sourceType: "league",
  },
  "yaomac's accord": {
    bosses: ["The Trialmaster"],
    areas: ["Ultimatum Encounter"],
    notes: "Karui Sceptre — drops from the Trialmaster",
    sourceType: "league",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // LORD'S LABYRINTH
  // ════════════════════════════════════════════════════════════════════════════

  "xirgil's crank": {
    areas: ["Lord's Labyrinth"],
    notes: "Ezomyte Staff (Warstaff) — can only drop in the Labyrinth",
    sourceType: "league",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // SANCTUM
  // ════════════════════════════════════════════════════════════════════════════

  "the dark seer": {
    bosses: ["Nightmare of Lycia"],
    areas: ["Sanctuary Map (Sanctum)"],
    notes: "Crystal Sceptre",
    sourceType: "league",
  },
  "the burden of shadows": {
    bosses: ["The King in the Mists"],
    areas: ["Crux of Nothingness (Sanctum)"],
    notes: "Lathi (Staff)",
    sourceType: "league",
  },
  "the winds of fate": {
    bosses: ["Lycia, Herald of the Scourge"],
    areas: ["Sanctum"],
    notes: "Ezomyte Staff (Warstaff) — apply Lycia to a Sanctum with a level 83 Forbidden Tome",
    sourceType: "league",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // KINGSMARCH (SETTLERS OF KALGUUR)
  // ════════════════════════════════════════════════════════════════════════════

  "ynda's stand": {
    areas: ["Kingsmarch (Settlers of Kalguur)"],
    notes: "Studded Belt — reward for shipping resources to Riben Fell, Pondium, or Kalguur",
    sourceType: "league",
  },
  "tawhoa's felling": {
    areas: ["Kingsmarch (Settlers of Kalguur)"],
    notes: "Terror Maul (2H Mace) — reward for shipping resources to Ngakanu or Te Onui",
    sourceType: "league",
  },
  "cadigan's authority": {
    areas: ["Kingsmarch (Settlers of Kalguur)"],
    notes: "Void Sceptre — random reward for shipping resources from Kingsmarch",
    sourceType: "league",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // WARBANDS
  // ════════════════════════════════════════════════════════════════════════════

  "the pariah": {
    areas: ["Renegades Warband"],
    notes: "Unset Ring — drops from Renegades warband encounters",
    sourceType: "league",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // MAP-SPECIFIC (no league mechanic — drops in a specific unique map)
  // ════════════════════════════════════════════════════════════════════════════

  "vessel of vinktar": {
    areas: ["The Vinktar Square"],
    notes: "Bismuth Flask — drops exclusively in Tier 12+ The Vinktar Square maps",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // CAMPAIGN
  // ════════════════════════════════════════════════════════════════════════════

  "oni-goroshi": {
    bosses: ["Hillock (Act 1)"],
    notes: "Charan's Sword (1H) — guaranteed rare drop from Hillock on the Twilight Strand; requires many attempts",
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Returns the effective acquisition display info for a unique item.
 *
 * Rules:
 *   - divCardOnly → return the div card source.
 *   - bosses or areas exist → return them (div card suppressed).
 *   - globalDrop or not in map → return { globalDrop: true }.
 */
export function getAcquisitionSource(
  itemName: string
): UniqueDropSource | null {
  const key = itemName.toLowerCase();
  const source = UNIQUE_DROP_SOURCES[key];

  if (!source) {
    return { globalDrop: true };
  }

  if (source.divCardOnly) return source;

  if ((source.bosses && source.bosses.length > 0) ||
      (source.areas && source.areas.length > 0)) {
    const { divCard: _suppressed, ...displaySource } = source;
    return displaySource;
  }

  if (source.globalDrop) return source;

  return { globalDrop: true };
}

/**
 * Given a kill-fragment boss name and the list of build unique item names,
 * returns the names of items that drop from that specific boss.
 * Div-card-only and global-drop items are excluded.
 */
export function getDropsForBoss(
  bossName: string,
  buildUniqueNames: string[]
): string[] {
  const lowerBoss = bossName.toLowerCase();
  return buildUniqueNames.filter((name) => {
    const source = UNIQUE_DROP_SOURCES[name.toLowerCase()];
    if (!source || source.divCardOnly || source.globalDrop) return false;
    return source.bosses?.some((b) => b.toLowerCase() === lowerBoss) ?? false;
  });
}

/**
 * Returns all build-relevant unique items that are div-card-only.
 * These are shown in a separate callout section rather than route annotations.
 */
export function getDivCardOnlyItems(buildUniqueNames: string[]): string[] {
  return buildUniqueNames.filter((name) => {
    const source = UNIQUE_DROP_SOURCES[name.toLowerCase()];
    return source?.divCardOnly === true;
  });
}
