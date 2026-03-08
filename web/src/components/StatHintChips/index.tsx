import { StatTarget } from "../../data/stat-targets";
import styles from "./styles.module.css";
import classNames from "classnames";

interface StatHintChipsProps {
  hints: StatTarget[];
}

// Map of keyword → CSS class. Only the matched word gets coloured.
const DAMAGE_WORDS: [RegExp, string][] = [
  [/\bCold\b/i,            styles.typeCold],
  [/\bFire\b/i,            styles.typeFire],
  [/\bLight(ning)?\b/i,    styles.typeLight],
  [/\bChaos\b/i,           styles.typeChaos],
  [/\bPhys(ical)?\b/i,     styles.typePhys],
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

const DAMAGE_TYPE_RE = /^(Cold|Fire|Light(ning)?|Chaos|Phys(ical)?)$/i;
const RES_RE = /.*\bRes\b.*/i;

type HintCat = "dps" | "damage" | "res";

function categorize(h: StatTarget): HintCat | null {
  if (h.value === "Immune") return null;
  if (h.label === "DPS") return "dps";
  if (DAMAGE_TYPE_RE.test(h.label)) return "damage";
  if (RES_RE.test(h.label)) return "res";
  return null;
}

function cleanValue(v: string): string {
  return v.replace(/^[~≈≥]/, "").trim();
}

export function StatHintChips({ hints }: StatHintChipsProps) {
  const visible = hints
    .map((h) => ({ h, cat: categorize(h) }))
    .filter((x): x is { h: StatTarget; cat: HintCat } => x.cat !== null);

  if (visible.length === 0) return null;

  // Split into enemy-damage and player-side (dps + res)
  const damage = visible.filter((x) => x.cat === "damage");
  const player = visible.filter((x) => x.cat !== "damage");

  const allChips = [...damage, ...player];

  return (
    <span className={classNames(styles.hints)}>
      {"• "}
      {allChips.map(({ h, cat }, i) => (
        <span key={h.label} title={h.note}>
          {i > 0 && <span className={classNames(styles.sep)}> · </span>}
          {cat === "dps" && <>DPS: {cleanValue(h.value)}+</>}
          {cat === "damage" && <>Deals <ColouredLabel label={h.label} /> Damage</>}
          {cat === "res" && <ColouredLabel label={h.label} />}
        </span>
      ))}
    </span>
  );
}
