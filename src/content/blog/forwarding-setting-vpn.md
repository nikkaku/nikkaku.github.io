---
slug: forwarding-setting-vpn
title: 透過 Forwarding 設定轉送 VPN
date: 2025-09-06
updated:  2026-01-10
description: 透過 Forwarding 設定轉送 Fortinet VPN
category: linux
---

範例使用樹莓派 4B 搭配 Raspberry Pi OS 當作跳板安裝 openfortivpn，開發環境使用 Mac，期望結果是使用的連線請求中如果有包含需要跳 VPN 的 IP 則透過樹莓派進行轉送，其餘則依照原來的方式進行網路溝通避免風險。順帶一提如果 openfortivpn 開啟後沒多久就關閉甚至無法連線，可檢查看看版本是否為 1.23.1 且 pppd 版本為 2.5.0，剛好很巧的都一樣，可以試試自行編譯 openfortivpn 1.19.0 與 pppd 2.4.9，這個組合是用在 Raspberry Pi OS 版本 12 (bookworm) 內的，如果更新至 13 (trixie) 的話不知道是不是 aarch64 的關係，測試了兩三個已經更新上去的系統都有遇到一樣的問題，自行編譯 pppd 過程也會提醒 options.c:58:10: fatal error: pcap.h: No such file or directory，額外安裝 libpcap-devel 即可正常編譯出來。


## 樹莓派 & openfortivpn 流程

除了安裝 openfortivpn 也會依序設定 route、IP Forwarding 與 nftables，另外稍加解釋名詞或套件，參考一下指令進行安裝

- tcpdump: 查看網路流量
- IP Forwarding: 允許 Linux 核心收到封包進行轉送
- nftables / iptables: 轉送封包(NAT)，nftables 與 iptables 擇一安裝使用即可，推薦使用 nftables 因 debian 系列預設是使用 nftables

```bash
apt install openfortivpn tcpdump nftables iptables -y
```

### openfortivpn & route 設定

設定 openfortivpn host 跟 port 是服務開出來的網址，username 與 password 是帳密，而 trusted-cert 是金鑰，如果是第一次使用未填寫則會生成，填入後再使用一次即可，set-routes 則是避免所有流量都走 VPN，得另外設定 route 才使用。

```bash
nvim /etc/openfortivpn/config
```

```ini
host = example.com
port = 443
uesrname = amu
password = 0000
trusted-cert = 1234abcd
set-routes = 0
```

```bash
openfortivpn
```

使用後只要內容裡有包含 INFO: Tunnel is up and running. 即完成 openfortivpn 的設定，緊接著新增需要轉跳的 IP 進入 route 內，

```bash
ip route add {IP} dev ppp0
```

查看是否新增成功

```bash
ip route get {IP}
```

需要啟用時直接啟動 openfortivpn 則設定一下 systemctl

```bash
systemctl enable openfortivpn
systemctl start openfortivpn
```

### IP Forwarding 設定

開啟功能並允許 Mac 流量透過機器作為 route 轉送，如果只需要暫時生效可以使用 sysctl -w net.ipv4.ip_forward=1，下方則是永久性設定，

```bash
nvim /etc/sysctl.conf
```

解除內容註解，

```ini
net.ipv4.ip_forward=1
```

套用修改內容，

```bash
sysctl -p
```

若要永久生效也可以使用 sh -c "iptables-save > /etc/iptables/rules.v4"

驗證 IP forwarding 是否生效，如果為 1 則是開啟，反之 0 則是關閉，

```bash
cat /proc/sys/net/ipv4/ip_forward
```

### nftables 設定

需搭配 IP Forwarding，也使用暫時性方式使用，如要要永久性則要把 ruleset 匯出至檔案或編輯新增檔案選擇一個即可

暫時
```bash
sudo nft add table ip nat
sudo nft add chain ip nat POSTROUTING { type nat hook postrouting priority 100\; }
sudo nft add rule ip nat POSTROUTING oifname "ppp0" masquerade
```


匯入

```bash
nft list ruleset > /etc/nftables.conf
systemctl enable nftables
```

新增檔案建立規則檔案

```bash
nvim /etc/nftables.conf
```

```conf
#!/usr/sbin/nft -f

flush ruleset

table ip nat {
  chain postrouting {
    type nat hook postrouting priority 100;
    oif "ppp0" masquerade
  }
}
```

啟用 nftables

```bash
systemctl enable nftables
systemctl start nftables
```

測試 NAT 規則

```bash
nft list ruleset
```

### 驗證

接著驗證看看是否設定沒問題

```bash
ifconfig ppp0
netstat -rn
ping {ip} # 要連線的 IP
curl { url or IP }
```

## Mac 開發環境

先整理出需要連線的 url 路徑 IP，可以用以下其中一個測試出來

```bash
dig +short example.com
nslookup example.com
ping example.com
traceroute example.com
curl example.com
```

操作路由轉導，前面是上述查出的 IP，而後面則是 openfortivpn 服務的 IP，-n 不要做名稱解析(no DNS lookup)，只顯示數字，不做解析會更快。

```bash
# 新增
route add -n {IP} {openfortivpn Client IP}

# 刪除
route delete -n {IP} {openfortivpn Client IP}
```

OK 現在設定完成了，接者驗證是否走的路徑是正確的

```bash
netstat -rn

# 過濾出特定 IP
netstat -rn | grep { ip }

route -n get default

# 看看第一個出去的是否是通過 openfortivpn 跳板的機器
traceroute {url or ip}
```

## 後記

route 是揮發性的重新開機後就會消失，以流程上是蠻方便的不會忘記關閉，另外如果只有特定軟體才使用 VPN 也可以試試 SOCKS Proxy 也很好用。

### 自動啟用

如果重新開機需要一次就執行完需要設定的內容可以使用腳本，例如設定成 sh

Mac 新增檔案 vpn-routes.sh

```bash
#!/bin/bash
IP=192.168.0.2

sudo route add -n 10.10.0.1 $IP
sudo route add -n 10.10.0.2 $IP
```

執行 bash vpn-routes.sh，也可以把腳本加入到常用的 shell e.g .zshrc，路徑記得調整

```bash
alias vpnroutes="sudo vpn-routes.sh"
```

### linux 查看目前 route

```bash
ip route show
```

### 監控連線 e.g ppp0

```bash
tcpdump -i ppp0

# 過濾出經過 ppp0 的 IP
tcpdump -i ppp0 host {IP}
```
