import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const pages = JSON.parse(fs.readFileSync("src/config/website-pages.json", "utf8"));
const redirects = JSON.parse(fs.readFileSync("src/config/legacy-path-redirects.json", "utf8"));
const seen = new Set();
for (const page of Object.values(pages)) {
  assert.ok(!seen.has(page.path), `Duplicate canonical route: ${page.path}`);
  seen.add(page.path);
  assert.ok(fs.existsSync(path.join("src/app/(website)/[locale]", page.path, "page.tsx")), `Missing page: ${page.path}`);
  for (const alias of page.aliases) assert.equal(redirects[alias], page.path, `Missing permanent alias: ${alias}`);
}
for (const source of Object.keys(redirects)) {
  const visited = new Set(); let current = source;
  while (redirects[current]) {
    assert.ok(!visited.has(current), `Redirect loop: ${source}`);
    visited.add(current); current = redirects[current].split(/[?#]/)[0];
  }
  if (!/^\/(images|videos|cannes)\//.test(current)) assert.ok(seen.has(current), `Redirect has no page: ${source} -> ${current}`);
}
console.log(`Route checks passed: ${seen.size} canonical pages and ${Object.keys(redirects).length} loop-free legacy aliases.`);
