---
slug: arch-linux-install
title: Arch Linux 基本安裝
date: 2024-07-20
updated:  2024-07-22
tags: [arch, linux]
category: linux
---

目前可以選擇的 Linux 分支相當多，GUI 的畫面與流程讓整個難度上也降低了不少，其中 Arch 算是比較有趣的，官方收入上雖然有 script 腳本可方便進行整個安裝流程，可當一個一個進行設定安裝可以認識到每個步驟做了些什麼，讓使用者能更掌握整個系統的狀況與內容，當問題發生的時候也可以更快判斷解決。

# 前置動作

1. 製作安裝隨身碟，在 Arch Linux 官方下載，先來說說 Windows 下可以用 rufus 寫入，Mac 或 Linux 用 dd 製作。
2. BIOS 需要禁用安全啟動 Secure Boot。

# 進入系統後檢查
1. 檢查 UEFI 啟用的系統64位元 cat /sys/firmware/efi/fw_platform_size。
2. 測試是否網路可正常運作 ping -c 3 archlinux.org，整個安裝流程原則上都需要網路進行，如使用 wifi 連線，驅動正確運作但被鎖定可用 rfkill 解除限制。
3. 安裝來源可更改 /etc/pacman.d/mirrorlist，詳細位置可搜尋 arch linux mirror list，並用 pacman -Syy 做確認連線正常。
4. terminal 字體太小可以輸入 setfont ter-132n

# 安裝
硬碟使用 /dev/sdc 硬體為 intel cpu ，預設英文語系作為範例。
1. 找出要安裝系統的硬碟並轉換為 gpt 分割表，小心整顆硬碟會消失。
    1. fdisk -l
    2. fdisk /dev/sdc
    3. (g)
2. 分區切割方法
    1. (n) ⇒ 預設新增順序(Enter) ⇒ First Sector 預設即可(Enter) ⇒ Last Sector 輸入需要的分區大小 ⇒ 輸入 t 編輯類型。
        | 輸入容量 | 格式 | 檢查 | 掛載(Mount) | 說明 |
        | --- | --- | --- | --- | --- |
        | +512MB | uefi | /dev/sdc1 512MB EFI | /boot | EFI |
        | +16GB | swap | /dev/sdc2 16GB SWAP | [SWAP] | SWAP 當記憶體使用滿載時可暫存用分區，建議為記憶體兩倍大小或記憶體的 60%，如果記憶體夠大使用頻率不高就可以不用太大，休眠記憶體用滿需要完全存入 |
        | 剩餘的 |  | /dev/sdc3 *GB Linux | / | 把剩下的空間都給 Linux |
    2. 輸入 w 確認最後寫入。
    3. fdisk -l 或 lsblk 查看是否分割正確。
    4. mkfs.fat -F32 /dev/sda1
    5. mkfs.ext4 /dev/sda3
    6. mkswap /dev/sda2
    7. mount /dev/sda3 /mnt
    8. mkdir /mnt/boot
    9. mount /dev/sda1 /mnt/boot
    10. swapon /dev/sda2
    11. df -h 看掛載是否正確
3. 用 pacstrap 安裝基礎系統
    1. pacstrap -K /mnt base linux linux-firmware intel-ucode vim
5. 設定開機掛載硬碟規則
    1. genfstab -U /mnt >> /mnt/etc/fstab
    2. cat /mnt/etc/fstab
6. 進入 chroot 當前系統
    1. arch-chroot /mnt
7. 設定時區
    1. ln -sf /usr/share/zoneinfo/Asia/Taipei /etc/localtime
    2. hwclock --systohc
8. 設定語系
    1. vim /etc/locale.gen
    2. 取消註解 en_US.UTF8 UTF-8
    3. locale-gen
    4. echo "LANG=en_US.UTF-8" >> /etc/locale.conf
9. 建立主機名稱與 host 內容
    1. echo “ArchLinux” >> /etc/hostname
    2. echo “127.0.0.1 localhost” >> /etc/hosts
    3. echo “::1 localhost” >> /etc/hosts
    4. echo “127.0.0.1 ArchLinux” >> /etc/hosts
10. 更改 root 密碼
    1. passwd
11. GRUB 開機選單引導
    安裝 GRUB 與 efibootmgr，且安裝至 EFI。
    1. pacman -S grub efibootmgr
    2. mount /dev/sda1 /boot
    3. grub-install —target=x86_64-efi —bootloader-id=GRUB —efi-directory=/boot
    4. grub-mkconfig -o /boot/grub/grub.cfg
    5. ls /boot 檢查是否安裝成功(應列出 grub 與 initramfs-linux.img)
12. 退出 chroot、取消掛載、關機或重新開機
    1. exit
    2. umount /mnt/boot
    3. umount /mnt
    4. reboot

這樣目前系統雛型就已經可以進入與使用，接著選擇使用硬碟作為開機，進入後安裝圖形化界面、中文語系與輸入法，也可以安裝 zsh .. 等等讓前端更方便順手開發的工具，讓整個系統更符合自己的時候習慣，另外官方沒收入的軟體也可以透過 aur 進行下載編譯來解決，跟 mac 的 homebrew 一樣相當方便。

![arch linux kde](/images/arch-linux-install/1.png)

# 參考
1. https://ivonblog.com/posts/install-archlinux/
2. https://wiki.archlinux.org/title/Installation_guide
