import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const dist = resolve(projectRoot, "dist");

// Static routes to prerender. GitHub Pages has no server-side rewrite, so each
// route needs its own index.html to answer with 200 instead of 404.
const routes = ["/resume"];

const projectKeys = ["cover", "year", "color", "title", "description", "tags", "href", "icon", "external"];

function validateProjects(data) {
  if (!Array.isArray(data)) throw new Error("projects.json must contain an array");
  for (const item of data) {
    const unknown = Object.keys(item).filter((key) => !projectKeys.includes(key));
    if (unknown.length) throw new Error(`projects.json: unknown field(s) ${unknown.join(", ")} in "${item.title ?? "?"}"`);
    for (const key of ["cover", "year", "color", "title", "description", "href"]) {
      if (typeof item[key] !== "string") throw new Error(`projects.json: "${key}" must be a string in "${item.title ?? "?"}"`);
    }
    if (!Array.isArray(item.tags) || item.tags.some((tag) => typeof tag !== "string")) {
      throw new Error(`projects.json: "tags" must be an array of strings in "${item.title ?? "?"}"`);
    }
    if (!["external", "link", "search"].includes(item.icon)) {
      throw new Error(`projects.json: invalid icon "${item.icon}" in "${item.title ?? "?"}"`);
    }
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
  if (source.endsWith("projects.json")) validateProjects(data);
  await mkdir(dirname(resolve(dist, target)), { recursive: true });
  await writeFile(resolve(dist, target), `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`Published ${target}`);
}

await publish("src/data/projects.json", "projects.json");
await publish("src/data/resume.json", "resume.json");

const indexHtml = await readFile(resolve(dist, "index.html"), "utf8");
for (const route of routes) {
  await mkdir(resolve(dist, route.slice(1)), { recursive: true });
  await writeFile(resolve(dist, route.slice(1), "index.html"), indexHtml, "utf8");
  console.log(`Prerendered ${route}`);
}

// Lets client-side routing and unknown paths boot the app instead of showing
// GitHub's bare 404 page.
await cp(resolve(dist, "index.html"), resolve(dist, "404.html"));
console.log("Prerendered /404.html");
