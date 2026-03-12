import { sectionCollapseFamily } from "../../state/section-collapse";
import { TaskList, TaskListProps } from "../TaskList";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useLayoutEffect } from "react";
import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useRecoilState } from "recoil";

interface SectionHolderProps {
  name: string;
  nameLeft?: React.ReactNode;
  nameRight?: React.ReactNode;
  items: TaskListProps["items"];
  meta?: React.ReactNode;
}

export function SectionHolder({ name, nameLeft, nameRight, items, meta }: SectionHolderProps) {
  const sectionId = `section-${name.replace(/\s+/g, "_")}`;
  const [collapsed, setCollapsed] = useRecoilState(
    sectionCollapseFamily(sectionId)
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
          <div className={classNames(styles.sectionName)}>
            {nameLeft && <span className={classNames(styles.nameLeft)}>{nameLeft}</span>}
            {name}
            {nameRight && <span className={classNames(styles.nameRight)}>{nameRight}</span>}
          </div>
          {icon}
        </button>
        <hr />
      </div>
      {collapsed || (
        <>
          <TaskList items={items} />
          {meta && <div className={classNames(styles.meta)}>{meta}</div>}
          <hr />
        </>
      )}
    </div>
  );
}
