# Changelog

All notable changes are recorded here. Relay Console adopted Git after substantial prototype development; therefore, releases through 1.0.5 are reconstructed from the project conversation and available artifacts.

The format follows Keep a Changelog, and future releases use Semantic Versioning.

## [Unreleased]

### Added

- Git repository baseline.
- Complete reconstructed development/request history.
- Version-control and current-status documentation.

## [1.0.5] — 2026-11-06

### Added

- GitHub Lab instruction viewer.
- Repository-relative Markdown navigation within the existing Lab window.
- Configuration-file popup with selectable text and Copy All.
- Recent Lab history with up to 20 entries.
- Popup and split Lab display modes.
- macOS Intel package with bundled Node.js and Darwin native binding.

### Fixed

- GitHub relative links incorrectly resolving to Relay Console on port 3000.
- macOS installer treating an unrelated IPv6 listener as an IPv4 port conflict.
- Black login page caused by stale server manifests referencing missing JavaScript and CSS assets.
- macOS package native-binding completeness.

## [1.0.4] — 2026-11-06

### Added

- Topology overlay, focused/full views, pan, zoom, resize, interface labels, and topology-to-terminal navigation.
- Explicit Save, Connect, and Disconnect connection controls.
- Emulator-neutral `NETWORK LAB SESSION MANAGER` branding.
- macOS per-user installer and LaunchAgent packaging.

### Fixed

- Unequal two-way split layout.
- Keyboard navigation between node list, terminal, and devices.
- Stale or misleading session state in several navigation paths.

## [0.9.0] — 2026-11-05

### Added

- Ubuntu `.deb` packaging and `relay-console.service` systemd unit.
- Local authentication, HTTPS, user administration, password changes, login throttling, and encrypted EVE-NG settings.
- 2/4/6-pane comparison workspace and broadcast input selection.

### Fixed

- Read-only Wrangler/Miniflare runtime paths.
- Missing Linux x64 Rolldown native binding.
- Terminal header scrolling and text rendering issues.

## [0.5.0] — 2026-11-04

### Added

- Live EVE-NG discovery and Telnet relay.
- Persistent per-device console sessions.
- Resizable node and terminal panes.
- User-defined node groups and reassignment.
- Global console font sizing and terminal scrollback.

## [0.1.0] — 2026-11-04

### Added

- Initial browser-based session-manager prototype with node list and terminal workspace.

[Unreleased]: ./docs/DEVELOPMENT-HISTORY.md
[1.0.5]: ./docs/DEVELOPMENT-HISTORY.md#stage-15--macos-105-deployment-incidents
[1.0.4]: ./docs/DEVELOPMENT-HISTORY.md#stage-12--logging-and-topology-direction
[0.9.0]: ./docs/DEVELOPMENT-HISTORY.md#stage-9--ubuntu-and-macos-packaging
[0.5.0]: ./docs/DEVELOPMENT-HISTORY.md#stage-2--live-eve-ng-discovery-and-console-access
[0.1.0]: ./docs/DEVELOPMENT-HISTORY.md#stage-1--product-idea-a-browser-terminal-for-network-labs
