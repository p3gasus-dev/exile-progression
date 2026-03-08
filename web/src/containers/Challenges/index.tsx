import { configSelector } from "../../state/config";
import { SplitRow } from "../../components/SplitRow";
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
      </div>

    </div>
  );
}
