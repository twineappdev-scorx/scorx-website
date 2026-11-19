#!/usr/bin/env python3
"""Internal link check over a built Jekyll site.

Usage: python3 documentation/handoff/check_links.py [site_dir]   (default: _site)
Every href/src/srcset URL that is root-relative (/x) or relative (x, ../x) must resolve to a
file in the site dir (directories resolve to index.html). External URLs, mailto:, tel:, data:,
javascript: and pure #fragments are ignored; #fragments on internal pages are checked against
the target page's ids.
"""
import os
import re
import sys
from html.parser import HTMLParser
from urllib.parse import unquote, urldefrag, urlparse

SITE = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else "_site")


class Links(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links = []
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"):
            self.ids.add(a["id"])
        if tag == "a" and a.get("name"):
            self.ids.add(a["name"])
        for k in ("href", "src"):
            if a.get(k):
                self.links.append((tag, a[k]))
        if a.get("srcset"):
            for part in a["srcset"].split(","):
                if part.strip():
                    self.links.append((tag, part.strip().split()[0]))


def resolve(base_file, url):
    path = unquote(urlparse(url).path)
    if path.startswith("/"):
        target = os.path.join(SITE, path.lstrip("/"))
    else:
        target = os.path.normpath(os.path.join(os.path.dirname(base_file), path))
    if os.path.isdir(target):
        target = os.path.join(target, "index.html")
    return target


def main():
    cache = {}
    broken = []
    checked = 0
    for root, _, files in os.walk(SITE):
        for name in files:
            if not name.endswith(".html"):
                continue
            f = os.path.join(root, name)
            p = Links()
            p.feed(open(f, encoding="utf-8", errors="replace").read())
            cache[f] = p
    for f, p in cache.items():
        for tag, url in p.links:
            url = url.strip()
            if not url or re.match(r"^(https?:|//|mailto:|tel:|data:|javascript:|sms:|itms|webcal:)", url, re.I):
                continue
            if url.startswith("{{") or "{%" in url:
                continue
            base, frag = urldefrag(url)
            if not base:
                if frag and frag not in p.ids and frag != "top":
                    broken.append((os.path.relpath(f, SITE), url, "missing #id on same page"))
                checked += 1
                continue
            target = resolve(f, base)
            checked += 1
            if not os.path.isfile(target):
                broken.append((os.path.relpath(f, SITE), url, "no such file"))
            elif frag and target in cache and frag not in cache[target].ids and frag != "top":
                broken.append((os.path.relpath(f, SITE), url, "missing #id in target"))
    print(f"checked {checked} internal links in {len(cache)} pages")
    for f, u, why in sorted(set(broken)):
        print(f"BROKEN {f}: {u} ({why})")
    print(f"{len(set(broken))} broken")
    sys.exit(1 if broken else 0)


if __name__ == "__main__":
    main()
