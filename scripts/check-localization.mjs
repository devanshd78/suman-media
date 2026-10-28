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
    exports, Intl, URL,
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
const loadingSource = fs.readFileSync(path.join(root, 'src/components/states/site-loading-screen.tsx'), 'utf8');
const loadingCopy = Array.from(loadingSource.matchAll(/(?:year|quote):\s*"([^"]+)"/g), match => match[1]);
assert.equal(loadingCopy.length, 10, 'Every loading quote must have a historical heading');
for (const phrase of [...loadingCopy, 'Loading', 'Loading page']) {
  assert.notEqual(translateText(phrase, 'mr'), phrase, `Untranslated loading copy: ${phrase}`);
  assert.equal(translateText(phrase, 'en'), phrase);
}
assert.equal(new Intl.NumberFormat('mr-IN', { useGrouping: false, minimumIntegerDigits: 3 }).format(94), '०९४');
assert.equal(translateText('Contact us', 'en'), 'Contact us');
assert.notEqual(translateText('Contact us', 'mr'), 'Contact us');
assert.equal(translateText(' Unknown copy ', 'mr'), ' Unknown copy ');
assert.equal(translateText('Contact us', 'mr', { 'Contact us': 'संपर्क' }), 'संपर्क');
assert.equal(translateText('Knowledge\nAcross Formats.', 'mr'), mr['Knowledge Across Formats.']);
assert.equal(graphemes('क्षेत्र').join(''), 'क्षेत्र');
assert.ok(graphemes('क्षेत्र').length < Array.from('क्षेत्र').length);

// Regression cases from the rendered-page audit: CMS copy and composed labels.
for (const phrase of [
  'Loading page',
  'Loading',
  '1913 — Indian Cinema Begins',
  'Companies',
  "Have Content? Let's Find Its Revenue Model.",
  'Enterprise technology partner.',
  'Concerts, cultural festivals, corporate events, launches, experiential marketing and public engagement.',
  'Film, web series, OTT originals, documentaries, branded content, corporate films and podcasts.',
  'Learn more about Cultural Documentation',
  'Open Investor Relations',
  'Show Music recording session',
  'Play Abhijat Marathi OTT YouTube video 3',
  'Contact us: Start a conversation with our team.',
  'Contact as investor: Explore investment opportunities and learn more about Suman Media\uFFFDs growth journey.',
  'Beyond the Frame (2026 Feature Film)',
]) {
  assert.ok(!/[a-z]{3}/i.test(translateText(phrase, 'mr')), `Untranslated public copy: ${phrase}`);
  assert.equal(translateText(phrase, 'en'), phrase);
}
assert.equal(translateText('Music category 3', 'mr'), 'संगीत प्रकार ३');
assert.equal(translateText('Show image 2', 'mr'), 'चित्र २ पाहा');
assert.equal(translateText('Culture highlight 2 of 4', 'mr'), 'कार्यसंस्कृतीतील क्षण २, एकूण ४');
assert.equal(translateText('Play Featured video 2', 'mr'), 'निवडक व्हिडिओ २ पाहा');
assert.equal(translateText('Public Awareness Campaign content', 'mr'), 'जनजागृती मोहीम आशय');

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
// Cover conditional cards, testimonials and FAQ answers, including items not
// present in the initial server-rendered HTML.
const marketingFile = 'src/app/(website)/[locale]/services/digital-marketing-communication/page.tsx';
const marketingSource = ts.createSourceFile(marketingFile, fs.readFileSync(path.join(root, marketingFile), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const marketingFields = new Set(['title', 'description', 'quote', 'name', 'role', 'question', 'answer', 'category']);
let marketingMessages = 0;
function checkMarketingCopy(node) {
  if (ts.isPropertyAssignment(node) && marketingFields.has(node.name.getText(marketingSource)) && ts.isStringLiteral(node.initializer)) {
    const value = node.initializer.text;
    assert.notEqual(translateText(value, 'mr'), value, `Untranslated marketing content: ${value}`);
    assert.equal(translateText(value, 'en'), value);
    marketingMessages++;
  }
  ts.forEachChild(node, checkMarketingCopy);
}
checkMarketingCopy(marketingSource);
assert.ok(marketingMessages >= 60, 'Marketing page data must be included in the translation audit');
for (const value of ['Digital Marketing Communication', 'Digital Marketing & Communications', 'Communication Across', 'Every Touchpoint.', 'Strategy & Communication Philosophy', 'Partner Brand Logos', 'Client Testimonials', 'Collapse Digital Outreach Programs']) {
  assert.notEqual(translateText(value, 'mr'), value, `Untranslated marketing label: ${value}`);
}
console.log(`Localization checks passed: ${Object.keys(mr).length} matching English/Marathi messages, routes, glyphs and React props.`);

const { industryDestination } = load('src/config/website-routes.ts');
assert.equal(localizedPath('/services', 'en'), '/en#capabilities');
assert.equal(localizedPath('/#capabilities', 'mr'), '/mr#capabilities');
assert.equal(localizedPath('/services?industry=brands', 'en'), '/en' + industryDestination('brands'));
