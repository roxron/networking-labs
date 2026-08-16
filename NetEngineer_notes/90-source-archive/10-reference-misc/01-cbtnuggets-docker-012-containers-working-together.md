# 012 Containers Working Together

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/DOCKER/012 Containers Working Together`  
> Original source context: 01 CBTNUGGETS / DOCKER. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Containers Working Together:
!
$ sudo docker create --name my_data -v /usr/share/nginx/html ubuntu 
!
$ sudo docker run -d --volumes-from my_data nginx 
!
!
File:

#!/bin/bash 

while true 
do 
  X=$[$X+1] 
  echo "<br /><center><h1>$X</h1></center>" > /usr/share/nginx/html/index.html 
  sleep 1
done 

!
$ sudo docker build -t my_webapp 
!
$ sudo docker run -d --volumes-from my_data my_webapp
```
