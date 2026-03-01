/**
 * Maps lowercase unique item names to their drop source(s) in endgame content.
 *
 * ── DIVINATION CARD RULE ─────────────────────────────────────────────────────
 * Div card recipes are NEVER shown as an acquisition method unless
 * `divCardOnly: true` — meaning no reliable direct drop source exists.
 * If a direct boss/area drop exists, always prefer that over a div card.
 *
 * ── GLOBAL DROP RULE ─────────────────────────────────────────────────────────
 * Items not in this map, or explicitly marked `globalDrop: true`, are shown as
 * "Global Drop" in the UI — meaning they have no restricted drop location and
 * can drop from any monster in any zone.
 *
 * ── MULTIPLE SOURCES ─────────────────────────────────────────────────────────
 * `bosses` accepts an array for items that drop from several endgame bosses.
 * `areas` accepts an array for items tied to specific zones/encounters.
 * All entries in both arrays are shown in the UI.
 *
 * ── SOURCE TYPE ──────────────────────────────────────────────────────────────
 * `sourceType` drives colour-coding in the UI:
 *   "pinnacle" — Maven, Searing Exarch, Eater of Worlds, Shaper, Uber Elder
 *   "guardian" — Shaper Guardian map bosses
 *   "league"   — League-mechanic encounters (Legion 5-way, etc.)
 */

export interface UniqueDropSource {
  /**
   * One or more boss names matching `kill` fragments in route files.
   * Used for voidstone boss route annotation and Dashboard display.
   */
  bosses?: string[];
  /**
   * One or more area/encounter names where this item drops outside of a
   * specific boss kill (e.g. "Domain of Timeless Conflict").
   * Shown in Dashboard but does NOT annotate route steps.
   */
  areas?: string[];
  /** Short acquisition note shown in the badge tooltip. */
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
   * Visual category used for colour-coding the source label in the UI.
   *   "pinnacle" — Uber Elder, Shaper, Maven, Searing Exarch, Eater of Worlds
   *   "guardian" — Shaper Guardian map bosses
   *   "league"   — League-mechanic encounters (Legion, etc.)
   */
  sourceType?: "pinnacle" | "guardian" | "league";
}

export const UNIQUE_DROP_SOURCES: Record<string, UniqueDropSource> = {
  // ── Div-card-only items ───────────────────────────────────────────────────
  // No reliable direct drop source exists. The div card IS shown.
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
  mirror_of_kalandra: {
    divCard: "The Reflection",
    divCardOnly: true,
    notes: "Obtain via 9× The Reflection divination cards",
  },

  // ── Uber Elder ────────────────────────────────────────────────────────────
  "watcher's eye": {
    bosses: ["The Uber Elder"],
    notes: "Prismatic Jewel — unique drop from Uber Elder",
    divCard: "The Enlightened",
    sourceType: "pinnacle",
  },
  "bottled faith": {
    bosses: ["The Uber Elder"],
    notes: "Sulphur Flask — unique drop from Uber Elder",
    sourceType: "pinnacle",
  },

  // ── The Shaper ────────────────────────────────────────────────────────────
  starforge: {
    bosses: ["The Shaper"],
    notes: "Infernal Sword — unique drop from The Shaper",
    divCard: "The Shaper",
    sourceType: "pinnacle",
  },
  voidfletcher: {
    bosses: ["The Shaper"],
    notes: "Penetrating Arrow Quiver — unique drop from The Shaper",
    sourceType: "pinnacle",
  },

  // ── The Maven ─────────────────────────────────────────────────────────────
  "the devoted": {
    bosses: ["The Maven"],
    notes: "Karui Chopper — unique drop from The Maven",
    sourceType: "pinnacle",
  },
  "the hidden blade": {
    bosses: ["The Maven"],
    notes: "Whittling Knife — unique drop from The Maven",
    sourceType: "pinnacle",
  },
  // Forbidden Flame/Flesh drop from all three pinnacle bosses —
  // the boss killed determines which ascendancy node is rolled on the jewel.
  "forbidden flame": {
    bosses: ["The Maven", "The Searing Exarch", "The Eater of Worlds"],
    notes:
      "Crimson Jewel — drops from Maven, Searing Exarch, or Eater of Worlds. " +
      "The boss killed determines the ascendancy node rolled.",
    sourceType: "pinnacle",
  },
  "forbidden flesh": {
    bosses: ["The Maven", "The Searing Exarch", "The Eater of Worlds"],
    notes:
      "Viridian Jewel — drops from Maven, Searing Exarch, or Eater of Worlds. " +
      "The boss killed determines the ascendancy node rolled.",
    sourceType: "pinnacle",
  },

  // ── The Eater of Worlds ───────────────────────────────────────────────────
  "dissolution of the flesh": {
    bosses: ["The Eater of Worlds"],
    notes: "Viridian Jewel — unique drop from Eater of Worlds",
    sourceType: "pinnacle",
  },

  // ── Shaper Guardians ──────────────────────────────────────────────────────
  "dying sun": {
    bosses: ["The Shaper Guardian (Hydra)"],
    areas: ["Lair of the Hydra"],
    notes: "Ruby Flask — drops from the Hydra guardian map",
    divCard: "The Flask",
    sourceType: "guardian",
  },
  "taste of hate": {
    bosses: ["The Shaper Guardian (Phoenix)"],
    areas: ["Forge of the Phoenix"],
    notes: "Sapphire Flask — drops from the Phoenix guardian map",
    sourceType: "guardian",
  },
  surrender: {
    bosses: ["The Shaper Guardian (Minotaur)"],
    areas: ["Maze of the Minotaur"],
    notes: "Ezomyte Tower Shield — drops from the Minotaur guardian map",
    sourceType: "guardian",
  },
  impresence: {
    bosses: ["The Shaper Guardian (Chimera)"],
    areas: ["Pit of the Chimera"],
    notes:
      "Onyx Amulet — drops from the Chimera guardian map (any element version)",
    sourceType: "guardian",
  },

  // ── Atziri, Queen of the Vaal ─────────────────────────────────────────────
  // Drops from Atziri in Apex of Sacrifice (and Uber Atziri in Alluring Abyss).
  "atziri's disfavour": {
    bosses: ["Atziri, Queen of the Vaal"],
    areas: ["Apex of Sacrifice"],
    notes: "Great Axe — unique drop from Atziri, Queen of the Vaal",
    sourceType: "pinnacle",
  },
  "atziri's mirror": {
    bosses: ["Atziri, Queen of the Vaal"],
    areas: ["Apex of Sacrifice"],
    notes: "Tarnished Spirit Shield — unique drop from Atziri, Queen of the Vaal",
    sourceType: "pinnacle",
  },
  "atziri's promise": {
    bosses: ["Atziri, Queen of the Vaal"],
    areas: ["Apex of Sacrifice"],
    notes: "Amethyst Flask — unique drop from Atziri, Queen of the Vaal",
    sourceType: "pinnacle",
  },

  // ── Delve ─────────────────────────────────────────────────────────────────
  "aul's uprising": {
    bosses: ["Aul, the Crystal King"],
    notes: "Cobalt Jewel — unique drop from Aul, the Crystal King in Delve",
    sourceType: "league",
  },

  // ── Timeless Jewels ───────────────────────────────────────────────────────
  // Primary source: the matching legion in Domain of Timeless Conflict (5-way).
  // Secondary source: extremely rare world drop from the named monster below.
  // Cannot be chanced. Verified against poewiki.net/wiki/[jewel name].
  "lethal pride": {
    bosses: ["Queen Hyrri Ngamaku"],
    areas: ["Domain of Timeless Conflict"],
    notes:
      "Timeless Jewel (Karui) — primarily from Karui legion in 5-way encounters. " +
      "Extremely rarely from Queen Hyrri Ngamaku. Cannot be chanced.",
    sourceType: "league",
  },
  "brutal restraint": {
    bosses: ["Nassar, Lion of the Seas"],
    areas: ["Domain of Timeless Conflict"],
    notes:
      "Timeless Jewel (Maraketh) — primarily from Maraketh legion in 5-way encounters. " +
      "Extremely rarely from Nassar, Lion of the Seas. Cannot be chanced.",
    sourceType: "league",
  },
  "militant faith": {
    bosses: ["High Templar Dominus"],
    areas: ["Domain of Timeless Conflict"],
    notes:
      "Timeless Jewel (Templar) — primarily from Templar legion in 5-way encounters. " +
      "Extremely rarely from High Templar Dominus. Cannot be chanced.",
    sourceType: "league",
  },
  "glorious vanity": {
    bosses: ["Xibaqua"],
    areas: ["Domain of Timeless Conflict"],
    notes:
      "Timeless Jewel (Vaal) — primarily from Vaal legion in 5-way encounters. " +
      "Extremely rarely from Xibaqua. Cannot be chanced.",
    sourceType: "league",
  },
  "elegant hubris": {
    bosses: ["Victario, the People's Hero"],
    areas: ["Domain of Timeless Conflict"],
    notes:
      "Timeless Jewel (Eternal Empire) — primarily from Eternal legion in 5-way encounters. " +
      "Extremely rarely from Victario, the People's Hero. Cannot be chanced.",
    sourceType: "league",
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
    // Item not in our map → treat as a global drop
    return { globalDrop: true };
  }

  if (source.divCardOnly) return source;

  if ((source.bosses && source.bosses.length > 0) ||
      (source.areas && source.areas.length > 0)) {
    // Strip divCard so callers never accidentally surface it
    const { divCard: _suppressed, ...displaySource } = source;
    return displaySource;
  }

  if (source.globalDrop) return source;

  // In map but has no useful display data → treat as global drop
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
