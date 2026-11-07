Relay Console 1.0.4 — macOS Intel

Install:
1. Double-click Install Relay Console.command.
2. If macOS blocks it, Control-click the file, choose Open, and confirm.
3. Open https://localhost:3000/ and approve the self-signed certificate.

Service management:
  launchctl kickstart -k gui/$(id -u)/com.relayconsole.service
  launchctl bootout gui/$(id -u) "$HOME/Library/LaunchAgents/com.relayconsole.service.plist"

Application and data:
  $HOME/Library/Application Support/Relay Console

Logs:
  $HOME/Library/Application Support/Relay Console/logs

Uninstall:
  Double-click Uninstall Relay Console.command.

Uninstall preserves users, credentials, certificates, and settings. Remove the
Relay Console Application Support folder manually only if all data should be erased.
