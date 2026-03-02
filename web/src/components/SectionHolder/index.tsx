import { sectionCollapseSelectorFamily } from "../../state/section-collapse";
import { StatTarget } from "../../data/stat-targets";
import { TaskList, TaskListProps } from "../TaskList";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useLayoutEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useRecoilState } from "recoil";

interface SectionHolderProps {
  name: string;
  items: TaskListProps["items"];
  statHints?: StatTarget[];
}

export function SectionHolder({ name, items, statHints }: SectionHolderProps) {
  const sectionId = `section-${name.replace(/\s+/g, "_")}`;
  const [collapsed, setCollapsed] = useRecoilState(
    sectionCollapseSelectorFamily(sectionId)
  );

  const scrollToSection = (collapsed: boolean) => {
    if (!collapsed) return;

    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "auto", block: "nearest" });
  };

  useLayoutEffect(() => {
    // scrollToSection after sticky positioning is applied
    scrollToSection(collapsed);
  }, [collapsed]);

  const icon = collapsed ? <FiChevronDown /> : <FiChevronUp />;
  return (
    <div>
      <div id={sectionId} className={classNames(styles.sectionbar)}>
        <button
          aria-label={name}
          className={classNames(styles.header, styles.sectionbarHeader)}
          onClick={() => {
            const updateCollapsed = !collapsed;
            setCollapsed(updateCollapsed);

            // scrollToSection before sticky positioning is applied
            scrollToSection(updateCollapsed);
          }}
        >
          {icon}
          <div>{name}</div>
          {icon}
        </button>
        {statHints && statHints.length > 0 && (
          <div className={classNames(styles.statHintRow)}>
            {statHints.map((h) => (
              <span
                key={h.label}
                className={classNames(styles.statHint, h.warn && styles.statHintWarn)}
                title={h.note}
              >
                <span className={classNames(styles.statHintLabel)}>{h.label}</span>
                <span className={classNames(styles.statHintValue)}>{h.value}</span>
              </span>
            ))}
          </div>
        )}
        <hr />
      </div>
      {collapsed || (
        <>
          <TaskList items={items} />
          <hr />
        </>
      )}
    </div>
  );
}
