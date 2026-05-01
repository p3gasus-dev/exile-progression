import { Data } from "../../../../common/data";
import { RouteData } from "../../../../common/route-processing/types";
import { gemProgressFamily } from "../../state/gem-progress";
import { GemEdit } from "../GemEdit";
import { TaskList, TaskListProps } from "../TaskList";
import { formStyles } from "../../styles";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useRef } from "react";
import { MdAddCircleOutline } from "react-icons/md";

// Sorted gem name list for datalist autocomplete
const GEM_OPTIONS = Object.entries(Data.Gems)
  .map(([id, gem]) => ({ id, name: gem.name }))
  .sort((a, b) => a.name.localeCompare(b.name));

interface GemEditFormProps {
  requiredGems: RouteData.RequiredGem[];
  onUpdate: (requiredGems: RouteData.RequiredGem[]) => void;
}

export function GemEditForm({ requiredGems, onUpdate }: GemEditFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const workingGems = [...requiredGems];

  function handleAddGem() {
    const value = inputRef.current?.value.trim() ?? "";
    const found = GEM_OPTIONS.find(
      (g) => g.name.toLowerCase() === value.toLowerCase()
    );
    if (!found) return;
    if (workingGems.some((g) => g.id === found.id)) return;
    workingGems.push({ id: found.id, note: "Manual", count: 1 });
    onUpdate(workingGems);
    if (inputRef.current) inputRef.current.value = "";
  }

  const taskItems: TaskListProps["items"] = [];
  for (let i = 0; i < workingGems.length; i++) {
    const requiredGem = workingGems[i];
    taskItems.push({
      isCompletedState: gemProgressFamily(requiredGem.id),
      children: (
        <GemEdit
          onMoveTop={() => {
            const splice = workingGems.splice(i, 1);
            workingGems.unshift(...splice);
            onUpdate(workingGems);
          }}
          onMoveUp={() => {
            if (i == 0) return;
            const swap = workingGems[i];
            workingGems[i] = workingGems[i - 1];
            workingGems[i - 1] = swap;
            onUpdate(workingGems);
          }}
          onMoveDown={() => {
            if (i == workingGems.length - 1) return;
            const swap = workingGems[i];
            workingGems[i] = workingGems[i + 1];
            workingGems[i + 1] = swap;
            onUpdate(workingGems);
          }}
          onDelete={() => {
            workingGems.splice(i, 1);
            onUpdate(workingGems);
          }}
          requiredGem={requiredGem}
          onCountChange={(value) => {
            if (value > 0) {
              workingGems[i] = { ...workingGems[i], count: value };
              onUpdate(workingGems);
            }
          }}
        />
      ),
    });
  }

  return (
    <>
      <TaskList items={taskItems} />
      <datalist id="gem-options">
        {GEM_OPTIONS.map((g) => (
          <option key={g.id} value={g.name} />
        ))}
      </datalist>
      <div className={classNames(styles.addRow)}>
        <input
          ref={inputRef}
          list="gem-options"
          className={classNames(formStyles.formInput, styles.addInput)}
          placeholder="Add gem by name…"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddGem();
          }}
        />
        <button
          className={classNames(formStyles.formButton)}
          type="button"
          onClick={handleAddGem}
        >
          <MdAddCircleOutline className="inlineIcon" />
          Add
        </button>
      </div>
    </>
  );
}
