import {
  routeSectionProgressSelector,
  voidstoneSectionProgressSelector,
  challengeProgressSummarySelector,
} from "../../state/progress-summary";
import { leagueSelector } from "../../state/league";
import { uniqueItemsSelector } from "../../state/unique-items";
import { buildDataSelector } from "../../state/build-data";
import { buildSettingsSelector } from "../../state/build-settings";
import { getAcquisitionSource, getDivCardOnlyItems } from "../../data/unique-drop-sources";
import { DivCardBadge } from "../../components/UniqueItemBadge";
import { MAJOR_GODS, MINOR_GODS } from "../../data/pantheon-data";
import styles from "./styles.module.css";
import classNames from "classnames";
import { FaStar } from "react-icons/fa";
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

// ── Unique Items panel ────────────────────────────────────────────────────────

function UniqueItems() {
  const items = useRecoilValue(uniqueItemsSelector);
  const buildUniqueNames = items.map((i) => i.name);
  const divCardOnlyNames = getDivCardOnlyItems(buildUniqueNames);

  if (items.length === 0) {
    return (
      <section className={classNames(styles.panel)}>
        <SectionHeader title="Unique Items" />
        <p className={classNames(styles.emptyHint)}>
          Import a build in the Build tab to see unique items and where to
          acquire them.
        </p>
      </section>
    );
  }

  return (
    <section className={classNames(styles.panel)}>
      <SectionHeader title="Unique Items" />
      <ul className={classNames(styles.itemList)}>
        {items.map((item) => {
          const source = getAcquisitionSource(item.name);
          const tier = source?.tier ?? (
            source?.sourceType === "pinnacle" ? 4 :
            source?.sourceType === "guardian" ? 3 :
            source?.sourceType === "league"   ? 2 : 1
          );
          const showTier = !source?.globalDrop && !source?.divCardOnly &&
            (source?.bosses?.length || source?.areas?.length);
          return (
            <li key={item.name} className={classNames(styles.itemRow)}>
              <div className={classNames(styles.itemInfo)}>
                <span className={classNames(styles.itemName)}>
                  <FaStar className={classNames(styles.uniqueIcon)} />
                  {item.name}
                </span>
                <span className={classNames(styles.itemBase)}>{item.base}</span>
              </div>
              <div className={classNames(styles.itemSource)}>
                {showTier && (
                  <span
                    className={classNames(styles.tierBadge, styles[`tier${tier}`])}
                    title={source?.restriction ?? `Content tier ${tier}`}
                  >
                    T{tier}
                  </span>
                )}
                {source?.divCardOnly ? (
                  <span
                    className={classNames(styles.sourceDiv)}
                    title={source.notes}
                  >
                    {source.divCard}
                  </span>
                ) : source?.globalDrop || (!source?.bosses?.length && !source?.areas?.length) ? (
                  <span className={classNames(styles.sourceGlobal)}>
                    Global Drop
                  </span>
                ) : (
                  <div
                    className={classNames(styles.sourceMulti)}
                    title={source?.notes}
                  >
                    {source?.bosses?.map((boss) => (
                      <span
                        key={boss}
                        className={classNames(
                          styles.sourceChip,
                          source.sourceType === "pinnacle" && styles.sourcePinnacle,
                          source.sourceType === "guardian" && styles.sourceGuardian,
                          source.sourceType === "league"   && styles.sourceLeague,
                          !source.sourceType               && styles.sourceBoss,
                        )}
                      >
                        {boss}
                      </span>
                    ))}
                    {source?.areas?.map((area) => (
                      <span
                        key={area}
                        className={classNames(
                          styles.sourceChip,
                          source.sourceType === "league"   && styles.sourceLeague,
                          source.sourceType === "guardian" && styles.sourceGuardian,
                          !source.sourceType               && styles.sourceBoss,
                        )}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {divCardOnlyNames.length > 0 && (
        <div className={classNames(styles.divCardCallout)}>
          <span className={classNames(styles.divCardLabel)}>
            Div card trades needed:
          </span>
          <DivCardBadge items={divCardOnlyNames} />
        </div>
      )}
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
        <UniqueItems />
        <Misc />
      </div>
    </div>
  );
}
