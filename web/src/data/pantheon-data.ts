/**
 * Pantheon god data, verified against:
 * https://www.poewiki.net/wiki/The_Pantheon
 *
 * 4 major gods, 8 minor gods.
 * Players choose one major + one minor at a time.
 */

export interface PantheonGod {
  id: string;
  name: string;
  /** Primary base effect (before upgrades) */
  effect: string;
}

export const MAJOR_GODS: PantheonGod[] = [
  {
    id: "lunaris",
    name: "Soul of Lunaris",
    effect: "1% additional Physical Damage Reduction per nearby Enemy (up to 8%), 1% increased Movement Speed per nearby Enemy (up to 8%)",
  },
  {
    id: "solaris",
    name: "Soul of Solaris",
    effect: "6% additional Physical Damage Reduction while there is only one nearby Enemy, 20% chance to take 50% less Area Damage from Hits",
  },
  {
    id: "arakaali",
    name: "Soul of Arakaali",
    effect: "10% reduced Damage taken from Damage Over Time",
  },
  {
    id: "brine_king",
    name: "Soul of the Brine King",
    effect: "You cannot be Stunned if you've been Stunned or Blocked a Stunning Hit in the past 2 seconds",
  },
];

export const MINOR_GODS: PantheonGod[] = [
  {
    id: "abberath",
    name: "Soul of Abberath",
    effect: "60% less Duration of Ignite on You",
  },
  {
    id: "garukhan",
    name: "Soul of Garukhan",
    effect: "6% increased Movement Speed if you haven't been Hit Recently",
  },
  {
    id: "gruthkul",
    name: "Soul of Gruthkul",
    effect: "1% additional Physical Damage Reduction for each Hit you've taken Recently up to a maximum of 5%",
  },
  {
    id: "ralakesh",
    name: "Soul of Ralakesh",
    effect: "25% reduced Physical Damage over Time taken while moving, Moving while Bleeding doesn't cause you to take extra Damage",
  },
  {
    id: "ryslatha",
    name: "Soul of Ryslatha",
    effect: "Life Flasks gain 3 Charges every 3 seconds while you are not on Full Life",
  },
  {
    id: "shakari",
    name: "Soul of Shakari",
    effect: "50% less Duration of Poisons on You, You cannot be Poisoned while there are at least 3 Poisons on you",
  },
  {
    id: "tukohama",
    name: "Soul of Tukohama",
    effect: "While Stationary, gain 0.5% of Life Regenerated per second every second, up to a maximum of 4%",
  },
  {
    id: "yugul",
    name: "Soul of Yugul",
    effect: "You and your Minions take 50% reduced Reflected Damage, 50% chance to Reflect Hexes",
  },
];

export const ALL_GODS = [...MAJOR_GODS, ...MINOR_GODS];
