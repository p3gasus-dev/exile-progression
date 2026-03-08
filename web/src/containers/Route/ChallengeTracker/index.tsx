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
        const taskItems: TaskListProps["items"] = [
          {
            key: c.id,
            isCompletedState: challengeProgressSelectorFamily(c.id),
            children: (
              <span>
                {c.description}
                {c.tips && c.tips.length > 0 && (
                  <span className={classNames(styles.tips)}>
                    {c.tips.map((tip, i) => (
                      <span key={i} className={classNames(styles.tip)}>· {tip}</span>
                    ))}
                  </span>
                )}
              </span>
            ),
          },
        ];
        return (
          <SectionHolder
            key={c.id}
            name={`${c.number}. ${c.name}`}
            nameRight={
              <span className={classNames(styles.diff, DIFFICULTY_CLASS[c.difficulty])}>
                {DIFFICULTY_LABEL[c.difficulty]}
              </span>
            }
            items={taskItems}
          />
        );
      })}
    </>
  );
}
