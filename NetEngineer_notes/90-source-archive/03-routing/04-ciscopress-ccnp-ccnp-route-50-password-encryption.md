# 50 Password Encryption

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/50 Password Encryption`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Enable Secret Password Configuration and Verification:
!
R1# conf term
R1(config)# enable secret cisco
R1(config)# end
R1# show run
...OUTPUT OMITTED...
enable secret 4 tnhtc92DXBhelxjYk8LWJrPV36S2i4ntXrpb4RFmfqY


Line Password Configuration and Verification:
!
R1# conf term
R1(config)# line con 0
R1(config-line)# password cisco
R1(config-line)# login
R1(config-line)# end
R1# show run | s line
line con 0
password cisco
login
... OUTPUT OMITTED ...
!
!
R1# conf term
R1(config)# service password-encryption
R1(config)# end
R1# show run | s line
line con 0
password 7 1511021F0725
... OUTPUT OMITTED ...



Local User Account Creation and Verification:
!
R1# conf term
R1(config)# username kevin privilege 15 secret cisco
R1(config)# line vty 0 15
R1(config-line)# login local
R1(config-line)# end
R1# show run
... OUTPUT OMITTED ...
!
username kevin privilege 15 secret 4 tnhtc92DXBhelxjYk8LWJrPV36S2i4ntXrpb4RFmfqY
!
... OUTPUT OMITTED ...
!
line vty 0 15
login local
... OUTPUT OMITTED ...
```
