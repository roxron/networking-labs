# 2 Day Device Monitoring, Management and Maintenance

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNA R&S for 31 days/2 Day Device Monitoring, Management and Maintenance`  
> Original source context: 04 CISCOPRESS / CCNA R&S for 31 days. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Device Monitoring, Management and Maintenance:
!
SNMP: 
!
Obtaining a MIB Value with SNMPGET:
!
$ snmpget -v2c -c community 10.250.250.14 1.3.6.1.4.1.9.2.1.58.0
!
!
Configuring SNMP Version 2c for Read-Only Access:
!
R1(config)# ip access-list standard SNMP_ACCESS
R1(config-std-nacl)# permit host 172.16.3.110
R1(config-std-nacl)# exit
R1(config)# snmp-server community 4md!n0n1y RO SNMP_ACCESS
R1(config)# snmp-server location Austin, TX
R1(config)# snmp-server contact Bob Smith
R1(config)# end
!
!
Verifying SNMP:
!
R1# show snmp 
R1# show snmp community 
!
!
!
Syslog:
!
Syslog Configuration and Verification:
!
Default Cisco Syslog Configuration:
!
R1(config)# logging console 
R1(config)# logging buffered
!
!
Default Logging Service Settings:
!
R1# show logging 
!
!
Configure Cisco Router to send syslog messages to Remote Server:
!
R1(config)# logging 192.168.1.3 
R1(config)# logging trap 4
R1(config)# logging source-interface g0/0
!
Verify the Logging Service After Configuration Check:
!
R1# show logging 
!
!
!
Network Time Protocol:
!
Configuration and Verification of an NTP Client:
!
ntp server 172.16.2.2
!
R1# show ntp status
R1# show ntp associations
!
!
!
Cisco IOS File System and Devices:
!
Router# show file systems
Router# show flash:
Router# dir 
Router# pwd 
Router# cd nvram:
!
!
Commands for Managing Configuration Files:
!
Router# copy system:running-config nvram:startup-config
!
!
Copying Files to a Local Directory:
!
Router# mkdir configs
Router# copy system:running-config configs/backup-config
!
!
copying from RAM to TFTP:
!
Router# copy system:running-config tftp:
Router# copy run tftp
!
!
Copying from TFTP to the startup configuration file:
!
Router# copy tftp: nvram:startup-config
Router# copy tftp nvram
!
!
Manage Cisco IOS Images:
!
To verify the Cisco IOS image currently running on the device:
!
R1# show version 
!
!
Backing Up a Cisco IOS Image to TFTP:
!
R1# ping 192.168.1.100
R1# copy flash: tftp:
   Source filename []? c1900-universalk9-mz.SPA.152-4.M3.bin
   Address or name of remote host []? 172.16.1.100
   Destination filename [c1900-universalk9-mz.SPA.152-4.M3.bin]? <Enter>
   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   <Output omitted>
   68831808 bytes copied in 113.061 secs (608802 bytes/sec)
R1# 
!
!
Restoring a Cisco IOS Image
!
R1# dir 
!
1# copy tftp flash
Address or name of remote host []? 172.16.1.100
Source filename []? c1900-universalk9-mz.SPA.152-4.M3.bin
Destination filename [c1900-universalk9-mz.SPA.152-4.M3.bin]? <Enter>
Loading c1900-universalk9-mz.SPA.152-4.M3.bin from 172.16.1.100: !!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
[OK - 68831808 bytes]
68831808 bytes copied in 9.656 secs (7128397 bytes/sec)
R1#
!
!
!
Managing Cisco IOS Licenses:
!
R1# show licence feature
R1# show license udi
R1# 
!
!
Installing and Verifying a License:
!
R1# license install flash0:seck9-C1900-SPE150_K9-FHH12250057.xml
R1# reload
R1# show version 
R1# show license
!
!
Backing Up a License:
!
R1# license save flash0:R1_license_files
license lines saved ..... to flash0:R2_license_files
!
!
R1# show flash0:
-# - --length-- -----date/time------ path
1
2
68831808 Apr 2 2013 21:50:32
+00:00 c1900-universalk9-mz.SPA.152-4.M3.bin
1153 Apr 27 2013 01:34:32 +00:00 R1_license_files
182398976 bytes available (68832961 bytes used)
R1#
!
!
!
Uninstalling a License:
!
R1(config)# license boot module c1900 technology-package seck9 disable
R1(config)# do reload
<output omitted>
R1# license clear seck9
R1# configure terminal
R1(config)# no license boot module c1900 technology-package seck9 disable
R1(config)# do reload
!
!
!
Password Recovery:
!
Step 1. Use the power switch to turn off the router, and then turn the router back on.
Step 2. Press the break key specified by your terminal software within 60 seconds of powerup
to access the ROMmon prompt. For Tera Term, use the key combination Alt+b.
Step 3. Enter confreg 0x2142 at the ROMmon prompt. This causes the router to bypass the
startup configuration where the forgotten password is stored.
Step 4. Enter reset at the prompt. The router reboots, but it ignores the saved configuration.
However, the file still exists in NVRAM.
Step 5. Press Ctrl-C to skip the initial setup procedure.
Step 6. Enter enable at the Router> prompt. This puts you into privileged EXEC mode,
where you should be able to see the Router# prompt.
Step 7. Enter copy startup-config running-config to copy the backup NVRAM config file
into memory.
Step 8. Enter configure terminal.
Step 9. Enter the enable secret password command to change the enable secret password.
Step 10. Issue the no shutdown command on every interface that you want to activate.
Step 11. From global configuration mode, enter config-register 0x2102 to restore the original
configuration registry setting.
Step 12. Press Ctrl-Z or enter end to leave configuration mode.
Step 13. Enter copy running-config startup-config to commit the changes. You can issue
the show ip interface brief command to confirm that your interface configuration is
correct. Every interface that you want to use should display up and up.
You have now completed password recovery. Entering the show version command confirms that
the router will use the configured config register setting on the next reboot.
```
