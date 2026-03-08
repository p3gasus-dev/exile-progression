import { RouteData } from "../../../../common/route-processing/types";
import { StatTarget } from "../../data/stat-targets";
import { configSelector } from "../../state/config";
import { SplitRow } from "../SplitRow";
import { StatHintChips } from "../StatHintChips";
import { Fragment } from "./Fragment";
import styles from "./styles.module.css";
import classNames from "classnames";
import React, { useState } from "react";
import { BiInfoCircle, BiSolidInfoCircle } from "react-icons/bi";
import { useRecoilValue } from "recoil";

interface StepProps {
  step: RouteData.FragmentStep;
  statHints?: StatTarget[];
}

export function FragmentStep({ step, statHints }: StepProps) {
  const config = useRecoilValue(configSelector);
  const visibleStatHints = config.showStatHints ? (statHints ?? []) : [];
  const hasSubContent = step.subSteps.length > 0 || visibleStatHints.length > 0;
  const [showSubSteps, setShowSubSteps] = useState(
    config.showSubsteps && hasSubContent
  );

  const headNodes: React.ReactNode[] = [];
  const tailNodes: React.ReactNode[] = [];

  for (let i = 0; i < step.parts.length; i++) {
    const fragment = step.parts[i];
    const [head, tail] = Fragment(fragment);

    if (head) headNodes.push(head);
    if (tail) tailNodes.push(tail);
  }

  if (hasSubContent) {
    headNodes.push(
      <>
        {" "}
        <button
          className={classNames(styles.subStepToggle)}
          onClick={(e) => {
            setShowSubSteps(!showSubSteps);
            e.stopPropagation();
          }}
        >
          {showSubSteps ? (
            <BiSolidInfoCircle className={classNames("inlineIcon")} />
          ) : (
            <BiInfoCircle className={classNames("inlineIcon")} />
          )}
        </button>
      </>
    );
  }

  return (
    <>
      {headNodes.length > 0 && tailNodes.length > 0 ? (
        <SplitRow
          left={React.Children.toArray(headNodes)}
          right={React.Children.toArray(tailNodes)}
        />
      ) : (
        <span>{React.Children.toArray(headNodes)}</span>
      )}
      {showSubSteps && (
        <>
          <hr />
          {React.Children.toArray(
            step.subSteps.map((x) => (
              <span>
                {"• "}
                <FragmentStep step={x} />
              </span>
            ))
          )}
          {visibleStatHints.length > 0 && (
            <span>
              {"• "}
              <StatHintChips hints={visibleStatHints} />
            </span>
          )}
        </>
      )}
    </>
  );
}
