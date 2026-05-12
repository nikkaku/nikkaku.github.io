---
slug: raspberry-pi-4b-build-nvim-app
title: Raspberry Pi 4B 番外之自行編譯 nvim 過程
date: 2024-10-12
updated:  2025-1-31
tags: [raspberry, vim]
category: linux
---

## 前言

在 raspberry pi 4b 上用 raspberry os 搭 xfce 上斷斷續續使用了一陣子，速度在前端開發上真的不是很理想，單純開發前端一個 vscode 、一個 node 服務再搭個 firefox 純預覽產品真就慢到懷疑人生是不是選錯職業，原本想用 nvim 取代 vscode ，但 apt 上的版本落差真的有點距離，索性就產出這篇文記錄一下自己打包的過程，順便摸索有沒有其他方法可以讓開發變得更加流暢，寫個筆記自行編譯的過程方便之後查閱抄作業。

## 實作

從 github 下載 nvim

```bash
git clone https://github.com/neovim/neovim.git
cd neovim
git checkout stable
```

安裝編譯所需要的依賴，在這一步糾結滿久要不要安裝某些套件，這裡提供一個方法，可以去 debian 的 package 倉庫看看打包文件到底需要哪些東西，直接看系統下套件會安裝哪些套件，可以大大減少缺東西或錯誤乃至套件換名稱找不到了窘境。

```bash
sudo apt-get install ninja-build gettext cmake unzip curl build-essential
```

最後在進行編譯

```bash
make CMAKE_BUILD_TYPE=Release
sudo make install
cmake -S cmake.deps -B .deps -G Ninja -D CMAKE_BUILD_TYPE=RelWithDebInfo -DUSE_BUNDLED=OFF -DUSE_BUNDLED_LIBUV=ON -DUSE_BUNDLED_LUV=ON -DUSE_BUNDLED_TS=ON -DUSE_BUNDLED_UTF8PROC=ON
cmake --build .deps
cmake -B build -G Ninja -D CMAKE_BUILD_TYPE=RelWithDebInfo
cmake --build build
```

查看版本，如果未增加可指令可進行寫入 ( e.g bash )

```bash
nvim --version
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

## 參考
- https://github.com/neovim/neovim/blob/master/BUILD.md
- https://packages.debian.org/sid/source/neovim
- https://aws.amazon.com/tw/compare/the-difference-between-apt-and-apt-get/
