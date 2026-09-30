import type { ComponentType } from "react";
import { lazy } from "react";
import App from "./App";
import NotFoundPage from "./pages/NotFoundPage";

// resume.json is ~13 kB of work history, so it is kept out of the chunk every
// page loads and only fetched when /resume is requested.
const ResumePage = lazy(() => import("./pages/ResumePage"));

const routes: Record<string, ComponentType> = { "/": App, "/resume": ResumePage };

export function resolveRoute(pathname: string): ComponentType {
  const path = `/${pathname.replace(/^\/+|\/+$/g, "")}`.replace(/\/index\.html$/, "") || "/";
  return routes[path] ?? NotFoundPage;
}
