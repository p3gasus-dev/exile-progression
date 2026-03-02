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

type PresetEntry = Preset | { group: string };

const COMMON_PATTERNS: PresetEntry[] = [
  { group: "Loot" },
  { pattern: "r6",                       desc: "6-socket items (7× Jeweller's Orb)" },
  { pattern: "linked:6",                 desc: "6-linked items" },
  { pattern: "linked:5",                 desc: "5-linked items" },
  { pattern: "quality>=20",              desc: "20%+ quality items" },
  { pattern: "quality>=1 flask",         desc: "Quality flasks" },
  { pattern: "unique",                   desc: "Unique items" },
  { pattern: "gem quality>=1",           desc: "Quality skill gems" },
  { pattern: "rare jewel",              desc: "Rare jewels" },
  { pattern: "div",                      desc: "Divination cards" },
  { pattern: "corrupted:false linked:6", desc: "Uncorrupted 6-links" },
  { pattern: "identified:false rare",    desc: "Unidentified rare items" },

  { group: "Campaign" },
  { pattern: "r1g1b1",                  desc: "RGB sockets (Chromatic Orb recipe)" },
  { pattern: "quality>=16 armour",      desc: "Quality armour (Armourer's Scrap recipe)" },
  { pattern: "quality>=16 weapon",      desc: "Quality weapon (Whetstone recipe)" },
  { pattern: "ilvl:60 rare",            desc: "Chaos recipe bases (ilvl 60–74)" },
  { pattern: "ilvl:75 rare",            desc: "Regal recipe bases (ilvl 75+)" },
  { pattern: "map",                     desc: "All maps" },

  { group: "Early Maps" },
  { pattern: "scarab",                  desc: "Scarabs (all types)" },
  { pattern: "fragment",                desc: "Map fragments & Breach splinters" },
  { pattern: "\"Cluster Jewel\"",       desc: "Cluster Jewels" },
  { pattern: "ilvl:84 rare",            desc: "Endgame bases (ilvl 84+)" },
  { pattern: "map tier:16",             desc: "Tier 16 maps" },
  { pattern: "map blighted",            desc: "Blighted maps" },

  { group: "Endgame" },
  { pattern: "awakened gem",            desc: "Awakened skill gems" },
  { pattern: "influenced rare",         desc: "Influenced rare items" },
  { pattern: "\"Maven's Invitation\"",  desc: "Maven's Invitations" },
  { pattern: "shaper elder",            desc: "Shaper & Elder items" },
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
          {COMMON_PATTERNS.map((entry, i) => {
            if ("group" in entry) {
              return (
                <li key={`group-${i}`} className={classNames(styles.presetGroup)}>
                  {entry.group}
                </li>
              );
            }
            return (
              <li key={entry.pattern} className={classNames(styles.presetRow)}>
                <code className={classNames(styles.presetPattern)}>
                  {entry.pattern}
                </code>
                <span className={classNames(styles.presetDesc)}>
                  {entry.desc}
                </span>
                <button
                  className={classNames(styles.presetAdd)}
                  title="Add to search strings"
                  type="button"
                  onClick={() => appendPreset(entry)}
                >
                  <MdAddCircleOutline size={16} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
