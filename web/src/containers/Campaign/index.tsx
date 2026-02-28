import { BuildInfoForm } from "../../components/BuildInfoForm";
import { ConfigForm } from "../../components/ConfigForm";
import { buildDataSelector } from "../../state/build-data";
import { configSelector } from "../../state/config";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useRecoilState } from "recoil";

function SectionHeader({ title }: { title: string }) {
  return <h2 className={classNames(styles.sectionHeader)}>{title}</h2>;
}

export default function CampaignContainer() {
  const [buildData, setBuildData] = useRecoilState(buildDataSelector);
  const [config, setConfig] = useRecoilState(configSelector);

  return (
    <div className={classNames(styles.container)}>
      {/* ── ACT 1-10 Settings ──────────────────────────────────────────── */}
      <SectionHeader title="ACT 1–10 Settings" />
      <p className={classNames(styles.hint)}>
        These settings affect which steps appear in the Route and how gems are
        recommended. Import a build to set Class and Bandits automatically.
      </p>
      <BuildInfoForm
        buildData={buildData}
        onSubmit={(updated) => setBuildData(updated)}
      />

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
