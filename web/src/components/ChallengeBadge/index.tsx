import { RouteChallengeRef } from "../../data/challenge-list";
import styles from "./styles.module.css";
import classNames from "classnames";

interface ChallengeBadgeProps {
  challenges: RouteChallengeRef[];
}

/**
 * Renders small inline chips for challenges that auto-complete when this
 * route step is checked off. Shows "C{number}" with the challenge name
 * in a tooltip.
 */
export function ChallengeBadge({ challenges }: ChallengeBadgeProps) {
  if (challenges.length === 0) return null;

  return (
    <div className={classNames(styles.badgeRow)}>
      {challenges.map((c) => (
        <span
          key={c.id}
          className={classNames(styles.badge)}
          title={`Auto-completes Challenge ${c.number}`}
        >
          C{c.number}
        </span>
      ))}
    </div>
  );
}
