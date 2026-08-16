# Reference and Editorial Policy

## Command notation

- `<VALUE>` means replace before use.
- `show ...` blocks are verification, not configuration.
- Examples assume Cisco-like CLI only when labeled `ios`.
- A command’s absence from `running-config` may mean it is a default; check operational state.

## Source policy

The original path is the primary provenance record for imported material. Paths identify sources such as NETACAD, Cisco Press, NetworkLessons, CBT Nuggets, Udemy, Safari/O’Reilly courses, Jeff Doyle, Kevin Wallace, David Bombal, and personal labs. This repository does not claim those notes as vendor documentation.

Curated corrections prioritize:

1. IETF RFCs for protocol behavior.
2. Vendor configuration guides for platform syntax and constraints.
3. Original course/book attribution for historical study notes.

## Security policy

Credential-bearing files are not imported. Historical notes may still contain lab-like strings; treat every archived configuration as untrusted study material and scan before publishing. Examples in curated guides use placeholders.

## Maintenance

Run `python3 tools/import_journal.py` to regenerate only `90-source-archive/`. Curated topic guides are not overwritten. Image sets are cataloged by original path and filename rather than duplicated.
