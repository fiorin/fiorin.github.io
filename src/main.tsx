import { StrictMode, Suspense } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { resolveRoute } from "./routes";
import "../css/style.css";

const Page = resolveRoute(window.location.pathname);
const container = document.getElementById("root");
if (!container) throw new Error("React root element was not found");
const tree = <StrictMode><Suspense fallback={<main className="pageContent"><h1 className="resumeName">Loading…</h1></main>}><Page /></Suspense></StrictMode>;
if (container.hasChildNodes()) hydrateRoot(container, tree);
else createRoot(container).render(tree);
