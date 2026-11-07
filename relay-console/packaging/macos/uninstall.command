#!/bin/sh
set -eu

install_root="$HOME/Library/Application Support/Relay Console"
plist="$HOME/Library/LaunchAgents/com.relayconsole.service.plist"
uid=$(id -u)

launchctl bootout "gui/$uid" "$plist" >/dev/null 2>&1 || true
rm -f "$plist"
rm -rf "$install_root/app" "$install_root/runtime"

echo "Relay Console application and LaunchAgent were removed."
echo "User data and certificates remain in: $install_root"
echo "Delete that folder manually only if you also want to erase all Relay Console data."
