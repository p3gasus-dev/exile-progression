/**
 * Maps lowercase unique item names to their drop source in endgame/voidstone content.
 *
 * DIVINATION CARD RULE:
 *   Divination card recipes are NEVER shown as an acquisition method unless
 *   `divCardOnly: true` — meaning there is no reliable direct drop source.
 *
 *   If a direct boss/area drop exists, always prefer that over a div card.
 *   divCard is stored for reference only; it is not surfaced in the UI unless
 *   divCardOnly is true.
 */

export interface UniqueDropSource {
  /** The boss name matching the `kill` fragment in voidstone route files. */
  boss?: string;
  /** The map/area name where the item drops (used for annotation context). */
  area?: string;
  /** Short acquisition note shown in the badge tooltip. */
  notes?: string;
  /**
   * The divination card name that yields this item.
   * Stored for reference but NEVER shown unless divCardOnly is true.
   */
  divCard?: string;
  /**
   * True when a divination card trade is the ONLY practical acquisition method —
   * i.e. no boss, area, or direct drop source exists.
   * When true, the div card IS shown as the source.
   */
  divCardOnly?: boolean;
}

export const UNIQUE_DROP_SOURCES: Record<string, UniqueDropSource> = {
  // ── Div-card-only items ───────────────────────────────────────────────────
  // These items have no reliable direct drop source. The div card IS shown.
  headhunter: {
    divCard: "The Doctor",
    divCardOnly: true,
    notes: "Obtain via 8× The Doctor divination cards (no reliable direct drop)",
  },
  mageblood: {
    divCard: "The Apothecary",
    divCardOnly: true,
    notes: "Obtain via 5× The Apothecary divination cards (no reliable direct drop)",
  },
  mirror_of_kalandra: {
    divCard: "The Reflection",
    divCardOnly: true,
    notes: "Obtain via 9× The Reflection divination cards (no reliable direct drop)",
  },

  // ── Uber Elder ────────────────────────────────────────────────────────────
  // divCard stored for reference; NOT shown in UI (direct drop exists)
  "watcher's eye": {
    boss: "The Uber Elder",
    notes: "Prismatic Jewel — unique drop from Uber Elder",
    divCard: "The Enlightened",
  },
  "bottled faith": {
    boss: "The Uber Elder",
    notes: "Sulphur Flask — unique drop from Uber Elder",
  },

  // ── The Shaper ────────────────────────────────────────────────────────────
  starforge: {
    boss: "The Shaper",
    notes: "Infernal Sword — unique drop from The Shaper",
    divCard: "The Shaper",
  },
  "shaper's touch": {
    boss: "The Shaper",
    notes: "Wyrmscale Gauntlets — unique drop from The Shaper",
  },
  voidfletcher: {
    boss: "The Shaper",
    notes: "Penetrating Arrow Quiver — unique drop from The Shaper",
  },

  // ── The Maven ─────────────────────────────────────────────────────────────
  "the devoted": {
    boss: "The Maven",
    notes: "Karui Chopper — unique drop from The Maven",
  },
  "the hidden blade": {
    boss: "The Maven",
    notes: "Whittling Knife — unique drop from The Maven",
  },
  "forbidden shako": {
    boss: "The Maven",
    notes: "Iron Hat — unique drop from The Maven (contains awakened gems)",
  },
  "forbidden flame": {
    boss: "The Maven",
    notes:
      "Crimson Jewel — drops from Maven, Searing Exarch, or Eater of Worlds. " +
      "Boss determines the ascendancy node rolled.",
  },
  "forbidden flesh": {
    boss: "The Maven",
    notes:
      "Viridian Jewel — drops from Maven, Searing Exarch, or Eater of Worlds.",
  },

  // ── The Searing Exarch ────────────────────────────────────────────────────
  "eber's unification": {
    boss: "The Searing Exarch",
    notes: "Hubris Circlet — unique helmet from Searing Exarch",
  },

  // ── The Eater of Worlds ───────────────────────────────────────────────────
  "dissolution of the flesh": {
    boss: "The Eater of Worlds",
    notes: "Viridian Jewel — unique drop from Eater of Worlds",
  },

  // ── Shaper Guardians ──────────────────────────────────────────────────────
  "dying sun": {
    boss: "The Shaper Guardian (Hydra)",
    area: "Lair of the Hydra",
    notes: "Ruby Flask — drops from the Hydra guardian map",
    divCard: "The Flask",
  },
  "taste of hate": {
    boss: "The Shaper Guardian (Phoenix)",
    area: "Forge of the Phoenix",
    notes: "Sapphire Flask — drops from the Phoenix guardian map",
  },
  surrender: {
    boss: "The Shaper Guardian (Minotaur)",
    area: "Maze of the Minotaur",
    notes: "Ezomyte Tower Shield — drops from the Minotaur guardian map",
  },
  impresence: {
    boss: "The Shaper Guardian (Chimera)",
    area: "Pit of the Chimera",
    notes: "Onyx Amulet — drops from the Chimera guardian map (any element version)",
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Returns the effective acquisition display info for a unique item,
 * applying the divination card rule:
 *   - If divCardOnly is true  → return the div card as the source.
 *   - If a boss/area exists   → return boss/area (div card is suppressed).
 *   - Otherwise               → return null (item not in our source list).
 */
export function getAcquisitionSource(
  itemName: string
): UniqueDropSource | null {
  const source = UNIQUE_DROP_SOURCES[itemName.toLowerCase()];
  if (!source) return null;

  // Div-card-only: no direct source exists, show the card
  if (source.divCardOnly) return source;

  // Direct source exists — return it, never the div card
  if (source.boss || source.area) {
    // Return a copy without divCard so callers never accidentally surface it
    const { divCard: _suppressed, ...displaySource } = source;
    return displaySource;
  }

  return null;
}

/**
 * Given a kill fragment boss name and the list of unique item names from
 * the imported build, returns the names of items that drop from that boss.
 * Div-card-only items are never matched against boss kill steps.
 */
export function getDropsForBoss(
  bossName: string,
  buildUniqueNames: string[]
): string[] {
  const lowerBoss = bossName.toLowerCase();
  return buildUniqueNames.filter((name) => {
    const source = UNIQUE_DROP_SOURCES[name.toLowerCase()];
    // Exclude items that are div-card-only — they have no boss kill step
    if (!source || source.divCardOnly) return false;
    return source.boss?.toLowerCase() === lowerBoss;
  });
}

/**
 * Returns all build-relevant unique items that are div-card-only.
 * These are shown in a separate section (e.g. Dashboard / Build tab)
 * rather than annotated on a route step.
 */
export function getDivCardOnlyItems(buildUniqueNames: string[]): string[] {
  return buildUniqueNames.filter((name) => {
    const source = UNIQUE_DROP_SOURCES[name.toLowerCase()];
    return source?.divCardOnly === true;
  });
}
