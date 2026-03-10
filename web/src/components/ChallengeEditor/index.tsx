import { CHALLENGES } from "../../data/challenge-list";
import {
  challengeTextAtom,
  challengesToText,
} from "../../state/challenge-override";
import { CodeEditor } from "../CodeEditor";
import { formStyles } from "../../styles";
import styles from "./styles.module.css";
import classNames from "classnames";
import { Grammar } from "prismjs";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";

// ── League.txt-style syntax grammar ──────────────────────────────────────────

const ChallengeGrammar: Grammar = {
  // # Challenge Name
  "challenge-name": {
    pattern: /^# .+$/m,
    alias: "keyword",
  },
  // ## Difficulty heading
  heading: {
    pattern: /^## .+$/m,
    alias: "keyword control-flow",
  },
  // <div ...> and </div>
  tag: {
    pattern: /<\/?div[^>]*>|<h2[^>]*>[^<]*<\/h2>/,
    alias: "variable",
  },
  // - [.ggg] step text
  step: {
    pattern: /^ - \[\.ggg\] .+$/m,
    inside: {
      "step-marker": { pattern: /\[\.ggg\]/, alias: "keyword control-flow" },
      "step-text": { pattern: /.+/, alias: "property" },
    },
  },
  // \t- [.com] hint text
  hint: {
    pattern: /^\t- \[\.com\] .+$/m,
    inside: {
      "hint-marker": { pattern: /\[\.com\]/, alias: "comment" },
      "hint-text": { pattern: /.+/, alias: "string" },
    },
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

export function ChallengeEditor() {
  const [savedText, setSavedText] = useRecoilState(challengeTextAtom);
  const defaultText = challengesToText(CHALLENGES);

  const [workingText, setWorkingText] = useState<string>(
    savedText ?? defaultText
  );

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

  return (
    <>
      <div className={classNames(formStyles.form, styles.editorForm)}>
        <CodeEditor
          grammar={ChallengeGrammar}
          value={workingText}
          onValueChange={setWorkingText}
        />
        <div className={classNames(formStyles.groupRight)}>
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
