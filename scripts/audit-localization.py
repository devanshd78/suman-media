"""Audit published Marathi HTML, metadata and accessible labels.
Run against a running app: python scripts/audit-localization.py [http://localhost:3000]
Only proper names, contact identifiers and documented technical terms are exempt.
"""
import concurrent.futures
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from urllib.parse import urlparse

BASE = (sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:3000').rstrip('/')
ALLOWED = set('''Google Play App Store Automation Anywhere ABP AWS BMW BS Facebook Festival de Cannes Google Instagram Laminar LinkedIn Messenger The print YouTube Zee Marathi abhijat-marathi apple brut he tribune lokmatfilmy sakath AntiMatter CSS React TypeScript Mac D Atlassian Attentive Calendly Dropbox Mailchimp Razorpay AVOD SVOD TVOD AI AdSense DOC DOCX JSON MCN NOWT PDF application json'''.lower().split())

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.skip = 0
        self.items = []
        self.links = set()
        self.locale = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'html': self.locale = attrs.get('lang')
        if tag in ('script', 'style', 'svg'): self.skip += 1
        if self.skip: return
        if tag == 'a' and attrs.get('href', '').startswith('/mr/news-and-blogs/'):
            self.links.add(urlparse(attrs['href']).path)
        for name in ('alt', 'title', 'placeholder', 'aria-label', 'aria-description'):
            if attrs.get(name): self.items.append((name, attrs[name]))
        if tag == 'meta' and (attrs.get('name') in ('description', 'twitter:title', 'twitter:description') or attrs.get('property') in ('og:title', 'og:description', 'og:image:alt', 'og:site_name')):
            self.items.append(('metadata', attrs.get('content', '')))

    def handle_endtag(self, tag):
        if tag in ('script', 'style', 'svg'): self.skip = max(0, self.skip - 1)

    def handle_data(self, value):
        if not self.skip:
            value = re.sub(r'\s+', ' ', value).strip()
            if value: self.items.append(('text', value))


def fetch(path):
    with urllib.request.urlopen(BASE + path, timeout=90) as response:
        return response.read().decode('utf-8')


def remaining_words(value):
    value = re.sub(r'\d+[Xx]+', '', value)
    value = re.sub(r'https?://\S+|[\w.+-]+@[\w.-]+|@[\w.-]+', '', value)
    return sorted(set(word for word in re.findall(r'[A-Za-z][A-Za-z-]*', value) if len(word) > 1 and word.lower() not in ALLOWED))


def inspect(path):
    try:
        page = Page()
        html = fetch(path)
        page.feed(html)
        issues = [{'kind': kind, 'text': value, 'words': remaining_words(value)} for kind, value in set(page.items) if remaining_words(value)]
        if 'TranslationProvider is required for website content' in html:
            issues.append({'kind': 'render', 'text': 'Translation provider failed during server rendering'})
        if page.locale != 'mr': issues.append({'kind': 'locale', 'text': str(page.locale)})
        return {'path': path, 'issues': issues}
    except Exception as error:
        return {'path': path, 'issues': [{'kind': 'request', 'text': str(error)}]}


def main():
    xml = ET.fromstring(fetch('/sitemap.xml'))
    paths = {urlparse(entry.text).path for entry in xml.iter() if entry.tag.endswith('loc') and entry.text and urlparse(entry.text).path.startswith('/mr')}
    news = Page()
    news.feed(fetch('/mr/news-and-blogs'))
    paths.update(news.links)
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        results = list(pool.map(inspect, sorted(paths)))
    failures = [result for result in results if result['issues']]
    print(json.dumps({'pages': len(results), 'passed': len(results) - len(failures), 'failures': failures}, ensure_ascii=False, indent=2))
    return bool(failures)

if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    sys.exit(main())
