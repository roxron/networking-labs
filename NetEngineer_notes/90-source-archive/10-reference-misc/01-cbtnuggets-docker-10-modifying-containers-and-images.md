# 10 Modifying Containers and Images

> Imported source note. Provenance: `NetEngineer_Journal/01 CBTNUGGETS/DOCKER/10 Modifying Containers and Images`  
> Original source context: 01 CBTNUGGETS / DOCKER. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Modifying Containers and Images;
!
$ sudo docker run -d --name my_nginxtemp nginx
!
Connect to the running container to modify it:
!
$ sudo docker exec -i -t my_nginxtemp bash 
!
# cd /user/share/nginx/html
!
/user/share/nginx/html# ls 
/user/share/nginx/html# rm index.html e	
/user/share/nginx/html# cat > index.html
/user/share/nginx/html# 
!
Commit Costomized container in to the image:
!
$ sudo docker commit my_nginxtemp my_nginx
!
```
