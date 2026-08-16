#!/usr/bin/env python3
"""Build a provenance-preserving Markdown archive from NetEngineer_Journal."""

from __future__ import annotations

import hashlib
import re
import shutil
from collections import Counter
from pathlib import Path

SOURCE = Path("/Users/rustemsaliev/Documents/NetEngineer_Journal")
REPO = Path("/Users/rustemsaliev/GitHub/networking-labs/NetEngineer_notes")
ARCHIVE = REPO / "90-source-archive"

CATEGORIES = {
    "01-foundations": ("subnet", "ipv4", "ipv6", "tcp", "udp", "binary", "vlsm", "addressing"),
    "02-switching": ("vlan", "trunk", "stp", "etherchannel", "vtp", "switch", "lacp", "hsrp", "pvlan"),
    "03-routing": ("ospf", "eigrp", "bgp", "is-is", "isis", "route", "routing", "redistribution", "pbr"),
    "04-mpls-service-provider": ("mpls", "ldp", "l2vpn", "l3vpn", "pseudowire", "vpls", "vrf", "traffic engineering"),
    "05-security-vpn": ("security", "acl", "aaa", "radius", "tacacs", "asa", "firewall", "vpn", "ipsec", "urpf", "nat"),
    "06-network-services": ("dhcp", "dns", "ntp", "snmp", "syslog", "netflow", "sla", "cme", "monitor"),
    "07-operations-troubleshooting": ("tshoot", "troubleshoot", "diagnostic", "maintenance", "backup", "restore", "oob"),
    "08-automation-linux": ("ansible", "linux", "ubuntu", "cumulus", "script", "automation", "lvm", "fstab"),
    "09-platforms-labs": ("nx-os", "vdc", "topolog", "config_template", "config template", "eve", "lab"),
}

TEXT_SUFFIXES = {"", ".txt", ".conf", ".tct"}
SKIP_NAMES = {".DS_Store"}
SENSITIVE_NAME_MARKERS = ("credential", "freeradius")


def category(relative: Path) -> str:
    haystack = str(relative).lower().replace("_", " ")
    scores = {
        name: sum(haystack.count(word) for word in words)
        for name, words in CATEGORIES.items()
    }
    winner, score = max(scores.items(), key=lambda item: item[1])
    return winner if score else "10-reference-misc"


def slug(text: str) -> str:
    value = text.lower().replace("is-is", "isis")
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value[:110] or "note"


def readable(path: Path) -> str | None:
    try:
        data = path.read_bytes()
    except OSError:
        return None
    if b"\0" in data:
        return None
    for encoding in ("utf-8", "latin-1"):
        try:
            return data.decode(encoding).strip()
        except UnicodeDecodeError:
            continue
    return None


def unique_target(folder: Path, relative: Path) -> Path:
    base = slug("-".join(relative.with_suffix("").parts[-4:]))
    target = folder / f"{base}.md"
    if target.exists():
        digest = hashlib.sha1(str(relative).encode()).hexdigest()[:8]
        target = folder / f"{base}-{digest}.md"
    return target


def build() -> None:
    # These directories are generated outputs; curated content elsewhere is untouched.
    shutil.rmtree(ARCHIVE, ignore_errors=True)
    ARCHIVE.mkdir(parents=True)

    counts: Counter[str] = Counter()
    rows: list[tuple[str, str, str]] = []
    image_groups: dict[tuple[str, Path], list[Path]] = {}

    for path in sorted(SOURCE.rglob("*")):
        if not path.is_file() or ".git" in path.parts or path.name in SKIP_NAMES or path.name.endswith("~"):
            continue
        relative = path.relative_to(SOURCE)
        cat = category(relative)
        if any(marker in path.name.lower() for marker in SENSITIVE_NAME_MARKERS):
            rows.append((str(relative), cat, "cataloged; not reproduced (potential credentials)"))
            counts[f"{cat}:sensitive"] += 1
            continue
        if path.suffix.lower() == ".png":
            image_groups.setdefault((cat, relative.parent), []).append(relative)
            counts[f"{cat}:images"] += 1
            continue
        if path.suffix.lower() not in TEXT_SUFFIXES:
            rows.append((str(relative), cat, "cataloged (non-text)"))
            counts[f"{cat}:other"] += 1
            continue
        content = readable(path)
        if not content:
            rows.append((str(relative), cat, "empty/unreadable"))
            counts[f"{cat}:empty"] += 1
            continue
        folder = ARCHIVE / cat
        folder.mkdir(parents=True, exist_ok=True)
        target = unique_target(folder, relative)
        title = relative.stem.replace("_", " ").strip()
        source_hint = " / ".join(relative.parts[:-1]) or "Journal root"
        body = (
            f"# {title}\n\n"
            f"> Imported source note. Provenance: `NetEngineer_Journal/{relative}`  \n"
            f"> Original source context: {source_hint}. Content is preserved as historical study material; "
            "validate commands against the target platform and release.\n\n"
            "```text\n" + content.replace("```", "` ` `") + "\n```\n"
        )
        target.write_text(body, encoding="utf-8")
        rows.append((str(relative), cat, str(target.relative_to(REPO))))
        counts[f"{cat}:text"] += 1

    for (cat, parent), images in sorted(image_groups.items(), key=lambda item: str(item[0])):
        folder = ARCHIVE / cat
        folder.mkdir(parents=True, exist_ok=True)
        digest = hashlib.sha1(str(parent).encode()).hexdigest()[:8]
        gallery = folder / f"image-set-{slug(str(parent))}-{digest}.md"
        lines = [
            f"# Image set: {parent.name}\n",
            f"> Provenance: `NetEngineer_Journal/{parent}`. Filenames and sequence are preserved.\n",
        ]
        for relative in sorted(images):
            lines.append(f"- `{relative.name}`")
            rows.append((str(relative), cat, str(gallery.relative_to(REPO))))
        gallery.write_text("\n".join(lines), encoding="utf-8")

    index = [
        "# Source archive index\n",
        "This archive is a mechanically normalized copy of the usable journal material. Curated guides live in the numbered topic directories; this area preserves provenance and historical command output. Editor backups (`*~`) and OS/IDE metadata are intentionally excluded. Secrets/credential CSV files are cataloged but not reproduced.\n",
        "| Original path | Category | New location/status |",
        "|---|---|---|",
    ]
    index.extend(f"| `{a}` | `{b}` | `{c}` |" for a, b, c in rows)
    (ARCHIVE / "README.md").write_text("\n".join(index) + "\n", encoding="utf-8")

    report = ["# Import report\n", "Generated by `tools/import_journal.py`.\n"]
    report.extend(f"- {key}: {value}" for key, value in sorted(counts.items()))
    (ARCHIVE / "IMPORT_REPORT.md").write_text("\n".join(report) + "\n", encoding="utf-8")


if __name__ == "__main__":
    build()
