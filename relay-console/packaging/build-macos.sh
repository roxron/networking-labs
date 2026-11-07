#!/bin/sh
set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
output_dir="$project_dir/../../outputs/macOS"
node_version=22.23.4
package_version=1.0.5
node_archive="node-v${node_version}-darwin-x64.tar.gz"
cache_dir="$project_dir/packaging/cache"
work_dir=$(mktemp -d)
trap 'rm -rf "$work_dir"' EXIT INT TERM
bundle_dir="$work_dir/Relay Console ${package_version} macOS Intel"

mkdir -p "$cache_dir" "$output_dir" "$bundle_dir/app" "$bundle_dir/runtime" "$bundle_dir/fallback-certs"
if [ ! -s "$cache_dir/$node_archive" ]; then
  curl -fL "https://nodejs.org/dist/v${node_version}/${node_archive}" -o "$cache_dir/$node_archive"
fi
tar -xzf "$cache_dir/$node_archive" -C "$bundle_dir/runtime"
mv "$bundle_dir/runtime/node-v${node_version}-darwin-x64" "$bundle_dir/runtime/node"

cp "$project_dir/package.json" "$project_dir/package-lock.json" "$bundle_dir/app/"
cp "$project_dir/gateway.mjs" "$project_dir/https-proxy.mjs" "$project_dir/service.mjs" "$bundle_dir/app/"
cp -R "$project_dir/dist" "$bundle_dir/app/dist"
(cd "$bundle_dir/app" && npm_config_cache="$cache_dir/npm" npm ci --include=dev --ignore-scripts --os=darwin --cpu=x64 --no-audit --no-fund)

rolldown_binding_version=$(node -p "require('$project_dir/package-lock.json').packages['node_modules/@rolldown/binding-darwin-x64'].version")
native_cache="$cache_dir/native"
native_archive="$native_cache/rolldown-binding-darwin-x64-${rolldown_binding_version}.tgz"
mkdir -p "$native_cache"
if [ ! -s "$native_archive" ]; then
  (cd "$native_cache" && npm_config_cache="$cache_dir/npm" npm pack --silent "@rolldown/binding-darwin-x64@${rolldown_binding_version}" >/dev/null)
fi
binding_dir="$bundle_dir/app/node_modules/@rolldown/binding-darwin-x64"
mkdir -p "$binding_dir"
tar -xzf "$native_archive" --strip-components=1 -C "$binding_dir"
if [ ! -s "$binding_dir/rolldown-binding.darwin-x64.node" ]; then
  echo 'Missing required macOS Intel Rolldown binding.' >&2
  exit 1
fi

cp "$project_dir/certs/relay-console-key.pem" "$bundle_dir/fallback-certs/"
cp "$project_dir/certs/relay-console-cert.pem" "$bundle_dir/fallback-certs/"
cp "$project_dir/packaging/macos/install.command" "$bundle_dir/Install Relay Console.command"
cp "$project_dir/packaging/macos/uninstall.command" "$bundle_dir/Uninstall Relay Console.command"
cp "$project_dir/packaging/macos/README.txt" "$bundle_dir/README.txt"
chmod 755 "$bundle_dir/Install Relay Console.command" "$bundle_dir/Uninstall Relay Console.command" "$bundle_dir/runtime/node/bin/node"

versioned_output="$output_dir/Relay-Console-macOS-${package_version}-Intel.zip"
generic_output="$output_dir/Relay-Console-macOS.zip"
(cd "$work_dir" && zip -qry "${versioned_output}.new" "$(basename "$bundle_dir")")
mv "${versioned_output}.new" "$versioned_output"
cp "$versioned_output" "$generic_output"
echo "$versioned_output"
