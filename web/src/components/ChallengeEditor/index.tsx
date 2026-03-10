import { CHALLENGES } from "../../data/challenge-list";
import {
  challengeTextAtom,
  challengesToText,
} from "../../state/challenge-override";
import { CodeEditor } from "../CodeEditor";
import { SelectList } from "../SelectList";
import { Modal, TextModal } from "../Modal";
import { formStyles } from "../../styles";
import { UrlRewriter, fetchStringOrUrl } from "../../utility";
import styles from "./styles.module.css";
import classNames from "classnames";
import { Grammar } from "prismjs";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { BiHelpCircle } from "react-icons/bi";

// ── League.txt-style syntax grammar ──────────────────────────────────────────

const ChallengeGrammar: Grammar = {
  "challenge-name": {
    pattern: /^# .+$/m,
    alias: "keyword",
  },
  heading: {
    pattern: /^## .+$/m,
    alias: "keyword control-flow",
  },
  tag: {
    pattern: /<\/?div[^>]*>|<h2[^>]*>[^<]*<\/h2>/,
    alias: "variable",
  },
  step: {
    pattern: /^ - \[\.ggg\] .+$/m,
    inside: {
      "step-marker": { pattern: /\[\.ggg\]/, alias: "keyword control-flow" },
    },
  },
  hint: {
    pattern: /^\t- \[\.com\] .+$/m,
    inside: {
      "hint-marker": { pattern: /\[\.com\]/, alias: "comment" },
    },
  },
};

// ── Pastebin URL rewriter ─────────────────────────────────────────────────────

const URL_REWRITERS: UrlRewriter[] = [
  (url) => {
    const match = /pastebin\.com\/(.+)$/.exec(url);
    if (!match) return null;
    return `pastebin.com/raw/${match[1]}`;
  },
];

// ── Split full text into per-challenge blocks ─────────────────────────────────

interface ChallengeBlock {
  label: string;
  contents: string;
}

function splitIntoBlocks(text: string): ChallengeBlock[] {
  const blocks = text.split(/(?=^# )/m).filter((s) => s.trim().length > 0);
  return blocks.map((block) => {
    const nameMatch = /^# (.+)$/m.exec(block);
    const numMatch = /<div id="ch-(\d+)"/.exec(block);
    const name = nameMatch?.[1]?.trim() ?? "Unknown";
    const num = numMatch ? parseInt(numMatch[1], 10) : 0;
    return { label: `${num}. ${name}`, contents: block.trimEnd() };
  });
}

function joinBlocks(blocks: ChallengeBlock[]): string {
  return blocks.map((b) => b.contents).join("\n\n") + "\n";
}

// ── Help page ─────────────────────────────────────────────────────────────────

function HelpPage() {
  return (
    <div className={classNames(styles.help)}>
      <div>
        <span className="token keyword"># Challenge Name</span>
        <br />
        <span>Challenge title heading — one per challenge block.</span>
      </div>
      <hr />
      <div>
        <span className="token variable">{"<div id=\"ch-N\" markdown=\"N\">"}</span>
        <br />
        <span>Opens a challenge block. <strong>N</strong> = challenge number.</span>
      </div>
      <hr />
      <div>
        <span className="token keyword control-flow">## Easy / Medium / Hard / Endgame</span>
        <br />
        <span>Sets the difficulty badge color.</span>
      </div>
      <hr />
      <div>
        <span className="token variable">{"<h2 class=\"req\">All required</h2>"}</span>
        <br />
        <span className="token variable">{"<h2 class=\"req\">N/X required</h2>"}</span>
        <br />
        <span>How many steps must be completed. Omit for all-required.</span>
      </div>
      <hr />
      <div>
        <span className="token keyword control-flow">[.ggg]</span>
        {" "}
        <span>→ step text prefix</span>
        <br />
        <code> - [.ggg] Defeat Merveil, the Twisted (Act 1)</code>
        <br />
        <span>One line per checkable step.</span>
      </div>
      <hr />
      <div>
        <span className="token comment">[.com]</span>
        {" "}
        <span>→ per-step hint prefix (tab-indented)</span>
        <br />
        <code>{"\t- [.com] Hint text for the step above"}</code>
      </div>
      <hr />
      <div>
        <span>Unindented paragraph lines inside the div = challenge tips.</span>
      </div>
      <hr />
      <div>
        <span className="token variable">{"</div>"}</span>
        <br />
        <span>Closes the challenge block.</span>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ChallengeEditor() {
  const [savedText, setSavedText] = useRecoilState(challengeTextAtom);
  const defaultText = challengesToText(CHALLENGES);
  const activeText = savedText ?? defaultText;

  const [blocks, setBlocks] = useState<ChallengeBlock[]>(() =>
    splitIntoBlocks(activeText)
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [importIsOpen, setImportIsOpen] = useState(false);
  const [helpIsOpen, setHelpIsOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Resync blocks when savedText changes (e.g. import or reset)
  useEffect(() => {
    setBlocks(splitIntoBlocks(savedText ?? defaultText));
    setSelectedIndex(0);
  }, [savedText]);

  // Keep editor scrolled to top when switching challenges
  useEffect(() => {
    editorRef.current?.scrollTo(0, 0);
  }, [selectedIndex]);

  const currentText = joinBlocks(blocks);
  const isDirty = currentText !== activeText;

  const updateBlock = (i: number, contents: string) => {
    setBlocks((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], contents };
      return next;
    });
  };

  const handleSave = () => {
    setSavedText(currentText);
    toast.success("Challenges saved");
  };

  const handleReset = () => {
    setSavedText(null);
    toast.success("Challenges reset to defaults");
  };

  // Ctrl+S / ⌘S to save
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [currentText]);

  const savedBlocks = splitIntoBlocks(activeText);
  const isBlockDirty = (i: number) =>
    i < savedBlocks.length && savedBlocks[i].contents !== blocks[i]?.contents;

  return (
    <>
      <TextModal
        size="large"
        label="Import Challenges"
        isOpen={importIsOpen}
        onRequestClose={() => setImportIsOpen(false)}
        onSubmit={(textOrUrl) =>
          toast.promise(
            async () => {
              if (!textOrUrl) return;
              const src = await fetchStringOrUrl(textOrUrl, URL_REWRITERS);
              setSavedText(src);
            },
            { pending: "Importing", success: "Import Success", error: "Import Failed" }
          )
        }
      />

      <Modal size="large" isOpen={helpIsOpen} onRequestClose={() => setHelpIsOpen(false)}>
        <HelpPage />
      </Modal>

      <div className={classNames(formStyles.form, styles.editorForm)}>
        <div className={classNames(styles.workspace)}>
          <SelectList
            items={blocks}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
            getLabel={(i) =>
              isBlockDirty(i) ? blocks[i].label + "*" : blocks[i].label
            }
          />
          {selectedIndex < blocks.length && (
            <CodeEditor
              ref={editorRef}
              grammar={ChallengeGrammar}
              value={blocks[selectedIndex].contents}
              onValueChange={(v) => updateBlock(selectedIndex, v)}
            />
          )}
        </div>
        <div className={classNames(formStyles.groupRight)}>
          <BiHelpCircle size={24} onClick={() => setHelpIsOpen(true)} style={{ cursor: "pointer" }} />
          <button
            className={classNames(formStyles.formButton)}
            onClick={() => {
              navigator.clipboard.writeText(currentText);
              toast.success("Exported to Clipboard");
            }}
          >
            Export
          </button>
          <button
            className={classNames(formStyles.formButton)}
            onClick={() => setImportIsOpen(true)}
          >
            Import
          </button>
          <button
            className={classNames(formStyles.formButton)}
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className={classNames(formStyles.formButton)}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
      <hr />
    </>
  );
}
