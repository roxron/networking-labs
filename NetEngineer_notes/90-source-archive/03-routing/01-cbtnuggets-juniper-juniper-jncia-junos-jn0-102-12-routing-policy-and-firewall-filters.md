# 12 Routing Policy and Firewall Filters

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/JUNIPER/Juniper JNCIA-Junos JN0-102/12 Routing Policy and Firewall Filters`  
> Original source context: 01 CBTNUGGETS / JUNIPER / Juniper JNCIA-Junos JN0-102. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Routing Policy:
root> configure 
root# edit routing-options 
root# set static route 0.0.0.0/0 next-hop 10.10.10.100 

root# edit policy-options 
root# set policy-statement DEFST term MYTERM1 from protocol static route-filter 0.0.0.0/0 exact 
root# set policy-statement DEFST term MYTERM1 then accept 

root# edit protocols ospf 
root# set export DEFST

Firewall Filters:
root> configure 
root# edit firewall family inet
root# set filter MYFILTER term BLOCK from source-address 10.20.20.0/24 
root# set filter MYFILTER term BLOCK then log discard 
root# set filter MYFILTER term ACCEPTALL then accept 

root# edit interfaces em0 unit0
root# set family inet filter input MYFILTER 

COnfigure uRPF:
root# edit interface em0 unit 0 
root# set family inet rpf-check

root# commit
```
