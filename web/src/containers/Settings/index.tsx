import { RouteEditor } from "../../components/RouteEditor";
import { pobCodeAtom } from "../../state/pob-code";
import { routeFilesSelector } from "../../state/route-files";
import { routeSelector } from "../../state/route";
import { trackEvent } from "../../utility/telemetry";
import { formStyles } from "../../styles";
import styles from "./styles.module.css";
import classNames from "classnames";
import { FaGithub, FaRegClipboard } from "react-icons/fa";
import { useRecoilState, useRecoilCallback, useResetRecoilState } from "recoil";
import { toast } from "react-toastify";

function SectionHeader({ title }: { title: string }) {
  return <h2 className={classNames(styles.sectionHeader)}>{title}</h2>;
}

export default function SettingsContainer() {
  const [routeFiles, setRouteFiles] = useRecoilState(routeFilesSelector);
  // Proper reset: sets the backing atom to null, causing the selector to
  // re-run loadDefaultRouteFiles() on next read instead of using localStorage.
  const resetRouteFiles = useResetRecoilState(routeFilesSelector);

  // 3rd-party export: serialise the full route + pob code to clipboard
  const exportToClipboard = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const route = await snapshot.getPromise(routeSelector);
        const pobCode = await snapshot.getPromise(pobCodeAtom);

        const output = pobCode === null
          ? [...route, "pob-code:none"]
          : [...route, `pob-code:${pobCode}`];

        await navigator.clipboard.writeText(JSON.stringify(output));
        toast.success("Exported to Clipboard");
      },
    []
  );

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

      {/* ── 3rd-Party Export ────────────────────────────────────────────── */}
      <SectionHeader title="3rd-Party Export" />
      <p className={classNames(styles.hint)}>
        Export your route to the clipboard for use in external tools.
      </p>
      <div className={classNames(formStyles.groupLeft)}>
        <button
          className={classNames(formStyles.formButton)}
          onClick={exportToClipboard}
        >
          <FaRegClipboard className="inlineIcon" />
          Copy Route to Clipboard
        </button>
      </div>

      <hr className={classNames(styles.divider)} />

      {/* ── Project on GitHub ───────────────────────────────────────────── */}
      <SectionHeader title="Project on GitHub" />
      <p className={classNames(styles.hint)}>
        Found a bug or want to contribute? Open an issue or pull request.
      </p>
      <div className={classNames(formStyles.groupLeft, styles.repoLinks)}>
        <button
          className={classNames(formStyles.formButton)}
          onClick={() => {
            trackEvent("github_exile_progression");
            window.open(
              "https://github.com/p3gasus-dev/exile-progression",
              "_blank"
            );
          }}
        >
          <FaGithub className="inlineIcon" />
          exile-progression
        </button>

        <button
          className={classNames(formStyles.formButton, styles.repoLinkSecondary)}
          onClick={() => {
            trackEvent("github_exile_leveling");
            window.open(
              "https://github.com/heartofphos/exile-leveling",
              "_blank"
            );
          }}
        >
          <FaGithub className="inlineIcon" />
          exile-leveling <span className={classNames(styles.upstreamBadge)}>upstream</span>
        </button>
      </div>
    </div>
  );
}
