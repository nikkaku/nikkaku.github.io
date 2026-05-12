---
slug: raspberry-pi-4b-install-os
title: Raspberry Pi 4B 指北針
date: 2024-09-29
updated:  2024-10-03
tags: [raspberry pi, linux]
category: linux
---

順風順水試試樹莓派體驗 arch linux arm，依照官網給的方法安裝~就沒問題了~

依照官方步驟正常進入系統沒問題，可更新後引導就會出現了 uboot 的飛船與一排藍色企鵝，進入系統時間也延長了不少，想著恢復到初始引導就好，結果替換後反而無法進入系統，而且如果使用記憶卡作為開機碟也會卡在初始引導，要修復要自行手動進行編譯，下策最後只好暫時先轉向使用 debian。

debian 的過程就方便許多，無論是用 dd 去寫入或用 raspberry pi os 的軟體進行都非常快速，連記憶卡寫入過程都不用一分鐘， 用 root 登入首要更新系統無壓力，再來**非常強烈建議馬上建立新使用者**，除了常被告誡問題外，這次因為使用 tmux 操作不當導致帳號無法正常驗證登入，後續只好整個打掉重來 🙃，看來沒問題就打算就直接用 command pattern，可以參考以下進行新增刪減符合自己的狀況。

```bash
apt update
apt upgrde
apt install wget curl git vim zsh sudo
apt install tmux neofetch
useradd -m -g users -G audio,video-s /bin/bash {username}
```

設定使用者權限 vim /etc/sudoers

```bash
{username} ALL=(ALL:ALL)ALL
```

後續重啟並登入新帳號即可開始佈置環境，另外暫時不推薦為了使用 ifconfig 去安裝 net-tools，可該用 ip a 看網路硬體，沒啟用 wifi 硬體用 ifup 啟用，還有引導太久沒更新也可以安裝並進行更新。

```bash
ip a
sudo ifup {wifiname}
vim /etc/network/interfaces.d/wlan0
reboot
```

另外如果沒有更新過 raspberry pi 的引導也可以順手更新一下

```bash
sudo rpi-eeprom-update
```

接著就是常規更新 shell 的項目

1. cat /etc/shells
2. chsh -s $(which zsh)
3. oh my zsh
4. powerlevel10k
5. p10k configure
6. exec $SHELL

中文輸入法暫時還沒嘗試出來，另外最後記錄一下 raspberry pi os 遇到的，安裝選擇英文來走，除了方便路徑操作不用再轉換輸入中文，中文預設的酷注音輸入法在 bookworm 會閃爍不能輸入，目前查出的解決方法是把 Wayland 變更為 X11 重開就可以正常使用。
