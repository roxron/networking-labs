# Automation and Linux

The journal combines Cumulus Linux/Ansible notes with Ubuntu administration. Keep network intent separate from device-specific rendering.

## Automation workflow

1. Model inventory, variables, desired state, and secret references.
2. Lint and render locally.
3. Collect pre-change state.
4. Run check/diff mode where the module supports it.
5. Deploy to a canary, validate, then expand in batches.
6. Collect post-change state and compare invariants.
7. Roll back from versioned configuration or a tested playbook.

Never store live passwords, RADIUS keys, API tokens, or device default credentials in Git. Use an encrypted secret store and provide `.example` variable files with placeholders.

Linux storage/package/service commands in the source archive may be release-specific and potentially destructive. Confirm device names with `lsblk`, mount state, backups, package repository, and systemd unit names before changes.
