import Loading from "@/components/Loading/Loading";
import { Suspense, lazy } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

const LandingPage = lazy(() => import("@/Pages/LandingPage/LandingPage"));
const NotFoundPage = lazy(() => import("@/Pages/NotFound/NotFound"));
const DashboardPage = lazy(() => import("@/Pages/Dashboard/Dashboard"));

function CustomRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoutes>
                <DashboardPage />
              </ProtectedRoutes>
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default CustomRoutes;
