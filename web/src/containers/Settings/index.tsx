import { RouteEditor } from "../../components/RouteEditor";
import { pobCodeAtom } from "../../state/pob-code";
import { routeFilesSelector } from "../../state/route-files";
import { voidstoneRouteFilesSelector } from "../../state/voidstone-route-files";
import { challengeRouteFilesSelector } from "../../state/challenge-route-files";
import { routeSelector } from "../../state/route";
import { leagueSelector, LEAGUES, League } from "../../state/league";
import { formStyles } from "../../styles";
import styles from "./styles.module.css";
import classNames from "classnames";
import { FaRegClipboard } from "react-icons/fa";
import { useRecoilState, useRecoilCallback, useResetRecoilState } from "recoil";
import { toast } from "react-toastify";

function SectionHeader({ title }: { title: string }) {
  return <h2 className={classNames(styles.sectionHeader)}>{title}</h2>;
}

export default function SettingsContainer() {
  const [routeFiles, setRouteFiles] = useRecoilState(routeFilesSelector);
  const resetRouteFiles = useResetRecoilState(routeFilesSelector);

  const [voidstoneRouteFiles, setVoidstoneRouteFiles] = useRecoilState(voidstoneRouteFilesSelector);
  const resetVoidstoneRouteFiles = useResetRecoilState(voidstoneRouteFilesSelector);

  const [challengeRouteFiles, setChallengeRouteFiles] = useRecoilState(challengeRouteFilesSelector);
  const resetChallengeRouteFiles = useResetRecoilState(challengeRouteFilesSelector);

  const [league, setLeague] = useRecoilState(leagueSelector);

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
      {/* ── League ──────────────────────────────────────────────────────── */}
      <SectionHeader title="League" />
      <p className={classNames(styles.hint)}>
        Select your current Path of Exile league. Used for display and
        challenge tracking throughout the app.
      </p>
      <div className={classNames(styles.leagueRow)}>
        <select
          className={classNames(styles.leagueSelect)}
          value={league}
          onChange={(e) => setLeague(e.target.value as League)}
          aria-label="Active league"
        >
          {LEAGUES.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <hr className={classNames(styles.divider)} />

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
        Modify the challenge guide source file. Ctrl+S / ⌘S saves while the editor is focused.
      </p>
      <RouteEditor
        routeFiles={challengeRouteFiles}
        onSubmit={(updated) => setChallengeRouteFiles(updated)}
        onReset={resetChallengeRouteFiles}
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

    </div>
  );
}
