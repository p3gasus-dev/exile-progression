import { challengeProgressSelectorFamily, challengeCountSelector } from "../../../state/challenge-progress";
import {
  CHALLENGES,
  CHALLENGE_CATEGORIES,
  ChallengeCategory,
} from "../../../data/challenge-list";
import { SectionHolder } from "../../../components/SectionHolder";
import { TaskListProps } from "../../../components/TaskList";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useRecoilValue } from "recoil";

export default function ChallengeTracker() {
  const totalCompleted = useRecoilValue(challengeCountSelector);
  const categories = Object.keys(CHALLENGE_CATEGORIES) as ChallengeCategory[];

  return (
    <>
      <div className={classNames(styles.progressHeader)}>
        <span className={classNames(styles.progressTitle)}>
          Challenges Complete
        </span>
        <span className={classNames(styles.progressCount)}>
          {totalCompleted}
          <span className={classNames(styles.progressTotal)}>/40</span>
        </span>
        <div className={classNames(styles.progressBar)}>
          <div
            className={classNames(styles.progressFill)}
            style={{ width: `${(totalCompleted / 40) * 100}%` }}
          />
        </div>
      </div>

      {categories.map((cat) => {
        const challenges = CHALLENGES.filter((c) => c.category === cat);
        const taskItems: TaskListProps["items"] = challenges.map((c) => ({
          key: c.id,
          isCompletedState: challengeProgressSelectorFamily(c.id),
          children: (
            <>
              <span>{c.name}</span>
              {c.description && (
                <span className={classNames(styles.desc)}>{c.description}</span>
              )}
            </>
          ),
        }));
        return (
          <SectionHolder
            key={cat}
            name={CHALLENGE_CATEGORIES[cat]}
            items={taskItems}
          />
        );
      })}
    </>
  );
}
