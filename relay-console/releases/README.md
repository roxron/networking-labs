# Release Packages

This directory contains a local, Git-ignored copy of the macOS and Ubuntu packages that existed when Git version control was introduced. Git tracks this inventory and `SHA256SUMS`, but it does **not** track the `.zip` or `.deb` package files.

## macOS

- `Relay-Console-macOS-1.0.4-Intel.zip`
- `Relay-Console-macOS-1.0.5-Intel.zip`
- `Relay-Console-macOS.zip` — generic filename containing the same bytes as the preserved 1.0.5 Intel archive.

## Ubuntu

- `relay-console_1.0.0_amd64.deb`
- `relay-console_1.0.1_amd64.deb`
- `relay-console_1.0.2_amd64.deb`
- `relay-console_1.0.3_amd64.deb`
- `relay-console_1.0.4_amd64.deb`

Use `SHA256SUMS` to verify every artifact:

```sh
shasum -a 256 -c releases/SHA256SUMS
```

## Storage policy

Package files remain locally available under `releases/macos/` and `releases/ubuntu/`. They are excluded by `.gitignore` because each exceeds GitHub's ordinary 100 MB per-file limit.

For future distribution, upload packages as release assets or adopt Git LFS deliberately. Do not add ordinary package blobs to Git history.

The checksum file remains tracked so a local or externally hosted artifact can be verified against the historical inventory.
