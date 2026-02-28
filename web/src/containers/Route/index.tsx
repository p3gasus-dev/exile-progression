import { FragmentStep } from "../../components/FragmentStep";
import { GemReward } from "../../components/ItemReward";
import { SectionHolder } from "../../components/SectionHolder";
import { Sidebar } from "../../components/Sidebar";
import { TaskListProps } from "../../components/TaskList";
import { gemProgressSelectorFamily } from "../../state/gem-progress";
import { routeSelector } from "../../state/route";
import { routeProgressSelectorFamily } from "../../state/route-progress";
import { interactiveStyles } from "../../styles";
import styles from "./styles.module.css";
import classNames from "classnames";
import { ReactNode, Suspense, lazy, useState } from "react";
import { Loading } from "../../components/Loading";
import { useRecoilValue } from "recoil";

const VoidstoneRoute = lazy(() => import("./VoidstoneRoute"));
const ChallengeTracker = lazy(() => import("./ChallengeTracker"));

type RouteTab = "acts" | "voidstones" | "challenges";

const TAB_LABELS: Record<RouteTab, string> = {
  acts: "ACT 1–10",
  voidstones: "VOIDSTONE 1–4",
  challenges: "CHALLENGES",
};

// ─── ACT 1-10 ─────────────────────────────────────────────────────────────────

function ActRoute() {
  const route = useRecoilValue(routeSelector);
  const items: ReactNode[] = [];

  for (let sectionIndex = 0; sectionIndex < route.length; sectionIndex++) {
    const section = route[sectionIndex];
    const taskItems: TaskListProps["items"] = [];

    for (let stepIndex = 0; stepIndex < section.steps.length; stepIndex++) {
      const step = section.steps[stepIndex];

      if (step.type === "fragment_step")
        taskItems.push({
          key: stepIndex,
          isCompletedState: routeProgressSelectorFamily(
            [sectionIndex, stepIndex].toString()
          ),
          children: <FragmentStep key={stepIndex} step={step} />,
        });

      if (step.type === "gem_step")
        taskItems.push({
          key: step.requiredGem.id,
          isCompletedState: gemProgressSelectorFamily(step.requiredGem.id),
          children: (
            <GemReward
              key={taskItems.length}
              requiredGem={step.requiredGem}
              count={step.count}
              rewardType={step.rewardType}
            />
          ),
        });
    }

    items.push(
      <SectionHolder key={sectionIndex} name={section.name} items={taskItems} />
    );
  }

  return (
    <>
      <Sidebar />
      {items}
    </>
  );
}

// ─── Tab bar ──────────────────────────────────────────────────────────────────

interface TabBarProps {
  active: RouteTab;
  onChange: (tab: RouteTab) => void;
}

function TabBar({ active, onChange }: TabBarProps) {
  return (
    <div className={classNames(styles.tabBar)}>
      {(Object.keys(TAB_LABELS) as RouteTab[]).map((tab) => (
        <button
          key={tab}
          className={classNames(styles.tabButton, {
            [styles.tabActive]: active === tab,
            [interactiveStyles.activePrimary]: active === tab,
            [interactiveStyles.activeSecondary]: active !== tab,
          })}
          onClick={() => onChange(tab)}
        >
          {TAB_LABELS[tab]}
        </button>
      ))}
    </div>
  );
}

// ─── Main Route container ─────────────────────────────────────────────────────

export default function RouteContainer() {
  const [activeTab, setActiveTab] = useState<RouteTab>("acts");

  return (
    <>
      <TabBar active={activeTab} onChange={setActiveTab} />
      <Suspense fallback={<Loading />}>
        {activeTab === "acts" && <ActRoute />}
        {activeTab === "voidstones" && <VoidstoneRoute />}
        {activeTab === "challenges" && <ChallengeTracker />}
      </Suspense>
    </>
  );
}
