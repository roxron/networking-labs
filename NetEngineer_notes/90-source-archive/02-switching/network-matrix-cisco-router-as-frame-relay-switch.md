# Cisco Router as Frame Relay Switch

> Imported source note. Provenance: `NetEngineer_Journal/Network Matrix/Cisco Router as Frame Relay Switch`  
> Original source context: Network Matrix. Content is preserved as historical study material; validate commands against the target platform and release.

```text
Cisco Router as Frame Relay Switch 
Commands:
FR1(config)#  frame-relay switching 
FR1(config)# interface S0/0/0
FR1(config-if)# clock rate 64000
FR1(config-if)# encapsulation freme-relay 
FR1(config-if)# frame-relay intf-type dce 
FR1(config-if)# frame-relay-route 100 interface S0/0/1 200
FR1(config-if)# no shutdown 

FR1(config)# interface S0/0/1
FR1(config-if)# clock rate 64000
FR1(config-if)# encapsulation frame-relay 
FR1(config-if)# frame-relay  intf-type dce
FR1(config-if)# no shutdown 

Verify frame-relay switch 
Commands:
FR1# show frame-relay pvc
FR1# show frame-relay route

Configure Frame Relay trunk between two Switches
Command 
FR1(config)# intreface S0/1/0 
FR1(config-if)# encapsulation frame-relay 
FR1(config-if)# frame-relay intf-type nni 
FR1(config-if)# clock rate  250000
FR1(config-if)# frame-relay route 500 interface S0/0/0 101

FR1(config-if)# no shutdown 

FR2(config)# frame-relay switching 
FR2(config)#interface S0/1/0
FR2(config-if)# encapsulation frame-relay 
FR2(config-if)# frame-relay intf-type nni 
FR2(config-if)# clock rate 250000
FR2(config-if)# frame-relay route 500 interface S0/0/0 100 
FR2(config-if)# no shutdown  

Another way to make DLCI mapping on FR switch
FR1(config)# connect R1-R2 serial 0/0 102 serial 0/1 201 
FR1(config)# connect R1-R3 serial 0/0 103 serial 0/2 301




Frame Raley  DLCI to Port Mapping table 

Switch FR1 :
________________________________________________________
Devices:  R1-->R3, R3-->R1  
DLCI     Port            TO          DLCI               Port 
     16       S0/0                               17                  S0/1
     17       S0/1                               16                  S0/0
_________________________________________________________
Devices: R1-->R2, R2-->R1 
  DLCI     Port            TO          DLCI               Port 
     17        S0/0                              16                  S0/2
     16        S0/2                              17                  S0/0 
_________________________________________________________
Devices: R1-->R4, R4-->R1 
  DLCI     Port            TO          DLCI               Port 
    18         S0/0                              17                  S0/2  
    17         S0/2                              18                  S0/0
_________________________________________________________
Devices:  R3-->R2, R2-->R3
  DLCI     Port            TO          DLCI               Port 
    16         S0/1                              18                  S0/2
    18         S0/2                              16                  S0/1 
_________________________________________________________
Devices: R3-->R4, R4-->R3 
  DLCI     Port            TO          DLCI               Port 
    18         S0/1                              19                  S0/2 
    19         S0/2                              18                  S0/1 
___________________________________________________________
Assigned DLCI on ports to FR1:
 S0/0 - 16,17,18
 S0/1 - 16,17,18 
 S0/2 - 16,17,18,19 

Switch FR2: 
__________________________________________________________
Devices: R2-->R4, R4-->R2
  DLCI     Port            TO          DLCI               Port 
    16         S0/0                              17                  S0/1
    17         S0/1                              16                  S0/0
__________________________________________________________
Devices: R2-->R1, R1-->R2
  DLCI     Port            TO          DLCI               Port 
    17         S0/0                              16                  S0/2
    16         S0/2                              17                  S0/0 
___________________________________________________________
Devices: R2-->R3, R3-->R2 
  DLCI     Port            TO          DLCI               Port 
     19        S0/0                              18                  S0/2
     18        S0/2                              19                  S0/0
___________________________________________________________
Devices: R4-->R1, R1-->R4
  DLCI     Port            TO          DLCI               Port 
    16         S0/1                              17                  S0/2 
    17         S0/2                              16                  S0/1
___________________________________________________________
Device R4-->R3, R3-->R4
DLCI     Port            TO          DLCI               Port 
    18       S0/1                              19                  S0/2 
    19       S0/2                              18                  S0/1
___________________________________________________________
Assigned DLCI on ports to FR1:
S0/0 -  16,17,19 
S0/1 -  17,16,18
S0/2 -  16,18,17,19
```
