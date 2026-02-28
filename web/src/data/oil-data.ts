/**
 * Oil tiers used for amulet anointments, verified against:
 * https://www.poewiki.net/wiki/Oil
 *
 * Tiers 1–13 are the regular oils (Clear → Golden).
 * Prismatic Oil (tier 0) is used for exclusive notable passives not on the tree.
 * Tainted/Reflective oils allow corrupted/mirrored items but are not combination oils.
 *
 * Order matches in-game tier order (cheapest first).
 */

export type OilName =
  | "Clear"
  | "Sepia"
  | "Amber"
  | "Verdant"
  | "Teal"
  | "Indigo"
  | "Violet"
  | "Crimson"
  | "Black"
  | "Azure"
  | "Silver"
  | "Opalescent"
  | "Golden"
  | "Prismatic";

export const OIL_NAMES: OilName[] = [
  "Clear",
  "Sepia",
  "Amber",
  "Verdant",
  "Teal",
  "Indigo",
  "Violet",
  "Crimson",
  "Black",
  "Azure",
  "Silver",
  "Opalescent",
  "Golden",
  "Prismatic",
];

/** Display colour hints for each oil tier */
export const OIL_COLOURS: Record<OilName, string> = {
  Clear: "#d0d0d0",
  Sepia: "#c8a882",
  Amber: "#f0a840",
  Verdant: "#60c060",
  Teal: "#40c0c0",
  Indigo: "#6060e0",
  Violet: "#c040c0",
  Crimson: "#e04040",
  Black: "#707070",
  Azure: "#4090e0",
  Silver: "#b0c0d0",
  Opalescent: "#d0c8f0",
  Golden: "#f0d040",
  Prismatic: "#f0f0f0",
};
