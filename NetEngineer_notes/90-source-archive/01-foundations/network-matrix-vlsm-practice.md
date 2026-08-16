# VLSM Practice

> Imported source note. Provenance: `NetEngineer_Journal/Network Matrix/VLSM Practice`  
> Original source context: Network Matrix. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Requirements:
Subnet0 - 60 hosts
Subnet1 - 28 hosts
Subnet2 - 12 hosts 
Subnet3 - 12 hosts

Given major network 192.168.10.0 

Description 
This is class C network witn prefic /24 
network bits 24 
host bits 8 
Formula for calculation number of hosts per subnet is:
2^n-2=H 
2^8-2=254 

Subnet0: 
2^6-2=62 
32-6=26bit 
Prefix is /26 
192.168.10.0/26 
Subnet mask for /26 is 255.255.255.192 
Define octet of interset 
here is 4th octet 
Derive magic number
256-192=64 
Next subnet is:

Subnet1: 192.168.10.64  
2^5-2=30 
32-5=27bit 
Prefix is /27
192.168.10.64/27
Subnet mask for /27 is 255.255.255.224 
Define octet of interset
here is 4th octet
Derive magic number
256-224=32 
Next subnet is:

Subnet2:
2^4-2=14 
32-4=28bit
Prefix is /28 
192.168.10.96/28 
Subnet mask for /28 is 255.255.255.240
Define octet of interset
here is 4th octet
Derive magic number
256-240=16 
Next subnet is:

Subnet3:
2^4-2=14 
32-4=28bit 
Prefix is /28 
192.168.10.112/28
Subnet mask for /28 is 255.255.255.240
Define octet of interset
here is 4th octet
Derive magic number
256-240=16 
____________________________________________________________

Given major network 192.168.10.0 

Requirements:
Subnet0 - 120 hosts
Subnet1 - 60  hosts
Subnet2 - 30 hosts 
Subnet3 - 10 hosts
Subnet4 - 2 hosts
Subnet5 - 2 hosts
Subnet6 - 2 hosts
Subnet7 - 2 hosts

192.168.10.0/25
192.168.10.128/26 
192.168.10.192/27
192.168.10.224/28 
192.168.10.240/30 
192.168.10.244/30 
192.168.10.248/30
192.168.10.252/30 
_________________________________________________________

Given supernet network  192.168.24.0/22

Requirements:
Subnet0 - 400 hosts
Subnet1 - 200  hosts
Subnet2 - 50 hosts 

192.168.24.0/23 
192.168.26.0/24 
192.168.27.0/26 
192.168.27.64/26 
_________________________________________________________

Given supernet 192.168.30.0/23 

Requirements:
Subnet0 - 120 hosts 
Subnet1 - 90 hosts 
Subnet2 - 60 hosts 
Subnet3 - 30 hosts 
Subnet4 - 24 hosts 
Subnet5 - 24 hosts
Subnet6 - 20 hosts 

Apply VLSM:
192.168.30.0/25 
192.168.30.128/25 
192.168.31.0/26
192.168.31.64/27
192.168.31.96/27 
192.168.31.128/27 
192.168.31.160/27 

______________________________________________________
```
