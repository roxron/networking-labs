# 01 Managing Configuration files

> Imported source note. Provenance: `NetEngineer_Journal/07 SAFARI ONLINE/VIDEO COURSES/CCNP/CCNP TSHOOT by Kevin Wallace/M2  Network Maintenance and Tshoot/01 Managing Configuration files`  
> Original source context: 07 SAFARI ONLINE / VIDEO COURSES / CCNP / CCNP TSHOOT by Kevin Wallace / M2  Network Maintenance and Tshoot. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!
Copy Running-config by FTP:
!
R1# copy run ftp://roxron:cisco@10.100.0.10/R1.cfg
!
or 
!
R1(config)# ip ftp username roxron 
R1(config)# ip ftp password cisco
!
R1# copy run ftp://10.100.0.10/R1.cfg
!
!
Use archive to store configs:
!
R1# pwd 
flash:/
!
R1# mkdir CONFIG_ARCHIVE
!
R1# dir 
!
R1# cd CONFIG_ARCHIVE
!
R1# cd ..
!
!
ARCHIVE FEATURE:
!
R1(config)# archive 
R1(config-archive)# path flash:/CONFIG_ARCHIVE/$h
R1(config-archive)# time-period 10080
R1(config-archive)# write-memory
R1(config-archive)# end
!
R1# copy run s
!
R1# show archive 
!
!
Replace running-config with backup config:
!
R1# configure replace flash:/CONFIG_ARCHIVE/R1-0 
!
!
```
