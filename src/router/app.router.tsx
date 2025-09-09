import { HomePage } from "../heroes/home/HomePage";
import { HeroPage } from "../heroes/pages/HeroPage";
import { AdminPage } from "../admin/pages/AdminPage";
import { AdminLayout } from "../admin/layouts/AdminLayout";
import { createBrowserRouter, Navigate } from "react-router";
import { HeroesLayout } from "../heroes/layouts/HeroesLayout";
import { lazy } from "react";

// importación perezosa
const SearchPage = lazy(() => import("../heroes/search/SearchPage"));

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "heroes/:idSlug",
        element: <HeroPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
]);
