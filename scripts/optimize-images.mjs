// One-off asset pipeline: converts the hand-made sources in public/img to WebP
// at the sizes the CSS actually renders them, and deletes files nothing links
// to. Run with `npm run optimize:images` after replacing a source image.
// Safe to re-run: already-converted files are skipped and a WebP that is not
// smaller than its source is discarded so the original stays in use.
import { readFile, stat, unlink, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const dir = resolve(root, "public/img");

// Heroes render at 267x400 (max 400 wide), so 400w + 800w covers 1x and 2x.
const responsive = {
  "character.png": [400, 800],
  "character-studio.png": [400, 800]
};

// Rendered small (<=300px) or used as a thumbnail: converting is enough.
const convert = [
  "3dmodel.png", "ai.png", "back.png", "class.png", "edit.png", "front.png",
  "gamedev.png", "git.png", "studio.png",
  "cover-abominapp.png", "cover-arcrevil.png", "cover-bomberman.png", "cover-brawl.png",
  "cover-dont-starve.png", "cover-generator.png", "cover-hash.png", "cover-ourstl.png",
  "cover-porteira.png", "cover-pto.png", "cover-quarto.png", "cover-restyle.png",
  "cover-ruins.png", "cover-simulator.png", "cover-studio.png", "cover-utf.png", "cover-vcmi.png"
];

// Linked directly as a work sample, not rendered in the layout: keep it big
// enough to be readable but cap the width.
const capped = { "quartouniversitario.jpg": { width: 800, quality: 70 } };

// Animations: .abilityPreviewContent is 230px wide, so 240px keeps 1x at the
// rendered size without shipping the source frames at full resolution. WebP
// beats GIF here; a video encode would be smaller but needs ffmpeg.
const animated = { "code.gif": { width: 240, quality: 65 } };

// Superseded or linked by nothing.
const remove = [
  "3drotate.gif", "cover-3d.png", "frontend.png", "gamejam.jpg",
  "code.png", "game.png", "fiorin2.png"
];

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
const exists = (path) => stat(path).then(() => true, () => false);
const remove_ = async (path, label) => {
  try { await unlink(path); return true; }
  catch (error) { console.log(`${label}: could not delete (${error.code}), left in place`); return false; }
};

const saved = { before: 0, after: 0 };

for (const name of remove) {
  const path = resolve(dir, name);
  const info = await stat(path).catch(() => null);
  if (!info) continue;
  if (await remove_(path, name)) console.log(`${name}: deleted (${kb(info.size)})`);
}

for (const [name, widths] of Object.entries(responsive)) {
  const input = resolve(dir, name);
  if (!(await exists(input))) { console.log(`${name}: already converted, skipped`); continue; }
  const info = await stat(input);
  saved.before += info.size;
  for (const width of widths) {
    const target = name.replace(/\.\w+$/, `-${width}.webp`);
    const buffer = await sharp(input, { animated: true }).resize({ width }).webp({ quality: 82 }).toBuffer();
    await writeFile(resolve(dir, target), buffer);
    saved.after += buffer.length;
    console.log(`${name} -> ${target} (${kb(buffer.length)})`);
  }
  if (await remove_(input, name)) console.log(`${name}: source deleted (${kb(info.size)})`);
}

for (const [name, options] of Object.entries(capped)) {
  const input = resolve(dir, name);
  const info = await stat(input).catch(() => null);
  if (!info) { console.log(`${name}: already converted, skipped`); continue; }
  const target = `${name.replace(/\.\w+$/, "")}.webp`;
  const buffer = await sharp(input).resize({ width: options.width, withoutEnlargement: true }).webp({ quality: options.quality }).toBuffer();
  if (buffer.length < info.size) {
    await writeFile(resolve(dir, target), buffer);
    await remove_(input, name);
    saved.before += info.size;
    saved.after += buffer.length;
    console.log(`${name} -> ${target} (${kb(info.size)} -> ${kb(buffer.length)})`);
  } else {
    console.log(`${name}: kept original (webp would be larger)`);
  }
}

for (const [name, options] of Object.entries(animated)) {
  const input = resolve(dir, name);
  const info = await stat(input).catch(() => null);
  if (!info) { console.log(`${name}: already converted, skipped`); continue; }
  const target = `${name.replace(/\.\w+$/, "")}.webp`;
  const buffer = await sharp(input, { animated: true })
    .resize({ width: options.width, withoutEnlargement: true })
    .webp({ quality: options.quality, effort: 6 })
    .toBuffer();
  if (buffer.length >= info.size) {
    console.log(`${name}: kept original (webp ${kb(buffer.length)} vs ${kb(info.size)})`);
    continue;
  }
  await writeFile(resolve(dir, target), buffer);
  await remove_(input, name);
  saved.before += info.size;
  saved.after += buffer.length;
  console.log(`${name} -> ${target} (${kb(info.size)} -> ${kb(buffer.length)})`);
}

for (const name of convert) {
  const input = resolve(dir, name);
  const info = await stat(input).catch(() => null);
  if (!info) { console.log(`${name}: already converted, skipped`); continue; }
  const target = `${name.replace(/\.\w+$/, "")}.webp`;
  const buffer = await sharp(input).webp({ quality: 82, effort: 6 }).toBuffer();
  if (buffer.length >= info.size) {
    console.log(`${name}: kept original (webp ${kb(buffer.length)} vs ${kb(info.size)})`);
    continue;
  }
  await writeFile(resolve(dir, target), buffer);
  await remove_(input, name);
  saved.before += info.size;
  saved.after += buffer.length;
  console.log(`${name} -> ${target} (${kb(info.size)} -> ${kb(buffer.length)})`);
}

console.log(`\nConverted payload: ${kb(saved.before)} -> ${kb(saved.after)} (saved ${kb(saved.before - saved.after)})`);

const manifest = await readFile(resolve(root, "public/site.webmanifest"), "utf8");
if (!manifest.includes("android-chrome-192x192.png")) throw new Error("site.webmanifest no longer points at the PNG icons");
