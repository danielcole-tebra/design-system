"""
action-row-scan.py — enumerate bottom-of-container action rows in web-app-v2.

Read-only scan of a reference checkout. Writes nothing outside this repo.
Source of truth is the .tsx text; nothing here is measured from a render.

Emits JSON on stdout:
  rows[]  one entry per <DialogActions> block (or hand-rolled row) found
"""
import json
import os
import re
import sys

ROOT = r"C:\Code\web-app-v2\packages"

BUTTON_TAG = re.compile(r"<([A-Z][A-Za-z0-9_.]*)\b")
IS_BUTTON = re.compile(r"(Button|Btn)$")
ANY_TAG = re.compile(r"<([A-Z][A-Za-z0-9_.]*)\b")


def find_tag_end(src, i):
    """From index of '<', return index just past the '>' that closes the tag."""
    depth = 0
    quote = None
    j = i
    while j < len(src):
        c = src[j]
        if quote:
            if c == quote:
                quote = None
        elif c in "\"'":
            quote = c
        elif c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
        elif c == ">" and depth == 0:
            return j + 1
        j += 1
    return len(src)


def find_close(src, start, tag):
    """Index of the </tag> that closes the element whose open tag ended at start."""
    open_re = re.compile(r"<" + tag + r"\b")
    close_re = re.compile(r"</" + tag + r">")
    depth = 1
    i = start
    while i < len(src):
        m_o = open_re.search(src, i)
        m_c = close_re.search(src, i)
        if not m_c:
            return len(src)
        if m_o and m_o.start() < m_c.start():
            depth += 1
            i = m_o.end()
            continue
        depth -= 1
        if depth == 0:
            return m_c.start()
        i = m_c.end()
    return len(src)


def brace_prop(tag_text, name):
    m = re.search(name + r"=\{", tag_text)
    if not m:
        m2 = re.search(name + r'="([^"]*)"', tag_text)
        return m2.group(1) if m2 else None
    i = m.end() - 1
    depth = 0
    for j in range(i, len(tag_text)):
        if tag_text[j] == "{":
            depth += 1
        elif tag_text[j] == "}":
            depth -= 1
            if depth == 0:
                return re.sub(r"\s+", " ", tag_text[i:j + 1])
    return None


def attrs_of(tag_text):
    """Crude prop extraction from an open tag's text."""
    out = {}
    for m in re.finditer(r'(\w+)=(?:"([^"]*)"|\{([^}]*)\})', tag_text):
        out[m.group(1)] = m.group(2) if m.group(2) is not None else "{" + (m.group(3) or "") + "}"
    for m in re.finditer(r"(?<![\w=])\b(disabled|autoFocus|fullWidth)\b(?!=)", tag_text):
        out.setdefault(m.group(1), "true")
    return out


def label_of(src, end_of_open, tag, self_closing):
    if self_closing:
        return ""
    close = find_close(src, end_of_open, tag)
    inner = src[end_of_open:close]
    inner = re.sub(r"<[^>]*>", " ", inner)
    inner = re.sub(r"\s+", " ", inner).strip()
    return inner[:60]


def buttons_in(src, seg_start, seg_end):
    """Ordered buttons inside a source span."""
    found = []
    i = seg_start
    while i < seg_end:
        m = BUTTON_TAG.search(src, i, seg_end)
        if not m:
            break
        tag = m.group(1)
        end = find_tag_end(src, m.start())
        if not IS_BUTTON.search(tag):
            i = end
            continue
        tag_text = src[m.start():end]
        self_closing = tag_text.rstrip().endswith("/>")
        a = attrs_of(tag_text)
        found.append({
            "tag": tag,
            "variant": a.get("variant", "(default: contained)"),
            "color": a.get("color", "(default: primary)"),
            "disabled": a.get("disabled"),
            "sx": brace_prop(tag_text, "sx") or brace_prop(tag_text, "style"),
            "label": label_of(src, end, tag, self_closing),
        })
        i = end
    return found


def wrappers_in(src, seg_start, seg_end):
    """Top-level element names directly inside a span, in order."""
    names = []
    i = seg_start
    while i < seg_end:
        m = ANY_TAG.search(src, i, seg_end)
        if not m:
            break
        names.append(m.group(1))
        i = m.end()
    return names


def rel(p):
    return os.path.relpath(p, ROOT).replace("\\", "/")


def scan():
    rows = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in ("node_modules", "dist", "build", ".git")]
        for fn in filenames:
            if not fn.endswith((".tsx", ".jsx")):
                continue
            path = os.path.join(dirpath, fn)
            try:
                src = open(path, encoding="utf-8", errors="replace").read()
            except OSError:
                continue

            is_test = bool(re.search(r"\.(test|spec|cy)\.[jt]sx$", fn)) or "__tests__" in dirpath or "cypress" in dirpath.lower()
            is_story = ".stories." in fn or ".example." in fn or "/stories/" in rel(path)

            for m in re.finditer(r"<DialogActions\b", src):
                end = find_tag_end(src, m.start())
                open_text = src[m.start():end]
                if open_text.rstrip().endswith("/>"):
                    inner_s, inner_e = end, end
                else:
                    inner_s, inner_e = end, find_close(src, end, "DialogActions")
                line = src.count("\n", 0, m.start()) + 1
                rows.append({
                    "kind": "DialogActions",
                    "file": rel(path),
                    "line": line,
                    "test": is_test,
                    "story": is_story,
                    "props": attrs_of(open_text),
                    "sx_full": brace_prop(open_text, "sx") or brace_prop(open_text, "style"),
                    "open_tag": re.sub(r"\s+", " ", open_text)[:400],
                    "wrappers": wrappers_in(src, inner_s, inner_e)[:6],
                    "buttons": buttons_in(src, inner_s, inner_e),
                })
    return rows


if __name__ == "__main__":
    data = scan()
    json.dump(data, sys.stdout, indent=1)
