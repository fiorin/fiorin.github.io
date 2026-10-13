import resume from "./resume.json";
import type { RouteMeta } from "./meta";

// Kept apart from meta.ts: this pulls in the 13 kB resume.json, and only the
// /resume route (plus the build script) ever needs it.
export const resumeMeta: RouteMeta = {
  title: `${resume.basics.name} — ${resume.basics.label}`,
  description: `${resume.basics.label} in ${resume.basics.location.city}, Brazil. ${resume.basics.summary.slice(0, 150)}`,
  canonical: "https://fior.in/resume"
};
