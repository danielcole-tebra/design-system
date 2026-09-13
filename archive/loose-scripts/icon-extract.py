"""
icon-extract.py — pull SVG path data out of the design system's icon components.

The icons are `createSvgIcon(<jsx>, "Name")` wrappers. MUI defaults the viewBox to
"0 0 24 24" unless the file passes one. This script converts the JSX element to real
SVG markup so it can be handed to figma.createNodeFromSvg unchanged.

Nothing is redrawn. If a file cannot be parsed it is reported, never approximated.

Usage:  python icon-extract.py [--marketing] > icons.json
"""
import json
import os
import re
import sys

ROOT = r"C:\Code\web-app-v2\packages\design-system\src\components"

# JSX attribute -> SVG attribute
ATTR = {
    "fillRule": "fill-rule", "clipRule": "clip-rule", "strokeWidth": "stroke-width",
    "strokeLinecap": "stroke-linecap", "strokeLinejoin": "stroke-linejoin",
    "strokeMiterlimit": "stroke-miterlimit", "strokeDasharray": "stroke-dasharray",
    "fillOpacity": "fill-opacity", "strokeOpacity": "stroke-opacity",
    "className": "class", "xlinkHref": "xlink:href", "stopColor": "stop-color",
    "stopOpacity": "stop-opacity", "gradientUnits": "gradientUnits",
}


def jsx_to_svg(body):
    # {...} expressions cannot be resolved statically; flag them
    if re.search(r"=\{(?!\")", body):
        # allow simple {"..."} string literals
        body = re.sub(r'=\{"([^"]*)"\}', r'="\1"', body)
    for a, b in ATTR.items():
        body = re.sub(r"\b" + a + r"=", b + "=", body)
    body = body.replace("<g>", "<g>").replace("</g>", "</g>")
    return body.strip()


def extract(path):
    src = open(path, encoding="utf-8", errors="replace").read()
    m = re.search(r"createSvgIcon\(", src)
    if not m:
        return {"error": "no createSvgIcon"}
    # balance parens from the call
    i = m.end() - 1
    depth = 0
    for j in range(i, len(src)):
        if src[j] == "(":
            depth += 1
        elif src[j] == ")":
            depth -= 1
            if depth == 0:
                inner = src[i + 1:j]
                break
    else:
        return {"error": "unbalanced createSvgIcon call"}

    # last quoted string is the display name
    names = re.findall(r'"([A-Za-z0-9 _-]+)"\s*,?\s*$', inner.strip())
    name = names[-1] if names else None
    # strip the trailing name argument
    body = re.sub(r',\s*"[A-Za-z0-9 _-]+"\s*$', "", inner.strip())

    vb = re.search(r'viewBox="([^"]+)"', src)
    viewbox = vb.group(1) if vb else "0 0 24 24"

    unresolved = bool(re.search(r"=\{(?!\")", body))
    return {
        "name": name,
        "viewBox": viewbox,
        "body": jsx_to_svg(body),
        "unresolvedExpressions": unresolved,
    }


def run(folder):
    d = os.path.join(ROOT, folder)
    out, failed = [], []
    for fn in sorted(os.listdir(d)):
        if not fn.endswith(".tsx") or fn == "index.ts" or fn.endswith("index.tsx"):
            continue
        res = extract(os.path.join(d, fn))
        stem = re.sub(r"Icon\.tsx$|\.tsx$", "", fn)
        if "error" in res or not res.get("body"):
            failed.append({"file": fn, "reason": res.get("error", "empty body")})
            continue
        res["file"] = fn
        res["stem"] = stem
        res["svg"] = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="%s">%s</svg>' % (
            res["viewBox"], res["body"])
        out.append(res)
    return out, failed


if __name__ == "__main__":
    folder = "marketingIcons" if "--marketing" in sys.argv else "icons"
    icons, failed = run(folder)
    json.dump({"folder": folder, "count": len(icons), "icons": icons, "failed": failed},
              sys.stdout, indent=1)
