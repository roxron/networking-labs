# 04 Docker Installer

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/DOCKER/04 Docker Installer`  
> Original source context: 01 CBTNUGGETS / DOCKER. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Docker Installer:
!
Step1:
!
$ apt-cache search docker 
!
Step2: Got to https://get.docker.com/ to copy script!
!
Step3: 
!
$ curl -fsSL https://get.docker.com -o get-docker.sh
$ sh get-docker.sh
!
! 
$ sudo usermod -aG docker roxron 
!
$ sudo service docker start 
!
$ sudo docker version 
!
$ sudo apt-get update 
S sudo apt-get upgrade 
!
```
