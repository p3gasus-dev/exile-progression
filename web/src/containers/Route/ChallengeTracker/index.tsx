import { challengeProgressSelectorFamily, challengeCountSelector } from "../../../state/challenge-progress";
import { CHALLENGES, ChallengeDifficulty } from "../../../data/challenge-list";
import { SectionHolder } from "../../../components/SectionHolder";
import { TaskListProps } from "../../../components/TaskList";
import { configSelector } from "../../../state/config";
import styles from "./styles.module.css";
import fragmentStyles from "../../../components/FragmentStep/Fragment/styles.module.css";
import classNames from "classnames";
import { useRecoilValue } from "recoil";

const DIFFICULTY_LABEL: Record<ChallengeDifficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
  endgame: "Endgame",
};

const DIFFICULTY_CLASS: Record<ChallengeDifficulty, string> = {
  easy: styles.diffEasy,
  medium: styles.diffMedium,
  hard: styles.diffHard,
  endgame: styles.diffEndgame,
};

const DIFFICULTY_ORDER: Record<ChallengeDifficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
  endgame: 3,
};

function getImageUrl(path: string) {
  return new URL(
    `../../../components/FragmentStep/Fragment/images/${path}`,
    import.meta.url
  ).href;
}

function StepContent({ text }: { text: string }) {
  const isCrafting = /^vendor recipe:/i.test(text);
  const isAscend   = /^use the ascendancy device|^gain a bloodline class/i.test(text);
  const isVisit    = /^visit /i.test(text);
  const isEnter    = /^enter /i.test(text);
  const isComplete = /^complete /i.test(text);

  let icon: string | null = null;
  if (isCrafting)       icon = "crafting.png";
  else if (isAscend)    icon = "trial.png";
  else if (isVisit || isEnter) icon = "waypoint.png";
  else if (isComplete)  icon = "quest.png";

  const textSpan = (
    <span className={classNames(fragmentStyles.default)}>
      {text}
    </span>
  );

  if (!icon) return textSpan;

  return (
    <div className={classNames(fragmentStyles.noWrap)}>
      <img src={getImageUrl(icon)} className="inlineIcon" alt="" />
      {textSpan}
    </div>
  );
}

export default function ChallengeTracker() {
  const totalCompleted = useRecoilValue(challengeCountSelector);
  const config = useRecoilValue(configSelector);

  const challenges = config.sortChallengesByDifficulty
    ? [...CHALLENGES].sort(
        (a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty] || a.number - b.number
      )
    : CHALLENGES;

  return (
    <>
      <div className={classNames(styles.progressHeader)}>
        <span className={classNames(styles.progressTitle)}>
          Challenges Complete
        </span>
        <span className={classNames(styles.progressCount)}>
          {totalCompleted}
          <span className={classNames(styles.progressTotal)}>/{CHALLENGES.length}</span>
        </span>
        <div className={classNames(styles.progressBar)}>
          <div
            className={classNames(styles.progressFill)}
            style={{ width: `${(totalCompleted / CHALLENGES.length) * 100}%` }}
          />
        </div>
      </div>

      {challenges.map((c) => {
        const completedState = challengeProgressSelectorFamily(c.id);
        const taskItems: TaskListProps["items"] = [
          // Steps — each shares the same completion toggle
          ...c.steps.map((step, i) => ({
            key: `${c.id}-step-${i}`,
            isCompletedState: completedState,
            children: <StepContent text={step} />,
          })),
          // Requires (only when partial completion)
          ...(c.requires != null && c.requires < c.steps.length
            ? [{
                key: `${c.id}-req`,
                children: (
                  <span className={classNames(fragmentStyles.default)}>
                    Requires:{" "}
                    <span className={classNames(styles.requiresCount)}>
                      {c.requires}/{c.steps.length}
                    </span>
                  </span>
                ),
              }]
            : []),
          // Difficulty
          {
            key: `${c.id}-diff`,
            children: (
              <span className={classNames(fragmentStyles.default)}>
                Difficulty:{" "}
                <span className={classNames(styles.diffBadge, DIFFICULTY_CLASS[c.difficulty])}>
                  {DIFFICULTY_LABEL[c.difficulty].toUpperCase()}
                </span>
              </span>
            ),
          },
          // Tips
          ...(c.tips && c.tips.length > 0
            ? [{
                key: `${c.id}-tips`,
                children: (
                  <span>
                    <span className={classNames(fragmentStyles.quest)}>Quest Hints</span>
                    {c.tips.map((tip, i) => (
                      <span key={i} className={classNames(styles.tip)}>
                        {"• "}
                        <span className={classNames(fragmentStyles.default)}>{tip}</span>
                      </span>
                    ))}
                  </span>
                ),
              }]
            : []),
        ];
        return (
          <SectionHolder
            key={c.id}
            name={`${c.number}. ${c.name}`}
            items={taskItems}
          />
        );
      })}
    </>
  );
}
