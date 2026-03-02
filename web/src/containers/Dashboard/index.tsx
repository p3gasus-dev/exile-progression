import {
  routeProgressSummarySelector,
  routeCurrentSectionSelector,
  routeSectionProgressSelector,
  voidstoneProgressSummarySelector,
  voidstoneSectionProgressSelector,
  challengeProgressSummarySelector,
} from "../../state/progress-summary";
import { leagueSelector } from "../../state/league";
import { uniqueItemsSelector } from "../../state/unique-items";
import { buildDataSelector } from "../../state/build-data";
import { buildSettingsSelector } from "../../state/build-settings";
import { getAcquisitionSource, getDivCardOnlyItems } from "../../data/unique-drop-sources";
import { Data } from "../../../../common/data";
import { Fragments } from "../../../../common/route-processing/fragment/types";
import { DivCardBadge } from "../../components/UniqueItemBadge";
import { MAJOR_GODS, MINOR_GODS } from "../../data/pantheon-data";
import { OIL_COLOURS } from "../../data/oil-data";
import { STAT_TARGETS } from "../../data/stat-targets";
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

// ── Fragment → plain text ─────────────────────────────────────────────────────

function fragmentsToText(parts: Fragments.AnyFragment[]): string {
  return parts
    .map((p): string => {
      if (typeof p === "string") return p;
      switch (p.type) {
        case "kill":         return `Kill ${p.value}`;
        case "arena":        return p.value;
        case "area":         return Data.Areas[p.areaId]?.name ?? "";
        case "enter":        return `➞ ${Data.Areas[p.areaId]?.name ?? ""}`;
        case "logout":       return `Logout ➞ ${Data.Areas[p.areaId]?.name ?? ""}`;
        case "waypoint":     return "Waypoint";
        case "waypoint_use": return `Waypoint ➞ ${Data.Areas[p.dstAreaId]?.name ?? ""}`;
        case "waypoint_get": return "Waypoint";
        case "portal_set":   return "Set Portal";
        case "portal_use":   return `Portal ➞ ${Data.Areas[p.dstAreaId]?.name ?? ""}`;
        case "quest":        return Data.Quests[p.questId]?.name ?? "";
        case "quest_text":   return p.value;
        case "generic":      return p.value;
        case "league":       return p.value;
        case "reward_quest": return p.item;
        case "reward_vendor": return p.item;
        case "trial":        return "Trial of Ascendancy";
        case "ascend":       return "Ascend";
        case "crafting":     return `Craft: ${p.crafting_recipes.join(", ")}`;
        case "dir":          return "";
        case "copy":         return p.text;
        default:             return "";
      }
    })
    .filter(Boolean)
    .join(" ");
}

// ── Route Progress panel ──────────────────────────────────────────────────────

function RouteProgress() {
  const actSummary = useRecoilValue(routeProgressSummarySelector);
  const actSections = useRecoilValue(routeSectionProgressSelector);
  const currentSection = useRecoilValue(routeCurrentSectionSelector);
  const voidstoneSummary = useRecoilValue(voidstoneProgressSummarySelector);
  const voidstoneSections = useRecoilValue(voidstoneSectionProgressSelector);
  const challengeSummary = useRecoilValue(challengeProgressSummarySelector);
  const league = useRecoilValue(leagueSelector);

  return (
    <section className={classNames(styles.panel)}>
      <div className={classNames(styles.panelHeading)}>
        <SectionHeader title="Route Progress" />
        <span className={classNames(styles.leagueBadge)}>{league}</span>
      </div>
      <div className={classNames(styles.progressList)}>

        {/* ── ACT 1-10 (collapsible) ── */}
        <details className={classNames(styles.progressGroup)}>
          <summary className={classNames(styles.progressGroupSummary)}>
            <ProgressBar
              label="ACT 1–10"
              completed={actSummary.completed}
              total={actSummary.total}
            />
          </summary>
          <div className={classNames(styles.subProgressList)}>
            {actSections.map((s) => (
              <ProgressBar key={s.name} label={s.name} completed={s.completed} total={s.total} />
            ))}
            {currentSection && (
              <>
                <div className={classNames(styles.currentSection)}>
                  <span className={classNames(styles.currentSectionName)}>
                    {currentSection.sectionName}
                  </span>
                  <span className={classNames(styles.currentSectionCount)}>
                    {currentSection.completed}/{currentSection.total}
                  </span>
                </div>
                <ul className={classNames(styles.pendingStepList)}>
                  {currentSection.pendingParts.map((parts, i) => (
                    <li key={i} className={classNames(styles.pendingStep)}>
                      {fragmentsToText(parts)}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </details>

        {/* ── Voidstones (collapsible) ── */}
        <details className={classNames(styles.progressGroup)}>
          <summary className={classNames(styles.progressGroupSummary)}>
            <ProgressBar
              label="Voidstones"
              completed={voidstoneSummary.completed}
              total={voidstoneSummary.total}
            />
          </summary>
          <div className={classNames(styles.subProgressList)}>
            {voidstoneSections.map((s) => (
              <ProgressBar key={s.name} label={s.name} completed={s.completed} total={s.total} />
            ))}
          </div>
        </details>

        {/* ── Challenges (flat) ── */}
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

// ── Stat Targets panel ────────────────────────────────────────────────────────

function StatTargets() {
  return (
    <section className={classNames(styles.panel)}>
      <SectionHeader title="Stat Targets" />
      <p className={classNames(styles.emptyHint)}>
        Recommended thresholds at each phase of the game.
      </p>
      <div className={classNames(styles.statPhaseList)}>
        {STAT_TARGETS.map((phase) => (
          <details key={phase.phase} className={classNames(styles.statPhase)}>
            <summary className={classNames(styles.statPhaseName)}>
              {phase.phase}
            </summary>
            {phase.note && (
              <p className={classNames(styles.statPhaseNote)}>{phase.note}</p>
            )}
            <dl className={classNames(styles.statList)}>
              {phase.targets.map((t) => (
                <div key={t.label} className={classNames(styles.statRow)}>
                  <dt className={classNames(styles.statLabel)}>{t.label}</dt>
                  <dd
                    className={classNames(
                      styles.statValue,
                      t.warn && styles.statWarn
                    )}
                  >
                    {t.value}
                    {t.note && (
                      <span className={classNames(styles.statNote)}>
                        {t.note}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        ))}
      </div>
    </section>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export default function DashboardContainer() {
  return (
    <div className={classNames(styles.dashboard)}>
      <div className={classNames(styles.leftCol)}>
        <RouteProgress />
        <StatTargets />
      </div>
      <div className={classNames(styles.rightCol)}>
        <UniqueItems />
        <Misc />
      </div>
    </div>
  );
}
