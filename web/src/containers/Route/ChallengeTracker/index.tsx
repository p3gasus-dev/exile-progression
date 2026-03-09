import { challengeProgressSelectorFamily, challengeCountSelector } from "../../../state/challenge-progress";
import { CHALLENGES, ChallengeDifficulty } from "../../../data/challenge-list";
import { SectionHolder } from "../../../components/SectionHolder";
import { TaskListProps } from "../../../components/TaskList";
import { configSelector } from "../../../state/config";
import styles from "./styles.module.css";
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
            children: <span>{step}</span>,
          })),
          // Requires line (only when partial completion)
          ...(c.requires != null && c.requires < c.steps.length
            ? [{
                key: `${c.id}-req`,
                children: (
                  <span className={classNames(styles.infoItem)}>
                    Requires: {c.requires}/{c.steps.length}
                  </span>
                ),
              }]
            : []),
          // Difficulty
          {
            key: `${c.id}-diff`,
            children: (
              <span className={classNames(styles.infoItem, styles.diffHint, DIFFICULTY_CLASS[c.difficulty])}>
                Difficulty: {DIFFICULTY_LABEL[c.difficulty]}
              </span>
            ),
          },
          // Tips
          ...(c.tips && c.tips.length > 0
            ? [{
                key: `${c.id}-tips`,
                children: (
                  <span className={classNames(styles.infoItem)}>
                    <span className={classNames(styles.tipsHeader)}>Quest Hints:</span>
                    <span className={classNames(styles.tips)}>
                      {c.tips.map((tip, i) => (
                        <span key={i} className={classNames(styles.tip)}>· {tip}</span>
                      ))}
                    </span>
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
