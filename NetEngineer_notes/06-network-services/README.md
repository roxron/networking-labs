# Network Services and Observability

## Baseline sequence

1. Configure timezone and authoritative NTP.
2. Add timestamps to logs and send syslog to redundant collectors.
3. Use SNMPv3 where supported; restrict source/management VRF and views.
4. Export flow telemetry at appropriate interfaces and sampling rates.
5. Add IP SLA/object tracking only after defining failure semantics.
6. Verify reachability from the actual source interface/VRF.

```ios
clock timezone <ZONE> <OFFSET>
ntp source <MGMT_INTERFACE>
ntp server vrf <MGMT_VRF> <NTP_IP> prefer
logging source-interface <MGMT_INTERFACE> vrf <MGMT_VRF>
logging host <SYSLOG_IP> vrf <MGMT_VRF>
service timestamps log datetime msec localtime show-timezone
```

Exact VRF keyword placement varies. Validate with the target release’s command reference.

```ios
show clock detail
show ntp associations
show ntp status
show logging
show snmp user
show flow exporter
show ip sla statistics
```

Monitoring tools listed in the journal (MRTG, PRTG, Scrutinizer, SolarWinds, ManageEngine) are product examples, not a design. Select tooling based on telemetry coverage, retention, alert quality, access control, backup/export, licensing, and operational ownership.
