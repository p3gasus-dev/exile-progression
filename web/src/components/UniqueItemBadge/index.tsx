import { getAcquisitionSource } from "../../data/unique-drop-sources";
import styles from "./styles.module.css";
import classNames from "classnames";
import { FaLayerGroup, FaStar } from "react-icons/fa";

interface UniqueItemBadgeProps {
  /** Item names from the build that are relevant to this route step. */
  items: string[];
}

/**
 * Renders one badge per build-relevant unique item at a route step.
 *
 * Divination card rule:
 *   - Items with a direct boss/area drop → gold star badge (no div card mentioned)
 *   - Items that are div-card-only → shown in a separate section on Dashboard/Build,
 *     never annotated on a boss kill step (filtered out before this component)
 */
export function UniqueItemBadge({ items }: UniqueItemBadgeProps) {
  if (items.length === 0) return null;

  return (
    <div className={classNames(styles.badgeRow)}>
      {items.map((name) => {
        const source = getAcquisitionSource(name);
        if (!source) return null;

        // Div-card-only items should not appear on boss kill steps —
        // they're handled by getDivCardOnlyItems() in Dashboard/Build.
        if (source.divCardOnly) return null;

        return (
          <span key={name} className={classNames(styles.badge)} title={source.notes}>
            <FaStar className={classNames(styles.icon, "inlineIcon")} />
            {name}
          </span>
        );
      })}
    </div>
  );
}

/**
 * Badge variant for div-card-only items shown in summary sections
 * (Dashboard / Build tab). Uses a cards icon to distinguish from direct drops.
 */
export function DivCardBadge({ items }: UniqueItemBadgeProps) {
  if (items.length === 0) return null;

  return (
    <div className={classNames(styles.badgeRow)}>
      {items.map((name) => {
        const source = getAcquisitionSource(name);
        if (!source?.divCardOnly) return null;

        return (
          <span
            key={name}
            className={classNames(styles.badge, styles.divCardBadge)}
            title={source.notes}
          >
            <FaLayerGroup className={classNames(styles.icon, "inlineIcon")} />
            {name}
            {source.divCard && (
              <span className={classNames(styles.divCardHint)}>
                {" "}via {source.divCard}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
