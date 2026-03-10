import { CHALLENGES } from "../../data/challenge-list";
import {
  challengeTextAtom,
  challengesToText,
} from "../../state/challenge-override";
import { CodeEditor } from "../CodeEditor";
import { SelectList } from "../SelectList";
import { TextModal } from "../Modal";
import { formStyles } from "../../styles";
import { UrlRewriter, fetchStringOrUrl } from "../../utility";
import styles from "./styles.module.css";
import classNames from "classnames";
import { Grammar } from "prismjs";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";

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

// ── Pastebin URL rewriter (same as RouteEditor) ───────────────────────────────

const URL_REWRITERS: UrlRewriter[] = [
  (url) => {
    const match = /pastebin\.com\/(.+)$/.exec(url);
    if (!match) return null;
    return `pastebin.com/raw/${match[1]}`;
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function ChallengeEditor() {
  const [savedText, setSavedText] = useRecoilState(challengeTextAtom);
  const defaultText = challengesToText(CHALLENGES);

  const [workingText, setWorkingText] = useState<string>(
    savedText ?? defaultText
  );
  const [importIsOpen, setImportIsOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWorkingText(savedText ?? defaultText);
  }, [savedText]);

  const handleSave = () => {
    setSavedText(workingText);
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
  }, [workingText]);

  const isDirty = workingText !== (savedText ?? defaultText);

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
            {
              pending: "Importing",
              success: "Import Success",
              error: "Import Failed",
            }
          )
        }
      />

      <div className={classNames(formStyles.form, styles.editorForm)}>
        <div className={classNames(styles.workspace)}>
          <SelectList
            items={["challenges.txt"]}
            selectedIndex={0}
            onSelect={() => {}}
            getLabel={() => isDirty ? "challenges.txt*" : "challenges.txt"}
          />
          <CodeEditor
            ref={editorRef}
            grammar={ChallengeGrammar}
            value={workingText}
            onValueChange={setWorkingText}
          />
        </div>
        <div className={classNames(formStyles.groupRight)}>
          <button
            className={classNames(formStyles.formButton)}
            onClick={() => {
              navigator.clipboard.writeText(workingText);
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
