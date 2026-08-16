# 55 Time-Based Key Chain Configuration

> Imported source note. Provenance: `NetEngineer_Journal/04 CISCOPRESS/CCNP/CCNP ROUTE/55 Time-Based Key Chain Configuration`  
> Original source context: 04 CISCOPRESS / CCNP / CCNP ROUTE. Content is preserved as historical study material; validate commands against the target platform and release.

```text
!Configuration on Router R1
R1# conf term
R1(config)# key chain R1KEYCHAIN
R1(config-keychain)# key 1
R1(config-keychain-key)# key-string PRIMARY_KEY
R1(config-keychain-key)# accept-lifetime 01:00:00 April 1 2014 01:00:00 May 2 2014
R1(config-keychain-key)# send-lifetime 01:00:00 April 1 2014 01:00:00 May 2 2014
R1(config-keychain-key)# exit
R1(config-keychain)# key 2
R1(config-keychain-key)# key-string SECONDARY_KEY
R1(config-keychain-key)# accept-lifetime 01:00:00 May 1 2014 infinite
R1(config-keychain-key)# send-lifetime 01:00:00 May 1 2014 infinite
R1(config-keychain-key)# end
R1#
!
!
!Configuration on Router R2
R2# conf term
R2(config)# key chain R2KEYCHAIN
R2(config-keychain)# key 1
R2(config-keychain-key)# key-string PRIMARY_KEY
R2(config-keychain-key)# accept-lifetime 01:00:00 April 1 2014 01:00:00 May 2 2014
R2(config-keychain-key)# send-lifetime 01:00:00 April 1 2014 01:00:00 May 2 2014
R2(config-keychain-key)# exit
R2(config-keychain)# key 2
R2(config-keychain-key)# key-string SECONDARY_KEY
R2(config-keychain-key)# accept-lifetime 01:00:00 May 1 2014 infinite
R2(config-keychain-key)# send-lifetime 01:00:00 May 1 2014 infinite
R2(config-keychain-key)# end
R2#
```
