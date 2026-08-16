# Platforms and Labs

## Platforms represented

- Cisco IOS/IOS XE campus and routing configurations
- Cisco NX-OS and VDC material
- Cisco ASA firewall modes, NAT, ACL, and routing
- Cumulus Linux and Ansible examples
- EVE-NG images and multi-device topology configurations

Syntax is not interchangeable. Every lab should declare platform, image/version, topology, addressing, objectives, initial state, steps, verification, expected failure modes, and cleanup.

## Recommended lab layout

```text
lab-name/
├── README.md
├── topology.md
├── addressing.md
├── configs/
│   ├── initial/
│   └── final/
├── verification.md
└── troubleshooting.md
```

The imported `BIG_NET`, topology configurations, BGP confederation lab, and EVE-related notes are retained under [the source archive](../90-source-archive/README.md). The credential CSV is intentionally not copied.
