# 004 Update Process

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/BOOKS/Jeff Doyle/IS-IS/004 Update Process`  
> Original source context: 07 SAFARI ONLINE / BOOKS / Jeff Doyle / IS-IS. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Update Process
!
The initial Remaining Lifetime (MaxAge) value:
!
max-lsp-lifetime
!
!
the period between refreshes of locally originated LSPs:
!
lsp-refresh-interval
!
!
override LSP purging:
!
ignore-lsp-errors
!
!
LSPs have a destination MAC identifier of 0180.c200.0014
!
L2 LSPs have a destination MAC identifier of 0180.c200.0015
!
!
There are two types of SNPs: Partial SNPs (PSNP) and Complete SNPs (CSNP).
!
!
Change default minimumLSPTransmissionInterval per interface:
!
isis retransmit-interval
!
!
default CSNP period:
!
isis csnp-interval
!
!
OL bit:
!
set-overload-bit on-startup
!
set-overload-bit on-startup wait-for-bgp
!
set-overload-bit
!
!
Display LSP Database:
!
show isis database 
show isis database detail
```
