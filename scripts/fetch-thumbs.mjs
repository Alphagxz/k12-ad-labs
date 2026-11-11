/**
 * Runs before every build (npm "prebuild").
 * For each Google Drive video referenced in src/config/portfolio.ts it
 * saves Drive's own preview frame to public/thumbs/<fileId>.jpg and
 * records its size, so the site serves real, self-hosted thumbnails
 * and frames each film at its true aspect ratio.
 *
 * To use a custom thumbnail, commit your own public/thumbs/<fileId>.jpg
 * (it is never overwritten) or set `thumbnailUrl` on the project.
 * This script never fails the build: a film without a frame simply
 * gets the designed poster card instead.
 */
import { readFile, writeFile, mkdir, access } from "node:fs/promises";

const CONFIG = "src/config/portfolio.ts";
const OUT_DIR = "public/thumbs";
const MANIFEST = "src/config/thumbs.generated.json";

function jpegSize(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) { i++; continue; }
    const m = buf[i + 1];
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}
function pngSize(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

const src = await readFile(CONFIG, "utf8");
const ids = [...new Set([...src.matchAll(/drive\("([\w-]{20,})"\)/g), ...src.matchAll(/\/file\/d\/([\w-]{20,})/g)].map((m) => m[1]))];
await mkdir(OUT_DIR, { recursive: true });
const manifest = {};

await Promise.all(ids.map(async (id) => {
  const file = `${OUT_DIR}/${id}.jpg`;
  try {
    let buf;
    try {
      await access(file);
      buf = await readFile(file); // committed / custom thumbnail wins
    } catch {
      const res = await fetch(`https://drive.google.com/thumbnail?id=${id}&sz=w1280`, { redirect: "follow", signal: AbortSignal.timeout(25000) });
      if (!res.ok || !(res.headers.get("content-type") || "").startsWith("image/")) throw new Error(`HTTP ${res.status}`);
      buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 3000) throw new Error("image too small");
      await writeFile(file, buf);
    }
    const size = jpegSize(buf) ?? pngSize(buf);
    manifest[id] = { src: `/thumbs/${id}.jpg`, ...(size ?? {}) };
    console.log(`thumb ok   ${id} ${size ? `${size.w}x${size.h}` : ""}`);
  } catch (e) {
    console.log(`thumb skip ${id} (${e.message})`);
  }
}));

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`thumbnails: ${Object.keys(manifest).length}/${ids.length} saved`);
