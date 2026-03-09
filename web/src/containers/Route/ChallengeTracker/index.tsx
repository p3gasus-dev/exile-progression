import { challengeProgressSelectorFamily, challengeCountSelector } from "../../../state/challenge-progress";
import { CHALLENGES, ChallengeDifficulty } from "../../../data/challenge-list";
import { SectionHolder } from "../../../components/SectionHolder";
import { TaskListProps } from "../../../components/TaskList";
import { configSelector } from "../../../state/config";
import styles from "./styles.module.css";
import fragmentStyles from "../../../components/FragmentStep/Fragment/styles.module.css";
import classNames from "classnames";
import { useRecoilValue } from "recoil";

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

function getImageUrl(path: string) {
  return new URL(
    `../../../components/FragmentStep/Fragment/images/${path}`,
    import.meta.url
  ).href;
}

// Match "Defeat <Boss Name> (Act N)" or "Defeat <Boss Name> (level N+)"
// to extract and color only the boss name in enemy orange.
// Counter steps like "Defeat Monsters... (0/30)" won't match.
const NAMED_BOSS_DEFEAT = /^(defeat )(.*?)( \((?:act \d|level \d)/i;

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
    const [, prefix, bossName, suffix] = bossMatch;
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
  if (isCrafting)                   icon = "crafting.png";
  else if (isAscend)                icon = "trial.png";
  else if (isEnter || hasWaypoint)  icon = "waypoint.png";
  else if (isComplete)              icon = "quest.png";
  else if (isUseOrb || hasCurrency) icon = "currency.png";
  else if (hasBreach)               icon = "breach.webp";
  else if (hasAbyss)                icon = "abyss.webp";
  else if (hasDelirium)             icon = "delirium.webp";
  else if (hasExpedition)           icon = "expedition.webp";
  else if (hasHarvest)              icon = "harvest.webp";
  else if (hasLegion)               icon = "legion.webp";
  else if (hasRitual)               icon = "ritual.webp";
  else if (hasBlight)               icon = "blight.webp";
  else if (hasStrongbox)            icon = "strongbox.webp";
  else if (hasShrine)               icon = "shrine.webp";
  else if (hasEssence)              icon = "essence.webp";

  const textSpan = (
    <span className={classNames(fragmentStyles.default)}>{text}</span>
  );

  if (!icon) return textSpan;

  return (
    <div className={classNames(fragmentStyles.noWrap)}>
      <img src={getImageUrl(icon)} className="inlineIcon" alt="" />
      {textSpan}
    </div>
  );
}

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

      {challenges.map((c) => {
        const completedState = challengeProgressSelectorFamily(c.id);
        const taskItems: TaskListProps["items"] = c.steps.map((step, i) => ({
          key: `${c.id}-step-${i}`,
          isCompletedState: completedState,
          children: <StepContent text={step} />,
        }));

        const meta = (
          <>
            {c.requires != null && c.requires < c.steps.length && (
              <span className={classNames(fragmentStyles.default)}>
                Requires:{" "}
                <span className={classNames(styles.requiresCount)}>
                  {c.requires}/{c.steps.length}
                </span>
              </span>
            )}
            <span className={classNames(fragmentStyles.default)}>
              Difficulty:{" "}
              <span className={classNames(styles.diffBadge, DIFFICULTY_CLASS[c.difficulty])}>
                {DIFFICULTY_LABEL[c.difficulty].toUpperCase()}
              </span>
            </span>
            {c.tips && c.tips.length > 0 && (
              <span>
                <span className={classNames(fragmentStyles.quest)}>Quest Hints</span>
                {c.tips.map((tip, i) => (
                  <span key={i} className={classNames(styles.tip)}>
                    {"• "}
                    <span className={classNames(fragmentStyles.default)}>{tip}</span>
                  </span>
                ))}
              </span>
            )}
          </>
        );

        return (
          <SectionHolder
            key={c.id}
            name={`${c.number}. ${c.name}`}
            items={taskItems}
            meta={meta}
          />
        );
      })}
    </>
  );
}
