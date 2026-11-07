# Version-Control Policy

## Repository purpose

This repository is the canonical source for Relay Console application code, packaging scripts, and project documentation. Local runtime state and release artifacts are not source.

## Branches

- `main` must remain buildable and represents the latest accepted state.
- Use `feature/<short-name>` for product work.
- Use `fix/<short-name>` for corrections.
- Use `release/<version>` only when stabilizing a release that requires multiple commits.

Merge small, reviewed changes back to `main`. Avoid long-lived branches.

## Commits

Use concise imperative subjects with a conventional prefix:

- `feat:` user-visible capability
- `fix:` defect correction
- `docs:` documentation only
- `build:` packaging or dependency work
- `test:` automated verification
- `refactor:` internal behavior-preserving change
- `chore:` repository maintenance

Each commit should represent one coherent change. Do not combine unrelated UI, gateway, and packaging work merely because they were developed on the same day.

## Versions and tags

Use Semantic Versioning:

- Patch: compatible fixes and packaging corrections.
- Minor: backward-compatible features.
- Major: incompatible data, API, installation, or workflow changes.

Create annotated tags for releases, for example:

```sh
git tag -a v1.0.5 -m "Relay Console 1.0.5"
```

Do not retroactively tag reconstructed milestones unless an exact matching artifact is preserved and verified. The first authoritative tag should be created from a tested Git commit.

## Release checklist

1. Update `package.json` version.
2. Update `CHANGELOG.md` and `docs/CURRENT-STATUS.md`.
3. Run the production build.
4. Test authentication, EVE-NG settings, terminal connection, multi-pane behavior, topology, and GitHub Lab navigation.
5. Build Ubuntu and macOS packages independently on or for their target architectures.
6. Install into a clean test environment.
7. Confirm service startup, ports, HTTPS certificate paths, writable data paths, and native bindings.
8. Record SHA-256 checksums for distributed artifacts.
9. Commit the release state and create an annotated tag.

## Security and privacy exclusions

Never commit:

- `.env` files.
- TLS private keys or generated certificates.
- `data/users.json`.
- `data/eve-config.enc.json`.
- EVE-NG passwords, cookies, or session tokens.
- `node_modules`, `dist`, caches, logs, or locally generated packages.
- Customer lab files or configurations unless deliberately sanitized and licensed for inclusion.

Historical packages are kept locally under `releases/` but their `.zip` and `.deb` files are Git-ignored. See `releases/README.md`. Future packages should use release-asset storage or an explicitly configured Git LFS workflow rather than ordinary Git blobs.

Before every release commit, inspect both `git status` and the staged diff.

## Request traceability

New user requests should be tracked in one or more of these places:

- An issue for planned work.
- A feature/fix branch and descriptive commits for active work.
- `CHANGELOG.md` for delivered behavior.
- `docs/DEVELOPMENT-HISTORY.md` for major changes in product direction.
- `docs/CURRENT-STATUS.md` for operational constraints or known incidents.
