# 06 EtherChannel

> Imported source note. Provenance: `NetEngineer_Journal/03 NETACAD/ICDN2/06 EtherChannel`  
> Original source context: 03 NETACAD / ICDN2. Content is preserved as historical study material; validate commands against the target platform and release.

```text
ETHERCHANNEL

Configuring PAgP:

S1(config)# interface range F0/1-2
S1(confi-if)# channel-group 1 mode desirable
S1(config-if)# no shutdown


S2(config)# interface range F0/1-2
S2(config-if)# channel-group 1 mode auto
S2(config-if)# no shutdown


Configuring LACP:

S1(config)# interface range F0/1-2
S1(config-if)# channel-group 2 mode active
S1(config-if)# no shutdown

S2(config)# interface range F0/1-2
S2(config-if)# channel-group 2 mode passive
S2(config-if)# no shutdown 

Configuring Trunk ports on EtherChannel:

S1(config)# interface port-channel 1
S1(config-if)# switchport mode trunk
S1(config-if)# switchport trunk native vlan 10

S2(config)# interface port-channel 1 
S2(config-if)# switchport mode trunk
S2(config-if)# switchport trunk native vlan 10

Verify ETHERCHANNEL:

S1# show etherchanel summary
S1# show interfaces port-channel 1
S1# show etherchannel port-channel
S1# show interfaces F0/1 etherchannel
```
