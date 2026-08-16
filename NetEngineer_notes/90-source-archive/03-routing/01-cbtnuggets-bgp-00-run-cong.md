# 00 RUN CONG

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/BGP/00 RUN_CONG`  
> Original source context: 01 CBTNUGGETS / BGP. Content is preserved as historical study material; validate commands against the target platform and release.

```text
! 
 neighbor 80.0.0.101 remote-as 400
 neighbor 80.0.0.101 peer-group PEERS
 neighbor 80.0.0.101 description CONNECTION TO CUSTOMER AS 400


!CR1
int g0/0
ip address 80.0.1.1 255.255.255.252
no shutdown
ip router isis
!
int g0/1
ip address 80.0.1.5 255.255.255.252
no shutdown
ip router isis
!
int g0/2
ip address 80.0.1.9 255.255.255.252
no shutdown
ip router isis
!
int g0/3
ip address 80.0.1.13 255.255.255.252
no shutdown
ip router isis
!
int g0/4
ip address 80.0.1.17 255.255.255.252
no shutdown
ip router isis
!
int g0/5
ip address 80.0.1.21 255.255.255.252
no shutdown
ip router isis
!
int g0/6
ip address 80.0.1.49 255.255.255.252
no shutdown
ip router isis
!
int g0/7
ip address 80.0.1.53 255.255.255.252
no shutdown
ip router isis
!
int g0/8
ip address 80.0.1.57 255.255.255.252
no shutdown
ip router isis
!
int g0/9
ip address 80.0.1.61 255.255.255.252
no shutdown
ip router isis
!
!
router isis
log-adjacency-changes 
is-type level-2-only
net 49.0000.0000.0000.0001.00 
!



!CR2
int g0/0
ip address 80.0.1.2 255.255.255.252
no shutdown
ip router isis
!
int g0/1
ip address 80.0.1.6 255.255.255.252
no shutdown
ip router isis
!
int g0/2
ip address 80.0.1.33 255.255.255.252
no shutdown
ip router isis
!
int g0/3
ip address 80.0.1.37 255.255.255.252
no shutdown
ip router isis
!
int g0/4
ip address 80.0.1.25 255.255.255.252
no shutdown
ip router isis
!
int g0/5
ip address 80.0.1.29 255.255.255.252
no shutdown
ip router isis
!
int g0/6
ip address 80.0.1.65 255.255.255.252
no shutdown
ip router isis
int g0/7
ip address 80.0.1.69 255.255.255.252
no shutdown
ip router isis
!
int g0/8
ip address 80.0.1.73 255.255.255.252
no shutdown
ip router isis
!
int g0/9
ip address 80.0.1.77 255.255.255.252
no shutdown
ip router isis
!
router isis
log-adjacency-changes 
is-type level-2-only
net 49.0000.0000.0000.0002.00
!


!CR3
int g0/0
ip address 80.0.1.41 255.255.255.252
no shutdown
ip router isis
!
int g0/1
ip address 80.0.1.45 255.255.255.252
no shutdown
ip router isis
!
int g0/2
ip address 80.0.1.10 255.255.255.252
no shutdown
ip router isis
!
int g0/3
ip address 80.0.1.14 255.255.255.252
no shutdown
ip router isis
!
int g0/4
ip address 80.0.1.26 255.255.255.252
no shutdown
ip router isis
!
int g0/5
ip address 80.0.1.30 255.255.255.252
no shutdown
ip router isis
!
int g0/6
ip address 80.0.1.81 255.255.255.252
no shutdown
ip router isis
!
int g0/7
ip address 80.0.1.85 255.255.255.252
no shutdown
ip router isis
!
int g0/8
ip address 80.0.1.89 255.255.255.252
no shutdown
ip router isis
!
int g0/9
ip address 80.0.1.93 255.255.255.252
no shutdown
ip router isis
!
router isis
log-adjacency-changes 
is-type level-2-only
net 49.0000.0000.0000.0003.00
!


!CR4
int g0/0
ip address 80.0.1.42 255.255.255.252
no shutdown
ip router isis
!
int g0/1
ip address 80.0.1.46 255.255.255.252
no shutdown
ip router isis
!
int g0/2
ip address 80.0.1.34 255.255.255.252
no shutdown
ip router isis
!
int g0/3
ip address 80.0.1.38 255.255.255.252
no shutdown
ip router isis
!
int g0/4
ip address 80.0.1.18 255.255.255.252
no shutdown
ip router isis
!
int g0/5
ip address 80.0.1.22 255.255.255.252
no shutdown
ip router isis
!
int g0/6
ip address 80.0.1.97 255.255.255.252
no shutdown
ip router isis
!
int g0/7
ip address 80.0.1.101 255.255.255.252
no shutdown
ip router isis
!
int g0/8
ip address 80.0.1.105 255.255.255.252
no shutdown
ip router isis
!
int g0/9
ip address 80.0.1.109 255.255.255.252
no shutdown
ip router isis
!
router isis
log-adjacency-changes 
is-type level-2-only
net 49.0000.0000.0000.0004.00
!


!POP1
int g0/0
ip address 80.0.1.82 255.255.255.252
no shutdown
ip router isis
!
int g0/1
ip address 80.0.1.86 255.255.255.252
no shutdown
ip router isis
!
int g0/2
ip address 80.0.1.98 255.255.255.252
no shutdown
ip router isis
!
int g0/3
ip address 80.0.1.102 255.255.255.252
no shutdown
ip router isis
!
router isis
log-adjacency-changes 
is-type level-2-only
net 49.0000.0000.0000.0021.00
!


!POP2
int g0/0
ip address 80.0.1.90 255.255.255.252
no shutdown
ip router isis
!
int g0/1
ip address 80.0.1.94 255.255.255.252
no shutdown
ip router isis
!
int g0/2
ip address 80.0.1.106 255.255.255.252
no shutdown
ip router isis
!
int g0/3
ip address 80.0.1.110 255.255.255.252
no shutdown
ip router isis
!
router isis
log-adjacency-changes 
is-type level-2-only
net 49.0000.0000.0000.0022.00

!BGP1
int g0/4
ip address 80.0.1.50 255.255.255.252
no shutdown
ip router isis
!
int g0/5
ip address 80.0.1.54 255.255.255.252
no shutdown
ip router isis
!
int g0/6
ip address 80.0.1.66 255.255.255.252
no shutdown
ip router isis
!
int g0/7
ip address 80.0.1.70 255.255.255.252
no shutdown
ip router isis
!
router isis
log-adjacency-changes 
is-type level-2-only
net 49.0000.0000.0000.0011.00
!


!BGP2
int g0/4
ip address 80.0.1.58 255.255.255.252
no shutdown
ip router isis
!
int g0/5
ip address 80.0.1.62 255.255.255.252
no shutdown
ip router isis
!
int g0/6
ip address 80.0.1.74 255.255.255.252
no shutdown
ip router isis
!
int g0/7
ip address 80.0.1.78 255.255.255.252
no shutdown
ip router isis
!
router isis
log-adjacency-changes 
is-type level-2-only
net 49.0000.0000.0000.0012.00
!
```
