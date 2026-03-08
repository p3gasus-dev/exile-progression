import { challengeProgressSelectorFamily, challengeCountSelector } from "../../../state/challenge-progress";
import { CHALLENGES, ChallengeDifficulty } from "../../../data/challenge-list";
import { SectionHolder } from "../../../components/SectionHolder";
import { TaskListProps } from "../../../components/TaskList";
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

export default function ChallengeTracker() {
  const totalCompleted = useRecoilValue(challengeCountSelector);

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

      {CHALLENGES.map((c) => {
        const taskItems: TaskListProps["items"] = [
          {
            key: c.id,
            isCompletedState: challengeProgressSelectorFamily(c.id),
            children: (
              <span>
                {c.description}
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
