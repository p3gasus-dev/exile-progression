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

// ── Grammar — mirrors RouteGrammar style ──────────────────────────────────────

const ChallengeGrammar: Grammar = {
  // #section N. Challenge Name
  section: {
    pattern: /^#section .+$/m,
    inside: {
      "keyword control-flow": /^#section/,
      variable: /.+/,
    },
  },
  // #easy / #medium / #hard / #endgame / #req N / #tip ...
  directive: {
    pattern: /^#(easy|medium|hard|endgame|req|tip)\b.*/m,
    inside: {
      "keyword control-flow": /^#\w+/,
      property: /.+/,
    },
  },
  // #sub hints (indented 4 spaces)
  subStep: {
    pattern: /^ {4}#sub .+$/m,
    inside: {
      "keyword control-flow": /#sub/,
      comment: /.+/,
    },
  },
  // other # comments
  comment: /^#.*/m,
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
  const blocks = text.split(/(?=^#section )/m).filter((s) => s.trim().length > 0);
  return blocks.map((block) => {
    const m = /^#section (\d+)\.\s+(.+)$/m.exec(block);
    const num = m ? parseInt(m[1], 10) : 0;
    const name = m ? m[2].trim() : "Unknown";
    return { label: `${num}. ${name}`, contents: block.trimEnd() };
  });
}

function joinBlocks(blocks: ChallengeBlock[]): string {
  return blocks.map((b) => b.contents).join("\n\n");
}

// ── Help page ─────────────────────────────────────────────────────────────────

function HelpPage() {
  return (
    <div className={classNames(styles.help)}>
      <div>
        <span className="token keyword control-flow">#section</span>
        <span className="token variable">{" N. Challenge Name"}</span>
        <br />
        <span>Opens a challenge block. <strong>N</strong> = challenge number.</span>
      </div>
      <hr />
      <div>
        <span className="token keyword control-flow">#easy</span>{" / "}
        <span className="token keyword control-flow">#medium</span>{" / "}
        <span className="token keyword control-flow">#hard</span>{" / "}
        <span className="token keyword control-flow">#endgame</span>
        <br />
        <span>Sets the difficulty badge color.</span>
      </div>
      <hr />
      <div>
        <span className="token keyword control-flow">#req</span>
        <span className="token property">{" N"}</span>
        <br />
        <span>How many steps must be completed (omit if all required).</span>
      </div>
      <hr />
      <div>
        <span>Step text — plain line, no prefix needed.</span>
        <br />
        <code>{"Defeat Merveil, the Twisted (Act 1)"}</code>
      </div>
      <hr />
      <div>
        <span className="token keyword control-flow">{"    #sub"}</span>
        <span>{" hint text (4-space indent)"}</span>
        <br />
        <span>Per-step hint, attached to the step above it.</span>
      </div>
      <hr />
      <div>
        <span className="token keyword control-flow">#tip</span>
        <span className="token property">{" Challenge-level tip text"}</span>
        <br />
        <span>General hint shown below all steps (toggle visible).</span>
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

  useEffect(() => {
    setBlocks(splitIntoBlocks(savedText ?? defaultText));
    setSelectedIndex(0);
  }, [savedText]);

  useEffect(() => {
    editorRef.current?.scrollTo(0, 0);
  }, [selectedIndex]);

  const currentText = joinBlocks(blocks);
  const savedBlocks = splitIntoBlocks(activeText);
  const isBlockDirty = (i: number) =>
    i < savedBlocks.length && savedBlocks[i].contents !== blocks[i]?.contents;

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
          <BiHelpCircle
            size={24}
            onClick={() => setHelpIsOpen(true)}
            style={{ cursor: "pointer" }}
          />
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
