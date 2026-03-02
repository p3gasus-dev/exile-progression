/**
 * Derived selectors that compute total/completed counts for the three trackers:
 * ACT route, voidstones, and challenges.
 *
 * Used by the Dashboard to show summary progress bars.
 */

import { routeSelector } from "./route";
import { voidstoneRouteSelector } from "./voidstone-route";
import { routeProgressKeys, routeProgressSelectorFamily } from "./route-progress";
import { voidstoneProgressSelectorFamily } from "./voidstone-progress";
import { challengeProgressKeys } from "./challenge-progress";
import { CHALLENGES } from "../data/challenge-list";
import { Fragments } from "../../../common/route-processing/fragment/types";
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

// ── ACT route current section ─────────────────────────────────────────────────
//
// Returns the first section with uncompleted fragment_steps, its counts, and
// the parts[] of each remaining step so the Dashboard can render them.

export const routeCurrentSectionSelector = selector({
  key: "routeCurrentSectionSelector",
  get: async ({ get }) => {
    const route = await get(routeSelector);

    for (let si = 0; si < route.length; si++) {
      const section = route[si];
      let sectionTotal = 0;
      let sectionCompleted = 0;
      const pendingParts: Fragments.AnyFragment[][] = [];

      for (let ti = 0; ti < section.steps.length; ti++) {
        const step = section.steps[ti];
        if (step.type !== "fragment_step") continue;
        sectionTotal++;
        if (get(routeProgressSelectorFamily(`${si},${ti}`))) {
          sectionCompleted++;
        } else {
          pendingParts.push(step.parts);
        }
      }

      if (sectionCompleted < sectionTotal) {
        return { sectionName: section.name, completed: sectionCompleted, total: sectionTotal, pendingParts };
      }
    }

    return null; // all sections complete
  },
});

// ── Per-act section progress ──────────────────────────────────────────────────

export interface SectionProgress {
  name: string;
  completed: number;
  total: number;
}

export const routeSectionProgressSelector = selector<SectionProgress[]>({
  key: "routeSectionProgressSelector",
  get: async ({ get }) => {
    const route = await get(routeSelector);
    return route.map((section, si) => {
      let total = 0;
      let completed = 0;
      for (let ti = 0; ti < section.steps.length; ti++) {
        const step = section.steps[ti];
        if (step.type !== "fragment_step") continue;
        total++;
        if (get(routeProgressSelectorFamily(`${si},${ti}`))) completed++;
      }
      return { name: section.name, completed, total };
    });
  },
});

// ── Per-voidstone-section progress ────────────────────────────────────────────

export const voidstoneSectionProgressSelector = selector<SectionProgress[]>({
  key: "voidstoneSectionProgressSelector",
  get: async ({ get }) => {
    const route = await get(voidstoneRouteSelector);
    return route.map((section, si) => {
      let total = 0;
      let completed = 0;
      for (let ti = 0; ti < section.steps.length; ti++) {
        const step = section.steps[ti];
        if (step.type !== "fragment_step") continue;
        total++;
        if (get(voidstoneProgressSelectorFamily(`${si},${ti}`))) completed++;
      }
      return { name: section.name, completed, total };
    });
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
