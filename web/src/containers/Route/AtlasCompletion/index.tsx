import { SectionHolder } from "../../../components/SectionHolder";
import { TaskListProps } from "../../../components/TaskList";
import {
  ATLAS_GUIDE,
  atlasCompletionProgressSelectorFamily,
  useClearAtlasCompletion,
} from "../../../state/atlas-completion";
import styles from "./styles.module.css";
import classNames from "classnames";
import { formStyles } from "../../../styles";
import { MdDeleteForever } from "react-icons/md";

function GuideStepContent({ label, detail }: { label: string; detail?: string }) {
  return (
    <>
      <span>{label}</span>
      {detail && <span className={classNames(styles.detail)}>{detail}</span>}
    </>
  );
}

export default function AtlasCompletion() {
  const clearProgress = useClearAtlasCompletion();

  return (
    <>
      <div className={classNames(styles.header)}>
        <span className={classNames(styles.title)}>Atlas Full Completion</span>
        <button
          className={classNames(formStyles.formButton, styles.resetBtn)}
          onClick={clearProgress}
          title="Reset guide progress"
          type="button"
        >
          <MdDeleteForever size={14} />
          Reset
        </button>
      </div>

      {ATLAS_GUIDE.map((phase) => {
        const taskItems: TaskListProps["items"] = phase.steps.map((step) => ({
          key: step.id,
          isCompletedState: atlasCompletionProgressSelectorFamily(step.id),
          children: <GuideStepContent label={step.label} detail={step.detail} />,
        }));

        return (
          <SectionHolder
            key={phase.phase}
            name={phase.phase}
            items={taskItems}
          />
        );
      })}
    </>
  );
}
