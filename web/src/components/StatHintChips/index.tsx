import { StatTarget } from "../../data/stat-targets";
import styles from "./styles.module.css";
import classNames from "classnames";

interface StatHintChipsProps {
  hints: StatTarget[];
}

function getDamageTypeClass(label: string): string | undefined {
  const l = label.toLowerCase();
  if (l.includes("cold") || l.includes("freeze") || l.includes("frozen")) return styles.typeCold;
  if (l.includes("fire") || l.includes("ignite")) return styles.typeFire;
  if (l.includes("light")) return styles.typeLight;
  if (l.includes("chaos") || l.includes("poison")) return styles.typeChaos;
  if (l.includes("phys")) return styles.typePhys;
  return undefined;
}

export function StatHintChips({ hints }: StatHintChipsProps) {
  return (
    <div className={classNames(styles.row)}>
      {hints.map((h, i) => (
        <span key={h.label}>
          {i > 0 && <span className={classNames(styles.sep)}>·</span>}
          <span
            className={classNames(styles.hint, getDamageTypeClass(h.label))}
            title={h.note}
          >
            {h.value && <span className={classNames(styles.value)}>{h.value}</span>}
            {" "}
            <span className={classNames(styles.label)}>{h.label}</span>
            {h.note && <span className={classNames(styles.note)}> ({h.note})</span>}
          </span>
        </span>
      ))}
    </div>
  );
}
