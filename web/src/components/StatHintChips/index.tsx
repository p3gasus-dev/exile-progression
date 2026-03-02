import { StatTarget } from "../../data/stat-targets";
import styles from "./styles.module.css";
import classNames from "classnames";

interface StatHintChipsProps {
  hints: StatTarget[];
}

export function StatHintChips({ hints }: StatHintChipsProps) {
  return (
    <div className={classNames(styles.row)}>
      {hints.map((h) => (
        <span
          key={h.label}
          className={classNames(styles.chip, h.warn && styles.warn)}
          title={h.note}
        >
          <span className={classNames(styles.label)}>{h.label}</span>
          {h.value && <span className={classNames(styles.value)}>{h.value}</span>}
        </span>
      ))}
    </div>
  );
}
