import { BuildSettings, Anoint } from "../../state/build-settings";
import { MAJOR_GODS, MINOR_GODS } from "../../data/pantheon-data";
import { OIL_NAMES, OIL_COLOURS, OilName } from "../../data/oil-data";
import { SplitRow } from "../SplitRow";
import styles from "./styles.module.css";
import classNames from "classnames";
import { MdAddCircleOutline, MdDeleteOutline } from "react-icons/md";
import { formStyles } from "../../styles";

interface BuildSettingsFormProps {
  settings: BuildSettings;
  onUpdate: (settings: BuildSettings) => void;
}

// ── Oil selector ──────────────────────────────────────────────────────────────

interface OilSelectProps {
  value: OilName;
  ariaLabel: string;
  onChange: (oil: OilName) => void;
}

function OilSelect({ value, ariaLabel, onChange }: OilSelectProps) {
  return (
    <select
      className={classNames(styles.oilSelect)}
      style={{ borderColor: OIL_COLOURS[value] }}
      value={value}
      aria-label={ariaLabel}
      onChange={(e) => onChange(e.target.value as OilName)}
    >
      {OIL_NAMES.map((oil) => (
        <option key={oil} value={oil}>
          {oil}
        </option>
      ))}
    </select>
  );
}

// ── Anoint row ────────────────────────────────────────────────────────────────

interface AnoitRowProps {
  anoint: Anoint;
  index: number;
  onChange: (updated: Anoint) => void;
  onDelete: () => void;
}

function AnointRow({ anoint, index, onChange, onDelete }: AnoitRowProps) {
  return (
    <div className={classNames(styles.anointRow)}>
      <input
        className={classNames(formStyles.formInput, styles.notableInput)}
        type="text"
        placeholder="Notable passive name…"
        value={anoint.notable}
        aria-label={`Anoint ${index + 1} notable`}
        onChange={(e) => onChange({ ...anoint, notable: e.target.value })}
      />
      <div className={classNames(styles.oilGroup)}>
        <OilSelect
          value={anoint.oil1}
          ariaLabel={`Anoint ${index + 1} oil 1`}
          onChange={(oil) => onChange({ ...anoint, oil1: oil })}
        />
        <OilSelect
          value={anoint.oil2}
          ariaLabel={`Anoint ${index + 1} oil 2`}
          onChange={(oil) => onChange({ ...anoint, oil2: oil })}
        />
        <OilSelect
          value={anoint.oil3}
          ariaLabel={`Anoint ${index + 1} oil 3`}
          onChange={(oil) => onChange({ ...anoint, oil3: oil })}
        />
      </div>
      <button
        className={classNames(styles.deleteBtn)}
        aria-label={`Remove anoint ${index + 1}`}
        onClick={onDelete}
      >
        <MdDeleteOutline className="inlineIcon" />
      </button>
    </div>
  );
}

// ── Main form ─────────────────────────────────────────────────────────────────

export function BuildSettingsForm({ settings, onUpdate }: BuildSettingsFormProps) {
  function update(partial: Partial<BuildSettings>) {
    onUpdate({ ...settings, ...partial });
  }

  function updateAnoint(index: number, updated: Anoint) {
    const anoints = [...settings.anoints];
    anoints[index] = updated;
    update({ anoints });
  }

  function addAnoint() {
    update({
      anoints: [
        ...settings.anoints,
        { notable: "", oil1: "Clear", oil2: "Clear", oil3: "Clear" },
      ],
    });
  }

  function removeAnoint(index: number) {
    const anoints = settings.anoints.filter((_, i) => i !== index);
    update({ anoints });
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

      {/* ── Anoints ───────────────────────────────────────────────────── */}
      <div className={classNames(styles.subsection)}>
        <h3 className={classNames(styles.subsectionTitle)}>Anoints</h3>
        <p className={classNames(styles.hint)}>
          Three oils per anointment. Order does not matter.
        </p>

        {settings.anoints.map((anoint, i) => (
          <AnointRow
            key={i}
            index={i}
            anoint={anoint}
            onChange={(updated) => updateAnoint(i, updated)}
            onDelete={() => removeAnoint(i)}
          />
        ))}

        <button
          className={classNames(formStyles.formButton, styles.addBtn)}
          onClick={addAnoint}
        >
          <MdAddCircleOutline className="inlineIcon" />
          Add Anoint
        </button>
      </div>

      {/* ── Special Mods ──────────────────────────────────────────────── */}
      <div className={classNames(styles.subsection)}>
        <h3 className={classNames(styles.subsectionTitle)}>Special Mods</h3>
        <p className={classNames(styles.hint)}>
          Notable item mods or crafting targets to track. One per line.
        </p>
        <textarea
          className={classNames(formStyles.formInput, styles.specialModsInput)}
          value={settings.specialMods.join("\n")}
          placeholder={"e.g. Onslaught on Kill\nElusive on Crit"}
          aria-label="Special mods"
          onChange={(e) => {
            const lines = e.target.value
              .split("\n")
              .map((l) => l.trimEnd());
            update({ specialMods: lines });
          }}
        />
      </div>
    </div>
  );
}
