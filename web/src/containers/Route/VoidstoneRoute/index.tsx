import { FragmentStep } from "../../../components/FragmentStep";
import { SectionHolder } from "../../../components/SectionHolder";
import { UniqueItemBadge } from "../../../components/UniqueItemBadge";
import { TaskListProps } from "../../../components/TaskList";
import { voidstoneProgressSelectorFamily } from "../../../state/voidstone-progress";
import { voidstoneRouteSelector } from "../../../state/voidstone-route";
import { uniqueItemsSelector } from "../../../state/unique-items";
import { getDropsForBoss } from "../../../data/unique-drop-sources";
import { Fragments } from "../../../../../common/route-processing/fragment/types";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";

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
  const uniqueItems = useRecoilValue(uniqueItemsSelector);
  const buildUniqueNames = uniqueItems.map((i) => i.name);

  const items: ReactNode[] = [];

  for (let sectionIndex = 0; sectionIndex < route.length; sectionIndex++) {
    const section = route[sectionIndex];
    const taskItems: TaskListProps["items"] = [];

    for (let stepIndex = 0; stepIndex < section.steps.length; stepIndex++) {
      const step = section.steps[stepIndex];
      if (step.type !== "fragment_step") continue;

      // Find any build uniques that drop from bosses referenced in this step
      const bossNames = getBossNamesFromStep(step.parts);
      const relevantDrops = bossNames.flatMap((boss) =>
        getDropsForBoss(boss, buildUniqueNames)
      );

      taskItems.push({
        key: stepIndex,
        isCompletedState: voidstoneProgressSelectorFamily(
          `${sectionIndex},${stepIndex}`
        ),
        children: (
          <>
            <FragmentStep step={step} />
            {relevantDrops.length > 0 && (
              <UniqueItemBadge items={relevantDrops} />
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
