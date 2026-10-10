"""Text-only Markdown from a page export.

Usage: python3 export_markdown.py PAGE-export.html PAGE-export.md

Drops chart pictures, chart-data tables, legends, placeholders and export
chrome; keeps every word of page copy (headings, prose, callouts, cards,
tables, captions, references). Standard library only."""
import re, sys
from html.parser import HTMLParser

VOID = {"br", "img", "hr", "meta", "input", "link", "source", "wbr"}

class Node:
    def __init__(self, tag, attrs, parent):
        self.tag, self.a, self.parent, self.kids = tag, dict(attrs), parent, []
    @property
    def cls(self): return set((self.a.get("class") or "").split())

class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = self.cur = Node("root", {}, None)
    def handle_starttag(self, t, a):
        n = Node(t, a, self.cur); self.cur.kids.append(n)
        if t not in VOID: self.cur = n
    def handle_endtag(self, t):
        n = self.cur
        while n is not None and n.tag != t: n = n.parent
        if n is not None and n.parent is not None: self.cur = n.parent
    def handle_data(self, d): self.cur.kids.append(d)

def skip(n):
    c = n.cls
    return (n.tag in ("svg", "style", "script", "nav", "footer", "head", "aside")
            or c & {"chart-svg", "chart-data", "placeholder", "legend"} or "data-export-chrome" in n.a)

def inline(n):
    if isinstance(n, str): return re.sub(r"\s+", " ", n)
    if skip(n): return ""
    s = "".join(inline(k) for k in n.kids)
    t = n.tag
    if t == "br": return "<br>"
    if not s.strip(): return s
    lead, core, trail = re.match(r"(\s*)(.*?)(\s*)$", s, re.S).groups()
    wrap = {"b": "**", "strong": "**", "i": "*", "em": "*", "code": "`"}.get(t)
    if wrap: return f"{lead}{wrap}{core}{wrap}{trail}"
    if "tag" in n.cls: return f"*{core}*"
    if "t2l" in n.cls: return f"**{core}:** "
    if t in ("sub", "sup"): return f"<{t}>{s}</{t}>"
    if t == "a":
        href = n.a.get("href", "")
        if "cite" in n.cls: return f"[{core}](#ref{core})"
        return f"[{s}]({href})" if href else s
    return s

BLOCKS = {"p", "h1", "h2", "h3", "h4", "h5", "ul", "ol", "table", "div", "section", "header",
          "figure", "details", "summary", "li", "main", "body", "html", "blockquote"}

def is_block(n): return not isinstance(n, str) and n.tag in BLOCKS

def table(n):
    rows = []
    for tr in walk(n, "tr"):
        rows.append([inline(c).strip().replace("|", "\\|") or " " for c in tr.kids if not isinstance(c, str) and c.tag in ("td", "th")])
    if not rows: return []
    w = max(len(r) for r in rows)
    rows = [r + [" "] * (w - len(r)) for r in rows]
    out = ["| " + " | ".join(rows[0]) + " |", "|" + "---|" * w]
    out += ["| " + " | ".join(r) + " |" for r in rows[1:]]
    return ["\n".join(out)]

def walk(n, tag):
    for k in n.kids:
        if isinstance(k, str): continue
        if k.tag == tag: yield k
        else: yield from walk(k, tag)

def blocks(n, quote=False):
    """Return list of markdown block strings for n's children."""
    out, buf = [], []
    def flush():
        s = "".join(buf).strip(); buf.clear()
        if s: out.append(s)
    for k in n.kids:
        if isinstance(k, str) or not is_block(k):
            if isinstance(k, str) or not skip(k): buf.append(inline(k))
            continue
        flush()
        if skip(k): continue
        out.extend(block(k))
    flush()
    return out

def block(n):
    t, c = n.tag, n.cls
    if t in ("h1", "h2", "h3", "h4", "h5"):
        return ["#" * int(t[1]) + " " + inline(n).strip()]
    if t == "p":
        s = inline(n).strip()
        if "callout-label" in c: return [f"**{s}**"]
        if "panel-sub" in c: return [f"*{s}*"]
        return [s] if s else []
    if t == "table": return table(n)
    if t in ("ul", "ol"):
        items = [k for k in n.kids if not isinstance(k, str) and k.tag == "li"]
        lines = []
        for i, li in enumerate(items, 1):
            if "refgroup" in li.cls: lines.append(f"\n**{inline(li).strip()}**\n"); continue
            body = " ".join(blocks(li)).strip()
            if "ref-list" in c: lines.append(f'<a id="{li.a.get("id","")}"></a>{body}  '); continue
            lines.append(("1. " if t == "ol" else "- ") + body)
        return ["\n".join(lines).strip()]
    if t == "summary": return [f"**{inline(n).strip()}**"]
    if "callout" in c:
        inner = blocks(n)
        return ["\n>\n".join("> " + b.replace("\n", "\n> ") for b in inner)]
    if "panel-title" in c:
        s = inline(n).strip()
        return [f"**Figure: {s}**"] if s else []
    if "tag" in c: return [f"*{inline(n).strip()}*"]
    if "eyebrow" in c: return [inline(n).strip()]
    if "stat-grid" in c:
        return ["\n".join(f"- {inline(k.kids[0]).strip()} {inline(k.kids[1]).strip()}"
                          for k in n.kids if not isinstance(k, str) and len([x for x in k.kids if not isinstance(x, str)]) >= 2)]
    if "t2l" in c: return [f"**{inline(n).strip()}:**"]
    if t == "section":
        return blocks(n) + ["---"]
    return blocks(n)

src, dst = sys.argv[1], sys.argv[2]
p = P(); p.feed(open(src).read())
main = next(walk(p.root, "main"))
md = "\n\n".join(b for b in blocks(main) if b.strip())
md = re.sub(r"\n{3,}", "\n\n", md).rstrip("-\n ") + "\n"
open(dst, "w").write(md)
print(len(md.split()), "words")
