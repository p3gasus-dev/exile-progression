import { FragmentStep } from "../../components/FragmentStep";
import { GemReward } from "../../components/ItemReward";
import { SectionHolder } from "../../components/SectionHolder";
import { Sidebar } from "../../components/Sidebar";
import { ChallengeBadge } from "../../components/ChallengeBadge";
import { TaskListProps, StepHighlight } from "../../components/TaskList";
import { Fragments } from "../../../../common/route-processing/fragment/types";
import {
  BOSS_CHALLENGE_MAP,
  ASCEND_CHALLENGE_MAP,
  RouteChallengeRef,
} from "../../data/challenge-list";
import { SECTION_STAT_HINTS } from "../../data/stat-targets";
import { gemProgressSelectorFamily } from "../../state/gem-progress";
import { routeSelector } from "../../state/route";
import { routeProgressSelectorFamily } from "../../state/route-progress";
import { configSelector } from "../../state/config";
import { interactiveStyles } from "../../styles";
import styles from "./styles.module.css";
import classNames from "classnames";
import { ReactNode, Suspense, lazy, useState } from "react";
import { Loading } from "../../components/Loading";
import { useRecoilValue } from "recoil";

const VoidstoneRoute = lazy(() => import("./VoidstoneRoute"));
const ChallengeTracker = lazy(() => import("./ChallengeTracker"));

type RouteTab = "acts" | "voidstones" | "challenges";

const ALL_TABS: RouteTab[] = ["acts", "voidstones", "challenges"];

const TAB_LABELS: Record<RouteTab, string> = {
  acts: "ACT 1–10",
  voidstones: "VOIDSTONE 1–4",
  challenges: "CHALLENGES",
};

// ─── Step highlight detection ──────────────────────────────────────────────────

function getActStepHighlight(parts: Fragments.AnyFragment[]): StepHighlight | undefined {
  for (const p of parts) {
    if (typeof p === "string") continue;
    if (p.type === "ascend") return "ascend";
    if (p.type === "kill") return "boss";
  }
  return undefined;
}

// ─── ACT 1-10 ─────────────────────────────────────────────────────────────────

function ActRoute() {
  const route = useRecoilValue(routeSelector);
  const items: ReactNode[] = [];

  // Track repeated boss kills (Kitava appears in Act 5 and Act 10)
  const bossOccurrences = new Map<string, number>();

  for (let sectionIndex = 0; sectionIndex < route.length; sectionIndex++) {
    const section = route[sectionIndex];
    const taskItems: TaskListProps["items"] = [];

    for (let stepIndex = 0; stepIndex < section.steps.length; stepIndex++) {
      const step = section.steps[stepIndex];

      if (step.type === "fragment_step") {
        // Collect challenge refs for this step
        const stepChallenges: RouteChallengeRef[] = [];

        for (const p of step.parts) {
          if (typeof p === "string") continue;
          if (p.type === "kill") {
            const refs = BOSS_CHALLENGE_MAP[p.value];
            if (refs) {
              const count = bossOccurrences.get(p.value) ?? 0;
              bossOccurrences.set(p.value, count + 1);
              // For bosses with multiple entries (Kitava), pick by occurrence
              const ref = refs[Math.min(count, refs.length - 1)];
              stepChallenges.push(ref);
            }
          }
          if (p.type === "ascend") {
            const ref = ASCEND_CHALLENGE_MAP[p.version];
            if (ref) stepChallenges.push(ref);
          }
        }

        taskItems.push({
          key: stepIndex,
          isCompletedState: routeProgressSelectorFamily(
            [sectionIndex, stepIndex].toString()
          ),
          highlight: getActStepHighlight(step.parts),
          children: (
            <>
              <FragmentStep key={stepIndex} step={step} />
              {stepChallenges.length > 0 && (
                <ChallengeBadge challenges={stepChallenges} />
              )}
            </>
          ),
        });
      }

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
      <SectionHolder
        key={sectionIndex}
        name={section.name}
        items={taskItems}
        statHints={SECTION_STAT_HINTS[section.name]}
      />
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
  tabs: RouteTab[];
  active: RouteTab;
  onChange: (tab: RouteTab) => void;
}

function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <div className={classNames(styles.tabBar)}>
      {tabs.map((tab) => (
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
  const config = useRecoilValue(configSelector);
  const [activeTab, setActiveTab] = useState<RouteTab>("acts");

  const tabs = ALL_TABS.filter(
    (t) => t !== "challenges" || config.showChallenges
  );
  const visibleTab = tabs.includes(activeTab) ? activeTab : "acts";

  return (
    <>
      <TabBar tabs={tabs} active={visibleTab} onChange={setActiveTab} />
      <Suspense fallback={<Loading />}>
        {visibleTab === "acts" && <ActRoute />}
        {visibleTab === "voidstones" && <VoidstoneRoute />}
        {visibleTab === "challenges" && <ChallengeTracker />}
      </Suspense>
    </>
  );
}
