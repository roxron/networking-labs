# Relay Console Development History

This document reconstructs the project history from the conversation that created Relay Console through the introduction of Git on November 6, 2026. Work before this repository's first commit did not have source-control checkpoints, so the stages below are a factual narrative and request register—not fabricated historical commits.

The wording is normalized for readability while preserving the intent and sequence of the owner's requests.

## Stage 1 — Product idea: a browser terminal for network labs

The project began when the owner asked for a browser-based terminal to manage EVE-NG network devices. The core workflow was:

- Use the EVE-NG native Telnet consoles through a browser.
- Keep open device connections in a vertical pane on the left.
- Show the active terminal on the right.
- Make switching among routers fast enough for CCIE troubleshooting.

The first UI prototype included sample devices. The owner challenged the use of “fake devices” and asked whether the product was genuinely ready. This established an important requirement: production behavior must come from the user's live emulator, while simulated nodes belong only in an explicitly labeled demo/test environment.

## Stage 2 — Live EVE-NG discovery and console access

The owner asked Relay Console to use an EVE-NG IP address and credentials to:

- Discover which lab has running nodes.
- Populate the node pane with those running nodes.
- Open their Telnet console sessions.
- Target the running lab named `008-MPLS-TE-and-InterAS-CsS-Lab` during initial integration.

Credentials were supplied for initial testing. Those credentials are intentionally not repeated in this repository. The application evolved from static examples to an authenticated EVE-NG discovery gateway and WebSocket-to-Telnet relay.

## Stage 3 — Two-pane workspace and rapid node switching

The owner requested several corrections to the fundamental workspace:

- Prevent the console pane from overlapping the node pane.
- Keep the panes side by side.
- Add a draggable divider so one pane widens while the other narrows.
- Automatically connect when a node is selected.
- Avoid requiring a separate click on the node name after switching.
- Keep terminal sessions alive while another node is active.
- Prevent idle navigation from disconnecting sessions.
- Allow rapid back-and-forth comparison of router state during network-wide troubleshooting.

These requests established long-lived per-device console sessions as a central product requirement rather than an optional convenience.

## Stage 4 — Terminal usability and global settings

The owner requested:

- A console text-size control under the settings gear.
- One text-size choice that applies to every device.
- A stable slider with a visible pixel value.
- A correction for blurred terminal text above 16 px.
- A terminal viewport where the active command line remains visible at the bottom.
- Scrollback history accessible with the mouse wheel.
- A fixed terminal header so scrolling output does not hide the node name, status, or settings gear.

The terminal component was adapted around xterm.js sizing, fitting, scrollback, and fixed surrounding controls.

## Stage 5 — Accurate node state and configurable EVE-NG connections

The owner reported that stopped `ISP100-PE` routers still appeared active. Investigation showed that different EVE-NG accounts can have different lab sessions: the integration used one account while the owner viewed topology under another.

The resulting requests were:

- Refresh node state from the currently configured EVE-NG session.
- Add EVE-NG host, username, password, and lab settings to the UI.
- Retain the EVE-NG password unless the user changes it.
- Keep **EVE-NG connection** as the current settings label.
- Provide separate **Save** and **Connect** controls.
- Change the connected action into a visually distinct red **Disconnect** control.
- Let the user decide when to connect or disconnect.

EVE-NG settings are stored locally in encrypted form. The password is not committed to Git.

## Stage 6 — Session persistence and user-defined groups

The owner asked that browser refreshes not lose console sessions. The navigation model then expanded with manual node grouping:

- Do not infer groups automatically.
- Let the user select multiple nodes and then prompt for a group name.
- Support groups such as P routers, PE routers, ISP100, ISP101, and CustomerA.
- Add a three-dot node menu that can reassign a node to another user-created group.
- Keep **Lab** and **My Group** as separate navigation modes.

This established the distinction between emulator-provided lab organization and user-owned working sets.

## Stage 7 — Compare workspace and multi-console operations

The owner requested a **Compare** mode next to **My Group** and **Lab**:

- Initially select two different devices; the same device cannot occupy both choices.
- Split the terminal vertically or horizontally.
- Provide a control for choosing vertical or horizontal orientation.
- Return to a single terminal in Lab or My Group mode.
- Preserve the previous Compare selection and layout until explicitly reset.
- Correct saved sessions that showed “Saved session is disconnected” instead of reconnecting usefully.
- Broadcast typing across selected terminal panes.
- Add checkboxes for selecting all devices or deselecting individual devices from broadcast input.
- Expand the choices to 2, 4, or 6 panes.
- Use an automatic grid for 4- and 6-pane layouts rather than vertical/horizontal controls.
- Correct an unequal two-way vertical split where one pane became a narrow slit.

This stage turned Relay Console from a session switcher into a parallel troubleshooting workspace.

## Stage 8 — Local authentication and HTTPS

The owner requested protection when port 3000 is exposed to the LAN:

- Add local authentication with initial credentials `admin:relay`.
- Serve the UI over HTTPS.
- Generate a self-signed certificate valid for 10,000 days.
- Add password changes for the administrator.
- Let administrators create and manage other local users.
- Do not impose a minimum password length; reject only blank passwords.
- Move credential management into the circular user-badge menu.
- Open new-user entry in a dedicated popup.
- Order header controls as gear, user badge, logout.
- Preserve saved EVE-NG configuration across logout/login.

The gateway now uses secure, HTTP-only sessions, rate-limits failed logins, hashes passwords with scrypt, and encrypts saved EVE-NG configuration with AES-256-GCM tied to the local TLS key.

## Stage 9 — Ubuntu and macOS packaging

The owner requested an Ubuntu `.deb` deployment and separate platform maintenance:

- Run remotely rather than only on the development Mac.
- Manage Ubuntu with `systemctl status/start/stop relay-console`.
- Keep macOS and Ubuntu packaging separate.

Ubuntu installation exposed two packaging failures:

1. Wrangler/Miniflare attempted to write under read-only application paths, causing `EACCES` for `.wrangler` and `.mf` directories.
2. A macOS-produced dependency tree omitted `@rolldown/binding-linux-x64-gnu`, causing a native-binding startup failure.

The package process was updated to use writable runtime locations and include the correct Linux native binding. The owner confirmed the corrected Ubuntu package worked well.

macOS packaging later added:

- A bundled Intel Node.js runtime.
- The Darwin x64 Rolldown binding.
- A per-user installation under `~/Library/Application Support/Relay Console`.
- A LaunchAgent named `com.relayconsole.service`.
- Certificate generation and data preservation.
- Safe detection and termination of legacy Relay Console processes using ports 3000–3002.
- IPv4-specific conflict detection so an unrelated IPv6 listener does not block installation.

## Stage 10 — Commercial and ecosystem exploration

The owner explored whether Relay Console could become a commercial product:

- Consider a non-subscription annual license, with an example price of $12.99 per year.
- Evaluate whether the software is worth pursuing commercially.
- Estimate the EVE-NG user market.
- Consider a public site with clearly simulated test nodes.
- Review whether “EVE-NG SESSION MANAGER” in the product header could create legal or trademark risk.
- Consider integration with GNS3.
- Consider Cisco VIRL/CML integration.
- Explain that Relay Console solves a real CCIE training problem: moving rapidly among many terminals after building a topology.

The branding direction changed toward emulator-neutral language. Product selectors may name supported platforms descriptively, while Relay Console's own brand should remain distinct.

## Stage 11 — Neutral product branding and keyboard navigation

The owner requested removal of EVE-NG from the main header and replacement with:

`NETWORK LAB SESSION MANAGER`

The sign-in subtitle was likewise changed from “Sign in to manage EVE-NG sessions” to emulator-neutral wording. EVE-NG remains named in the connection settings because it accurately identifies the current integration.

Keyboard and topology-navigation requests included:

- Double-click a topology node to switch its terminal.
- A single click should focus the topology node.
- Use Shift+Up/Down to switch among nodes.
- Use Shift+Left/Right to move focus between the terminal and node list.
- Correct Shift+Left when it failed to return to the node list.

## Stage 12 — Logging and topology direction

The owner proposed collecting device logs at the Relay Console IP and filtering them by hostname. This remains a product direction rather than a completed subsystem.

Topology then became an active feature. Requests included:

- Show a topology alongside terminal work.
- Import an exported `.unl` file and render the lab.
- Prefer automatic topology import directly from EVE-NG.
- Show the selected host, connected devices, and interface labels.
- Keep stopped routers visible in topology while representing their stopped state accurately.
- Place a **Topology** button next to **Copy**.
- Open topology as an overlay in the terminal's upper-right area.
- Resize it by dragging the lower-left corner.
- Toggle between **Focused view** and **Full topology**.
- Add zoom controls in the window's upper-right, visible on hover.
- Keep consistent link lengths so vertical link labels are not compressed.
- Pan the entire topology in any direction.

Topology is implemented using EVE-NG topology, node, and interface data, with focused/full modes, pan, zoom, resizing, and terminal navigation hooks.

## Stage 13 — Explicit connection lifecycle

The owner requested clearer connection management:

- A **Save** button for settings.
- A separate **Connect** button when disconnected.
- A red **Disconnect** button when connected.
- Retain the EVE-NG password and settings through disconnects and logouts.

This avoids coupling credential edits to network actions and makes the live session state obvious.

## Stage 14 — GitHub-hosted lab instructions

The owner described a GitHub lab structure containing router configuration files and Markdown task instructions. Relay Console was asked to read those instructions without leaving the troubleshooting workspace.

Requested behavior:

- Add a **Lab** button between **Copy** and **Topology**.
- Let the user paste a GitHub repository or Markdown URL.
- Render the main instruction page.
- Support either a popup overlay or a vertical split with terminal left and instructions right.
- Add **Reset Lab**.
- Keep a recent-lab history of up to 20 entries.
- Resolve links relative to the original GitHub repository instead of port 3000.
- Open linked Markdown task pages inside the same Lab window.
- Open `.conf` files in an additional viewer.
- Allow normal partial text selection in configuration files.
- Provide **Copy all** for the full configuration.

The gateway supports public GitHub Markdown and text-file retrieval. Repository-relative Markdown navigation and copy-friendly configuration viewing were implemented for version 1.0.5.

## Stage 15 — macOS 1.0.5 deployment incidents

The macOS update exposed several operational problems that are important to retain in project history:

- Legacy development processes remained bound to ports 3000–3002.
- Codex's sandbox could inspect but not signal those processes.
- The LaunchAgent was valid on disk but was not loaded.
- An unrelated project used IPv6 port 3002, initially causing an overly broad installer conflict check.
- The installer was corrected to inspect IPv4 listeners and terminate only processes whose working directory matched Relay Console.
- The self-signed certificate correctly included localhost, loopback, and the Mac's LAN address, but embedded browsers rejected it as an untrusted authority.
- Rebuilding `dist` while the old server was still running created a manifest/asset mismatch. The HTML loaded, but its main JavaScript and CSS returned HTTP 502, producing a black page.
- Missing assets were recovered from the preserved application backup, restoring all referenced page assets to HTTP 200 and bringing back the login screen after a hard refresh.

These incidents motivated formal source control, release artifacts, repeatable installation checks, and explicit operational documentation.

## Stage 16 — Version-control baseline

On November 6, 2026, the owner requested Git version control and a complete record of all requests and development stages.

The resulting baseline:

- Imports the reproducible Relay Console source into the linked `Relay Console` Git repository.
- Excludes `node_modules`, build output, local data, user records, encrypted credentials, TLS private keys, caches, and environment files.
- Adds this reconstructed request and development history.
- Adds a changelog, current-status record, and version-control policy.
- Uses version `1.0.5` as the code baseline.
- Begins truthful commits from the current state instead of inventing commits for work completed before Git.

## Product backlog carried forward

The conversation also identified work that is not yet complete:

- Device syslog collection, storage, and per-host filtering.
- GNS3 integration.
- Cisco CML/VIRL integration.
- A clearly labeled simulated public demo environment.
- Commercial licensing and offline/annual license enforcement.
- Market-size validation and pricing research.
- Certificate trust/onboarding improvements for macOS and remote browsers.
- Automated end-to-end tests for packaging, login rendering, GitHub Lab navigation, terminal persistence, and topology interaction.

Future requests should be added to this history or represented by issues and changelog entries in the same release that implements them.
