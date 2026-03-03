import { FragmentStep } from "../../components/FragmentStep";
import { GemReward } from "../../components/ItemReward";
import { SectionHolder } from "../../components/SectionHolder";
import { Sidebar } from "../../components/Sidebar";
import { TaskListProps, StepHighlight } from "../../components/TaskList";
import { Fragments } from "../../../../common/route-processing/fragment/types";
import {
  BOSS_CHALLENGE_MAP,
  ASCEND_CHALLENGE_MAP,
  RouteChallengeRef,
} from "../../data/challenge-list";
import { BOSS_STEP_HINTS, StatTarget } from "../../data/stat-targets";
import { StatHintChips } from "../../components/StatHintChips";
import { gemProgressSelectorFamily } from "../../state/gem-progress";
import { routeSelector } from "../../state/route";
import { routeProgressSelectorFamily } from "../../state/route-progress";
import { challengeProgressSelectorFamily, challengeCountSelector } from "../../state/challenge-progress";
import { CHALLENGES } from "../../data/challenge-list";
import { configSelector } from "../../state/config";
import { interactiveStyles } from "../../styles";
import styles from "./styles.module.css";
import classNames from "classnames";
import { ReactNode, Suspense, lazy, useState } from "react";
import { Loading } from "../../components/Loading";
import { useRecoilCallback, useRecoilValue } from "recoil";


const VoidstoneRoute = lazy(() => import("./VoidstoneRoute"));
const ChallengeTracker = lazy(() => import("./ChallengeTracker"));

type RouteTab = "acts" | "atlas" | "challenges";

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
  const config = useRecoilValue(configSelector);
  const items: ReactNode[] = [];

  // Auto-complete challenges when a boss/ascend step is checked off
  const completeChallenges = useRecoilCallback(
    ({ set }) =>
      (ids: string[]) => {
        for (const id of ids) {
          set(challengeProgressSelectorFamily(id), true);
        }
      },
    []
  );

  // Track repeated boss kills (Kitava appears in Act 5 and Act 10)
  const bossOccurrences = new Map<string, number>();

  for (let sectionIndex = 0; sectionIndex < route.length; sectionIndex++) {
    const section = route[sectionIndex];
    const taskItems: TaskListProps["items"] = [];

    for (let stepIndex = 0; stepIndex < section.steps.length; stepIndex++) {
      const step = section.steps[stepIndex];

      if (step.type === "fragment_step") {
        // Collect challenge refs and boss stat hints for this step
        const stepChallenges: RouteChallengeRef[] = [];
        const stepBossHints: StatTarget[] = [];

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
            const hints = BOSS_STEP_HINTS[p.value];
            if (hints) stepBossHints.push(...hints);
          }
          if (p.type === "ascend") {
            const ref = ASCEND_CHALLENGE_MAP[p.version];
            if (ref) stepChallenges.push(ref);
          }
        }

        const challengeIds = stepChallenges.map((c) => c.id);

        taskItems.push({
          key: stepIndex,
          isCompletedState: routeProgressSelectorFamily(
            [sectionIndex, stepIndex].toString()
          ),
          highlight: getActStepHighlight(step.parts),
          rightContent: config.showStatHints && stepBossHints.length > 0
            ? <StatHintChips hints={stepBossHints} />
            : undefined,
          onToggle: challengeIds.length > 0
            ? (complete) => { if (complete) completeChallenges(challengeIds); }
            : undefined,
          children: <FragmentStep key={stepIndex} step={step} />,
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
      />
    );
  }

  return <>{items}</>;
}

// ─── Tab bar ──────────────────────────────────────────────────────────────────

interface TabEntry {
  id: RouteTab;
  label: ReactNode;
}

interface TabBarProps {
  tabs: TabEntry[];
  active: RouteTab;
  onChange: (tab: RouteTab) => void;
}

function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <div className={classNames(styles.tabBar)}>
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          className={classNames(styles.tabButton, {
            [styles.tabActive]: active === id,
            [interactiveStyles.activePrimary]: active === id,
            [interactiveStyles.activeSecondary]: active !== id,
          })}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── Main Route container ─────────────────────────────────────────────────────

export default function RouteContainer() {
  const config = useRecoilValue(configSelector);
  const challengeCount = useRecoilValue(challengeCountSelector);
  const [activeTab, setActiveTab] = useState<RouteTab>("acts");

  const tabs: TabEntry[] = [
    { id: "acts", label: "ACT 1–10" },
    { id: "atlas", label: "ATLAS" },
    ...(config.showChallenges
      ? [{ id: "challenges" as RouteTab, label: `CHALLENGES ${challengeCount}/${CHALLENGES.length}` }]
      : []),
  ];

  const validTabs = tabs.map((t) => t.id);
  const visibleTab = validTabs.includes(activeTab) ? activeTab : "acts";

  return (
    <>
      <TabBar tabs={tabs} active={visibleTab} onChange={setActiveTab} />
      <Sidebar />
      <div className={classNames(styles.routeContent)}>
        <Suspense fallback={<Loading />}>
          {visibleTab === "acts" && <ActRoute />}
          {visibleTab === "atlas" && <VoidstoneRoute />}
          {visibleTab === "challenges" && <ChallengeTracker />}
        </Suspense>
      </div>
    </>
  );
}
