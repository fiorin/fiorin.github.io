import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync as exists } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const dist = resolve(projectRoot, "dist");
const staticDir = resolve(projectRoot, "static");

await rm(staticDir, { recursive: true, force: true });
await mkdir(staticDir, { recursive: true });
await cp(dist, staticDir, { recursive: true });

// Make the copied entry point usable when opened directly with file://.
// Browsers block external JavaScript modules from local HTML files, so inline
// the generated JavaScript and CSS and make local asset URLs relative.
const entryHtml = await readFile(resolve(dist, "index.html"), "utf8");
const scriptMatch = entryHtml.match(/<script type="module"[^>]+src="([^"]+)"[^>]*><\/script>/);
const styleMatch = entryHtml.match(/<link rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/);

if (!scriptMatch || !styleMatch) {
  throw new Error("Could not find the generated JavaScript or CSS entry point.");
}

let javascript = await readFile(resolve(dist, scriptMatch[1].replace(/^\//, "")), "utf8");
let stylesheet = await readFile(resolve(dist, styleMatch[1].replace(/^\//, "")), "utf8");

javascript = javascript
  .replaceAll("/img/", "./img/")
  .replaceAll("window.location.pathname", '"/"')
  .replaceAll("href:`/`", "href:`./`")
  // Prevent the HTML parser from closing the inline script early.
  .replaceAll("</script", "<\\/script");
javascript = `window.addEventListener("DOMContentLoaded", () => {\n${javascript}\n});`;
stylesheet = stylesheet.replaceAll("url(/assets/", "url(./assets/");

function inline(html) {
  return html
    .replace(/<script type="module"[^>]+src="[^"]+"[^>]*><\/script>/, () => `<script defer>${javascript}</script>`)
    .replace(/<link rel="stylesheet"[^>]+href="[^"]+"[^>]*>/, () => `<style>${stylesheet}</style>`)
    .replaceAll('href="/site.webmanifest"', 'href="./site.webmanifest"')
    .replaceAll('href="/llms.txt"', 'href="./llms.txt"')
    .replaceAll('href="/AGENTS.md"', 'href="./AGENTS.md"')
    .replaceAll('href="/resume.json"', 'href="./resume.json"');
}

// The entry point resolves routes from "/" only, so every prerendered route and
// the SPA fallback get the same treatment as index.html.
const pages = ["index.html", "404.html"];
for (const entry of await readdir(dist, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const candidate = `${entry.name}/index.html`;
  if (await exists(resolve(dist, candidate))) pages.push(candidate);
}

for (const page of pages) {
  const html = await readFile(resolve(dist, page), "utf8");
  await writeFile(resolve(staticDir, page), inline(html), "utf8");
}

console.log(`Static site copied to ${staticDir} (${pages.length} pages)`);
