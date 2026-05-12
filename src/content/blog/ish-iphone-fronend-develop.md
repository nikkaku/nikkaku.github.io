---
slug: ish-iphone-fronend-develop
title: 淺聊 iSH 在 iphone 上進行前端開發
date: 2024-09-02
updated:  2024-09-02
tags: [terminal, ios, ish]
category: 前端
---

前陣子因為聚會中突然想 coding 驗證看看某個方案是否可行，但電腦又不會隨時帶在身邊，碰巧爬文爬到了一個蠻有吸引力的解決方案 iSH。

安裝後的預設是 alpine 3.14，雖然離目前最新 3.20 有點距離，可如果單純只是拿來 ssh 進行遠端連線進行開發其實已經足夠，因為系統配置都在遠端上(笑)。本地測試後不能進行完整開發，除了系統只支援 32 bit 有許多軟體不支援，其次硬體虛擬化的限制導致轉譯效能低也是個問題，簡單測試起一個 node 或 vite 也需要花相當長時間的過程啟動才能運作，甚至 npm 會因環境導致部分 api 無法正常使用，建議還是用遠端進行體驗會好真的很多。

![neofetch](/images/ish-iphone-fronend-develop/1.png)

如果要更換 linux 發行版可在 settings 內的 Filesystems 掛載引導，完成後 app 會自動關閉重新打開即可正常使用，但如果要變更 ish 原本的 alpine 的來源，記得要先除去 ish 保護 `rm /ish -rf` 重新開啟時才不會被恢復，並執行 `apk upgrade && apk fix` 即可正常取得設定的來源清單，另外也有人嘗試安裝 debian 等等發行版，有興趣可以試試應該會有不錯的體驗。

## 參考

- https://github.com/ish-app/ish
- https://ivonblog.com/posts/ios-ish-shell
- https://github.com/andrewintw/run-alpine-linux-on-ios
