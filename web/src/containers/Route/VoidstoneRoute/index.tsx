import { FragmentStep } from "../../../components/FragmentStep";
import { SectionHolder } from "../../../components/SectionHolder";
import { TaskListProps } from "../../../components/TaskList";
import { voidstoneProgressSelectorFamily } from "../../../state/voidstone-progress";
import { voidstoneRouteSelector } from "../../../state/voidstone-route";
import { configSelector } from "../../../state/config";
import { BOSS_CHALLENGE_MAP, RouteChallengeRef } from "../../../data/challenge-list";
import { BOSS_STEP_HINTS } from "../../../data/stat-targets";
import { StatHintChips } from "../../../components/StatHintChips";
import { Fragments } from "../../../../../common/route-processing/fragment/types";
import { challengeProgressSelectorFamily } from "../../../state/challenge-progress";
import { ReactNode } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";

/**
 * Extracts all boss names referenced by `kill` fragments in a step.
 */
function getBossNamesFromStep(
  parts: Fragments.AnyFragment[]
): string[] {
  return parts
    .filter(
      (p): p is Fragments.KillFragment =>
        typeof p !== "string" && p.type === "kill"
    )
    .map((p) => p.value);
}

export default function VoidstoneRoute() {
  const route = useRecoilValue(voidstoneRouteSelector);
  const config = useRecoilValue(configSelector);

  // Auto-complete challenges when a pinnacle kill step is checked off
  const completeChallenges = useRecoilCallback(
    ({ set }) =>
      (ids: string[]) => {
        for (const id of ids) {
          set(challengeProgressSelectorFamily(id), true);
        }
      },
    []
  );

  const items: ReactNode[] = [];

  for (let sectionIndex = 0; sectionIndex < route.length; sectionIndex++) {
    const section = route[sectionIndex];
    const taskItems: TaskListProps["items"] = [];

    for (let stepIndex = 0; stepIndex < section.steps.length; stepIndex++) {
      const step = section.steps[stepIndex];
      if (step.type !== "fragment_step") continue;

      const bossNames = getBossNamesFromStep(step.parts);
      const isPinnacleKill = bossNames.length > 0;
      const isAscend = step.parts.some(
        (p) => typeof p !== "string" && p.type === "ascend"
      );

      // Collect challenge refs for each boss kill in this step
      const stepChallenges: RouteChallengeRef[] = bossNames.flatMap(
        (boss) => BOSS_CHALLENGE_MAP[boss]?.[0] ? [BOSS_CHALLENGE_MAP[boss][0]] : []
      );

      // Collect stat hints for each boss kill in this step
      const stepBossHints = bossNames.flatMap(
        (boss) => BOSS_STEP_HINTS[boss] ?? []
      );

      const challengeIds = stepChallenges.map((c) => c.id);

      taskItems.push({
        key: stepIndex,
        isCompletedState: voidstoneProgressSelectorFamily(
          `${sectionIndex},${stepIndex}`
        ),
        highlight: isPinnacleKill ? "pinnacle" : isAscend ? "ascend" : undefined,
        onToggle: challengeIds.length > 0
          ? (complete) => { if (complete) completeChallenges(challengeIds); }
          : undefined,
        children: (
          <>
            <FragmentStep step={step} />
            {config.showStatHints && stepBossHints.length > 0 && (
              <StatHintChips hints={stepBossHints} />
            )}
          </>
        ),
      });
    }

    items.push(
      <SectionHolder
        key={sectionIndex}
        name={section.name}
        items={taskItems}
      />
    );
  }

  return <>{items}</>;
}
