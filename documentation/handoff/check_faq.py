#!/usr/bin/env python3
"""Check every page's FAQPage JSON-LD against its visible FAQ (<details> with <summary>).

Usage: python3 documentation/handoff/check_faq.py [files...]
With no arguments it checks root *.html, sports/*/index.html and train.html (source files,
not _site). Exits non-zero if any page has a mismatch. Pages with no FAQPage JSON-LD and no
visible FAQ are skipped.
"""
import glob
import html
import json
import re
import sys
from html.parser import HTMLParser


def norm(text):
    text = html.unescape(re.sub(r"<[^>]+>", " ", text))
    text = text.replace(" ", " ")
    return re.sub(r"\s+", " ", text).strip()


class Details(HTMLParser):
    """Collects (question, answer) for each <details><summary>Q</summary>A...</details>."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.items = []
        self.stack = []  # open details frames
        self.in_summary = False

    def handle_starttag(self, tag, attrs):
        if tag == "details":
            self.stack.append({"q": [], "a": []})
        elif tag == "summary" and self.stack:
            self.in_summary = True

    def handle_endtag(self, tag):
        if tag == "summary":
            self.in_summary = False
        elif tag == "details" and self.stack:
            f = self.stack.pop()
            self.items.append((norm("".join(f["q"])), norm("".join(f["a"]))))

    def handle_data(self, data):
        if not self.stack:
            return
        (self.stack[-1]["q"] if self.in_summary else self.stack[-1]["a"]).append(data)


def jsonld_faq(src):
    out = []
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', src, re.S):
        try:
            data = json.loads(m.group(1))
        except json.JSONDecodeError as e:
            return None, f"invalid JSON-LD: {e}"
        for node in data if isinstance(data, list) else [data]:
            if isinstance(node, dict) and node.get("@type") == "FAQPage":
                for q in node.get("mainEntity", []):
                    out.append((norm(q["name"]), norm(q["acceptedAnswer"]["text"])))
    return out, None


def main():
    files = sys.argv[1:] or sorted(set(glob.glob("*.html") + glob.glob("sports/*/index.html") + ["train.html"]))
    bad = 0
    for f in files:
        src = open(f, encoding="utf-8").read()
        ld, err = jsonld_faq(src)
        if err:
            print(f"FAIL {f}: {err}")
            bad += 1
            continue
        p = Details()
        p.feed(src)
        vis = p.items
        if not ld:
            print(f"skip {f}: no FAQPage JSON-LD" + (f" ({len(vis)} non-FAQ <details> blocks)" if vis else ""))
            continue
        problems = []
        if len(ld) != len(vis):
            problems.append(f"count differs: JSON-LD {len(ld)} vs visible {len(vis)}")
        vq = {q: a for q, a in vis}
        lq = {q: a for q, a in ld}
        for q in lq:
            if q not in vq:
                problems.append(f"question only in JSON-LD: {q[:70]}")
            elif lq[q] != vq[q]:
                problems.append(f"answer differs: {q[:70]}")
        for q in vq:
            if q not in lq:
                problems.append(f"question only visible: {q[:70]}")
        if problems:
            bad += 1
            print(f"FAIL {f}")
            for pr in problems:
                print("   ", pr)
        else:
            print(f"ok   {f}: {len(ld)} Q&As identical")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
