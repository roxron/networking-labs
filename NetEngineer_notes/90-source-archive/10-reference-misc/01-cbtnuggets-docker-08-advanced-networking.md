# 08 Advanced Networking

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/DOCKER/08 Advanced Networking`  
> Original source context: 01 CBTNUGGETS / DOCKER. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Advanced Networking: 
!
Port Mapping:
!
$ sudo docker run -d -p 8080 adejonge/helloworld 
!
$ sudo docker ps 
!
$ sudo docker rm -f hungry_hopper 
!
Port Map to specific outside port number
!
$ sudo docker run -d -p 8000:8080 adejonge/hellworld
!
$ sudo docker run -d -p 8000:8080 -p 8001:8080 adejonge/hellworld
!
!
Host Networking:
!
$ sudo docker run -d --net=host adejonge/helloworld 
!
```
