import { Challenge, CHALLENGES } from "../../data/challenge-list";
import { challengeOverrideAtom } from "../../state/challenge-override";
import { CodeEditor } from "../CodeEditor";
import { formStyles } from "../../styles";
import styles from "./styles.module.css";
import classNames from "classnames";
import { Grammar } from "prismjs";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";

const JsonGrammar: Grammar = {
  property: {
    pattern: /"(?:[^\\"]|\\.)*"(?=\s*:)/,
    greedy: true,
    alias: "keyword",
  },
  string: {
    pattern: /"(?:[^\\"]|\\.)*"/,
    greedy: true,
  },
  number: /-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/,
  boolean: /\b(?:true|false)\b/,
  null: { pattern: /\bnull\b/, alias: "keyword control-flow" },
  punctuation: /[{}[\],]/,
};

export function ChallengeEditor() {
  const [override, setOverride] = useRecoilState(challengeOverrideAtom);
  const [text, setText] = useState(() =>
    JSON.stringify(override ?? CHALLENGES, null, 2)
  );

  useEffect(() => {
    setText(JSON.stringify(override ?? CHALLENGES, null, 2));
  }, [override]);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(text) as unknown;
      if (!Array.isArray(parsed)) throw new Error("Expected a JSON array");
      setOverride(parsed as Challenge[]);
      toast.success("Challenges saved");
    } catch (e) {
      toast.error("Invalid JSON: " + (e as Error).message);
    }
  };

  const handleReset = () => {
    setOverride(null);
    toast.success("Challenges reset to defaults");
  };

  return (
    <>
      <div className={classNames(formStyles.form, styles.editorForm)}>
        <CodeEditor
          grammar={JsonGrammar}
          value={text}
          onValueChange={setText}
        />
        <div className={classNames(formStyles.groupRight)}>
          <button className={classNames(formStyles.formButton)} onClick={handleReset}>
            Reset
          </button>
          <button className={classNames(formStyles.formButton)} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      <hr />
    </>
  );
}
