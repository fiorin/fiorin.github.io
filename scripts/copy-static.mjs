import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
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
let html = await readFile(resolve(dist, "index.html"), "utf8");
const scriptMatch = html.match(/<script type="module"[^>]+src="([^"]+)"[^>]*><\/script>/);
const styleMatch = html.match(/<link rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/);

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
html = html
  .replace(/<script type="module"[^>]+src="[^"]+"[^>]*><\/script>/, () => `<script defer>${javascript}</script>`)
  .replace(/<link rel="stylesheet"[^>]+href="[^"]+"[^>]*>/, () => `<style>${stylesheet}</style>`)
  .replace('href="/site.webmanifest"', 'href="./site.webmanifest"');

await writeFile(resolve(staticDir, "index.html"), html, "utf8");

console.log(`Static site copied to ${staticDir}`);
