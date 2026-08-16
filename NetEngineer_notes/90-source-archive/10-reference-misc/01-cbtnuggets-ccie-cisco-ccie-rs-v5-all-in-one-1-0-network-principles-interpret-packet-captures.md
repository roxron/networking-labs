# Interpret Packet Captures

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/CCIE/Cisco CCIE RS v5 All-In-One 1.0 Network Principles/Interpret Packet Captures`  
> Original source context: 01 CBTNUGGETS / CCIE / Cisco CCIE RS v5 All-In-One 1.0 Network Principles. Content is preserved as historical study material; validate commands against the target platform and release.

```text
IOS embedded packet capture (EPC)
R1# monitor capture buffer MYBUFFER circular
R1# monitor capture point ip cef MYCAP serial 1/0 both 
R1# monitor capture point associate MYCAP MYBUFFER
R1# monitor capture point start MYCAP

R1# ping 10.0.0.2

R1# monitor capture point stop MYCAP

R1# show monitor capture buffer all parameters
R1# show monitor capture buffer MYBUFFER
R1# show monitor capture buffer MYBUFFER dump

Export the capture to external storage for Wireshark analysis:

R1# monitor capture buffer MYBUFFER export tftp:
```
