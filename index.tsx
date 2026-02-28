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

// Existing containers
const RoutesContainer = pipe(
  withBlank,
  withScrollRestoration
)(lazy(() => import("./Routes")));
const BuildContainer = withBlank(lazy(() => import("./Build")));
const EditRouteContainer = withBlank(lazy(() => import("./EditRoute")));

// Placeholder containers for new tabs — replace with real implementations as built
const DashboardContainer = withBlank(lazy(() => import("./Dashboard")));
const CampaignContainer = withBlank(lazy(() => import("./Campaign")));
const AtlasContainer = withBlank(lazy(() => import("./Atlas")));
const SettingsContainer = withBlank(lazy(() => import("./Settings")));

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

            {/* ROUTE — ACT1-10, Voidstone1-4, Challenge1-40 */}
            <Route
              path="/route"
              element={
                <Page
                  title="Exile Progression - Route"
                  component={<RoutesContainer />}
                />
              }
            />

            {/* CAMPAIGN — ACT1-10 settings, campaign-specific settings */}
            <Route
              path="/campaign"
              element={
                <Page
                  title="Exile Progression - Campaign"
                  component={<CampaignContainer />}
                />
              }
            />

            {/* ATLAS — atlas settings, voidstone routing */}
            <Route
              path="/atlas"
              element={
                <Page
                  title="Exile Progression - Atlas"
                  component={<AtlasContainer />}
                />
              }
            />

            {/* BUILD — build import, unique items, anoints, pantheon, special mods */}
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

            {/* Legacy edit-route path kept so existing links/bookmarks don't break */}
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
