import assert from 'node:assert/strict';
import fs from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:3008';
const aliases = JSON.parse(fs.readFileSync('src/config/legacy-path-redirects.json', 'utf8'));
let checked = 0;
for (const [source, destination] of Object.entries(aliases)) {
  const asset = /^\/(images|videos|cannes)\//.test(destination);
  for (const locale of asset ? [''] : ['', '/en', '/mr']) {
    const response = await fetch(`${base}${locale}${source}?audit=1`, { redirect: 'manual' });
    assert.equal(response.status, 308, `Expected permanent redirect: ${locale}${source}`);
    const target = new URL(destination, base);
    const location = new URL(response.headers.get('location'), base);
    const expected = `${asset ? '' : locale || '/mr'}${target.pathname}`;
    // Older next.config redirects run before the locale proxy.
    if (!asset && !locale && location.pathname === target.pathname) {
      const localized = await fetch(location, { redirect: 'manual' });
      assert.ok([307, 308].includes(localized.status), `Missing locale redirect: ${source}`);
      assert.equal(new URL(localized.headers.get('location'), base).pathname, expected, source);
      await localized.body?.cancel();
    } else assert.equal(location.pathname, expected, source);
    assert.equal(location.search, target.search || '?audit=1', `Query lost: ${source}`);
    assert.equal(location.hash, target.hash, `Anchor lost: ${source}`);
    checked++;
    await response.body?.cancel();
  }
}
console.log(`HTTP redirect checks passed: ${checked} permanent redirects, locale and query preservation.`);
