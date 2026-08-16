# CH3 Static Routing

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/BOOKS/Jeff Doyle/Routing TCP IP Volume 1 Jeff Doyle 1998/CH3 Static Routing`  
> Original source context: 07 SAFARI ONLINE / BOOKS / Jeff Doyle / Routing TCP IP Volume 1 Jeff Doyle 1998. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Configuring Static Routes:
!
!
Piglet(config)# ip classless 
Piglet(config)# ip subnet-zero 
!
Piglet(config)# ip route 192.168.1.0 255.255.255.224 192.168.1.193
Piglet(config)# ip route 192.168.1.64 255.255.255.224 192.168.1.193
Piglet(config)# ip route 10.4.6.0 255.255.255.0 192.168.1.193
Piglet(config)# ip route 10.4.7.0 255.255.255.0 192.168.1.193
!
Pooh(config)# ip route 192.168.1.192 255.255.255.224 192.168.1.66
Pooh(config)# ip route 10.1.0.0 255.255.0.0 192.168.1.66
Pooh(config)# ip route 10.4.6.0 255.255.255.0 192.168.1.66
Pooh(config)# ip route 10.4.7.0 255.255.255.0 192.168.1.66
!
Tigger(config)# ip route 192.168.1.0 255.255.255.224 192.168.1.65
Tigger(config)# ip route 10.1.0.0 255.255.0.0 192.168.1.194
Tigger(config)# ip route 10.4.7.0 255.255.255.0 10.4.6.2
!
Eeyore(config)# ip route 192.168.1.0 255.255.255.224 10.4.6.1
Eeyore(config)# ip route 192.168.1.64 255.255.255.224 10.4.6.1
Eeyore(config)# ip route 192.168.1.192 255.255.255.224 10.4.6.1
Eeyore(config)# ip route 10.1.0.0 255.255.0.0 10.4.6.1
!
!
Static Route Using exit interface:
!
Tigger(config)# ip route 192.168.1.0 255.255.255.224 S0
Tigger(config)# ip route 10.1.0.0 255.255.0.0 E0
Tigger(config)# ip route 10.4.7.0 255.255.255.0 S1
!
```
