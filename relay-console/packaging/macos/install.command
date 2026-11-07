#!/bin/sh
set -eu

package_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
install_root="$HOME/Library/Application Support/Relay Console"
launch_agents="$HOME/Library/LaunchAgents"
plist="$launch_agents/com.relayconsole.service.plist"
uid=$(id -u)

mkdir -p "$install_root" "$install_root/data" "$install_root/certs" "$install_root/logs" "$launch_agents"
launchctl bootout "gui/$uid" "$plist" >/dev/null 2>&1 || true

# Stop older manually launched Relay Console processes without touching an
# unrelated application that might also use one of these ports.
for port in 3000 3001 3002; do
  for pid in $(/usr/sbin/lsof -nP -i4TCP:"$port" -sTCP:LISTEN -t 2>/dev/null || true); do
    working_dir=$(/usr/sbin/lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | /usr/bin/sed -n 's/^n//p')
    case "$working_dir" in
      *"/work/eve-console"|*"/Relay Console/app")
        /bin/kill -TERM "$pid" 2>/dev/null || true
        ;;
    esac
  done
done
/bin/sleep 2
for port in 3000 3001 3002; do
  if /usr/sbin/lsof -nP -i4TCP:"$port" -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "Port $port is being used by another application. Stop it, then run this installer again." >&2
    exit 1
  fi
done

rm -rf "$install_root/app.new" "$install_root/runtime.new"
cp -R "$package_dir/app" "$install_root/app.new"
cp -R "$package_dir/runtime" "$install_root/runtime.new"
rm -rf "$install_root/app" "$install_root/runtime"
mv "$install_root/app.new" "$install_root/app"
mv "$install_root/runtime.new" "$install_root/runtime"

key="$install_root/certs/relay-console-key.pem"
cert="$install_root/certs/relay-console-cert.pem"
if [ ! -s "$key" ] || [ ! -s "$cert" ]; then
  host_name=$(hostname)
  sans="DNS:localhost,DNS:${host_name},IP:127.0.0.1"
  for interface in en0 en1; do
    ip_address=$(ipconfig getifaddr "$interface" 2>/dev/null || true)
    if [ -n "$ip_address" ]; then sans="${sans},IP:${ip_address}"; fi
  done
  if ! /usr/bin/openssl req -x509 -newkey rsa:3072 -sha256 -nodes -days 10000 -keyout "$key" -out "$cert" -subj "/CN=${host_name}" -addext "subjectAltName=${sans}" -addext 'keyUsage=digitalSignature,keyEncipherment' -addext 'extendedKeyUsage=serverAuth'; then
    cp "$package_dir/fallback-certs/relay-console-key.pem" "$key"
    cp "$package_dir/fallback-certs/relay-console-cert.pem" "$cert"
  fi
  chmod 600 "$key"
  chmod 644 "$cert"
fi

xml_root=$(printf '%s' "$install_root" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g; s/"/\&quot;/g')
cat > "$plist" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.relayconsole.service</string>
  <key>ProgramArguments</key>
  <array>
    <string>${xml_root}/runtime/node/bin/node</string>
    <string>${xml_root}/app/service.mjs</string>
  </array>
  <key>WorkingDirectory</key><string>${xml_root}/app</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>RELAY_WEB_HOST</key><string>0.0.0.0</string>
    <key>RELAY_WEB_PORT</key><string>3000</string>
    <key>RELAY_APP_HOST</key><string>127.0.0.1</string>
    <key>RELAY_APP_PORT</key><string>3002</string>
    <key>RELAY_GATEWAY_HOST</key><string>0.0.0.0</string>
    <key>RELAY_GATEWAY_PORT</key><string>3001</string>
    <key>RELAY_DATA_DIR</key><string>${xml_root}/data</string>
    <key>RELAY_TLS_KEY</key><string>${xml_root}/certs/relay-console-key.pem</string>
    <key>RELAY_TLS_CERT</key><string>${xml_root}/certs/relay-console-cert.pem</string>
  </dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>ThrottleInterval</key><integer>3</integer>
  <key>ProcessType</key><string>Interactive</string>
  <key>StandardOutPath</key><string>${xml_root}/logs/relay-console.log</string>
  <key>StandardErrorPath</key><string>${xml_root}/logs/relay-console-error.log</string>
</dict>
</plist>
EOF

chmod 644 "$plist"
plutil -lint "$plist"
launchctl bootstrap "gui/$uid" "$plist"
launchctl enable "gui/$uid/com.relayconsole.service"
launchctl kickstart -k "gui/$uid/com.relayconsole.service"

echo
echo "Relay Console 1.0.5 installed and started."
echo "Open https://localhost:3000/"
echo "Logs: $install_root/logs"
sleep 2
open "https://localhost:3000/" || true
