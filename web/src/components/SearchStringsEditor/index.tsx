import { searchStringsAtom } from "../../state/search-strings";
import { formStyles } from "../../styles";
import { CodeEditor } from "../CodeEditor";
import styles from "./styles.module.css";
import classNames from "classnames";
import { Grammar } from "prismjs";
import { useState } from "react";
import { MdAddCircleOutline, MdExpandMore, MdExpandLess } from "react-icons/md";
import { useRecoilState } from "recoil";

const SearchStringGrammar: Grammar = {
  comment: /#.*/,
};

interface Preset {
  pattern: string;
  desc: string;
}

const COMMON_PATTERNS: Preset[] = [
  { pattern: "r6",                       desc: "6-socket items (Chromatic recipe)" },
  { pattern: "linked:6",                 desc: "6-linked items" },
  { pattern: "linked:5",                 desc: "5-linked items" },
  { pattern: "quality>=20",              desc: "20%+ quality items" },
  { pattern: "quality>=1 flask",         desc: "Quality flasks" },
  { pattern: "unique",                   desc: "Unique items" },
  { pattern: "gem quality>=1",           desc: "Quality skill gems" },
  { pattern: "map",                      desc: "Maps" },
  { pattern: "div",                      desc: "Divination cards" },
  { pattern: "rare jewel",               desc: "Rare jewels" },
  { pattern: "corrupted:false linked:6", desc: "Uncorrupted 6-links" },
  { pattern: "identified:false rare",    desc: "Unidentified rare items" },
];

export function SearchStringsEditor() {
  const [searchStrings, setSearchStrings] = useRecoilState(searchStringsAtom);
  const [presetsOpen, setPresetsOpen] = useState(false);

  function appendPreset(preset: Preset) {
    const existing = searchStrings?.join("\n") ?? "";
    const separator = existing.length > 0 ? "\n" : "";
    const appended = `${existing}${separator}# ${preset.desc}\n${preset.pattern}`;
    setSearchStrings(appended.split(/\r\n|\r|\n/));
  }

  return (
    <div className={classNames(formStyles.formRow)}>
      <label>
        Search Strings {"("}
        <a href="https://poe.re/" target="_blank">
          Path of Exile Regex
        </a>
        {")"}
      </label>
      <CodeEditor
        className={classNames(styles.input)}
        grammar={SearchStringGrammar}
        value={searchStrings?.join("\n") || ""}
        onValueChange={(value) => {
          if (value.length == 0) setSearchStrings(null);
          else setSearchStrings(value.split(/\r\n|\r|\n/));
        }}
      />

      {/* ── Common presets ─────────────────────────────────────────────── */}
      <button
        className={classNames(styles.presetsToggle)}
        onClick={() => setPresetsOpen((o) => !o)}
        type="button"
      >
        {presetsOpen ? (
          <MdExpandLess className="inlineIcon" />
        ) : (
          <MdExpandMore className="inlineIcon" />
        )}
        Common Patterns
      </button>

      {presetsOpen && (
        <ul className={classNames(styles.presetList)}>
          {COMMON_PATTERNS.map((preset) => (
            <li key={preset.pattern} className={classNames(styles.presetRow)}>
              <code className={classNames(styles.presetPattern)}>
                {preset.pattern}
              </code>
              <span className={classNames(styles.presetDesc)}>
                {preset.desc}
              </span>
              <button
                className={classNames(styles.presetAdd)}
                title="Add to search strings"
                type="button"
                onClick={() => appendPreset(preset)}
              >
                <MdAddCircleOutline size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
