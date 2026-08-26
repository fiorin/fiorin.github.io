import { readFileSync } from "node:fs";

const files = ["src/App.tsx", "src/components/ProjectPage.tsx", "src/pages/ContentPage.tsx", "src/pages/NotFoundPage.tsx"];
const sources = files.map((file) => [file, readFileSync(file, "utf8")]);
const errors = [];

for (const [file, source] of sources) {
  for (const tag of source.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt\s*=/.test(tag[0])) errors.push(`${file}: image is missing alt text`);
    if (!/\b(width|height)\s*=/.test(tag[0])) errors.push(`${file}: image is missing dimensions`);
  }
  for (const tag of source.matchAll(/<a\b[^>]*>/g)) {
    if (!/\bhref\s*=/.test(tag[0])) errors.push(`${file}: anchor is missing href`);
  }
  const headings = [...source.matchAll(/<h([1-6])\b/g)].map((match) => match[1]);
  if (file.includes("App") && headings.filter((level) => level === "1").length !== 1) errors.push(`${file}: expected exactly one h1`);
}

const css = readFileSync("css/style.css", "utf8");
if (!/\.sectionTitle\{[^}]*color:\s*#fff/i.test(css) || !/\.abilityContent\{[^}]*color:\s*#aaa/i.test(css)) errors.push("css/style.css: expected foreground color declarations for contrast review");
if (!/html\{scroll-behavior:smooth/.test(css)) errors.push("css/style.css: smooth keyboard/menu scrolling is missing");

if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Accessibility source checks passed for ${files.length} route/component files.`);
