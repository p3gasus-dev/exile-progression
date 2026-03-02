import { SplitRow } from "../../components/SplitRow";
import { ConfigForm } from "../../components/ConfigForm";
import { buildDataSelector } from "../../state/build-data";
import { configSelector } from "../../state/config";
import { leagueSelector, LEAGUES, League } from "../../state/league";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useRecoilState } from "recoil";

function SectionHeader({ title }: { title: string }) {
  return <h2 className={classNames(styles.sectionHeader)}>{title}</h2>;
}

export default function CampaignContainer() {
  const [buildData, setBuildData] = useRecoilState(buildDataSelector);
  const [config, setConfig] = useRecoilState(configSelector);
  const [league, setLeague] = useRecoilState(leagueSelector);

  return (
    <div className={classNames(styles.container)}>

      {/* ── League ──────────────────────────────────────────────────────── */}
      <SectionHeader title="League" />
      <p className={classNames(styles.hint)}>
        Select your current Path of Exile league. Used for display and
        challenge tracking throughout the app.
      </p>
      <div className={classNames(styles.form)}>
        <SplitRow
          left={<div className={classNames(styles.label)}>Active League</div>}
          right={
            <div className={classNames(styles.value)}>
              <select
                className={classNames(styles.select)}
                value={league}
                onChange={(e) => setLeague(e.target.value as League)}
                aria-label="Active league"
              >
                {LEAGUES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          }
        />
      </div>

      <hr className={classNames(styles.divider)} />

      {/* ── ACT 1-10 Settings ──────────────────────────────────────────── */}
      <SectionHeader title="ACT 1–10 Settings" />
      <p className={classNames(styles.hint)}>
        Campaign routing options. Class and Bandits are set from your imported
        build in the Build tab.
      </p>
      <div className={classNames(styles.form)}>
        <SplitRow
          left={<div className={classNames(styles.label)}>League Start</div>}
          right={
            <div className={classNames(styles.value)}>
              <input
                type="checkbox"
                checked={buildData.leagueStart}
                onChange={(e) =>
                  setBuildData({ ...buildData, leagueStart: e.target.checked })
                }
                aria-label="League Start"
              />
            </div>
          }
        />
        <SplitRow
          left={<div className={classNames(styles.label)}>Library</div>}
          right={
            <div className={classNames(styles.value)}>
              <input
                type="checkbox"
                checked={buildData.library}
                onChange={(e) =>
                  setBuildData({ ...buildData, library: e.target.checked })
                }
                aria-label="Library"
              />
            </div>
          }
        />
      </div>

      <hr className={classNames(styles.divider)} />

      {/* ── Campaign Display ────────────────────────────────────────────── */}
      <SectionHeader title="Campaign Display" />
      <p className={classNames(styles.hint)}>
        Controls how the Route tab displays campaign steps.
      </p>
      <ConfigForm
        config={config}
        onSubmit={(updated) => setConfig(updated)}
      />
    </div>
  );
}
