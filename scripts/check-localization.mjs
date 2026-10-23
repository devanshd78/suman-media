import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import React from 'react';

const loadDependency = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cache = new Map();
function load(relative) {
  const filename = path.resolve(root, relative);
  if (cache.has(filename)) return cache.get(filename);
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true, resolveJsonModule: true },
  }).outputText;
  vm.runInNewContext(code, {
    exports, Intl,
    require(specifier) {
      if (!specifier.startsWith('.')) return loadDependency(specifier);
      const resolved = path.resolve(path.dirname(filename), specifier);
      return resolved.endsWith('.json') ? loadDependency(resolved) : load(path.relative(root, resolved + '.ts'));
    },
  }, { filename });
  cache.set(filename, exports);
  return exports;
}

const en = JSON.parse(fs.readFileSync(path.join(root, 'messages/en.json'), 'utf8'));
const mr = JSON.parse(fs.readFileSync(path.join(root, 'messages/mr.json'), 'utf8'));
assert.deepEqual(Object.keys(en).sort(), Object.keys(mr).sort());
for (const [key, value] of Object.entries(mr)) {
  assert.ok(value.trim(), `Empty translation: ${key}`);
  assert.ok(!value.includes('\uFFFD'), `Invalid Unicode: ${key}`);
}
const { translateText, graphemes } = load('src/i18n/translate.ts');
assert.equal(translateText('Contact us', 'en'), 'Contact us');
assert.notEqual(translateText('Contact us', 'mr'), 'Contact us');
assert.equal(translateText(' Unknown copy ', 'mr'), ' Unknown copy ');
assert.equal(translateText('Contact us', 'mr', { 'Contact us': 'संपर्क' }), 'संपर्क');
assert.equal(translateText('Knowledge\nAcross Formats.', 'mr'), mr['Knowledge Across Formats.']);
assert.equal(graphemes('क्षेत्र').join(''), 'क्षेत्र');
assert.ok(graphemes('क्षेत्र').length < Array.from('क्षेत्र').length);

const { localizedPath } = load('src/i18n/routing.ts');
assert.equal(localizedPath('/en/about?tab=team#leaders', 'mr'), '/mr/about?tab=team#leaders');
assert.equal(localizedPath('/mr', 'en'), '/en');
for (const href of ['https://example.com', '//example.com', 'mailto:a@example.com', '#roles', '/images/logo.svg', '/api/contact', '/studio']) {
  assert.equal(localizedPath(href, 'mr'), href);
}
const { localizeNode } = load('src/i18n/localize-node.ts');
const handler = () => {};
const source = React.createElement('a', { href: '/about', onClick: handler }, 'Contact us');
const translated = localizeNode(source, 'mr', {});
assert.equal(translated.props.href, '/mr/about');
assert.equal(translated.props.onClick, handler);
assert.notEqual(translated.props.children, 'Contact us');
const input = localizeNode(React.createElement('input', { value: 'Contact us', placeholder: 'Your Name' }), 'mr', {});
assert.equal(input.props.value, 'Contact us');
assert.notEqual(input.props.placeholder, 'Your Name');
const unchanged = React.createElement('span', { translate: 'no' }, 'English');
assert.equal(localizeNode(unchanged, 'mr', {}), unchanged);
console.log(`Localization checks passed: ${Object.keys(mr).length} matching English/Marathi messages, routes, glyphs and React props.`);
