# 02 Cisco Device Management

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN1/02 Cisco Device Management.txt`  
> Original source context: 03 NETACAD / ICDN1. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Setting the System Clock:
R1# clock set 18:19:00 Aug 10 2015

Configure and Verify NTP:
R1(config)# ntp server 200.225.10.233
R1(config)# ntp update-calender
R1# show clock detail
R1# show ntp associations
R1# show ntp status

SYSLOG:
Service Timestamp:
R1(config)# service timestamp log datetime msec
R1(config)# service timestamp debug datetime msec

Default Logging:
R1(config)# logging console 
R1(config)# logging buffered 

Router and Switch Commands for Syslog Clients:
R1(config)# logging 192.168.3.100 
R1(config)# logging trap 4
R1# show logging


Router File Systems:
R1# pwd 
R1# show file system
R1# show flash:
R1# dir flash:
R1# cd nvram: 
R1# dir


Backing Up and Restoring Using Text Files:
Use Terra Term

Backing up and Restoring TFTP:
R1# copy runnig-config tftp 
R1# copt tftp runnig-config


Using USB Ports on a Cisco Router:
R1# dir usbflash0:
R1# copy runnig-config usbflash0:/
R1# copy usbflash0:/R1-Config runnig-config
R1# dir usbflash0:/ 
R1# more usbflash0:/R1-Config


Password Recovery:

Step 1. Enter the ROMMON mode.

Step 2. Change the configuration register to 0x2142 to ignore the startup config file.

Step 3. Make necessary changes to the original startup config file.

Step 4. Save the new configuration.

Example: 

monitor:
rommon 1 > confreg 0x2142
rommon 2 > reset 
rommon 3 > 

Router> enable
Router#copy startup-config runnig-config 
Router# configure terminal 
Router(config)# enable secret cisco
Router(config)# config-register 0x2102
Router(config)# exit
Router# copy running-config startup-config
Router# reload
R1#


Steps to Backup IOS Image to TFTP Server:
R2# copy flash0: tftp:

The boot system Command:
R1(config)# boot system flash0://c1900-universalk9-mz.SPA.152.-4.M3.bin


Licensing:
Review cisco license:
R1# show license feature

Display Cisco Unique Device Identifier (UDI):
R1# show licence udi

Permanent License Installation:
R1# license install flash0:seck9-C1900-SPE150_K9-FAB12340099.xml

License Verification:
R1# show version 
R1# show license


Activate an Evaluation Right-To-Use License:
R1(config)# license accept end user agreement 
R1(config)# license boot module c1900 technology-package datak9 

Back up the License:
R1# license save flash0:all_licenses.lic
R1# license install flash0:all_licenses.lic

Uninstall the License:
Step1. Disable the tecnology package:
R1(config)# license boot module c1900 tecnology-package seck9 disable
R1(config)# exit
R1# reload
Step2. Clear the License:
R1# license clear seck9
R1# configure terminal
R1(config)# no license boot module c1900 technology-package seck9 disable
```
