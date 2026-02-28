import { BuildImportForm } from "../../components/BuildImportForm";
import { BuildSettingsForm } from "../../components/BuildSettingsForm";
import { GemEditForm } from "../../components/GemEditForm";
import { SearchStringsEditor } from "../../components/SearchStringsEditor";
import { buildDataSelector } from "../../state/build-data";
import { buildSettingsSelector } from "../../state/build-settings";
import { requiredGemsSelector } from "../../state/gem";
import { gemLinksSelector } from "../../state/gem-links";
import { pobCodeAtom } from "../../state/pob-code";
import { buildTreesSelector } from "../../state/tree/build-tree";
import { uniqueItemsSelector } from "../../state/unique-items";
import { formStyles } from "../../styles";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useRecoilState, useResetRecoilState } from "recoil";

function SectionHeader({ title }: { title: string }) {
  return <h2 className={classNames(styles.sectionHeader)}>{title}</h2>;
}

export default function BuildContainer() {
  const [, setBuildData] = useRecoilState(buildDataSelector);
  const resetBuildData = useResetRecoilState(buildDataSelector);

  const [requiredGems, setRequiredGems] = useRecoilState(requiredGemsSelector);
  const resetRequiredGems = useResetRecoilState(requiredGemsSelector);

  const [, setBuildTrees] = useRecoilState(buildTreesSelector);
  const resetBuildTrees = useResetRecoilState(buildTreesSelector);

  const [, setGemLinks] = useRecoilState(gemLinksSelector);
  const resetGemLinks = useResetRecoilState(gemLinksSelector);

  const [, setPobCode] = useRecoilState(pobCodeAtom);
  const resetPobCode = useResetRecoilState(pobCodeAtom);

  const [, setUniqueItems] = useRecoilState(uniqueItemsSelector);
  const resetUniqueItems = useResetRecoilState(uniqueItemsSelector);

  const [buildSettings, setBuildSettings] = useRecoilState(buildSettingsSelector);

  return (
    <div className={classNames(styles.container)}>

      {/* ── BUILD IMPORT ────────────────────────────────────────────────── */}
      <SectionHeader title="Build Import" />
      <div className={classNames(formStyles.form)}>
        <SearchStringsEditor />
        <BuildImportForm
          onSubmit={(pobData, pobCode) => {
            setBuildData(pobData.buildData);
            setRequiredGems(pobData.requiredGems);
            setBuildTrees(pobData.buildTrees);
            setGemLinks(pobData.gemLinks);
            setPobCode(pobCode);
            setUniqueItems(pobData.uniqueItems);
          }}
          onReset={() => {
            resetBuildData();
            resetRequiredGems();
            resetBuildTrees();
            resetGemLinks();
            resetPobCode();
            resetUniqueItems();
          }}
        />
      </div>

      {requiredGems.length > 0 && (
        <>
          <hr className={classNames(styles.divider)} />
          <GemEditForm
            requiredGems={requiredGems}
            onUpdate={(updated) => setRequiredGems(updated)}
          />
        </>
      )}

      <hr className={classNames(styles.divider)} />

      {/* ── BUILD SETTINGS ──────────────────────────────────────────────── */}
      <SectionHeader title="Build Settings" />
      <BuildSettingsForm
        settings={buildSettings}
        onUpdate={(updated) => setBuildSettings(updated)}
      />
    </div>
  );
}
