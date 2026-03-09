import { StatTarget } from "../../data/stat-targets";
import styles from "./styles.module.css";
import classNames from "classnames";
import React from "react";

interface StatHintChipsProps {
  hints: StatTarget[];
}

// Map of keyword → CSS class
const DAMAGE_WORDS: [RegExp, string][] = [
  [/\bCold\b/i,        styles.typeCold],
  [/\bFire\b/i,        styles.typeFire],
  [/\bLightning\b/i,   styles.typeLight],
  [/\bChaos\b/i,       styles.typeChaos],
  [/\bPhys(ical)?\b/i, styles.typePhys],
];

/** Render a single word with its damage-type colour. */
function ColouredWord({ word }: { word: string }) {
  for (const [re, cls] of DAMAGE_WORDS) {
    if (re.test(word)) return <span className={cls}>{word}</span>;
  }
  return <>{word}</>;
}

const DPS_RE = /^DPS$/i;
/** Matches "Cold Res", "Lightning Res", "Chaos Res", "Physical Res", etc. */
const RES_LABEL_RE = /^(.+?)\s+Res$/i;

function cleanValue(v: string): string {
  return v.replace(/^[~≈≥]/, "").trim();
}

export function StatHintChips({ hints }: StatHintChipsProps) {
  const dps = hints.find((h) => DPS_RE.test(h.label) && h.value !== "Immune");
  const resHints = hints.filter(
    (h) => RES_LABEL_RE.test(h.label) && h.value !== "Immune"
  );

  if (!dps && resHints.length === 0) return null;

  // Extract the type word from each Res label ("Cold Res" → "Cold")
  const resTypes = resHints
    .map((h) => RES_LABEL_RE.exec(h.label)?.[1] ?? h.label)
    .filter(Boolean);

  const parts: React.ReactNode[] = [];

  if (dps) parts.push(<>DPS: {cleanValue(dps.value)}+</>);

  if (resTypes.length > 0) {
    parts.push(
      <>
        {resTypes.map((type, i) => (
          <React.Fragment key={type}>
            {i > 0 && "/"}
            <ColouredWord word={type} />
          </React.Fragment>
        ))}
        {" Res"}
      </>
    );
  }

  return (
    <span className={classNames(styles.hints)}>
      {"• Recommend: "}
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          {i > 0 && ", "}
          {p}
        </React.Fragment>
      ))}
    </span>
  );
}
