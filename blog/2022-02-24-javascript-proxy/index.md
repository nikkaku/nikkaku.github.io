---
slug: javascript-proxy
title: javascript proxy
tags: [javascript, proxy]
---

前陣子因緣際會遇到了個狀況

再不使用框架的狀態下監聽更新資料後執行某一個function去重新渲染畫面

<!--truncate-->

平常寫慣了vue一時之間還真的萌生了要不說服對方用vue去渲染的念頭

思緒先回來😩

從來沒有認真去想過vue究竟是用了什麼黑魔法去完成監聽參數的動作

再查過一些文件粗淺地了解到了是使用es6內的proxy與reflect去達到響應的

這次使用的主角就是proxy，可以透過他的包裝去攔截資料變化

進而做出類似watch等等相關動作時才達到類似監聽參數的效果

完全是一個漲姿勢以下示範直接進入示範環節先上code

詳細內容可以再去找找

參考資料
- [不只懂 Vue 語法：Vue 3 如何使用 Proxy 實現響應式（Reactivity）？](https://ithelp.ithome.com.tw/articles/10264271)
