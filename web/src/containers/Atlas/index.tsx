import { atlasConfigSelector, AtlasConfig } from "../../state/atlas-config";
import { SplitRow } from "../../components/SplitRow";
import { LabTracker } from "./LabTracker";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";

const VOIDSTONE_INFO = [
  { name: "Eldritch Voidstone", bosses: "Eater of Worlds + Searing Exarch" },
  { name: "Originator Voidstone", bosses: "Incarnation of Dread" },
  { name: "Decayed Voidstone", bosses: "Uber Elder" },
  { name: "Ceremonial Voidstone", bosses: "The Maven" },
] as const;

function SectionHeader({ title }: { title: string }) {
  return <h2 className={classNames(styles.sectionHeader)}>{title}</h2>;
}

// ── Voidstone order list ──────────────────────────────────────────────────────

interface VoidstoneOrderProps {
  order: number[];
  onChange: (order: number[]) => void;
}

function VoidstoneOrderList({ order, onChange }: VoidstoneOrderProps) {
  function move(i: number, dir: -1 | 1) {
    const next = [...order];
    const j = i + dir;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className={classNames(styles.voidstoneList)}>
      {order.map((vsIndex, i) => {
        const info = VOIDSTONE_INFO[vsIndex];
        return (
          <div key={vsIndex} className={classNames(styles.voidstoneRow)}>
            <span className={classNames(styles.voidstoneNum)}>{i + 1}</span>
            <span className={classNames(styles.voidstoneBoss)}>{info.name}</span>
            <span className={classNames(styles.voidstoneReward)}>{info.bosses}</span>
            <div className={classNames(styles.voidstoneArrows)}>
              <button
                className={classNames(styles.voidstoneArrowBtn)}
                onClick={() => move(i, -1)}
                disabled={i === 0}
                aria-label="Move up"
              >
                <HiChevronUp />
              </button>
              <button
                className={classNames(styles.voidstoneArrowBtn)}
                onClick={() => move(i, 1)}
                disabled={i === order.length - 1}
                aria-label="Move down"
              >
                <HiChevronDown />
              </button>
            </div>
          </div>
        );
      })}
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
    <div className={classNames(styles.container)}>

      {/* ── Voidstone Order ───────────────────────────────────────────────── */}
      <SectionHeader title="Voidstone Order" />
      <p className={classNames(styles.hint)}>
        Set the order in which to tackle each voidstone boss. This controls which
        route appears first under the Voidstone 1-4 sub-tabs in Route.
      </p>
      <VoidstoneOrderList
        order={config.voidstoneOrder}
        onChange={(order) => update({ voidstoneOrder: order })}
      />

      <hr className={classNames(styles.divider)} />

      {/* ── Display ──────────────────────────────────────────────────────── */}
      <SectionHeader title="Display" />
      <p className={classNames(styles.hint)}>
        Controls how the Voidstone 1-4 route tabs display steps.
      </p>
      <div className={classNames(styles.form)}>
        <SplitRow
          left={
            <div>
              <div className={classNames(styles.label)}>Show Boss Hints</div>
              <div className={classNames(styles.desc)}>Show boss resistance and stat hints for each pinnacle kill step.</div>
            </div>
          }
          right={
            <div className={classNames(styles.value)}>
              <input
                type="checkbox"
                checked={config.showVoidstoneHints}
                onChange={(e) => update({ showVoidstoneHints: e.target.checked })}
                aria-label="Show Boss Hints"
              />
            </div>
          }
        />
      </div>

      <hr className={classNames(styles.divider)} />

      {/* ── Labyrinth ────────────────────────────────────────────────────── */}
      <SectionHeader title="Labyrinth" />
      <div className={classNames(styles.form)}>
        <SplitRow
          left={
            <div>
              <div className={classNames(styles.label)}>Show Lab Tracker</div>
              <div className={classNames(styles.desc)}>Show a labyrinth completion tracker on this page.</div>
            </div>
          }
          right={
            <div className={classNames(styles.value)}>
              <input
                type="checkbox"
                checked={config.showLabTracker}
                onChange={(e) => update({ showLabTracker: e.target.checked })}
                aria-label="Show Lab Tracker"
              />
            </div>
          }
        />
      </div>
      {config.showLabTracker && <LabTracker />}

    </div>
  );
}
