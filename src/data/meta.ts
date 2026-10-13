export type RouteMeta = {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  /** Hero basename under /img; the matching 400w/800w pair is preloaded. */
  hero?: string;
  /** Routes that render "Ink Free", so the font is worth preloading. */
  inkFont?: boolean;
};

// Single source of truth for per-route head tags: the pages feed these to <Seo>
// on the client and scripts/build-pages.mjs bakes them into the static HTML.
// "/resume" lives in resumeMeta.ts so the 13 kB resume.json stays out of the
// chunk every route loads.
export const routeMeta: Record<string, RouteMeta> = {
  "/": {
    title: "Fior.in — Software developer, designer and educator",
    description: "Fiorin is a software developer, designer and educator. Code, front-end, 3D, game development and teaching.",
    canonical: "https://fior.in/",
    hero: "character",
    inkFont: true
  },
  "/games": {
    title: "Fiorin Games Studio — Board game studio",
    description: "Fiorin Games Studio designs board games and builds the tools and prototypes behind them.",
    canonical: "https://fior.in/games",
    hero: "character-studio",
    inkFont: true
  },
  "/404": {
    title: "Page not found — Fior.in",
    description: "The requested Fior.in page could not be found.",
    canonical: "https://fior.in/404"
  }
};

export const heroSizes = "267px";
export const heroSrc = (name: string) => `/img/${name}-400.webp`;
export const heroSrcSet = (name: string) => `/img/${name}-400.webp 400w, /img/${name}-800.webp 800w`;
