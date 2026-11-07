# Relay Console

A local browser terminal for switching between EVE-NG Telnet consoles. Saved device entries remain in browser storage. A restricted WebSocket gateway bridges the browser to the one configured EVE-NG host.

## Project records

- [Development history](docs/DEVELOPMENT-HISTORY.md) reconstructs every requested product stage from the original Relay Console idea through the current Git baseline.
- [Changelog](CHANGELOG.md) groups the pre-Git work into retrospective milestones and records future releases.
- [Version-control policy](docs/VERSION-CONTROL.md) defines branches, commits, tags, releases, and security exclusions.
- [Current status](docs/CURRENT-STATUS.md) records what is implemented, what is verified, and what remains operationally unresolved.

## Run locally

1. Install Node.js 22 or newer and run `npm install`.
2. Copy `.env.example` to `.env`, set the EVE-NG connection, and replace the default `RELAY_PASSWORD` before exposing the service to a network.
3. Start the authenticated HTTPS gateway with `npm run gateway`.
4. In another terminal, run `npm run dev`.
5. Open `https://localhost:3000` and accept or trust the included self-signed certificate.

Both the UI and gateway use the certificate in `certs/`, valid for 10,000 days and issued for localhost, loopback, and the Mac's LAN address at generation time. API and WebSocket access require a secure, `HttpOnly` server session. Five failed logins from one address trigger a 15-minute lockout. Use a VPN for access from untrusted networks; EVE-NG Telnet traffic behind the gateway remains unencrypted.

TLS keys and certificates are generated locally and are never committed. Production builds do not require them. The Vite development server enables HTTPS when `RELAY_TLS_KEY` and `RELAY_TLS_CERT` point to existing files or when the default files exist under `certs/`.

Local users are managed from the circular user badge in the application header. Passwords are salted and hashed with scrypt in the ignored `data/users.json` file; plaintext passwords are never stored. There is no minimum password length, but blank passwords are rejected. Administrators can create users, reset passwords, assign roles, and delete accounts. Each user can change their own password.

The EVE-NG connection is persisted in `data/eve-config.enc.json` using AES-256-GCM encryption tied to the local TLS private key. Logging out or restarting the gateway does not clear the EVE-NG configuration.
