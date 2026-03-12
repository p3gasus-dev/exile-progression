import { atlasConfigSelector, AtlasConfig } from "../../state/atlas-config";
import { SplitRow } from "../../components/SplitRow";
import { LabTracker } from "./LabTracker";
import { Loading } from "../../components/Loading";
import VoidstoneRoute from "../Route/VoidstoneRoute";
import styles from "./styles.module.css";
import classNames from "classnames";
import { interactiveStyles } from "../../styles";
import { useRecoilState } from "recoil";
import { Suspense, useState } from "react";

const VOIDSTONE_LABELS = [
  "VOIDSTONE 1",
  "VOIDSTONE 2",
  "VOIDSTONE 3",
  "VOIDSTONE 4",
] as const;

function Label({ children }: { children: React.ReactNode }) {
  return <div className={classNames(styles.label)}>{children}</div>;
}

function Value({ children }: { children: React.ReactNode }) {
  return <div className={classNames(styles.value)}>{children}</div>;
}

export default function AtlasContainer() {
  const [config, setConfig] = useRecoilState(atlasConfigSelector);
  const [activeTab, setActiveTab] = useState(0);

  function update(partial: Partial<AtlasConfig>) {
    setConfig({ ...config, ...partial });
  }

  return (
    <>
      {/* ── Tab bar ────────────────────────────────────────────────────── */}
      <div className={classNames(styles.tabBar)}>
        {VOIDSTONE_LABELS.map((label, i) => (
          <button
            key={i}
            className={classNames(styles.tabButton, {
              [styles.tabActive]: activeTab === i,
              [interactiveStyles.activePrimary]: activeTab === i,
              [interactiveStyles.activeSecondary]: activeTab !== i,
            })}
            onClick={() => setActiveTab(i)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Route content ─────────────────────────────────────────────── */}
      <div className={classNames(styles.routeContent)}>
        <Suspense fallback={<Loading />}>
          <VoidstoneRoute vsIndex={activeTab} />
        </Suspense>
      </div>

      {/* ── Labyrinth Tracker (optional) ──────────────────────────────── */}
      {config.showLabTracker && <LabTracker />}

      <hr className={classNames(styles.divider)} />

      {/* ── Settings ──────────────────────────────────────────────────── */}
      <div className={classNames(styles.container)}>
        <SplitRow
          left={
            <div>
              <Label>Show Lab Tracker</Label>
              <div className={classNames(styles.desc)}>Show a labyrinth completion tracker on this page.</div>
            </div>
          }
          right={
            <Value>
              <input
                type="checkbox"
                checked={config.showLabTracker}
                onChange={(e) => update({ showLabTracker: e.target.checked })}
                aria-label="Show labyrinth tracker"
              />
            </Value>
          }
        />
      </div>
    </>
  );
}
