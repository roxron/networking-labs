#!/bin/sh
set -eu
project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
output_dir="$project_dir/../../outputs/Ubuntu"
node_version=22.23.4
package_version=1.0.4
node_archive="node-v${node_version}-linux-x64.tar.xz"
cache_dir="$project_dir/packaging/cache"
work_dir=$(mktemp -d)
trap 'rm -rf "$work_dir"' EXIT INT TERM
mkdir -p "$cache_dir" "$output_dir" "$work_dir/root/opt/relay-console/app" "$work_dir/root/etc/default" "$work_dir/root/lib/systemd/system" "$work_dir/control"
if [ ! -s "$cache_dir/$node_archive" ]; then curl -fL "https://nodejs.org/dist/v${node_version}/${node_archive}" -o "$cache_dir/$node_archive"; fi
tar -xJf "$cache_dir/$node_archive" -C "$work_dir/root/opt/relay-console"
mv "$work_dir/root/opt/relay-console/node-v${node_version}-linux-x64" "$work_dir/root/opt/relay-console/node"
cp "$project_dir/package.json" "$project_dir/package-lock.json" "$work_dir/root/opt/relay-console/app/"
cp "$project_dir/gateway.mjs" "$project_dir/https-proxy.mjs" "$project_dir/service.mjs" "$work_dir/root/opt/relay-console/app/"
cp -R "$project_dir/dist" "$work_dir/root/opt/relay-console/app/dist"
(cd "$work_dir/root/opt/relay-console/app" && npm_config_cache="$cache_dir/npm" npm ci --include=dev --ignore-scripts --os=linux --cpu=x64 --no-audit --no-fund)

# npm may omit platform-specific optional dependencies when packaging Linux on
# macOS. Vinext's production CLI imports Rolldown at startup, so stage its
# Linux/glibc binding explicitly and fail closed if it is unavailable.
rolldown_binding_version=$(node -p "require('$project_dir/package-lock.json').packages['node_modules/@rolldown/binding-linux-x64-gnu'].version")
native_cache="$cache_dir/native"
native_archive="$native_cache/rolldown-binding-linux-x64-gnu-${rolldown_binding_version}.tgz"
mkdir -p "$native_cache"
if [ ! -s "$native_archive" ]; then
  (cd "$native_cache" && npm_config_cache="$cache_dir/npm" npm pack --silent "@rolldown/binding-linux-x64-gnu@${rolldown_binding_version}" >/dev/null)
fi
binding_dir="$work_dir/root/opt/relay-console/app/node_modules/@rolldown/binding-linux-x64-gnu"
mkdir -p "$binding_dir"
tar -xzf "$native_archive" --strip-components=1 -C "$binding_dir"
binding_binary="$binding_dir/rolldown-binding.linux-x64-gnu.node"
if [ ! -s "$binding_binary" ]; then
  echo "Missing required Linux Rolldown binding: $binding_binary" >&2
  exit 1
fi
cp "$project_dir/packaging/relay-console.default" "$work_dir/root/etc/default/relay-console"
cp "$project_dir/packaging/relay-console.service" "$work_dir/root/lib/systemd/system/relay-console.service"
install -m 0755 "$project_dir/packaging/postinst" "$work_dir/control/postinst"
install -m 0755 "$project_dir/packaging/prerm" "$work_dir/control/prerm"
install -m 0755 "$project_dir/packaging/postrm" "$work_dir/control/postrm"
installed_size=$(du -sk "$work_dir/root" | awk '{print $1}')
cat > "$work_dir/control/control" <<EOF
Package: relay-console
Version: $package_version
Section: net
Priority: optional
Architecture: amd64
Installed-Size: $installed_size
Depends: openssl, ca-certificates, adduser, systemd
Maintainer: Relay Console Administrator
Description: Secure browser terminal manager for network labs
 Provides authenticated HTTPS access, persistent users, lab discovery,
 GitHub lab guides, multi-device comparison, and retained Telnet sessions.
EOF
(cd "$work_dir/control" && tar --format=gnutar --uid 0 --gid 0 -cf - . | gzip -1 > "$work_dir/control.tar.gz")
(cd "$work_dir/root" && tar --format=gnutar --uid 0 --gid 0 -cf - . | gzip -1 > "$work_dir/data.tar.gz")
tar -tzf "$work_dir/data.tar.gz" > "$work_dir/data-files.txt"
if ! grep -qx './opt/relay-console/app/node_modules/@rolldown/binding-linux-x64-gnu/rolldown-binding.linux-x64-gnu.node' "$work_dir/data-files.txt"; then
  echo 'Required Linux Rolldown binding was not included in data.tar.gz' >&2
  exit 1
fi
printf '2.0\n' > "$work_dir/debian-binary"
(cd "$work_dir" && ar -rc "$output_dir/relay-console_${package_version}_amd64.deb" debian-binary control.tar.gz data.tar.gz)
echo "$output_dir/relay-console_${package_version}_amd64.deb"
