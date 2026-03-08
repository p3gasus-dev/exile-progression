import { challengeProgressSelectorFamily, challengeCountSelector } from "../../../state/challenge-progress";
import { CHALLENGES } from "../../../data/challenge-list";
import { SectionHolder } from "../../../components/SectionHolder";
import { TaskListProps } from "../../../components/TaskList";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useRecoilValue } from "recoil";

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
            children: <span>{c.description}</span>,
          },
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
