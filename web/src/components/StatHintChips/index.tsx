import { StatTarget } from "../../data/stat-targets";
import styles from "./styles.module.css";
import classNames from "classnames";

interface StatHintChipsProps {
  hints: StatTarget[];
}

// Map of keyword → CSS class. Only the matched word gets coloured.
const DAMAGE_WORDS: [RegExp, string][] = [
  [/\bCold\b/i,      styles.typeCold],
  [/\bFire\b/i,      styles.typeFire],
  [/\bLight(ning)?\b/i, styles.typeLight],
  [/\bChaos\b/i,     styles.typeChaos],
  [/\bPhys(ical)?\b/i,  styles.typePhys],
];

/** Render a label string with only the damage-type word coloured. */
function ColouredLabel({ label }: { label: string }) {
  for (const [re, cls] of DAMAGE_WORDS) {
    const m = re.exec(label);
    if (m) {
      const before = label.slice(0, m.index);
      const word   = m[0];
      const after  = label.slice(m.index + word.length);
      return (
        <>
          {before}
          <span className={cls}>{word}</span>
          {after}
        </>
      );
    }
  }
  return <>{label}</>;
}

export function StatHintChips({ hints }: StatHintChipsProps) {
  const visible = hints.filter((h) => h.value !== "Immune");
  if (visible.length === 0) return null;

  return (
    <span className={classNames(styles.hints)}>
      {"• "}
      {visible.map((h, i) => (
        <span key={h.label} title={h.note}>
          {i > 0 && <span className={classNames(styles.sep)}> · </span>}
          {h.value} <ColouredLabel label={h.label} />
        </span>
      ))}
    </span>
  );
}
