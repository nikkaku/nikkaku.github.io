---
slug: hackintosh-unknown-vpn-ip
title: 黑蘋果使用 open vpn 因網路ip未顯示無法連線解決方案
date: 2018-07-24
updated: 2018-07-24
tags: [hackintosh, vpn]
---

黑蘋果使用open vpn因網路ip未顯示無法連線解決方案

```bash
netstat -rn|grep ppp0
gw=`ifconfig ppp0|grep inet| awk '{ print $4 }'`
sudo route change default $gw -ifscope ppp0
```

參考
- [https://vpn.ac/knowledgebase/87/Mac-OpenVPN-fails-to-set-default-gateway-over-PPP-PPTP-L2TPorIPsec-3G.html](https://vpn.ac/knowledgebase/87/Mac-OpenVPN-fails-to-set-default-gateway-over-PPP-PPTP-L2TPorIPsec-3G.html)