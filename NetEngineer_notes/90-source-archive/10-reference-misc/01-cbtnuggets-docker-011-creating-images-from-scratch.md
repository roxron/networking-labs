# 011 Creating Images from Scratch

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/DOCKER/011 Creating Images from Scratch`  
> Original source context: 01 CBTNUGGETS / DOCKER. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Creating Images from Scratch:
!
$ ls 
$ counter.sh Dockerfile
!
$ sudo docker build -t my_counter . 
!
!
File: counter.sh 
!
#!/bin/bash 

while true 
do
  X=$[$X+1]
  echo 
  sleep 1
done 

!
!
File: Dockerfile

FROM ubuntu 

MAINTAINER Rustem Saliev <roxron87@gmail.com> 

COPY counter.sh /usr/local/bin/counter.sh 

RUN chmod +x /usr/local/bin/counter.sh

CMD ["/usr/local/bin/counter.sh"]
```
