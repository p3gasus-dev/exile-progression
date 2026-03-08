import { ErrorFallback } from "../components/ErrorFallback";
import { Loading } from "../components/Loading";
import { Navbar } from "../components/Navbar";
import { pipe } from "../utility";
import { withBlank } from "../utility/withBlank";
import { withScrollRestoration } from "../utility/withScrollRestoration";
import { Suspense, lazy, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── Lazy containers ───────────────────────────────────────────────────────────

const DashboardContainer = withBlank(lazy(() => import("./Dashboard")));

// Route tab uses scroll restoration so the user returns to the right position
const RouteContainer = pipe(
  withBlank,
  withScrollRestoration
)(lazy(() => import("./Route")));

const CampaignContainer = withBlank(lazy(() => import("./Campaign")));
const AtlasContainer = withBlank(lazy(() => import("./Atlas")));
const BuildContainer = withBlank(lazy(() => import("./Build")));
const SettingsContainer = withBlank(lazy(() => import("./Settings")));

// Legacy: EditRoute is now part of Settings, but keep the old path so
// any existing bookmarks or links still work.
const EditRouteContainer = withBlank(lazy(() => import("./EditRoute")));

// ── App ───────────────────────────────────────────────────────────────────────

export function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>
            {/* DASHBOARD — route progress, unique items, misc */}
            <Route
              path="/"
              element={
                <Page
                  title="Exile Progression - Dashboard"
                  component={<DashboardContainer />}
                />
              }
            />

            {/* ROUTE — ACT 1-10 / Voidstone 1-4 / Challenges */}
            <Route
              path="/route"
              element={
                <Page
                  title="Exile Progression - Route"
                  component={<RouteContainer />}
                />
              }
            />

            {/* CAMPAIGN — ACT 1-10 settings, display settings */}
            <Route
              path="/campaign"
              element={
                <Page
                  title="Exile Progression - Campaign"
                  component={<CampaignContainer />}
                />
              }
            />

            {/* ATLAS — atlas passive settings, voidstone routing */}
            <Route
              path="/atlas"
              element={
                <Page
                  title="Exile Progression - Atlas"
                  component={<AtlasContainer />}
                />
              }
            />

            {/* BUILD — import, search strings, gem editor */}
            <Route
              path="/build"
              element={
                <Page
                  title="Exile Progression - Build"
                  component={<BuildContainer />}
                />
              }
            />

            {/* SETTINGS — edit route, 3rd-party export, GitHub */}
            <Route
              path="/settings"
              element={
                <Page
                  title="Exile Progression - Settings"
                  component={<SettingsContainer />}
                />
              }
            />

            {/* LEGACY — /edit-route kept for backwards compatibility */}
            <Route
              path="/edit-route"
              element={
                <Page
                  title="Exile Progression - Edit Route"
                  component={<EditRouteContainer />}
                />
              }
            />
          </Routes>
        </ErrorBoundary>
      </Suspense>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        closeOnClick={true}
        theme={"dark"}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface PageProps {
  title: string;
  component: JSX.Element;
}

function Page({ title, component }: PageProps) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return component;
}
