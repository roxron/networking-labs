# 01 Implement MPLS

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/MPLS/01 Implement MPLS`  
> Original source context: 01 CBTNUGGETS / MPLS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R1(config)# mpls label range 100 199
R1(config)# mpls ip 
R1(config)# interface G0/0
R1(config-if)# mpls ip 
R1(config-if)# exit

R2(config)# mpls label range 200 299
R2(config)# mpls ip 
R2(config)# interface g0/0
R2(config-if)# mpls ip 
R2(config-if)# interface G0/1
R2(config-if)# mpls ip 

R1# show mpls ldp bindings 5.5.5.5 32
R1# show mpls forwarding-table 5.5.5.5
R1# show mpls ldp bindings local
R1# show mpls ldp neighbor
R1# show mpls ldp discovery detail

Debug prefix:
R1(config)# access-list 1 permit host 5.5.5.5
R1(config)# exit
R1# debug mpls ldp bindings prefix-acl 1

To see RIB use:
R1# show ip ospf 1 rib

To see CEF use:
R1# show ip cef 5.5.5.5 detail
```
