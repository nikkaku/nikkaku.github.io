---
slug: tmux-note
title: tmux 快捷筆記
date: 2025-01-26
description: 紀錄常用的 tmux 指令與稍微敘述安裝
tags: [tmux]
category: linux
---

常用的 tmux 記錄起來，方便查詢。

mac 可用 homebrew 安裝，linux 則可用 apt 、 pacman 或 flatpak 依照分支自己尋找適合的方式，快捷鍵的起手通常都會透過輸入 `ctrl` + `b` 進行，也就是所謂的 prefix key，後續輸入會用 `<prefix key>` 作為示意。

每一個 session 可以被視為獨立的 tmux ，在需要遠端背景運作相當方便，不用另外在安裝 zellij 或搭配其他分頁工具一氣呵成~雖然對 rust 還抱有很大的期望就是了🥲~

附上 .tmux.config，習慣是使用亮色在搭配 zsh 且不顯示名稱只保留日期，需要調整使用再自行配置

```tmux
set -g default-terminal "screen-256color"

set -g status-bg "#d4d1cb"
set -g status-fg "#2d2b2b"

set -g status-right "%H:%M %d-%m-%y"

set-option -g default-shell /opt/homebrew/bin/zsh
```

## window

| 按鍵 | 說明 |
| - | - |
| `<prefix key>` + `c` | 新增 |
| `<prefix key>` + `,` | 重新命名  |
| `<prefix key>` + `&` | 關閉 |
| `<prefix key>` + `p` | 前往下一個  |
| `<prefix key>` + `n` | 前往上一個 |
| `<prefix key>` + `<number>` (1 ~ 9) | 前往第 n 個  |
| `<prefix key>` + `w` | 視覺化方式進行切換  |

## pane

| 按鍵 | 說明 |
| - | - |
| `<prefix key>` + `%` | 垂直分割 |
| `<prefix key>` + `"` | 水平分割 |
| `<prefix key>` + `z` | 進入當下 |
| `<prefix key>` + `!` | 將當前分割獨立出為一個 window |
| `<prefix key>` + `x` | 關閉( 也可用 ctrl + d ) |
| `<prefix key>` + `q` | 顯示當前 window 下所有 pane 的順序 |
| `<prefix key>` + `o` | 輪流切換 |
| `<prefix key>` + `z` | 全螢幕切換(再一次反之) |
| `<prefix key>` + `<direction key>` (方向鍵) | 指定方向切換 |
| `<prefix key>` + `<space>` | 切換佈局 |
| `<prefix key>` + `<ctrl> +<direction key>` (方向鍵) | 調整尺寸 |

## session

session 類似 screen 的效果，對於需要遠端的背景執行的狀態很好用。

| 按鍵 | 說明 |
| - | - |
| `tmux` | 新增 |
| `tmux ls` | 列出所有 |
| `tmux new -s <name>` | 新增並命名 |
| `tmux rename-session -t <n> <name>` | 重新命名第 n 個 |
| `tmux rename-session -t <old name> <new name>` | 重新命名 old name 為 new name |
| `tmux attach -t <n>` | 使用第 n 個 |
| `tmux attach -t <name>` | 使用 <name> session |
| `tmux kill-session -t <n>` | 關閉第 n 個 |
| `tmux kill-session -t <name>` | 關閉 <name> session |
| `tmux kill-session -a` | 關閉所有 |
| `tmux kill-server` | 關閉 tmux server |
| `<prefix key>` + `$` | 重新命名 |
| `<prefix key>` + `d` | 離開目前 |
| `<prefix key>` + `s` | 視覺化方式切換 |
| `<prefix key>` + `L` | 切換至上個用過的 |
| `<prefix key>` + `(` | 前往上一個 |
| `<prefix key>` + `)` | 前往下一個 |

## search

| 按鍵 | 說明 |
| - | - |
| `<prefix key>` + `f` | 搜尋所有 window 關鍵字 |

## 移動操作

想使用滑鼠操作可在 .tmux.config 內設定新增 set -g mouse on 即可，或是使用 \<prefix key\> 後再輸入 :set mouse on 也可以完成操作，但如果單純依賴鍵盤就可以運用 copy mode 的方式進行閱讀，也可以進行區塊複製，但預設貼上的位置也僅限 tmux 內，需要把複製的內容與一般複製互通可以再找找教學，這邊就不贅述。

| 按鍵 | 說明 |
| - | - |
| `<prefix key>` + `[` | 往上 |
| `<prefix key\` + `]` | 往下 |
| `<space>` | 選擇 |
| `<enter>` | 複製 |

更多指令可以參考 `man tmux`
