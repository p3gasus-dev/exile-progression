import { BuildImportForm } from "../../components/BuildImportForm";
import { GemEditForm } from "../../components/GemEditForm";
import { MAJOR_GODS, MINOR_GODS } from "../../data/pantheon-data";
import { SearchStringsEditor } from "../../components/SearchStringsEditor";
import { SplitRow } from "../../components/SplitRow";
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
  const [buildData, setBuildData] = useRecoilState(buildDataSelector);
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
  const resetBuildSettings = useResetRecoilState(buildSettingsSelector);

  return (
    <div className={classNames(styles.container)}>

      {/* ── BUILD IMPORT ────────────────────────────────────────────────── */}
      <SectionHeader title="Build Import" />
      <p className={classNames(styles.hint)}>
        Paste a Path of Building code or URL (pastebin, poe.ninja, pobb.in) to
        populate gems, uniques, skill tree, and character data. Use Search
        Strings to set item filter regex for stashing during the league.
      </p>
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
            // Auto-import pantheon from PoB
            setBuildSettings({
              ...buildSettings,
              ...(pobData.pantheonMajor && { pantheonMajor: pobData.pantheonMajor }),
              ...(pobData.pantheonMinor && { pantheonMinor: pobData.pantheonMinor }),
            });
          }}
          onReset={() => {
            resetBuildData();
            resetRequiredGems();
            resetBuildTrees();
            resetGemLinks();
            resetPobCode();
            resetUniqueItems();
            resetBuildSettings();
          }}
        />
      </div>

      {buildData.characterClass !== "None" && (
        <>
          <hr className={classNames(styles.divider)} />
          {/* ── CHARACTER ─────────────────────────────────────────────────── */}
          <SectionHeader title="Character" />
          <p className={classNames(styles.hint)}>
            Class, bandit, and Pantheon imported from your Path of Building code.
          </p>
          <div className={classNames(styles.infoForm)}>
            <SplitRow
              left={<div className={classNames(styles.infoLabel)}>Class</div>}
              right={
                <div className={classNames(styles.infoValue)}>
                  {buildData.characterClass}
                </div>
              }
            />
            <SplitRow
              left={<div className={classNames(styles.infoLabel)}>Bandits</div>}
              right={
                <div className={classNames(styles.infoValue)}>
                  {buildData.bandit === "None" ? "Kill All" : buildData.bandit}
                </div>
              }
            />
            <SplitRow
              left={<div className={classNames(styles.infoLabel)}>Major God</div>}
              right={
                <select
                  className={classNames(styles.select)}
                  value={buildSettings.pantheonMajor}
                  aria-label="Major god"
                  onChange={(e) =>
                    setBuildSettings({ ...buildSettings, pantheonMajor: e.target.value })
                  }
                >
                  <option value="">— None —</option>
                  {MAJOR_GODS.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              }
            />
            {buildSettings.pantheonMajor && (
              <p className={classNames(styles.godEffect)}>
                {MAJOR_GODS.find((g) => g.id === buildSettings.pantheonMajor)?.effect}
              </p>
            )}
            <SplitRow
              left={<div className={classNames(styles.infoLabel)}>Minor God</div>}
              right={
                <select
                  className={classNames(styles.select)}
                  value={buildSettings.pantheonMinor}
                  aria-label="Minor god"
                  onChange={(e) =>
                    setBuildSettings({ ...buildSettings, pantheonMinor: e.target.value })
                  }
                >
                  <option value="">— None —</option>
                  {MINOR_GODS.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              }
            />
            {buildSettings.pantheonMinor && (
              <p className={classNames(styles.godEffect)}>
                {MINOR_GODS.find((g) => g.id === buildSettings.pantheonMinor)?.effect}
              </p>
            )}
          </div>
        </>
      )}

      {requiredGems.length > 0 && (
        <>
          <hr className={classNames(styles.divider)} />
          {/* ── GEM PRIORITY ──────────────────────────────────────────────── */}
          <SectionHeader title="Gem Priority" />
          <p className={classNames(styles.hint)}>
            Reorder or remove gems sourced from your PoB. Checked gems are
            marked as acquired and hidden from the Route.
          </p>
          <GemEditForm
            requiredGems={requiredGems}
            onUpdate={(updated) => setRequiredGems(updated)}
          />
        </>
      )}

    </div>
  );
}
