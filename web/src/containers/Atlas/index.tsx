import { atlasConfigSelector, AtlasConfig } from "../../state/atlas-config";
import { SplitRow } from "../../components/SplitRow";
import styles from "./styles.module.css";
import classNames from "classnames";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { useRecoilState } from "recoil";

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

  function moveVoidstone(from: number, to: number) {
    const next = [...order] as [number, number, number, number];
    [next[from], next[to]] = [next[to], next[from]];
    update({ voidstoneOrder: next });
  }

  return (
    <div className={classNames(styles.container)}>

      {/* ── Voidstone Order ─────────────────────────────────────────────── */}
      <SectionHeader title="Voidstone Order" />
      <Hint>
        Use the arrows to set the order you plan to complete each voidstone.
        The recommended order is Eater → Exarch → Maven → Uber Elder.
        This changes the order of the Voidstone route in the Route tab.
      </Hint>

      <div className={classNames(styles.voidstoneList)}>
        {order.map((vsIdx, pos) => {
          const { boss, reward } = VOIDSTONES[vsIdx];
          return (
            <div key={vsIdx} className={classNames(styles.voidstoneRow)}>
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

      {/* ── Atlas Passive Strategy ───────────────────────────────────────── */}
      <SectionHeader title="Atlas Passive Strategy" />
      <Hint>
        Controls which atlas passives to prioritise when allocating points.
        Boss-rush focuses on reducing boss life and increasing rewards.
        Map-sustain focuses on map quantity and atlas mission frequency.
      </Hint>

      <div className={classNames(styles.form)}>
        <SplitRow
          left={<Label>Passive Focus</Label>}
          right={
            <Value>
              <select
                className={classNames(styles.select)}
                value={config.passiveStrategy}
                onChange={(e) =>
                  update({
                    passiveStrategy: e.target.value as AtlasConfig["passiveStrategy"],
                  })
                }
                aria-label="Atlas passive strategy"
              >
                <option value="balanced">Balanced</option>
                <option value="boss-rush">Boss Rush</option>
                <option value="map-sustain">Map Sustain</option>
              </select>
            </Value>
          }
        />

        <SplitRow
          left={<Label>Kirac Missions Early</Label>}
          right={
            <Value>
              <input
                type="checkbox"
                checked={config.kiracMissionsEarly}
                onChange={(e) =>
                  update({ kiracMissionsEarly: e.target.checked })
                }
                aria-label="Kirac missions early"
              />
            </Value>
          }
        />

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
      </div>
    </div>
  );
}
