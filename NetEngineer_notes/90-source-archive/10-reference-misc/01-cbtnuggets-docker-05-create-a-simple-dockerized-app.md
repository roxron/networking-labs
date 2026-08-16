# 05 Create a Simple Dockerized App

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/DOCKER/05 Create a Simple Dockerized App`  
> Original source context: 01 CBTNUGGETS / DOCKER. Content is preserved as historical study material; validate commands against the target platform and release.

```text
/bin/bash -c 'while true; do X-$[$X+1]; echo $X sleep 1; done'
!
$ sudo docker run -d ububtu /bin/bash -c 'while true; do X-$[$X+1]; echo $X sleep 1; done'
!
$ sudo docker ps 
!
$ sudo docker log fd5c44 
!
$ sudo docker stop hungry-hopper 
!
# sudo docker start hungry-hopper 
!
!
-i, --interactive
-t, --tty (“allocate a pseudo-TTY”, i.e. a terminal)
(see docker run --help for details)

$ sudo docker run -i -t centos
!
$ sudo docker container ls
```
