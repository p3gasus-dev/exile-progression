import { RouteEditor } from "../../components/RouteEditor";
import { configSelector } from "../../state/config";
import { challengeRouteFilesSelector } from "../../state/challenge-route-files";
import { SplitRow } from "../../components/SplitRow";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useRecoilState, useResetRecoilState } from "recoil";

function SectionHeader({ title }: { title: string }) {
  return <h2 className={classNames(styles.sectionHeader)}>{title}</h2>;
}

export default function ChallengesContainer() {
  const [config, setConfig] = useRecoilState(configSelector);
  const [challengeRouteFiles, setChallengeRouteFiles] = useRecoilState(challengeRouteFilesSelector);
  const resetChallengeRouteFiles = useResetRecoilState(challengeRouteFilesSelector);

  return (
    <div className={classNames(styles.container)}>

      {/* ── Challenge Display ────────────────────────────────────────────── */}
      <SectionHeader title="Challenge Display" />
      <p className={classNames(styles.hint)}>
        Controls how challenge steps appear in the Route tab.
      </p>
      <div className={classNames(styles.form)}>
        <SplitRow
          left={
            <div>
              <div className={classNames(styles.label)}>Show Challenges</div>
              <div className={classNames(styles.desc)}>Show challenge-related steps in the route.</div>
            </div>
          }
          right={
            <div className={classNames(styles.value)}>
              <input
                type="checkbox"
                checked={config.showChallenges}
                onChange={(e) => setConfig({ ...config, showChallenges: e.target.checked })}
                aria-label="Show Challenges"
              />
            </div>
          }
        />
      </div>

      <hr className={classNames(styles.divider)} />

      {/* ── Edit Challenges ──────────────────────────────────────────────── */}
      <SectionHeader title="Edit Challenges" />
      <p className={classNames(styles.hint)}>
        Modify the challenge guide source file. Changes persist across sessions.
        Ctrl+S / ⌘S saves while the editor is focused.
      </p>
      <RouteEditor
        routeFiles={challengeRouteFiles}
        onSubmit={(updated) => setChallengeRouteFiles(updated)}
        onReset={resetChallengeRouteFiles}
      />
    </div>
  );
}
