import { configSelector } from "../../state/config";
import { SplitRow } from "../../components/SplitRow";
import { ChallengeEditor } from "../../components/ChallengeEditor";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useRecoilState } from "recoil";

function SectionHeader({ title }: { title: string }) {
  return <h2 className={classNames(styles.sectionHeader)}>{title}</h2>;
}

export default function ChallengesContainer() {
  const [config, setConfig] = useRecoilState(configSelector);

  return (
    <div className={classNames(styles.container)}>

      {/* ── Challenge Display ────────────────────────────────────────────── */}
      <SectionHeader title="Challenge Display" />
      <p className={classNames(styles.hint)}>
        Controls how challenges appear in the Route tab.
      </p>
      <div className={classNames(styles.form)}>
        <SplitRow
          left={
            <div>
              <div className={classNames(styles.label)}>Show Challenges</div>
              <div className={classNames(styles.desc)}>Show the Challenges tab in Route.</div>
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
        <SplitRow
          left={
            <div>
              <div className={classNames(styles.label)}>Sort by Difficulty</div>
              <div className={classNames(styles.desc)}>Sort challenges easiest to hardest instead of by number.</div>
            </div>
          }
          right={
            <div className={classNames(styles.value)}>
              <input
                type="checkbox"
                checked={config.sortChallengesByDifficulty}
                onChange={(e) => setConfig({ ...config, sortChallengesByDifficulty: e.target.checked })}
                aria-label="Sort by Difficulty"
              />
            </div>
          }
        />
        <SplitRow
          left={
            <div>
              <div className={classNames(styles.label)}>Show Hints by Default</div>
              <div className={classNames(styles.desc)}>Expand challenge hints automatically when a section is opened.</div>
            </div>
          }
          right={
            <div className={classNames(styles.value)}>
              <input
                type="checkbox"
                checked={config.showChallengeHints}
                onChange={(e) => setConfig({ ...config, showChallengeHints: e.target.checked })}
                aria-label="Show Hints by Default"
              />
            </div>
          }
        />
      </div>

      <hr className={classNames(styles.divider)} />

      {/* ── Edit Challenges ──────────────────────────────────────────── */}
      <SectionHeader title="Edit Challenges" />
      <p className={classNames(styles.hint)}>
        Modify the challenge list as JSON. Save to apply. Reset restores built-in defaults.
      </p>
      <ChallengeEditor />

    </div>
  );
}
