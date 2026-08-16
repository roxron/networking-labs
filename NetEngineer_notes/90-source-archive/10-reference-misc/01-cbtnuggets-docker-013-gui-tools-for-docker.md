# 013 GUI Tools for Docker

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/DOCKER/013 GUI Tools for Docker`  
> Original source context: 01 CBTNUGGETS / DOCKER. Content is preserved as historical study material; validate commands against the target platform and release.

```text
GUI Tools for Docker:
!
$ sudo docker run -d -p 9000:9000 --privileged -v /var/run/docker.sock:/var/run/docker.sock dockerui/dockerui
```
