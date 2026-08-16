# 09 ZTP Script Example

> Imported source note. Provenance: `NetEngineer_Journal/08 DAVID BOMBAL/Cumulus + Ansible Automation/09 ZTP Script Example`  
> Original source context: 08 DAVID BOMBAL / Cumulus + Ansible Automation. Content is preserved as historical study material; validate commands against the target platform and release.

```text
#!/bin/bash

#update and upgrade packages
apt-get -q -y update 
apt-get -q -y dist-upgrade 
apt-get -q -y install puppet 

# install license
wget -q -O /root/license.txt http://10.99.0.1/license.txt
cl-license -i /root/license.txt

#CUMULUS-AUTOPROVISIONING 
exit 0

# Apply changes
switchreboot/ servers switchd restart
```
