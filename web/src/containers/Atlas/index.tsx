import {
  ATLAS_GUIDE,
  atlasCompletionProgressSelectorFamily,
  useClearAtlasCompletion,
} from "../../state/atlas-completion";
import { atlasConfigSelector, AtlasConfig } from "../../state/atlas-config";
import { SplitRow } from "../../components/SplitRow";
import { LabTracker } from "./LabTracker";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { MdCheck } from "react-icons/md";

function Label({ children }: { children: React.ReactNode }) {
  return <div className={classNames(styles.label)}>{children}</div>;
}

function Value({ children }: { children: React.ReactNode }) {
  return <div className={classNames(styles.value)}>{children}</div>;
}

// ── Completion guide ──────────────────────────────────────────────────────────

function GuideStep({ id, label, detail }: { id: string; label: string; detail?: string }) {
  const [done, setDone] = useRecoilState(atlasCompletionProgressSelectorFamily(id));

  return (
    <li
      className={classNames(styles.guideStep, done && styles.guideStepDone)}
      onClick={() => setDone(!done)}
    >
      <div className={classNames(styles.guideCheck)}>{done && <MdCheck />}</div>
      <div className={classNames(styles.guideStepContent)}>
        <span className={classNames(styles.guideStepLabel)}>{label}</span>
        {detail && <span className={classNames(styles.guideStepDetail)}>{detail}</span>}
      </div>
    </li>
  );
}

function CompletionGuide() {
  const clearAll = useClearAtlasCompletion();

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.guideHeader)}>
        <div className={classNames(styles.sectionHeader)}>Atlas Progression</div>
        <button
          className={classNames(styles.guideResetBtn)}
          onClick={clearAll}
          title="Reset all progress"
        >
          Reset
        </button>
      </div>
      <div className={classNames(styles.guideList)}>
        {ATLAS_GUIDE.map((phase) => (
          <details key={phase.phase} className={classNames(styles.guidePhase)} open>
            <summary className={classNames(styles.guidePhaseName)}>{phase.phase}</summary>
            <ul className={classNames(styles.guideStepList)}>
              {phase.steps.map((step) => (
                <GuideStep key={step.id} {...step} />
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}

// ── Main Atlas container ──────────────────────────────────────────────────────

export default function AtlasContainer() {
  const [config, setConfig] = useRecoilState(atlasConfigSelector);

  function update(partial: Partial<AtlasConfig>) {
    setConfig({ ...config, ...partial });
  }

  return (
    <>
      {/* ── Atlas completion guide ─────────────────────────────────────── */}
      <CompletionGuide />

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
