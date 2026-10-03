# -*- coding: utf-8 -*-
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
en = json.loads((root / "messages" / "en.json").read_text(encoding="utf-8"))
te = json.loads((root / "messages" / "te.json").read_text(encoding="utf-8"))

ns_keys: dict[str, set[str]] = {}
for f in (root / "app").rglob("*.tsx"):
    text = f.read_text(encoding="utf-8")
    aliases = {}
    for m in re.finditer(
        r"const\s+(\w+)\s*=\s*useTranslations\(\s*['\"]([^'\"]+)['\"]\s*\)", text
    ):
        aliases[m.group(1)] = m.group(2)
    for alias, ns in aliases.items():
        for m in re.finditer(rf"{alias}\(\s*['\"]([^'\"]+)['\"]", text):
            ns_keys.setdefault(ns, set()).add(m.group(1))

missing = []
for ns, keys in sorted(ns_keys.items()):
    section = en.get(ns, {})
    for k in sorted(keys):
        parts = k.split(".")
        cur = section
        ok = True
        for p in parts:
            if isinstance(cur, dict) and p in cur:
                cur = cur[p]
            else:
                ok = False
                break
        if not ok:
            missing.append(f"EN_MISSING {ns}.{k}")
            continue
        curte = te.get(ns, {})
        okte = True
        for p in parts:
            if isinstance(curte, dict) and p in curte:
                curte = curte[p]
            else:
                okte = False
                break
        if not okte:
            missing.append(f"TE_MISSING {ns}.{k}")

out = []
out.append(f"namespaces={ {k: len(v) for k,v in ns_keys.items()} }")
out.append(f"missing={len(missing)}")
out.extend(missing)

# Product ids used vs translation entries
products_tsx = (root / "app" / "components" / "Products.tsx").read_text(encoding="utf-8")
ids = re.findall(r'id:\s*"([a-zA-Z]+)"', products_tsx)
product_ids = [i for i in ids if i not in {"All", "Putharekulu", "Classic", "Premium", "Special"}]
# better extract from products array ids only
product_ids = re.findall(r'{\s*id:\s*"([^"]+)",\s*category:', products_tsx)
missing_products = [pid for pid in product_ids if pid not in en["products"] or not isinstance(en["products"].get(pid), dict)]
missing_products_te = [pid for pid in product_ids if pid not in te["products"] or not isinstance(te["products"].get(pid), dict)]
out.append(f"product_ids={len(product_ids)}")
out.append(f"missing_product_en={missing_products}")
out.append(f"missing_product_te={missing_products_te}")

# Same-as-English Telugu values (possible untranslated)
same = []
def flatten(d, prefix=""):
    for k, v in d.items():
        key = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            yield from flatten(v, key)
        else:
            yield key, v

fe = dict(flatten(en))
ft = dict(flatten(te))
for k in fe:
    if fe[k] == ft[k] and re.search(r"[A-Za-z]{4,}", str(fe[k])):
        # ignore intentional same values
        if k.endswith("phonePlaceholder") or "SV " in str(fe[k]) or str(fe[k]).startswith("₹") or str(fe[k]).startswith("+91"):
            continue
        if fe[k] in {"FSSAI Certified", "WhatsApp"}:
            continue
        same.append(f"{k} = {fe[k]!r}")

out.append(f"identical_en_te={len(same)}")
out.extend(same[:50])

# Hardcoded English leftovers in components
hard_patterns = [
    r">Order Now<",
    r">Cart<",
    r">Our Heritage<",
    r">Why Choose Us<",
    r">Gift Hampers<",
    r">Operating Hours<",
    r">How to Order",
    r"SPECIAL OFFERINGS",
    r"Premium Ingredients",
    r"Inquire on WhatsApp",
    r"Available: Mon-Sat",
    r"Worldwide Door Delivery",
]
hard = []
for f in (root / "app").rglob("*.tsx"):
    text = f.read_text(encoding="utf-8")
    for pat in hard_patterns:
        if re.search(pat, text):
            hard.append(f"{f.name}: {pat}")
out.append(f"hardcoded={hard}")

report = root / "scripts" / "_i18n_audit.txt"
report.write_text("\n".join(out), encoding="utf-8")
print("wrote", report)
print("missing", len(missing), "identical", len(same), "hardcoded", len(hard))
