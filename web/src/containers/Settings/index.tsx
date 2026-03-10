import { RouteEditor } from "../../components/RouteEditor";
import { ChallengeEditor } from "../../components/ChallengeEditor";
import { routeFilesSelector } from "../../state/route-files";
import { voidstoneRouteFilesSelector } from "../../state/voidstone-route-files";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useRecoilState, useResetRecoilState } from "recoil";

function SectionHeader({ title }: { title: string }) {
  return <h2 className={classNames(styles.sectionHeader)}>{title}</h2>;
}

export default function SettingsContainer() {
  const [routeFiles, setRouteFiles] = useRecoilState(routeFilesSelector);
  const resetRouteFiles = useResetRecoilState(routeFilesSelector);

  const [voidstoneRouteFiles, setVoidstoneRouteFiles] = useRecoilState(voidstoneRouteFilesSelector);
  const resetVoidstoneRouteFiles = useResetRecoilState(voidstoneRouteFilesSelector);

  return (
    <div className={classNames(styles.container)}>

      {/* ── Edit Route ──────────────────────────────────────────────────── */}
      <SectionHeader title="Edit Route" />
      <p className={classNames(styles.hint)}>
        Modify the ACT 1–10 route source files. Changes persist across sessions.
        Ctrl+S / ⌘S saves while the editor is focused.
      </p>
      <RouteEditor
        routeFiles={routeFiles}
        onSubmit={(updated) => setRouteFiles(updated)}
        onReset={resetRouteFiles}
      />

      <hr className={classNames(styles.divider)} />

      {/* ── Edit Voidstone Route ─────────────────────────────────────────── */}
      <SectionHeader title="Edit Voidstone Route" />
      <p className={classNames(styles.hint)}>
        Modify the Voidstone 1–4 route source files. Changes persist across sessions.
        Ctrl+S / ⌘S saves while the editor is focused.
      </p>
      <RouteEditor
        routeFiles={voidstoneRouteFiles}
        onSubmit={(updated) => setVoidstoneRouteFiles(updated)}
        onReset={resetVoidstoneRouteFiles}
      />

      <hr className={classNames(styles.divider)} />

      {/* ── Edit Challenges ──────────────────────────────────────────────── */}
      <SectionHeader title="Edit Challenges" />
      <p className={classNames(styles.hint)}>
        Modify the challenge list as JSON. Save to apply. Reset restores built-in defaults.
      </p>
      <ChallengeEditor />

    </div>
  );
}
