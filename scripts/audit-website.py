"""Read-only route/link audit. Usage: python scripts/audit-website.py http://localhost:3000"""
import concurrent.futures
import json
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote

BASE = (sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:3000').rstrip('/')

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.ids = set(), set()
        self.lang = self.canonical = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'): self.ids.add(a['id'])
        if tag == 'html': self.lang = a.get('lang')
        if tag == 'a' and a.get('href'): self.links.add(a['href'])
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href')

def fetch(path):
    try:
        with urllib.request.urlopen(BASE + path, timeout=90) as response:
            html = response.read().decode('utf-8')
            page = Page(); page.feed(html)
            return path, (response.status, urlparse(response.url).path, page, html)
    except Exception as error:
        return path, (getattr(error, 'code', 0), path, None, str(error))

def main():
    sitemap = ET.fromstring(urllib.request.urlopen(BASE + '/sitemap.xml', timeout=90).read())
    paths = {urlparse(n.text).path for n in sitemap.findall('{*}url/{*}loc')}
    results, sources = {}, {}
    for _ in range(3):
        pending = sorted(paths - results.keys())
        if not pending: break
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            results.update(pool.map(fetch, pending))
        for path in pending:
            page = results[path][2]
            if not page: continue
            for href in page.links:
                target = urlparse(urljoin(BASE + path, href))
                if target.netloc != urlparse(BASE).netloc or not target.path.startswith(('/en', '/mr')): continue
                paths.add(target.path)
                sources.setdefault(target.path, set()).add(path)
    failures = []
    for path, (status, final, page, html) in results.items():
        if status != 200 or not page:
            failures.append({'path': path, 'status': status, 'linked_from': sorted(sources.get(path, []))}); continue
        locale = path.split('/')[1]
        if page.lang != locale: failures.append({'path': path, 'wrong_language': page.lang})
        if 'TranslationProvider is required' in html: failures.append({'path': path, 'provider_error': True})
        if page.canonical and urlparse(page.canonical).path.rstrip('/') != final.rstrip('/'):
            failures.append({'path': path, 'wrong_canonical': page.canonical, 'final': final})
        for href in page.links:
            target = urlparse(urljoin(BASE + path, href))
            if target.netloc != urlparse(BASE).netloc or not target.fragment: continue
            destination = results.get(target.path)
            if destination and destination[2] and unquote(target.fragment) not in destination[2].ids:
                failures.append({'path': path, 'missing_anchor': href})
    report = {'pages_checked': len(results), 'failures': failures}
    output = Path('reports/website-route-audit.json'); output.parent.mkdir(exist_ok=True)
    output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(report, ensure_ascii=True, indent=2))
    return bool(failures)

if __name__ == '__main__': sys.exit(main())
