import { challengeProgressSelectorFamily } from "../../../state/challenge-progress";
import {
  CHALLENGES,
  CHALLENGE_CATEGORIES,
  ChallengeCategory,
} from "../../../data/challenge-list";
import { borderListStyles, interactiveStyles } from "../../../styles";
import styles from "./styles.module.css";
import classNames from "classnames";
import { selectorFamily, useRecoilState, useRecoilValue } from "recoil";
import { selector } from "recoil";

// ─── Selectors ────────────────────────────────────────────────────────────────

/** Total challenges completed across all categories. */
const challengeCountSelector = selector({
  key: "challengeCountSelector",
  get: ({ get }) =>
    CHALLENGES.filter((c) => get(challengeProgressSelectorFamily(c.id))).length,
});

/**
 * Completed count for a single category.
 * Using selectorFamily avoids hooks-in-loop in CategorySection.
 */
const categoryCountSelectorFamily = selectorFamily<number, ChallengeCategory>({
  key: "categoryCountSelectorFamily",
  get:
    (category) =>
    ({ get }) =>
      CHALLENGES.filter(
        (c) =>
          c.category === category &&
          get(challengeProgressSelectorFamily(c.id))
      ).length,
});

// ─── ChallengeItem ────────────────────────────────────────────────────────────

interface ChallengeItemProps {
  id: string;
  number: number;
  name: string;
  description: string;
}

function ChallengeItem({ id, number, name, description }: ChallengeItemProps) {
  const [completed, setCompleted] = useRecoilState(
    challengeProgressSelectorFamily(id)
  );

  return (
    <li
      tabIndex={0}
      className={classNames(
        borderListStyles.item,
        interactiveStyles.hoverPrimary,
        styles.challengeItem,
        { [styles.completed]: completed }
      )}
      onClick={() => setCompleted(!completed)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setCompleted(!completed);
      }}
    >
      <span className={classNames(styles.number)}>
        {`${number}`.padStart(2, "0")}.
      </span>
      <div className={classNames(styles.content)}>
        <span className={classNames(styles.name)}>{name}</span>
        <span className={classNames(styles.description)}>{description}</span>
      </div>
      <span
        className={classNames(styles.checkbox, { [styles.checked]: completed })}
        aria-label={completed ? "Completed" : "Not completed"}
      >
        {completed ? "✓" : ""}
      </span>
    </li>
  );
}

// ─── CategorySection ──────────────────────────────────────────────────────────

interface CategorySectionProps {
  category: ChallengeCategory;
}

function CategorySection({ category }: CategorySectionProps) {
  const challenges = CHALLENGES.filter((c) => c.category === category);
  // Safe: hook called at the top level of this component, not inside a callback
  const completedCount = useRecoilValue(categoryCountSelectorFamily(category));

  return (
    <div className={classNames(styles.categorySection)}>
      <div className={classNames(styles.categoryHeader)}>
        <span>{CHALLENGE_CATEGORIES[category]}</span>
        <span className={classNames(styles.categoryCount)}>
          {completedCount}/{challenges.length}
        </span>
      </div>
      <ol className={classNames(styles.challengeList)}>
        {challenges.map((c) => (
          <ChallengeItem
            key={c.id}
            id={c.id}
            number={c.number}
            name={c.name}
            description={c.description}
          />
        ))}
      </ol>
    </div>
  );
}

// ─── ChallengeTracker ─────────────────────────────────────────────────────────

export default function ChallengeTracker() {
  const totalCompleted = useRecoilValue(challengeCountSelector);
  const categories = Object.keys(CHALLENGE_CATEGORIES) as ChallengeCategory[];

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.progressHeader)}>
        <span className={classNames(styles.progressTitle)}>
          Challenges Complete
        </span>
        <span className={classNames(styles.progressCount)}>
          {totalCompleted}
          <span className={classNames(styles.progressTotal)}>/40</span>
        </span>
        <div className={classNames(styles.progressBar)}>
          <div
            className={classNames(styles.progressFill)}
            style={{ width: `${(totalCompleted / 40) * 100}%` }}
          />
        </div>
      </div>

      {categories.map((cat) => (
        <CategorySection key={cat} category={cat} />
      ))}
    </div>
  );
}
