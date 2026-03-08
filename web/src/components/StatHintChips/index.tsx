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
  const visible = hints.filter((h) => h.value !== "Immune");
  if (visible.length === 0) return null;

  return (
    <span className={classNames(styles.hints)}>
      {"• "}
      {visible.map((h, i) => (
        <span key={h.label}>
          {i > 0 && <span className={classNames(styles.sep)}> · </span>}
          <span className={classNames(getDamageTypeClass(h.label))} title={h.note}>
            {h.value} {h.label}
          </span>
        </span>
      ))}
    </span>
  );
}
