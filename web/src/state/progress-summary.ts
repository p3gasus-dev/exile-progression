/**
 * Derived selectors that compute total/completed counts for the three trackers:
 * ACT route, voidstones, and challenges.
 *
 * Used by the Dashboard to show summary progress bars.
 */

import { routeSelector } from "./route";
import { voidstoneRouteSelector } from "./voidstone-route";
import { routeProgressKeys } from "./route-progress";
import { voidstoneProgressSelectorFamily } from "./voidstone-progress";
import { challengeProgressKeys } from "./challenge-progress";
import { CHALLENGES } from "../data/challenge-list";
import { selector } from "recoil";

// ── ACT route progress ────────────────────────────────────────────────────────

export const routeProgressSummarySelector = selector({
  key: "routeProgressSummarySelector",
  get: async ({ get }) => {
    const route = await get(routeSelector);

    // Only count fragment_step — gem steps share the same toggle key space
    let total = 0;
    for (const section of route) {
      for (const step of section.steps) {
        if (step.type === "fragment_step") total++;
      }
    }

    const completed = [...routeProgressKeys()].length;
    return { total, completed };
  },
});

// ── Voidstone progress ────────────────────────────────────────────────────────
//
// We derive completion by scanning the parsed voidstone route for `kill`
// fragment steps, then reading each step's toggle key directly.
// This means "1 voidstone complete" = the kill step for that boss is checked,
// regardless of how many generic steps precede it.

export const voidstoneProgressSummarySelector = selector({
  key: "voidstoneProgressSummarySelector",
  get: async ({ get }) => {
    const route = await get(voidstoneRouteSelector);

    const killKeys: string[] = [];

    for (let sectionIndex = 0; sectionIndex < route.length; sectionIndex++) {
      const section = route[sectionIndex];
      for (let stepIndex = 0; stepIndex < section.steps.length; stepIndex++) {
        const step = section.steps[stepIndex];
        if (step.type !== "fragment_step") continue;

        // A step is a "voidstone kill step" if it contains exactly one kill fragment
        const hasKill = step.parts.some(
          (p) => typeof p !== "string" && p.type === "kill"
        );
        if (hasKill) {
          killKeys.push(`${sectionIndex},${stepIndex}`);
        }
      }
    }

    const total = 4; // there are always exactly 4 voidstone bosses
    let completed = 0;
    for (const key of killKeys) {
      if (get(voidstoneProgressSelectorFamily(key))) completed++;
    }
    // Cap at 4 in case route files somehow contain more kill steps
    return { total, completed: Math.min(completed, total) };
  },
});

// ── Challenge progress ────────────────────────────────────────────────────────

export const challengeProgressSummarySelector = selector({
  key: "challengeProgressSummarySelector",
  get: () => {
    const total = CHALLENGES.length;
    const completed = [...challengeProgressKeys()].length;
    return { total, completed };
  },
});
