import {
  challengeStepProgressSelectorFamily,
  challengeDoneCountSelectorFamily,
  challengeCountSelector,
} from "../../../state/challenge-progress";
import { CHALLENGES, Challenge, ChallengeDifficulty } from "../../../data/challenge-list";
import { SectionHolder } from "../../../components/SectionHolder";
import { TaskListProps } from "../../../components/TaskList";
import { configSelector } from "../../../state/config";
import styles from "./styles.module.css";
import fragmentStyles from "../../../components/FragmentStep/Fragment/styles.module.css";
import classNames from "classnames";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { BiInfoCircle, BiSolidInfoCircle } from "react-icons/bi";

// ── Static icon imports (avoids Vite dynamic-import bundling issues) ──────────
import craftingIcon   from "../../../components/FragmentStep/Fragment/images/crafting.png";
import questIcon      from "../../../components/FragmentStep/Fragment/images/quest.png";
import waypointIcon   from "../../../components/FragmentStep/Fragment/images/waypoint.png";
import trialIcon      from "../../../components/FragmentStep/Fragment/images/trial.png";
import currencyIcon   from "../../../components/FragmentStep/Fragment/images/currency.png";
import breachIcon     from "../../../components/FragmentStep/Fragment/images/breach.webp";
import abyssIcon      from "../../../components/FragmentStep/Fragment/images/abyss.webp";
import deliriumIcon   from "../../../components/FragmentStep/Fragment/images/delirium.webp";
import expeditionIcon from "../../../components/FragmentStep/Fragment/images/expedition.webp";
import harvestIcon    from "../../../components/FragmentStep/Fragment/images/harvest.webp";
import legionIcon     from "../../../components/FragmentStep/Fragment/images/legion.webp";
import ritualIcon     from "../../../components/FragmentStep/Fragment/images/ritual.webp";
import blightIcon     from "../../../components/FragmentStep/Fragment/images/blight.webp";
import strongboxIcon  from "../../../components/FragmentStep/Fragment/images/strongbox.webp";
import shrineIcon     from "../../../components/FragmentStep/Fragment/images/shrine.webp";
import essenceIcon    from "../../../components/FragmentStep/Fragment/images/essence.webp";

const DIFFICULTY_LABEL: Record<ChallengeDifficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
  endgame: "Endgame",
};

const DIFFICULTY_CLASS: Record<ChallengeDifficulty, string> = {
  easy: styles.diffEasy,
  medium: styles.diffMedium,
  hard: styles.diffHard,
  endgame: styles.diffEndgame,
};

const DIFFICULTY_ORDER: Record<ChallengeDifficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
  endgame: 3,
};

// Match "Defeat <Boss Name> (Act N)" or "Defeat <Boss Name> (level N+)"
// Boss name colored enemy orange (or pinnacle purple for major bosses).
// Steps using "(Mechanic, level N+)" format won't match — fall through to mechanic detection.
const NAMED_BOSS_DEFEAT = /^(defeat )(.*?)( \((?:act \d|level \d))/i;

// Pinnacle / major endgame bosses — shown in bright purple instead of enemy orange
const PINNACLE_BOSS = /^(sirus|the shaper|the elder|the maven|the searing exarch|the eater of worlds|high templar venarius|incarnation of|uber atziri|uber elder|kitava)/i;

// ── Map tier coloring ─────────────────────────────────────────────────────────
// Matches "T14+", "T16.5", "T1", "Tier 11+", "Tier 14"
const TIER_RE = /\bT(\d+(?:\.\d+)?)(\+?)|\bTier (\d+)(\+?)/g;

function getTierClass(num: number): string {
  if (num >= 17)   return fragmentStyles.mapPinnacle;
  if (num >= 16.5) return fragmentStyles.mapGuardian;
  if (num >= 11)   return fragmentStyles.mapRed;
  if (num >= 6)    return fragmentStyles.mapYellow;
  return fragmentStyles.mapWhite;
}

/** Split `text` into spans, coloring T#/Tier # tokens with map-tier CSS classes. */
function renderTierSplit(text: string, baseClass: string): React.ReactNode {
  TIER_RE.lastIndex = 0;
  if (!TIER_RE.test(text)) return <span className={baseClass}>{text}</span>;
  TIER_RE.lastIndex = 0;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = TIER_RE.exec(text)) !== null) {
    if (m.index > last) {
      parts.push(<span key={`s${last}`}>{text.slice(last, m.index)}</span>);
    }
    const num = parseFloat(m[1] ?? m[3]);
    parts.push(
      <span key={`t${m.index}`} className={classNames(getTierClass(num))}>{m[0]}</span>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    parts.push(<span key={`s${last}`}>{text.slice(last)}</span>);
  }
  return <span className={baseClass}>{parts}</span>;
}

function StepContent({ text }: { text: string }) {
  const isCrafting  = /^vendor recipe:|^craft\b/i.test(text);
  const isUseOrb    = /^use\b/i.test(text);
  const isAscend    = /^use the ascendancy device|^gain a bloodline class/i.test(text);
  const isChoose    = /^choose\b/i.test(text);
  const isCollect   = /^collect\b/i.test(text);
  const isVisit     = /^visit |^go to /i.test(text);
  const isEnter     = /^enter /i.test(text);
  const isComplete  = /^complete /i.test(text);
  const hasWaypoint = /\bwaypoint\b/i.test(text);

  // Named boss defeat: color boss name — pinnacle purple or enemy orange
  const bossMatch = NAMED_BOSS_DEFEAT.exec(text);
  if (bossMatch) {
    const [, prefix, bossName] = bossMatch;
    const rest = text.slice(prefix.length + bossName.length);
    const bossClass = PINNACLE_BOSS.test(bossName) ? fragmentStyles.pinnacle : fragmentStyles.enemy;
    return (
      <span>
        <span className={classNames(fragmentStyles.default)}>{prefix}</span>
        <span className={classNames(bossClass)}>{bossName}</span>
        <span className={classNames(fragmentStyles.default)}>{rest}</span>
      </span>
    );
  }

  // Visit / Go to: use ➞ arrow prefix
  if (isVisit) {
    return (
      <span className={classNames(fragmentStyles.noWrap)}>
        <span className={classNames(fragmentStyles.default)}>{"➞ "}</span>
        <span className={classNames(fragmentStyles.default)}>{text}</span>
      </span>
    );
  }

  // ── League mechanic / icon detection ────────────────────────────────────────
  // Icon-backed mechanics
  const hasBreach     = /\bbreaches?\b|\bhives?\b|\bhive\b/i.test(text);
  const hasAbyss      = /\babyssal\b|\babysses?\b|\babyss\b/i.test(text);
  const hasDelirium   = /\bdelirium\b|\bsimulacrum\b|\bking in the mists\b/i.test(text);
  const hasExpedition = /\bexpeditions?\b|\blogbooks?\b|\bolroth\b|\bmedved\b|\bvorana\b|\buhtred\b/i.test(text);
  const hasHarvest    = /\bharvests?\b|\boshabi\b|\bsacred blossom\b/i.test(text);
  const hasLegion     = /\blegion\b/i.test(text);
  const hasRitual     = /\brituals?\b/i.test(text);
  const hasBlight     = /\bblights?\b|\bblight-ravaged\b/i.test(text);
  const hasStrongbox  = /\bstrongboxes?\b/i.test(text);
  const hasShrine     = /\bshrines?\b/i.test(text);
  const hasEssence    = /\bessences?\b/i.test(text);
  // Currency: orb names, catalysts, scarabs
  const hasCurrency   = /\borbs?\b|\bregal\b|\bchaos\b|\bdivine\b|\bexalted\b|\bsacred\b|\bblessed\b|\bchromatic\b|\bfusing\b|\bjeweller|\bscarab\b|\bcatalyst\b|\bincubator\b|\bfog\b|\bcoins?\b|\bprisms?\b/i.test(text);

  // Color-only mechanics (no dedicated icon)
  const hasBeyond     = /\bbeyond\b/i.test(text);
  const hasPossessed  = /\bpossessed\b/i.test(text);
  const hasUltimatum  = /\bultimatum\b|\btrialmaster\b/i.test(text);
  const hasHeist      = /\bheist\b|\bblueprints?\b|\bcontracts?\b|\bsmuggler'?s?\s*cache/i.test(text);
  const hasKingsmarch = /\bkingsmarch\b|\batlas\s+runner/i.test(text);
  const hasOreDeposit = /\bore\s+deposit/i.test(text);
  const hasDivCard    = /\bdivination\b|\bdiv(?:ination)?\s+card/i.test(text);
  // Rare monsters — PoE rare yellow
  const hasRareMob    = /\bdefeat\s+rare\b|\b4-mod\s+rares?\b/i.test(text);
  const hasBetrayal   = /\bbetrayal\b|\bsyndicate\b|\bcatarina\b|\bjun\b/i.test(text);
  const hasDelve      = /\bdelve\b|\bniko\b|\baul\b/i.test(text);
  const hasBeast      = /\bmenagerie\b|\bbestiary\b|\beinhar\b|\bfarrul\b/i.test(text);
  const hasIncursion  = /\bincursion\b|\bomnitect\b|\balva\b|\bchronicle\b/i.test(text);
  const hasSanctum    = /\bsanctum\b|\blycia\b/i.test(text);

  // ── Icon assignment (highest priority first) ─────────────────────────────────
  let icon: string | null = null;
  let colorClass: string | null = null;

  if (isCrafting)                              icon = craftingIcon;
  else if (isAscend)                           icon = trialIcon;
  // isUseOrb before league mechanics — "Use X Scarab/Currency" always gets currencyIcon
  else if (isUseOrb)                           icon = currencyIcon;
  else if (isChoose || isCollect)              icon = questIcon;
  else if (isEnter || hasWaypoint)             icon = waypointIcon;
  else if (isComplete)                         icon = questIcon;
  else if (hasBreach)                          icon = breachIcon;
  else if (hasAbyss)                           icon = abyssIcon;
  else if (hasDelirium)                        icon = deliriumIcon;
  else if (hasExpedition)                      icon = expeditionIcon;
  else if (hasHarvest)                         icon = harvestIcon;
  else if (hasLegion)                          icon = legionIcon;
  else if (hasRitual)                          icon = ritualIcon;
  else if (hasBlight)                          icon = blightIcon;
  else if (hasStrongbox)                       icon = strongboxIcon;
  else if (hasShrine)                          icon = shrineIcon;
  else if (hasEssence)                         icon = essenceIcon;
  else if (hasCurrency)                        icon = currencyIcon;
  // Color-only fallbacks (no icon file)
  else if (hasRareMob)                         colorClass = fragmentStyles.rare;
  else if (hasUltimatum)                       colorClass = fragmentStyles.trial;    // gold
  else if (hasBeyond)                          colorClass = fragmentStyles.league;   // danger red
  else if (hasPossessed)                       colorClass = fragmentStyles.portal;   // purple
  else if (hasHeist)                           colorClass = fragmentStyles.area;     // grey-blue
  else if (hasKingsmarch || hasOreDeposit)     colorClass = fragmentStyles.trial;    // gold
  else if (hasDivCard)                         colorClass = fragmentStyles.quest;    // warm gold
  else if (hasBetrayal)                        colorClass = fragmentStyles.league;   // danger red
  else if (hasDelve)                           colorClass = fragmentStyles.waypoint; // blue
  else if (hasBeast)                           colorClass = fragmentStyles.questText;// bright green
  else if (hasIncursion)                       colorClass = fragmentStyles.trial;    // gold
  else if (hasSanctum)                         colorClass = fragmentStyles.portal;   // purple

  const baseClass = colorClass ?? fragmentStyles.default;
  const textNode = renderTierSplit(text, baseClass);

  if (!icon) return textNode;

  return (
    <div className={classNames(fragmentStyles.noWrap)}>
      <img src={icon} className="inlineIcon" alt="" />
      {textNode}
    </div>
  );
}

// ── Per-step hints component ──────────────────────────────────────────────────

function StepWithHints({ text, hints }: { text: string; hints: string[] }) {
  const [showHints, setShowHints] = useState(false);
  return (
    <div>
      <div className={classNames(styles.stepContentRow)}>
        <StepContent text={text} />
        <button
          className={classNames(styles.stepHintsToggle)}
          onClick={(e) => { setShowHints((v) => !v); e.stopPropagation(); }}
          aria-label={showHints ? "Hide step hints" : "Show step hints"}
        >
          {showHints
            ? <BiSolidInfoCircle className="inlineIcon" />
            : <BiInfoCircle className="inlineIcon" />}
        </button>
      </div>
      {showHints && (
        <ul className={classNames(styles.stepHintsList)}>
          {hints.map((hint, i) => (
            <li key={i} className={classNames(styles.stepHintItem)}>{hint}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Per-challenge section ─────────────────────────────────────────────────────

function ChallengeSection({ c, defaultShowHints }: { c: Challenge; defaultShowHints: boolean }) {
  const [showTips, setShowTips] = useState(defaultShowHints);
  const doneCount = useRecoilValue(challengeDoneCountSelectorFamily(c.id));
  const needed = c.requires ?? c.steps.length;
  const hasTips = c.tips && c.tips.length > 0;
  const hasRequires = c.requires != null && c.requires < c.steps.length;

  const taskItems: TaskListProps["items"] = c.steps.map((step, i) => {
    const hints = c.stepHints?.[i];
    return {
      key: `${c.id}-step-${i}`,
      isCompletedState: challengeStepProgressSelectorFamily(`${c.id}:${i}`),
      children: hints
        ? <StepWithHints text={step} hints={hints} />
        : <StepContent text={step} />,
    };
  });

  // Header right: requires badge + difficulty badge
  const nameRight = (
    <span className={classNames(styles.headerRight)}>
      {hasRequires && (
        <span className={classNames(styles.requiresBadge, doneCount >= needed ? styles.requiresMet : undefined)}>
          {doneCount}/{c.requires}
        </span>
      )}
      <span className={classNames(styles.diffBadge, DIFFICULTY_CLASS[c.difficulty])}>
        {DIFFICULTY_LABEL[c.difficulty].toUpperCase()}
      </span>
    </span>
  );

  const meta = hasTips ? (
    <div className={classNames(styles.metaRow)}>
      <button
        className={classNames(styles.tipsToggle)}
        onClick={() => setShowTips(!showTips)}
      >
        {showTips
          ? <BiSolidInfoCircle className="inlineIcon" />
          : <BiInfoCircle className="inlineIcon" />}
        {" "}
        <span>{showTips ? "Hide hints" : "Show hints"}</span>
      </button>
      {showTips && (
        <ul className={classNames(styles.tipsList)}>
          {c.tips!.map((tip, i) => (
            <li key={i} className={classNames(styles.tipItem)}>{tip}</li>
          ))}
        </ul>
      )}
    </div>
  ) : undefined;

  return (
    <SectionHolder
      key={c.id}
      name={`${c.number}. ${c.name}`}
      nameRight={nameRight}
      items={taskItems}
      meta={meta}
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ChallengeTracker() {
  const totalCompleted = useRecoilValue(challengeCountSelector);
  const config = useRecoilValue(configSelector);

  const challenges = config.sortChallengesByDifficulty
    ? [...CHALLENGES].sort(
        (a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty] || a.number - b.number
      )
    : CHALLENGES;

  return (
    <>
      <div className={classNames(styles.progressHeader)}>
        <span className={classNames(styles.progressTitle)}>
          Challenges Complete
        </span>
        <span className={classNames(styles.progressCount)}>
          {totalCompleted}
          <span className={classNames(styles.progressTotal)}>/{CHALLENGES.length}</span>
        </span>
        <div className={classNames(styles.progressBar)}>
          <div
            className={classNames(styles.progressFill)}
            style={{ width: `${(totalCompleted / CHALLENGES.length) * 100}%` }}
          />
        </div>
      </div>

      {challenges.map((c) => (
        <ChallengeSection key={c.id} c={c} defaultShowHints={config.showChallengeHints} />
      ))}
    </>
  );
}
