import { createHash } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const redirects = JSON.parse(await readFile(path.join(root, "src/config/legacy-path-redirects.json"), "utf8"));
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? files(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}
const media = (await files(path.join(root, "public"))).filter(file => /\.(png|jpe?g|webp|avif|gif|svg|mp4|webm|mov)$/i.test(file));
const hashes = new Map();
const errors = [];
for (const file of media) {
  const hash = createHash("sha256").update(await readFile(file)).digest("hex");
  if (hashes.has(hash)) errors.push(`Duplicate: ${path.relative(root, file)} = ${path.relative(root, hashes.get(hash))}`);
  else hashes.set(hash, file);
}
const urls = new Map();
for (const file of await files(path.join(root, "src"))) {
  if (!/\.(tsx?|css)$/.test(file) || path.basename(file).startsWith("._")) continue;
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(/["'`]((?:\/(?:images|videos|cannes)\/)[^"'`\r\n]+)["'`]/g)) {
    if (!match[1].includes("${") && /\.[a-z0-9]+$/i.test(match[1])) urls.set(match[1], path.relative(root, file));
  }
}
for (const [url, file] of urls) {
  let target = url;
  const visited = new Set();
  while (redirects[target]) {
    if (visited.has(target)) { errors.push(`Redirect loop: ${url}`); break; }
    visited.add(target);
    target = redirects[target];
  }
  try { await stat(path.join(root, "public", decodeURIComponent(target))); }
  catch { errors.push(`Missing: ${url} (${file})`); }
}
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(`Media checks passed: ${media.length} unique assets, ${urls.size} source URLs resolve.`);
