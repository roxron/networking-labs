# 02 Configure Traffic share

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/WIRESHARK/02 Configure Traffic share`  
> Original source context: 01 CBTNUGGETS / WIRESHARK. Content is preserved as historical study material; validate commands against the target platform and release.

```text
R2(config)# access-list 110 permit ip any 192.168.10.0 0.0.0.255 
R2(config)# interface G0/1
R2(config-if)# traffic-shapre group 110 64000
R2(config-if)# end
R2# show traffic-shape 
R2# show traffic-shape statistics
```
