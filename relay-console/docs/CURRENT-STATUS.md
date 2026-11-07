# Current Status

Status date: November 6, 2026

Source baseline: 1.0.5

## Implemented

- Browser-based EVE-NG Telnet session management.
- Live EVE-NG lab/node discovery.
- Persistent multi-device terminal sessions.
- Lab, custom-group, and 2/4/6-pane Compare modes.
- Broadcast input selection.
- Global console sizing and scrollback behavior.
- Local authentication and user administration.
- HTTPS with local self-signed certificates.
- Encrypted persisted EVE-NG configuration.
- EVE-NG topology overlay with focus/full modes, pan, zoom, resize, labels, and navigation.
- GitHub Markdown Lab guides, history, split/popup modes, repository-relative navigation, and configuration viewing/copying.
- Ubuntu systemd packaging.
- macOS Intel per-user packaging and LaunchAgent definition.

## Verified during 1.0.5 work

- Production application build completes.
- Authenticated GitHub Markdown retrieval works.
- Authenticated GitHub `.conf` retrieval works.
- The macOS archive contains its Intel Node runtime and Darwin x64 Rolldown binding.
- The corrected macOS installer uses IPv4-specific conflict detection.
- The Relay Console HTTPS endpoint and gateway respond on the Mac Mini.
- All JavaScript, stylesheet, and font assets referenced by the restored login page return HTTP 200.

## Current operational caveats

- The Mac Mini previously retained legacy development processes on ports 3000–3002; those processes were outside Codex's signal permissions.
- The LaunchAgent plist existed but was not loaded during the most recent inspection.
- A running server was temporarily paired with replaced build output, causing missing assets and a black page. The referenced assets were restored from a preserved backup.
- Self-signed TLS certificates are not automatically trusted by browsers. Some embedded browsers refuse them without offering a user override.
- The authoritative source is now this Git repository; future deployment work should be built from a committed state rather than modifying a live `dist` tree.
- Historical macOS and Ubuntu packages are locally preserved under `releases/` but excluded from Git. Their inventory and SHA-256 checksums are tracked.

## Next recommended engineering work

1. Create a clean, repeatable macOS install/uninstall integration test.
2. Add browser-level smoke tests for login rendering and static assets.
3. Add API tests for GitHub URL resolution and file-type handling.
4. Add gateway tests for user sessions and encrypted EVE configuration.
5. Establish the first fully verified Git-tagged release after 1.0.5.
6. Move roadmap items such as syslog and multi-emulator support into issues before implementation.
