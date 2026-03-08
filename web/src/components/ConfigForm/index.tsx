import { Config } from "../../state/config";
import { SplitRow } from "../SplitRow";
import styles from "./styles.module.css";
import classNames from "classnames";

interface ConfigFormProps {
  config: Config;
  onSubmit: (config: Config) => void;
}

export function ConfigForm({ config, onSubmit }: ConfigFormProps) {
  return (
    <div className={classNames(styles.form)}>
      <SplitRow
        left={
          <div>
            <div className={classNames(styles.label)}>Gems Only</div>
            <div className={classNames(styles.desc)}>Only show steps with gem rewards.</div>
          </div>
        }
        right={
          <div className={classNames(styles.value)}>
            <input
              type="checkbox"
              checked={config.gemsOnly}
              onChange={(evt) => {
                onSubmit({
                  ...config,
                  gemsOnly: evt.target.checked,
                });
              }}
              aria-label="Gems Only"
            />
          </div>
        }
      />
      <SplitRow
        left={
          <div>
            <div className={classNames(styles.label)}>Show Route Hints</div>
            <div className={classNames(styles.desc)}>Show sub-step tips for each route step.</div>
          </div>
        }
        right={
          <div className={classNames(styles.value)}>
            <input
              type="checkbox"
              checked={config.showSubsteps}
              onChange={(evt) => {
                onSubmit({
                  ...config,
                  showSubsteps: evt.target.checked,
                });
              }}
              aria-label="Show Route Hints"
            />
          </div>
        }
      />
      <SplitRow
        left={
          <div>
            <div className={classNames(styles.label)}>Show Crafting</div>
            <div className={classNames(styles.desc)}>Show crafting recipe unlock steps.</div>
          </div>
        }
        right={
          <div className={classNames(styles.value)}>
            <input
              type="checkbox"
              checked={config.showCraftingRecipes}
              onChange={(evt) => {
                onSubmit({
                  ...config,
                  showCraftingRecipes: evt.target.checked,
                });
              }}
              aria-label="Show Crafting Recipes"
            />
          </div>
        }
      />
      <SplitRow
        left={
          <div>
            <div className={classNames(styles.label)}>Show Stat Hints</div>
            <div className={classNames(styles.desc)}>Show damage type breakdowns on boss steps.</div>
          </div>
        }
        right={
          <div className={classNames(styles.value)}>
            <input
              type="checkbox"
              checked={config.showStatHints}
              onChange={(evt) => {
                onSubmit({
                  ...config,
                  showStatHints: evt.target.checked,
                });
              }}
              aria-label="Show Stat Hints"
            />
          </div>
        }
      />
    </div>
  );
}
