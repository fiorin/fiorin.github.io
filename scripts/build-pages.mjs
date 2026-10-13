import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const dist = resolve(projectRoot, "dist");

// Every route gets its own prerendered index.html: GitHub Pages has no
// server-side rewrite, so a file per route is what answers with 200, and the
// HTML is already complete before any JavaScript runs.
const pageRoutes = ["/", "/resume", "/games", "/404"];

// Route -> lazy chunk prefix, so the route's own chunk is fetched alongside the
// entry script instead of after hydration suspends on it.
const routeChunks = { "/resume": "ResumePage", "/games": "StudioPage" };

const projectKeys = ["cover", "year", "color", "title", "description", "tags", "href", "icon", "external"];

function validateProjects(data, label = "projects.json") {
  if (!Array.isArray(data)) throw new Error(`${label} must contain an array`);
  const covers = new Set();
  for (const item of data) {
    const unknown = Object.keys(item).filter((key) => !projectKeys.includes(key));
    if (unknown.length) throw new Error(`${label}: unknown field(s) ${unknown.join(", ")} in "${item.title ?? "?"}"`);
    for (const key of ["cover", "year", "color", "title", "description", "href"]) {
      if (typeof item[key] !== "string") throw new Error(`${label}: "${key}" must be a string in "${item.title ?? "?"}"`);
    }
    if (!Array.isArray(item.tags) || item.tags.some((tag) => typeof tag !== "string")) {
      throw new Error(`${label}: "tags" must be an array of strings in "${item.title ?? "?"}"`);
    }
    if (!["external", "link", "search"].includes(item.icon)) {
      throw new Error(`${label}: invalid icon "${item.icon}" in "${item.title ?? "?"}"`);
    }
    // Covers double as the rendered list key, so they have to stay unique.
    if (covers.has(item.cover)) throw new Error(`${label}: duplicate cover "${item.cover}"`);
    covers.add(item.cover);
  }
}

async function publish(source, target) {
  const raw = await readFile(resolve(projectRoot, source), "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error(`${source} is not valid JSON`);
  }
  if (source.endsWith("projects.json") || source.endsWith("games.json")) {
    validateProjects(data, target);
  }
  await mkdir(dirname(resolve(dist, target)), { recursive: true });
  await writeFile(resolve(dist, target), `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`Published ${target}`);
  return data;
}

const projects = await publish("src/data/projects.json", "projects.json");
const resume = await publish("src/data/resume.json", "resume.json");
const games = await publish("src/data/games.json", "games.json");

const absoluteUrl = (href) => href === "#" ? "https://fior.in/games" : href.startsWith("/") ? `https://fior.in${href}` : href;
const llmsItem = (item) => {
  const destination = item.href === "#" ? "" : ` — ${absoluteUrl(item.href)}`;
  return `- ${item.title} (${item.year}): ${item.description}${destination}`;
};
const llmsTemplate = await readFile(resolve(projectRoot, "public/llms.txt"), "utf8");
const llms = llmsTemplate
  .replace("<!-- llms:games -->", games.map(llmsItem).join("\n"))
  .replace("<!-- llms:projects -->", projects.map(llmsItem).join("\n"))
  .replace("<!-- llms:updated -->", `_Last updated: ${new Date().toISOString().slice(0, 10)}._`);
if (llms.includes("<!-- llms:")) throw new Error("public/llms.txt has an unfilled generation marker");
await writeFile(resolve(dist, "llms.txt"), llms, "utf8");
console.log("Generated llms.txt from projects.json and games.json");

const escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Regenerated from the same data the page renders, so the structured data can
// not drift away from projects.json/resume.json again.
function structuredData() {
  const basics = resume.basics;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://fior.in/#person",
        name: basics.name,
        url: "https://fior.in/",
        image: "https://fior.in/img/fiorin.png",
        jobTitle: basics.label,
        knowsAbout: [...new Set(resume.skills.flatMap((group) => group.keywords))],
        sameAs: basics.profiles.map((profile) => profile.url)
      },
      { "@type": "WebSite", "@id": "https://fior.in/#website", url: "https://fior.in/", name: "Fior.in", publisher: { "@id": "https://fior.in/#person" } },
      {
        "@type": "ItemList",
        "@id": "https://fior.in/#projects",
        name: `${basics.name}'s projects`,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { "@type": "CreativeWork", name: project.title, description: project.description, url: absoluteUrl(project.href), dateCreated: project.year }
        }))
      }
    ]
  };
}

function headPatch(html, meta, jsonLd) {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const canonical = escapeHtml(meta.canonical);
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<script type="application\/ld\+json">)[\s\S]*?(<\/script>)/, `$1\n      ${jsonLd}\n    $2`);
}

function preloadTags(meta, chunk) {
  const tags = [];
  if (meta.hero) {
    tags.push(`<link rel="preload" as="image" href="/img/${meta.hero}-800.webp" imagesrcset="/img/${meta.hero}-400.webp 400w, /img/${meta.hero}-800.webp 800w" imagesizes="267px" fetchpriority="high" />`);
  }
  if (meta.inkFont) {
    tags.push(`<link rel="preload" as="font" type="font/woff2" href="/fonts/ink-free.woff2" crossorigin />`);
  }
  if (chunk) {
    tags.push(`<link rel="modulepreload" crossorigin href="/assets/${chunk}" />`);
  }
  return tags;
}

const indexHtml = await readFile(resolve(dist, "index.html"), "utf8");
const assetFiles = await readdir(resolve(dist, "assets"));
const jsonLd = JSON.stringify(structuredData()).replace(/</g, "\\u003c");

const vite = await createServer({
  root: projectRoot,
  configFile: resolve(projectRoot, "vite.config.js"),
  appType: "custom",
  logLevel: "warn",
  server: { middlewareMode: true }
});

const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
const { routeMeta: staticMeta } = await vite.ssrLoadModule("/src/data/meta.ts");
const { resumeMeta } = await vite.ssrLoadModule("/src/data/resumeMeta.ts");
const routeMeta = { ...staticMeta, "/resume": resumeMeta };

for (const route of pageRoutes) {
  const meta = routeMeta[route];
  if (!meta) throw new Error(`scripts/build-pages.mjs: no routeMeta entry for ${route}`);
  let html = headPatch(indexHtml, meta, jsonLd);
  const chunk = routeChunks[route] ? assetFiles.find((file) => file.startsWith(`${routeChunks[route]}-`) && file.endsWith(".js")) : undefined;
  if (routeChunks[route] && !chunk) throw new Error(`scripts/build-pages.mjs: no chunk found for ${route}`);
  const tags = preloadTags(meta, chunk);
  if (tags.length) html = html.replace("</head>", `    ${tags.join("\n    ")}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);
  const target = route === "/" ? resolve(dist, "index.html") : route === "/404" ? resolve(dist, "404.html") : resolve(dist, route.slice(1), "index.html");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
  console.log(`Prerendered ${route} -> ${target.slice(projectRoot.length + 1)}`);
}

await vite.close();
