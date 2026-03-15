import {
  routeSectionProgressSelector,
  voidstoneSectionProgressSelector,
  challengeProgressSummarySelector,
} from "../../state/progress-summary";
import { leagueSelector } from "../../state/league";
import { buildDataSelector } from "../../state/build-data";
import { buildSettingsSelector } from "../../state/build-settings";
import { MAJOR_GODS, MINOR_GODS } from "../../data/pantheon-data";
import { urlTreesSelector } from "../../state/tree/url-tree";
import { SkillTreeViewer } from "../../components/SkillTreeViewer";
import styles from "./styles.module.css";
import classNames from "classnames";
import { Suspense } from "react";
import { useRecoilValue } from "recoil";

// ── Shared ─────────────────────────────────────────────────────────────────────

function Divider() {
  return <hr className={classNames(styles.divider)} />;
}

// ── Progress bar ──────────────────────────────────────────────────────────────

interface ProgressBarProps {
  label: string;
  completed: number;
  total: number;
}

function ProgressBar({ label, completed, total }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.min((completed / total) * 100, 100);
  return (
    <div className={classNames(styles.progressItem)}>
      <div className={classNames(styles.progressLabel)}>
        <span>{label}</span>
        <span className={classNames(styles.progressCount)}>
          {completed}
          <span className={classNames(styles.progressTotal)}>/{total}</span>
        </span>
      </div>
      <div className={classNames(styles.progressTrack)}>
        <div
          className={classNames(styles.progressFill)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return <h2 className={classNames(styles.sectionHeader)}>{title}</h2>;
}

// ── ACT 1–10 ──────────────────────────────────────────────────────────────────

function ActProgress() {
  const sections = useRecoilValue(routeSectionProgressSelector);
  const league = useRecoilValue(leagueSelector);

  return (
    <div>
      <div className={classNames(styles.sectionHeadingRow)}>
        <SectionHeader title="ACT 1–10" />
        <span className={classNames(styles.leagueBadge)}>{league}</span>
      </div>
      <div className={classNames(styles.progressList)}>
        {sections.map((s) => (
          <ProgressBar key={s.name} label={s.name} completed={s.completed} total={s.total} />
        ))}
      </div>
    </div>
  );
}

// ── Voidstones ────────────────────────────────────────────────────────────────

function VoidstoneProgress() {
  const sections = useRecoilValue(voidstoneSectionProgressSelector);

  return (
    <div>
      <SectionHeader title="Voidstones" />
      <div className={classNames(styles.progressList)}>
        {sections.map((s) => (
          <ProgressBar key={s.name} label={s.name} completed={s.completed} total={s.total} />
        ))}
      </div>
    </div>
  );
}

// ── Challenges ────────────────────────────────────────────────────────────────

function ChallengeProgress() {
  const summary = useRecoilValue(challengeProgressSummarySelector);

  return (
    <div>
      <SectionHeader title="Challenges" />
      <div className={classNames(styles.progressList)}>
        <ProgressBar label="Challenges" completed={summary.completed} total={summary.total} />
      </div>
    </div>
  );
}

// ── Character ─────────────────────────────────────────────────────────────────

function Character() {
  const buildData = useRecoilValue(buildDataSelector);

  return (
    <div>
      <SectionHeader title="Character" />
      <div className={classNames(styles.infoList)}>
        <div className={classNames(styles.infoRow)}>
          <span className={classNames(styles.infoLabel)}>Class</span>
          <span>{buildData.characterClass === "None" ? "—" : buildData.characterClass}</span>
        </div>
        <div className={classNames(styles.infoRow)}>
          <span className={classNames(styles.infoLabel)}>Bandit</span>
          <span>{buildData.bandit === "None" ? "Kill All" : buildData.bandit}</span>
        </div>
      </div>
    </div>
  );
}

// ── Pantheon ──────────────────────────────────────────────────────────────────

function Pantheon() {
  const settings = useRecoilValue(buildSettingsSelector);

  const majorGod = MAJOR_GODS.find((g) => g.id === settings.pantheonMajor);
  const minorGod = MINOR_GODS.find((g) => g.id === settings.pantheonMinor);

  if (!majorGod && !minorGod) return null;

  return (
    <>
      <Divider />
      <SectionHeader title="Pantheon" />
      <div className={classNames(styles.infoList)}>
        {majorGod && (
          <div className={classNames(styles.pantheonEntry)}>
            <div className={classNames(styles.infoRow)}>
              <span className={classNames(styles.infoLabel)}>Major</span>
              <span>{majorGod.name}</span>
            </div>
            <p className={classNames(styles.godEffect)}>{majorGod.effect}</p>
          </div>
        )}
        {minorGod && (
          <div className={classNames(styles.pantheonEntry)}>
            <div className={classNames(styles.infoRow)}>
              <span className={classNames(styles.infoLabel)}>Minor</span>
              <span>{minorGod.name}</span>
            </div>
            <p className={classNames(styles.godEffect)}>{minorGod.effect}</p>
          </div>
        )}
      </div>
    </>
  );
}

// ── Skill Tree ────────────────────────────────────────────────────────────────

function DashboardSkillTree() {
  const { urlTrees } = useRecoilValue(urlTreesSelector);
  if (urlTrees.length === 0) return null;

  return (
    <>
      <Divider />
      <SectionHeader title="Skill Tree" />
      <SkillTreeViewer urlTrees={urlTrees} />
    </>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export default function DashboardContainer() {
  return (
    <div className={classNames(styles.dashboard)}>
      <div className={classNames(styles.col)}>
        <ActProgress />
        <Divider />
        <VoidstoneProgress />
        <Divider />
        <ChallengeProgress />
      </div>
      <div className={classNames(styles.col)}>
        <Character />
        <Pantheon />
        <Suspense fallback={null}>
          <DashboardSkillTree />
        </Suspense>
      </div>
    </div>
  );
}
