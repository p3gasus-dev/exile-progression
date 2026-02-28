import { atlasConfigSelector, AtlasConfig } from "../../state/atlas-config";
import { SplitRow } from "../../components/SplitRow";
import styles from "./styles.module.css";
import classNames from "classnames";
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

export default function AtlasContainer() {
  const [config, setConfig] = useRecoilState(atlasConfigSelector);

  function update(partial: Partial<AtlasConfig>) {
    setConfig({ ...config, ...partial });
  }

  return (
    <div className={classNames(styles.container)}>

      {/* ── Voidstone Order ─────────────────────────────────────────────── */}
      <SectionHeader title="Voidstone Order" />
      <Hint>
        The recommended order is Eater of Worlds → Searing Exarch → The Maven →
        Uber Elder. Each voidstone adds a tier to all maps on your Atlas.
      </Hint>

      <div className={classNames(styles.voidstoneList)}>
        {[
          { num: 1, boss: "The Eater of Worlds", reward: "Grasping Voidstone" },
          { num: 2, boss: "The Searing Exarch", reward: "Omniscient Voidstone" },
          { num: 3, boss: "The Maven", reward: "Ceremonial Voidstone" },
          { num: 4, boss: "The Uber Elder", reward: "Decayed Voidstone" },
        ].map(({ num, boss, reward }) => (
          <div key={num} className={classNames(styles.voidstoneRow)}>
            <span className={classNames(styles.voidstoneNum)}>{num}</span>
            <span className={classNames(styles.voidstoneBoss)}>{boss}</span>
            <span className={classNames(styles.voidstoneReward)}>{reward}</span>
          </div>
        ))}
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
