/**
 * Phase-based recommended stat thresholds for Path of Exile progression.
 *
 * Covers the three main danger spikes:
 *   • Act 5 Kitava  — −30% all resistances
 *   • Act 10 Kitava — another −30% all resistances (−60% total)
 *   • Pinnacle bosses — high one-shot potential, ailments, chaos damage
 *
 * Values are rule-of-thumb targets, not hard requirements.
 */

export interface StatTarget {
  label: string;
  value: string;
  /** Short clarifying note shown below the value. */
  note?: string;
  /**
   * When true the stat is highlighted as a danger/warning threshold
   * (e.g. resistances must be exactly capped, not just "nice to have").
   */
  warn?: boolean;
}

export interface StatPhase {
  phase: string;
  /** Optional note shown under the phase heading. */
  note?: string;
  targets: StatTarget[];
}

/**
 * Per-boss stat hints shown on the right side of each boss kill step in the route.
 * Keys are the exact boss names used in `{kill|Name}` route fragments.
 *
 * Each entry shows:
 *   - Max hit per damage type  →  how much EHP you need in that type
 *   - Required immunities      →  warn chips
 *   - DPS target (endgame)     →  Boss HP / 60 s enrage window
 */
export const BOSS_STEP_HINTS: Record<string, StatTarget[]> = {
  // ── Act final bosses ──────────────────────────────────────────────────────

  // Act 1 — Merveil: Ice Nova ~500 cold, melee ~300 phys
  "Merveil, the Siren": [
    { label: "Cold",   value: "~500",  note: "Ice Nova / freeze" },
    { label: "Phys",   value: "~300",  note: "Melee swipe" },
  ],
  // Act 2 — Vaal Oversoul: slam ~800 phys, lightning ~500
  "Vaal Oversoul": [
    { label: "Phys",   value: "~800",  note: "Slam" },
    { label: "Light",  value: "~500",  note: "Lightning bolt" },
  ],
  // Act 3 — Dominus: tentacle slam ~600 phys, ice storm ~600 cold
  "Dominus, High Templar": [
    { label: "Phys",   value: "~600",  note: "Tentacle slam" },
    { label: "Cold",   value: "~600",  note: "Ice storm" },
  ],
  // Act 4 — Malachai: slam ~1 200 phys, fire tendrils ~800
  "Malachai, The Nightmare": [
    { label: "Phys",   value: "~1.2k", note: "Slam" },
    { label: "Fire",   value: "~800",  warn: true, note: "Fire tendrils" },
  ],
  // Acts 5 & 10 — Kitava: fire beam scales ~1.8k (Act 5) → ~4k (Act 10)
  "Kitava, the Insatiable": [
    { label: "Fire",   value: "~1.8k–4k", warn: true, note: "Fire beam (Act 5 ~1.8k / Act 10 ~4k)" },
    { label: "Phys",   value: "~1k–2k",   note: "Slam (scales with act)" },
  ],
  // Act 6 — Tsoagoth / Brine King: cold slam ~1 300
  "Tsoagoth, The Brine King": [
    { label: "Cold",   value: "~1.3k", warn: true, note: "Ice slam" },
    { label: "Phys",   value: "~1k",   note: "Slam" },
  ],
  // Act 7 — Arakaali: chaos bolt ~1 200, lightning ~800
  "Arakaali, Spinner of Shadows": [
    { label: "Chaos",  value: "~1.2k", warn: true, note: "Chaos bolt" },
    { label: "Light",  value: "~800",  note: "Lightning strike" },
  ],
  // Act 8 — Lunaris/Solaris killed together; separate entries for per-step hints
  "Lunaris, Eternal Moon": [
    { label: "Cold",   value: "~1.5k", warn: true, note: "Cold slam" },
  ],
  "Solaris, Eternal Sun": [
    { label: "Fire",   value: "~1.6k", warn: true, note: "Fire ray" },
  ],
  // Act 9 — Depraved Trinity: each phase ~1.2k of its element
  "The Depraved Trinity": [
    { label: "Fire",   value: "~1.2k", note: "Fire phase" },
    { label: "Cold",   value: "~1.2k", note: "Cold phase" },
    { label: "Light",  value: "~1.2k", note: "Lightning phase" },
  ],

  // ── Shaper Guardians ──────────────────────────────────────────────────────

  "The Shaper Guardian (Minotaur)": [
    { label: "Phys",   value: "~6k",   warn: true, note: "Slam" },
    { label: "Light",  value: "~3k",   note: "Lightning strike" },
  ],
  "The Shaper Guardian (Chimera)": [
    { label: "Fire",   value: "~5k",   warn: true, note: "Fire balls" },
    { label: "Phys",   value: "~4k",   note: "Slam" },
  ],
  "The Shaper Guardian (Hydra)": [
    { label: "Cold",   value: "~5k",   warn: true, note: "Cold beam / arrow storm" },
    { label: "Phys",   value: "~3k",   note: "Ground slam" },
  ],
  "The Shaper Guardian (Phoenix)": [
    { label: "Fire",   value: "~5k",   warn: true, note: "Fire tornado" },
    { label: "Phys",   value: "~3k",   note: "Slam" },
  ],

  // ── Elder Guardians ───────────────────────────────────────────────────────

  "The Elder Guardian (Constrictor)": [
    { label: "Chaos",  value: "~4k",   warn: true, note: "Chaos projectiles" },
    { label: "Phys",   value: "~3k",   note: "Slam" },
  ],
  "The Elder Guardian (Enslaver)": [
    { label: "Fire",   value: "~4k",   warn: true, note: "Fire slam" },
    { label: "Chaos",  value: "~3k",   warn: true, note: "Chaos DoT" },
  ],
  "The Elder Guardian (Eradicator)": [
    { label: "Light",  value: "~4k",   warn: true, note: "Lightning beam" },
    { label: "Chaos",  value: "~3k",   warn: true, note: "Chaos degen" },
  ],
  "The Elder Guardian (Purifier)": [
    { label: "Fire",   value: "~4k",   warn: true, note: "Fire beam" },
    { label: "Chaos",  value: "~3k",   warn: true, note: "Chaos ground" },
  ],

  // ── Voidstone pinnacle bosses ─────────────────────────────────────────────

  // Eater of Worlds: ~30M HP → ~500k DPS; tentacle slam ~7 500 chaos+phys
  "The Eater of Worlds": [
    { label: "DPS",    value: "~500k",  note: "~30M HP / 60s phase" },
    { label: "Chaos",  value: "~7.5k",    warn: true, note: "Tentacle slam (phys+chaos)" },
    { label: "Chaos Res", value: "≥ 0%",  warn: true },
  ],
  // Searing Exarch: ~30M HP → ~500k DPS; fire beam ~9 000
  "The Searing Exarch": [
    { label: "DPS",    value: "~500k",  note: "~30M HP / 60s" },
    { label: "Fire",   value: "~9k",      warn: true, note: "Fire beam" },
    { label: "Fire Res", value: "75%",    warn: true },
  ],
  // The Maven: ~20M HP → ~330k DPS; memory bolts ~5 000 cold; freeze = death
  "The Maven": [
    { label: "DPS",    value: "~330k",  note: "~20M HP / 60s phase" },
    { label: "Cold",   value: "~5k",      warn: true, note: "Memory game bolts" },
    { label: "Freeze", value: "Immune",   warn: true, note: "Frozen during memory = death" },
  ],
  // The Shaper: ~25M HP → ~420k DPS; slam ~10 000 phys; cold beam ~4 000
  "The Shaper": [
    { label: "DPS",    value: "~420k",  note: "~25M HP / ~4 min Zana" },
    { label: "Phys",   value: "~10k",     warn: true, note: "Slam (biggest threat)" },
    { label: "Cold",   value: "~4k",      note: "Cold beam" },
  ],
  // The Elder: ~15M HP → ~250k DPS; chaos tentacle ~6 500
  "The Elder": [
    { label: "DPS",    value: "~250k",  note: "~15M HP / 60s" },
    { label: "Chaos",  value: "~6.5k",    warn: true, note: "Tentacle slam" },
    { label: "Chaos Res", value: "≥ 0%",  warn: true },
  ],
  // Uber Elder: ~20M HP each → ~670k DPS; Shaper slam ~12 000; Elder chaos ~7 000
  "The Uber Elder": [
    { label: "DPS",    value: "~670k",  warn: true, note: "~20M HP each / 60s" },
    { label: "Phys",   value: "~12k",     warn: true, note: "Shaper slam" },
    { label: "Freeze", value: "Immune",   warn: true, note: "Shaper freeze = death" },
  ],
};

export const STAT_TARGETS: StatPhase[] = [
  {
    phase: "Acts 1–4",
    targets: [
      { label: "Max Life",       value: "≥ 1 000",  note: "End of Act 4" },
      { label: "Resistances",    value: "≥ 25%",    note: "Before Act 5 penalty" },
      { label: "Move Speed",     value: "15%+",     note: "On boots" },
    ],
  },
  {
    phase: "Act 5 Kitava (−30% Res)",
    note: "All resistances drop by 30% after defeating Kitava. Compensate before Act 6.",
    targets: [
      { label: "All Resistances", value: "≥ 0%",   warn: true, note: "After −30% penalty" },
      { label: "Max Life",        value: "≥ 1 500", note: "Entering Act 6" },
    ],
  },
  {
    phase: "Acts 6–10",
    targets: [
      { label: "Max Life",        value: "≥ 2 000", note: "End of Act 10" },
      { label: "Resistances",     value: "≥ 40%",   note: "Must cap after Act 10 penalty" },
      { label: "Chaos Res",       value: "≥ −60%",  note: "Reduce chaos spike damage" },
    ],
  },
  {
    phase: "Act 10 Kitava (−30% Res)",
    note: "Another −30% to all resistances. You now need to cover a total of −60% penalty.",
    targets: [
      { label: "All Resistances", value: "75%",     warn: true, note: "Fully capped for maps" },
      { label: "Max Life",        value: "≥ 3 000", note: "Minimum for white maps" },
      { label: "Move Speed",      value: "25%+",    note: "On boots" },
    ],
  },
  {
    phase: "White Maps (T1–T5)",
    targets: [
      { label: "All Resistances", value: "75%",     warn: true },
      { label: "Max Life",        value: "≥ 3 500" },
      { label: "Chaos Res",       value: "≥ −20%",  note: "Start working toward 0%" },
      { label: "DPS",             value: "Comfortable",  note: "Clear packs without dying" },
    ],
  },
  {
    phase: "Yellow Maps (T6–T10)",
    targets: [
      { label: "All Resistances", value: "75%",     warn: true },
      { label: "Max Life",        value: "≥ 4 500" },
      { label: "Chaos Res",       value: "≥ 0%",    note: "Recommended before red maps" },
      { label: "DPS (Boss)",      value: "< 30 s",  note: "Map boss kill time" },
    ],
  },
  {
    phase: "Red Maps + Voidstones (T11–T16)",
    targets: [
      { label: "All Resistances", value: "75%",     warn: true },
      { label: "Chaos Res",       value: "≥ 0%",    warn: true },
      { label: "EHP",             value: "≥ 5 500", note: "Effective health vs hits" },
      { label: "Stun / Bleed",    value: "Immune",  note: "Or reliable recovery" },
      { label: "DPS (Boss)",      value: "< 2 min", note: "Pinnacle boss kill time" },
    ],
  },
  {
    phase: "Endgame (All 4 Voidstones)",
    targets: [
      { label: "All Resistances", value: "75%",     warn: true },
      { label: "Chaos Res",       value: "≥ 0%",    warn: true },
      { label: "EHP",             value: "≥ 6 000", note: "Maven / Uber Elder" },
      { label: "Crit Immunity",   value: "100%",    note: "\"Cannot be Crit\" preferred" },
      { label: "Freeze Immunity", value: "100%",    note: "For Maven fight phases" },
      { label: "DPS (Pinnacle)",  value: "< 60 s",  note: "Enrage timer for Ubers" },
    ],
  },
];
