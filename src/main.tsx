import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { resolveRoute } from "./routes";
import "../css/style.css";

const Page = resolveRoute(window.location.pathname);
const root = document.getElementById("root");
if (!root) throw new Error("React root element was not found");
createRoot(root).render(<StrictMode><Page /></StrictMode>);
