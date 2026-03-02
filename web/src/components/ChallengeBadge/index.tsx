import { challengeProgressSelectorFamily } from "../../state/challenge-progress";
import { CHALLENGES } from "../../data/challenge-list";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useRecoilValue } from "recoil";

const TOTAL = CHALLENGES.length;

interface ChallengeBadgeItemProps {
  challengeId: string;
  number: number;
}

function ChallengeBadgeItem({ challengeId, number }: ChallengeBadgeItemProps) {
  const done = useRecoilValue(challengeProgressSelectorFamily(challengeId));
  return (
    <span
      className={classNames(styles.badge, { [styles.badgeDone]: done })}
      title={done ? `C${number} — completed` : `C${number} of ${TOTAL}`}
    >
      {`C${number}`}
    </span>
  );
}

interface ChallengeBadgeProps {
  challenges: { id: string; number: number }[];
}

export function ChallengeBadge({ challenges }: ChallengeBadgeProps) {
  if (challenges.length === 0) return null;
  return (
    <span className={classNames(styles.wrap)}>
      {challenges.map((c) => (
        <ChallengeBadgeItem key={c.id} challengeId={c.id} number={c.number} />
      ))}
    </span>
  );
}
