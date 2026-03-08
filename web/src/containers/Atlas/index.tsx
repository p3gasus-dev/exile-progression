import { atlasConfigSelector, AtlasConfig } from "../../state/atlas-config";
import { SplitRow } from "../../components/SplitRow";
import { LabTracker } from "./LabTracker";
import styles from "./styles.module.css";
import classNames from "classnames";
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdDragIndicator } from "react-icons/md";
import { useRecoilState } from "recoil";
import { useState } from "react";

function SectionHeader({ title }: { title: string }) {
  return <h2 className={classNames(styles.sectionHeader)}>{title}</h2>;
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className={classNames(styles.hint)}>{children}</p>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className={classNames(styles.label)}>{children}</div>;
}

function Value({ children }: { children: React.ReactNode }) {
  return <div className={classNames(styles.value)}>{children}</div>;
}

const VOIDSTONES = [
  { boss: "The Eater of Worlds", reward: "Grasping Voidstone" },
  { boss: "The Searing Exarch",  reward: "Omniscient Voidstone" },
  { boss: "The Maven",           reward: "Ceremonial Voidstone" },
  { boss: "The Uber Elder",      reward: "Decayed Voidstone" },
];

export default function AtlasContainer() {
  const [config, setConfig] = useRecoilState(atlasConfigSelector);

  function update(partial: Partial<AtlasConfig>) {
    setConfig({ ...config, ...partial });
  }

  const order: [number, number, number, number] =
    config.voidstoneOrder ?? [0, 1, 2, 3];

  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  function moveVoidstone(from: number, to: number) {
    const next = [...order] as [number, number, number, number];
    [next[from], next[to]] = [next[to], next[from]];
    update({ voidstoneOrder: next });
  }

  function reorderVoidstones(from: number, to: number) {
    if (from === to) return;
    const next = [...order] as [number, number, number, number];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    update({ voidstoneOrder: next });
  }

  return (
    <>
      <div className={classNames(styles.container)}>

        {/* ── Voidstone Order ───────────────────────────────────────────── */}
        <SectionHeader title="Voidstone Order" />
        <Hint>
          Drag or use the arrows to set the order you plan to complete each
          voidstone. The recommended order is Eater → Exarch → Maven → Uber
          Elder. This changes the order in the Route → Atlas tab.
        </Hint>

        <div className={classNames(styles.voidstoneList)}>
          {order.map((vsIdx, pos) => {
            const { boss, reward } = VOIDSTONES[vsIdx];
            const isDragging = dragFrom === pos;
            const isOver = dragOver === pos;
            return (
              <div
                key={vsIdx}
                className={classNames(
                  styles.voidstoneRow,
                  isDragging && styles.voidstoneRowDragging,
                  isOver && !isDragging && styles.voidstoneRowOver,
                )}
                draggable
                onDragStart={(e) => {
                  setDragFrom(pos);
                  e.dataTransfer.effectAllowed = "move";
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                  if (dragOver !== pos) setDragOver(pos);
                }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragFrom !== null) reorderVoidstones(dragFrom, pos);
                  setDragFrom(null);
                  setDragOver(null);
                }}
                onDragEnd={() => {
                  setDragFrom(null);
                  setDragOver(null);
                }}
              >
                <MdDragIndicator className={classNames(styles.voidstoneDragHandle)} />
                <span className={classNames(styles.voidstoneNum)}>{pos + 1}</span>
                <span className={classNames(styles.voidstoneBoss)}>{boss}</span>
                <span className={classNames(styles.voidstoneReward)}>{reward}</span>
                <div className={classNames(styles.voidstoneArrows)}>
                  <button
                    className={classNames(styles.voidstoneArrowBtn)}
                    disabled={pos === 0}
                    onClick={() => moveVoidstone(pos, pos - 1)}
                    title="Move up"
                    type="button"
                  >
                    <MdKeyboardArrowUp size={14} />
                  </button>
                  <button
                    className={classNames(styles.voidstoneArrowBtn)}
                    disabled={pos === order.length - 1}
                    onClick={() => moveVoidstone(pos, pos + 1)}
                    title="Move down"
                    type="button"
                  >
                    <MdKeyboardArrowDown size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <hr className={classNames(styles.divider)} />

        {/* ── Atlas Settings ────────────────────────────────────────────── */}
        <SectionHeader title="Atlas Settings" />

        <div className={classNames(styles.form)}>
          <SplitRow
            left={<Label>Run Both Early Bosses</Label>}
            right={
              <Value>
                <input
                  type="checkbox"
                  checked={config.runBothEarlyBosses}
                  onChange={(e) =>
                    update({ runBothEarlyBosses: e.target.checked })
                  }
                  aria-label="Run both early bosses"
                />
              </Value>
            }
          />

          <SplitRow
            left={<Label>Show Unique Drops</Label>}
            right={
              <Value>
                <input
                  type="checkbox"
                  checked={config.showUniqueDrops}
                  onChange={(e) =>
                    update({ showUniqueDrops: e.target.checked })
                  }
                  aria-label="Show unique drops on atlas route"
                />
              </Value>
            }
          />

          <SplitRow
            left={<Label>Show Voidstone Route</Label>}
            right={
              <Value>
                <input
                  type="checkbox"
                  checked={config.showVoidstoneRoute}
                  onChange={(e) =>
                    update({ showVoidstoneRoute: e.target.checked })
                  }
                  aria-label="Show voidstone route tab"
                />
              </Value>
            }
          />

          <SplitRow
            left={<Label>Show Lab Tracker</Label>}
            right={
              <Value>
                <input
                  type="checkbox"
                  checked={config.showLabTracker}
                  onChange={(e) =>
                    update({ showLabTracker: e.target.checked })
                  }
                  aria-label="Show labyrinth tracker"
                />
              </Value>
            }
          />

        </div>

      </div>

      {/* ── Labyrinth Tracker (optional) ──────────────────────────────── */}
      {config.showLabTracker && <LabTracker />}
    </>
  );
}
