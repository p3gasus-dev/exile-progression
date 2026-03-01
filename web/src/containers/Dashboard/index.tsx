import {
  routeProgressSummarySelector,
  voidstoneProgressSummarySelector,
  challengeProgressSummarySelector,
} from "../../state/progress-summary";
import { uniqueItemsSelector } from "../../state/unique-items";
import { buildDataSelector } from "../../state/build-data";
import { buildSettingsSelector } from "../../state/build-settings";
import { getAcquisitionSource, getDivCardOnlyItems } from "../../data/unique-drop-sources";
import { DivCardBadge } from "../../components/UniqueItemBadge";
import { MAJOR_GODS, MINOR_GODS } from "../../data/pantheon-data";
import { OIL_COLOURS } from "../../data/oil-data";
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

// ── Route Progress panel ──────────────────────────────────────────────────────

function RouteProgress() {
  const actSummary = useRecoilValue(routeProgressSummarySelector);
  const voidstoneSummary = useRecoilValue(voidstoneProgressSummarySelector);
  const challengeSummary = useRecoilValue(challengeProgressSummarySelector);

  return (
    <section className={classNames(styles.panel)}>
      <SectionHeader title="Route Progress" />
      <div className={classNames(styles.progressList)}>
        <ProgressBar
          label="ACT 1–10"
          completed={actSummary.completed}
          total={actSummary.total}
        />
        <ProgressBar
          label="Voidstones"
          completed={voidstoneSummary.completed}
          total={voidstoneSummary.total}
        />
        <ProgressBar
          label="Challenges"
          completed={challengeSummary.completed}
          total={challengeSummary.total}
        />
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

  const hasContent =
    majorGod ||
    minorGod ||
    settings.anoints.length > 0 ||
    settings.specialMods.filter((m) => m.trim()).length > 0;

  return (
    <section className={classNames(styles.panel)}>
      <SectionHeader title="Misc" />

      {/* ── Build summary ─────────────────────────────────── */}
      <dl className={classNames(styles.miscList)}>
        <div className={classNames(styles.miscRow)}>
          <dt>Class</dt>
          <dd>{buildData.characterClass || "—"}</dd>
        </div>
        <div className={classNames(styles.miscRow)}>
          <dt>Bandit</dt>
          <dd>{buildData.bandit === "None" ? "Kill All" : buildData.bandit}</dd>
        </div>
        <div className={classNames(styles.miscRow)}>
          <dt>League Start</dt>
          <dd>{buildData.leagueStart ? "Yes" : "No"}</dd>
        </div>
        <div className={classNames(styles.miscRow)}>
          <dt>Library Quest</dt>
          <dd>{buildData.library ? "Yes" : "No"}</dd>
        </div>
      </dl>

      {!hasContent && (
        <p className={classNames(styles.emptyHint)}>
          Set Pantheon, Anoints, and Special Mods in the Build tab.
        </p>
      )}

      {/* ── Pantheon ──────────────────────────────────────── */}
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

      {/* ── Anoints ───────────────────────────────────────── */}
      {settings.anoints.length > 0 && (
        <div className={classNames(styles.subSection)}>
          <h3 className={classNames(styles.subSectionTitle)}>Anoints</h3>
          <ul className={classNames(styles.anointList)}>
            {settings.anoints.map((anoint, i) => (
              <li key={i} className={classNames(styles.anointRow)}>
                <span className={classNames(styles.anointNotable)}>
                  {anoint.notable || "—"}
                </span>
                <span className={classNames(styles.anointOils)}>
                  {[anoint.oil1, anoint.oil2, anoint.oil3].map((oil, j) => (
                    <span
                      key={j}
                      className={classNames(styles.oilPip)}
                      style={{ backgroundColor: OIL_COLOURS[oil] }}
                      title={oil}
                    />
                  ))}
                  <span className={classNames(styles.anointOilNames)}>
                    {anoint.oil1} + {anoint.oil2} + {anoint.oil3}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Special Mods ──────────────────────────────────── */}
      {settings.specialMods.filter((m) => m.trim()).length > 0 && (
        <div className={classNames(styles.subSection)}>
          <h3 className={classNames(styles.subSectionTitle)}>Special Mods</h3>
          <ul className={classNames(styles.specialModList)}>
            {settings.specialMods
              .filter((m) => m.trim())
              .map((mod, i) => (
                <li key={i} className={classNames(styles.specialMod)}>
                  {mod}
                </li>
              ))}
          </ul>
        </div>
      )}
    </section>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export default function DashboardContainer() {
  return (
    <div className={classNames(styles.dashboard)}>
      <RouteProgress />
      <UniqueItems />
      <Misc />
    </div>
  );
}
