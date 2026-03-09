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
// to extract and color only the boss name in enemy orange.
// Counter steps like "Defeat Monsters... (0/30)" won't match.
const NAMED_BOSS_DEFEAT = /^(defeat )(.*?)( \((?:act \d|level \d))/i;

function StepContent({ text }: { text: string }) {
  const isCrafting  = /^vendor recipe:/i.test(text);
  const isUseOrb    = /^use an? /i.test(text);
  const isAscend    = /^use the ascendancy device|^gain a bloodline class/i.test(text);
  const isVisit     = /^visit |^go to /i.test(text);
  const isEnter     = /^enter /i.test(text);
  const isComplete  = /^complete /i.test(text);
  const hasWaypoint = /\bwaypoint\b/i.test(text);

  // Named boss defeat: color boss name in enemy orange
  const bossMatch = NAMED_BOSS_DEFEAT.exec(text);
  if (bossMatch) {
    const [, prefix, bossName] = bossMatch;
    const rest = text.slice(prefix.length + bossName.length);
    return (
      <span>
        <span className={classNames(fragmentStyles.default)}>{prefix}</span>
        <span className={classNames(fragmentStyles.enemy)}>{bossName}</span>
        <span className={classNames(fragmentStyles.default)}>{rest}</span>
      </span>
    );
  }

  // Visit / Go to: use ➞ arrow prefix instead of an icon
  if (isVisit) {
    return (
      <span className={classNames(fragmentStyles.noWrap)}>
        <span className={classNames(fragmentStyles.default)}>{"➞ "}</span>
        <span className={classNames(fragmentStyles.default)}>{text}</span>
      </span>
    );
  }

  // League mechanic detection (keyword-based, checked before generic fallbacks)
  const hasBreach     = /\bbreaches?\b/i.test(text);
  const hasAbyss      = /\babyssal|\babysses?\b/i.test(text);
  const hasDelirium   = /\bdelirium\b|\bsimulacrum\b/i.test(text);
  const hasExpedition = /\bexpeditions?\b|\blogbooks?\b/i.test(text);
  const hasHarvest    = /\bharvests?\b/i.test(text);
  const hasLegion     = /\blegion\b/i.test(text);
  const hasRitual     = /\brituals?\b/i.test(text);
  const hasBlight     = /\bblights?\b|\bblight-ravaged\b/i.test(text);
  const hasStrongbox  = /\bstrongboxes?\b/i.test(text);
  const hasShrine     = /\bshrines?\b/i.test(text);
  const hasEssence    = /\bessences?\b/i.test(text);
  // Currency: bare orb names (e.g. "Chaos Orb (0/20)") or "Use an Orb..."
  const hasCurrency   = /\borbs?\b|\bregal\b|\bchaos\b|\bdivine\b|\bexalted\b|\bsacred\b|\bblessed\b|\bchromatic\b|\bfusing\b|\bjeweller/i.test(text);

  let icon: string | null = null;
  if (isCrafting)                   icon = craftingIcon;
  else if (isAscend)                icon = trialIcon;
  else if (isEnter || hasWaypoint)  icon = waypointIcon;
  else if (isComplete)              icon = questIcon;
  else if (isUseOrb || hasCurrency) icon = currencyIcon;
  else if (hasBreach)               icon = breachIcon;
  else if (hasAbyss)                icon = abyssIcon;
  else if (hasDelirium)             icon = deliriumIcon;
  else if (hasExpedition)           icon = expeditionIcon;
  else if (hasHarvest)              icon = harvestIcon;
  else if (hasLegion)               icon = legionIcon;
  else if (hasRitual)               icon = ritualIcon;
  else if (hasBlight)               icon = blightIcon;
  else if (hasStrongbox)            icon = strongboxIcon;
  else if (hasShrine)               icon = shrineIcon;
  else if (hasEssence)              icon = essenceIcon;

  const textSpan = (
    <span className={classNames(fragmentStyles.default)}>{text}</span>
  );

  if (!icon) return textSpan;

  return (
    <div className={classNames(fragmentStyles.noWrap)}>
      <img src={icon} className="inlineIcon" alt="" />
      {textSpan}
    </div>
  );
}

// ── Per-challenge section ─────────────────────────────────────────────────────

function ChallengeSection({ c }: { c: Challenge }) {
  const [showTips, setShowTips] = useState(false);
  const doneCount = useRecoilValue(challengeDoneCountSelectorFamily(c.id));
  const needed = c.requires ?? c.steps.length;
  const hasTips = c.tips && c.tips.length > 0;

  const taskItems: TaskListProps["items"] = c.steps.map((step, i) => ({
    key: `${c.id}-step-${i}`,
    isCompletedState: challengeStepProgressSelectorFamily(`${c.id}:${i}`),
    children: <StepContent text={step} />,
  }));

  // Difficulty badge shown in header (nameRight)
  const nameRight = (
    <span className={classNames(styles.diffBadge, DIFFICULTY_CLASS[c.difficulty])}>
      {DIFFICULTY_LABEL[c.difficulty].toUpperCase()}
    </span>
  );

  const meta = (
    <>
      {/* Requires row — only show when not all steps are required */}
      {c.requires != null && c.requires < c.steps.length && (
        <div className={classNames(styles.metaRow)}>
          <span className={classNames(fragmentStyles.default)}>
            Need any{" "}
            <span className={classNames(styles.requiresCount)}>
              {c.requires}
            </span>
            {" of "}
            <span className={classNames(styles.requiresCount)}>
              {c.steps.length}
            </span>
            {" — done: "}
            <span className={classNames(styles.requiresCount, doneCount >= needed ? styles.requiresMet : undefined)}>
              {doneCount}
            </span>
          </span>
        </div>
      )}

      {/* Tips toggle — only shown when tips exist */}
      {hasTips && (
        <div className={classNames(styles.metaRow)}>
          <button
            className={classNames(styles.tipsToggle)}
            onClick={() => setShowTips(!showTips)}
          >
            {showTips
              ? <BiSolidInfoCircle className="inlineIcon" />
              : <BiInfoCircle className="inlineIcon" />}
            {" "}
            <span className={classNames(fragmentStyles.quest)}>
              {showTips ? "Hide hints" : "Show hints"}
            </span>
          </button>
          {showTips && (
            <ul className={classNames(styles.tipsList)}>
              {c.tips!.map((tip, i) => (
                <li key={i} className={classNames(styles.tipItem)}>
                  <span className={classNames(fragmentStyles.default)}>{tip}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );

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
        <ChallengeSection key={c.id} c={c} />
      ))}
    </>
  );
}
