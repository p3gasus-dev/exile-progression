import { BuildSettings } from "../../state/build-settings";
import { MAJOR_GODS, MINOR_GODS } from "../../data/pantheon-data";
import { SplitRow } from "../SplitRow";
import styles from "./styles.module.css";
import classNames from "classnames";

interface BuildSettingsFormProps {
  settings: BuildSettings;
  onUpdate: (settings: BuildSettings) => void;
}

export function BuildSettingsForm({ settings, onUpdate }: BuildSettingsFormProps) {
  function update(partial: Partial<BuildSettings>) {
    onUpdate({ ...settings, ...partial });
  }

  return (
    <div className={classNames(styles.form)}>
      {/* ── Pantheon ──────────────────────────────────────────────────── */}
      <div className={classNames(styles.subsection)}>
        <h3 className={classNames(styles.subsectionTitle)}>Pantheon</h3>

        <SplitRow
          left={<span className={classNames(styles.label)}>Major God</span>}
          right={
            <select
              className={classNames(styles.select)}
              value={settings.pantheonMajor}
              aria-label="Major god"
              onChange={(e) => update({ pantheonMajor: e.target.value })}
            >
              <option value="">— None selected —</option>
              {MAJOR_GODS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          }
        />

        {settings.pantheonMajor && (
          <p className={classNames(styles.godEffect)}>
            {MAJOR_GODS.find((g) => g.id === settings.pantheonMajor)?.effect}
          </p>
        )}

        <SplitRow
          left={<span className={classNames(styles.label)}>Minor God</span>}
          right={
            <select
              className={classNames(styles.select)}
              value={settings.pantheonMinor}
              aria-label="Minor god"
              onChange={(e) => update({ pantheonMinor: e.target.value })}
            >
              <option value="">— None selected —</option>
              {MINOR_GODS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          }
        />

        {settings.pantheonMinor && (
          <p className={classNames(styles.godEffect)}>
            {MINOR_GODS.find((g) => g.id === settings.pantheonMinor)?.effect}
          </p>
        )}
      </div>
    </div>
  );
}
