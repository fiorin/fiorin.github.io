import type { ComponentType } from "react";
import App from "./App";
import NotFoundPage from "./pages/NotFoundPage";

const routes: Record<string, ComponentType> = { "/": App };

export function resolveRoute(pathname: string): ComponentType {
  const path = `/${pathname.replace(/^\/+|\/+$/g, "")}`.replace(/\/index\.html$/, "") || "/";
  return routes[path] ?? NotFoundPage;
}
