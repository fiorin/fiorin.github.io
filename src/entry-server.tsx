import type { ComponentType } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import ResumePage from "./pages/ResumePage";
import StudioPage from "./pages/StudioPage";
import NotFoundPage from "./pages/NotFoundPage";

// Rendered eagerly (no lazy/Suspense) so every route produces complete static
// HTML for scripts/build-pages.mjs. The client hydrates this markup.
const pages: Record<string, ComponentType> = { "/": App, "/resume": ResumePage, "/games": StudioPage };

export function render(pathname: string) {
  const Page = pages[pathname] ?? NotFoundPage;
  return renderToString(<Page />);
}
