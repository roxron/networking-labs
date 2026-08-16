# 021 Troubleshooting

> Imported source note. Provenance: `NetEngineer_Journal/08 DAVID BOMBAL/Cumulus + Ansible Automation/021 Troubleshooting`  
> Original source context: 08 DAVID BOMBAL / Cumulus + Ansible Automation. Content is preserved as historical study material; validate commands against the target platform and release.

```text
See packets count and errors:
!
$ ip -s link show dev bond0
!
$ ip -s -s link show dev bond0
!
!
See interface hardware parameters and statistics:
!
$ sudo ethtool swp1
!
$ sudo ethtool -S swp1
!
!
Provides RX and TX SFP information:
!
$ sudo ethtool -m swp1 | egrep '(swp|RXPower :|TXPower)'
!
!
LLDP:
!
$ lldpctl 
$ sudo lldpctl show neighbors 
!
!
Display sensors:
!
$ sensors
!
!
View Net Statistics:
!
$ sudo cl-netstat 
!
!
Display brief interface information:
!
$ netshow interfaces all 
!
!
Display brief information about the system:
!
$ netshow system
!
!
Displays STP infromation:
!
$ netshow interface bridge 
!
!
Generate Tech Support file:
!
$ sudo cl-support 
!
!
Ping with source specific interface:
!
$ ping -I 10.3.3.1 10.4.4.1
!
!
Traceroute:
!
$ traceroute www.google.com 
!
!
Verify Routing table:
!
$ ip route show 
!
$ ip route get 
!
$ ip route get 3.3.3.3
!
!
TCPDUMP:
!
$ sudo tcpdump -i bond0 src host 10.3.3.1
!
!
Show ARP Table:
!
$ arp -a 
!
Delete ARP entries:
!
arp -d 
!
!
Generating Traffic with mz
!
$ sudo mz swp1 -A 11.0.0.1 -B 11.0.0.2 -c 2 -v -t tcp "dp=23-24"
!
$ iperf
!
!
Verify health of the Switch: 
!
dev/watchdog
/etc/watchdogconffile
!
!
Logs are in:
!
var/log
!
switchdlog
!
quagga/{protocol}.log 
!
quagga/zebra.log
!
deamon.log 
!
Example PSU:
!
$ cat /var/log/syslog | grep smond
!
!
PSU and Fan status:
!
$ smonctl 
!
!
Switch model and serial information:
!
$ sudo decode-syseeprom
!
!
```
