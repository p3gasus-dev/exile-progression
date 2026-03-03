import {
  labProgressSelectorFamily,
  LAB_TIERS,
  LAB_LABELS,
  LAB_UNLOCK_CONDITION,
  LAB_URL,
  LabTier,
} from "../../../state/lab-progress";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useRecoilState } from "recoil";

function LabRow({ tier }: { tier: LabTier }) {
  const [done, setDone] = useRecoilState(labProgressSelectorFamily(tier));

  return (
    <div className={classNames(styles.row, { [styles.done]: done })}>
      <input
        type="checkbox"
        checked={done}
        onChange={(e) => setDone(e.target.checked)}
        aria-label={LAB_LABELS[tier]}
      />
      <span className={classNames(styles.label)}>{LAB_LABELS[tier]}</span>
      {!done && (
        <span className={classNames(styles.unlock)}>{LAB_UNLOCK_CONDITION[tier]}</span>
      )}
      <a
        className={classNames(styles.link)}
        href={LAB_URL[tier]}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        Layout
      </a>
    </div>
  );
}

export function LabTracker() {
  return (
    <div className={classNames(styles.tracker)}>
      <div className={classNames(styles.header)}>Labyrinth</div>
      {LAB_TIERS.map((tier) => (
        <LabRow key={tier} tier={tier} />
      ))}
    </div>
  );
}
