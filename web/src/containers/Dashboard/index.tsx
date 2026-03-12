import {
  routeSectionProgressSelector,
  voidstoneSectionProgressSelector,
  challengeProgressSummarySelector,
} from "../../state/progress-summary";
import { leagueSelector } from "../../state/league";
import { buildDataSelector } from "../../state/build-data";
import { buildSettingsSelector } from "../../state/build-settings";
import { MAJOR_GODS, MINOR_GODS } from "../../data/pantheon-data";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useRecoilValue } from "recoil";

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

// ── ACT 1–10 panel ────────────────────────────────────────────────────────────

function ActProgress() {
  const sections = useRecoilValue(routeSectionProgressSelector);
  const league = useRecoilValue(leagueSelector);

  return (
    <section className={classNames(styles.panel)}>
      <div className={classNames(styles.panelHeading)}>
        <SectionHeader title="ACT 1–10" />
        <span className={classNames(styles.leagueBadge)}>{league}</span>
      </div>
      <div className={classNames(styles.progressList)}>
        <div className={classNames(styles.subProgressList)}>
          {sections.map((s) => (
            <ProgressBar key={s.name} label={s.name} completed={s.completed} total={s.total} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Voidstones panel ──────────────────────────────────────────────────────────

function VoidstoneProgress() {
  const sections = useRecoilValue(voidstoneSectionProgressSelector);

  return (
    <section className={classNames(styles.panel)}>
      <SectionHeader title="Voidstones" />
      <div className={classNames(styles.progressList)}>
        <div className={classNames(styles.subProgressList)}>
          {sections.map((s) => (
            <ProgressBar key={s.name} label={s.name} completed={s.completed} total={s.total} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Challenges panel ──────────────────────────────────────────────────────────

function ChallengeProgress() {
  const summary = useRecoilValue(challengeProgressSummarySelector);

  return (
    <section className={classNames(styles.panel)}>
      <SectionHeader title="Challenges" />
      <div className={classNames(styles.progressList)}>
        <ProgressBar label="Challenges" completed={summary.completed} total={summary.total} />
      </div>
    </section>
  );
}

// ── Misc panel ────────────────────────────────────────────────────────────────

function Misc() {
  const buildData = useRecoilValue(buildDataSelector);
  const settings = useRecoilValue(buildSettingsSelector);

  const majorGod = MAJOR_GODS.find((g) => g.id === settings.pantheonMajor);
  const minorGod = MINOR_GODS.find((g) => g.id === settings.pantheonMinor);

  return (
    <section className={classNames(styles.panel)}>
      <SectionHeader title="Misc" />

      <div className={classNames(styles.miscList)}>
        <div className={classNames(styles.miscRow)}>
          <span>Class</span>
          <span>{buildData.characterClass === "None" ? "—" : buildData.characterClass}</span>
        </div>
        <div className={classNames(styles.miscRow)}>
          <span>Bandit</span>
          <span>{buildData.bandit === "None" ? "Kill All" : buildData.bandit}</span>
        </div>
      </div>

      {(majorGod || minorGod) && (
        <div className={classNames(styles.subSection)}>
          <h3 className={classNames(styles.subSectionTitle)}>Pantheon</h3>
          {majorGod && (
            <div className={classNames(styles.pantheonRow)}>
              <span className={classNames(styles.pantheonLabel)}>Major</span>
              <span className={classNames(styles.pantheonName)}>{majorGod.name}</span>
              <span className={classNames(styles.pantheonEffect)}>{majorGod.effect}</span>
            </div>
          )}
          {minorGod && (
            <div className={classNames(styles.pantheonRow)}>
              <span className={classNames(styles.pantheonLabel)}>Minor</span>
              <span className={classNames(styles.pantheonName)}>{minorGod.name}</span>
              <span className={classNames(styles.pantheonEffect)}>{minorGod.effect}</span>
            </div>
          )}
        </div>
      )}

      {!majorGod && !minorGod && (
        <p className={classNames(styles.emptyHint)}>
          Set Pantheon in the Build tab.
        </p>
      )}
    </section>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export default function DashboardContainer() {
  return (
    <div className={classNames(styles.dashboard)}>
      <div className={classNames(styles.leftCol)}>
        <ActProgress />
        <VoidstoneProgress />
        <ChallengeProgress />
      </div>
      <div className={classNames(styles.rightCol)}>
        <Misc />
      </div>
    </div>
  );
}
