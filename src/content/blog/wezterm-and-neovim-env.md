---
slug: wezterm-and-neovim-env
title: wezterm 與 neovim 前端環境設定分享
date: 2024-08-05
updated:  2024-09-13
tags: [terminal]
category: frontend
---

這篇是關於兩個前端開發過程中，學習 wezterm 與 nvim 的內容紀錄與分享。

# wezterm

此篇拿來使用方法、檢視設定、遇到的問題與往後想要達到的狀態，算是探索 terminal 的過程，之前使用 terminal 的順序分別為 iterm ->  alacritty -> wezterm ，iterm 不用多說以前肯定是接觸 mac 後第一個會安裝的使用的酷東西，後來更換到 alacritty 執行速度真的快到不像話，可前端在開發會需要多個窗口，解決方法也是可以依賴 zellij 快速搞定，後續在使用上 wezterm 比較能達到一個平衡~而且不得不說 alacritty 的 icon 放在 mac 的 dock 上真的相當突兀~，預設 shell 是省心的 zsh + oh my zsh + powerlevel10k。

## TODO
- [x] 預設的 opt(alt) 加上方向鍵在 mac 無法使用，改為自行設定 ctrl + cmd。
- [ ] 設定自訂視窗分割僅限於 mac 上使用，尚未在 window 與 linux 上測試，所以不全部套用。

## 快捷鍵

1. 新增分頁 cmd + t
2. 切換分頁 cmd + number key
3. 水平分割視窗畫面 ctrl + shift + opt + "
4. 垂直分割視窗畫面 ctrl + shift + opt + %
5. 移動分割區域 ctrl + cmd + arrow key

#### **`~/.wezterm.lua`**
```lua
local wezterm = require 'wezterm'
local act = wezterm.action
local config = wezterm.config_builder()
-- config.color_scheme = 'AdventureTime'
config.font = wezterm.font 'MesloLGS NF'
config.font_size = 14

config.keys = {
  {
    key = 'LeftArrow',
    mods = 'CMD|CTRL',
    action = act{ ActivatePaneDirection = 'Left' }
  },
  {
    key = 'RightArrow',
    mods = 'CMD|CTRL',
    action = act{ ActivatePaneDirection = 'Right' }
  },
  {
    key = 'UpArrow',
    mods = 'CMD|CTRL',
    action = act{ ActivatePaneDirection = 'Up' }
  },
  {
    key = 'DownArrow',
    mods = 'CMD|CTRL',
    action = act{ ActivatePaneDirection = 'Down' }
  },
}

return config
```

# neovim

使用 nvim 前都習慣用 vscode 作為主要的 IDE 現在也依然在使用，確實上手速度與體驗上都相當優良直到現在依然也相當推薦，可開發時間長了會發現與其仰賴滑鼠進行操作，如果能在鍵盤上就完成全部除了可以節省更多時間且是多麽有魅力與成就感的，在未有提供 GUI 的環境下也無法使用 vscode 帶來的好處，所以就萌生了使用 nvim 的這條路，後續會把設定與檔案分開整理至下方內容中。

## TODO
- [ ] ~NvChad~
- [ ] ~Codium AI~

## 快捷鍵
| 按鍵 | 操作 |
|-|-|
| h / j / k / l | 左 / 下 / 上 / 右 |
| i / I | 在位置前編輯模式 / 移動至此行開頭進行編輯模式 |
| a / A | 在位置後編輯模式 / 移動至此行結尾進行編輯模式 |
| o / O | 新增一行並進入編輯模式 / 回到上一行並進入編輯模式 |
| gg | 跳至第一行 |
| G | 跳至最後一行 |
| {n}G | 跳至 n 行 |
| ctrl + o | 回到前一個位置 |
| esc | 退出編輯 |
| :wq / ZZ | 存檔離開 |
| :q! / ZQ | 不儲存離開 |
| viB / vib | 選取 {} 或 () / 選取整個 {} / () |
| ciB / cib | 刪除 {} 或 () / 刪除整個 {} / () |
| dd | 剪下整行 |
| y | 複製行 |
| p | 貼上 |
| ~ | 當前位置文字大小寫轉換 |
| % | 在括弧開始處跳至括弧內的結束行數 |
| Shift + ~ | 變更大小寫 |
| g~w | 字串變大寫 |
| % | 跳至各種括號頭尾 |

## 搜尋

| 按鍵 | 操作 |
|-|-|
| / | 搜尋 |
| :noh | 取消搜尋 |
| n / N | return 後搜尋下一個與上一個 |

## 快捷組合功能

| 按鍵 | 操作 |
|-|-|
| ctrl + v + 選取行 +  I | 可同時編輯 |
| ctrl + v + G + $ | 全選 |
| ctrl + v + G + $ + A | 修改最後 |
| gg + = + G | 檔案排列整齊 |
| ctrl + z / fg | 跳出檔案 / 回到檔案 |
