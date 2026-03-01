import { cargoQuery } from "../wiki";

/**
 * Item classes that count as "armour" in the wiki — excluded from results.
 * The wiki list pages for helmets, body armours, gloves, and boots are
 * intentionally skipped per project convention.
 */
const ARMOUR_CLASSES = new Set([
  "Helmet",
  "Body Armour",
  "Gloves",
  "Boots",
]);

/**
 * Drop-text substrings that identify event-only items.
 * These are skipped because they cannot be obtained in standard play.
 */
const EVENT_DROP_TEXT_PATTERNS = [
  /\bevent\b/i,
  /\brace season\b/i,
  /\bleague event\b/i,
  /\bchallenge league\b/i,
];

export interface WikiUniqueDropInfo {
  /** Canonical display name from the wiki (may differ in capitalisation). */
  name: string;
  /** PoE item class (e.g. "Axe", "Jewel", "Flask"). */
  itemClass: string;
  /**
   * Raw "Additional drop restrictions" text shown in the wiki tables.
   * Empty string when the item is a global drop.
   */
  dropText: string;
  /**
   * Specific monsters / bosses that drop this item, as listed on the wiki.
   * Comes from the `drop_monsters` Cargo field (comma-separated list).
   */
  dropMonsters: string[];
  /**
   * Specific areas where this item can drop, as listed on the wiki.
   * Comes from the `drop_areas` Cargo field (comma-separated list).
   */
  dropAreas: string[];
}

/**
 * Queries the PoE wiki Cargo API and returns all non-armour, non-disabled,
 * non-event unique items that have "Additional drop restrictions".
 *
 * Items with no drop restrictions are NOT returned — they are global drops.
 *
 * Field names used here match the `items` Cargo table on poewiki.net.
 * If the field names change, adjust the `fields` array below.
 *
 * Usage:
 *   import { getUniqueDropRestrictions } from "./seeding/unique-drops";
 *   const drops = await getUniqueDropRestrictions();
 */
export async function getUniqueDropRestrictions(): Promise<
  WikiUniqueDropInfo[]
> {
  // Query only items that actually have some drop restriction data.
  // drop_enabled = '0' means the item cannot drop at all (drop-disabled).
  const rows = await cargoQuery({
    tables: ["items"],
    fields: [
      "items.name=name",
      "items.class=itemClass",
      "items.drop_text=dropText",
      "items.drop_monsters=dropMonsters",
      "items.drop_areas=dropAreas",
    ],
    where: [
      "items.rarity = 'Unique'",
      // Exclude drop-disabled items.  The wiki stores this as '0' or 'false'.
      "(items.drop_enabled IS NULL OR items.drop_enabled != '0')",
      // Only fetch items that actually have some restriction data — items
      // with none of these fields set are global drops and need no entry.
      "(items.drop_text IS NOT NULL OR items.drop_monsters IS NOT NULL OR items.drop_areas IS NOT NULL)",
      // Exclude template pages that cargo sometimes includes.
      "items._pageName NOT LIKE 'Template:%'",
    ].join(" AND "),
    order_by: ["items.class", "items.name"],
  });

  const results: WikiUniqueDropInfo[] = [];

  for (const row of rows as any[]) {
    const itemClass: string = row.itemClass ?? "";
    const dropText: string = row.dropText ?? "";

    // Skip armour items.
    if (ARMOUR_CLASSES.has(itemClass)) continue;

    // Skip event-only items based on their drop text.
    if (EVENT_DROP_TEXT_PATTERNS.some((re) => re.test(dropText))) continue;

    const dropMonsters: string[] = row.dropMonsters
      ? (row.dropMonsters as string)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const dropAreas: string[] = row.dropAreas
      ? (row.dropAreas as string)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    results.push({
      name: row.name ?? "",
      itemClass,
      dropText,
      dropMonsters,
      dropAreas,
    });
  }

  return results;
}

/**
 * Pretty-prints the fetched drop restriction data to stdout.
 * Run directly with:   npx tsx seeding/src/seeding/unique-drops.ts
 */
async function main() {
  console.log("Fetching unique item drop restrictions from poewiki.net…");
  const drops = await getUniqueDropRestrictions();

  console.log(`\nFound ${drops.length} unique items with drop restrictions:\n`);
  for (const item of drops) {
    console.log(`[${item.itemClass}] ${item.name}`);
    if (item.dropText) console.log(`  drop_text:     ${item.dropText}`);
    if (item.dropMonsters.length)
      console.log(`  drop_monsters: ${item.dropMonsters.join(", ")}`);
    if (item.dropAreas.length)
      console.log(`  drop_areas:    ${item.dropAreas.join(", ")}`);
  }
}

// Only run main() when this file is executed directly (not when imported).
if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
