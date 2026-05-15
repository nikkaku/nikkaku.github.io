---
slug: git-worktree
title: 快速切換開發分支的好方法 Git Worktree
date: 2026-05-14
category: frontend
---

在開發過程中難免會遇到插件或緊急 issue 要馬上修復，但手頭上開發還沒到達一個段落，除了 stash 外也可以試試 worktree，使用上比起單純的 stash 後切換分支更加方便外，也可以解決同時並行多個修改的或操作 。

開始先新增一個 branch，如果原本就有分支可以省略 `-b` ， fix/error-function 是分支名稱，而 fix 會在專案內增加一個資料夾，他不會被當前的 git 判斷為變動檔案，最後的 main 則是你要在哪個分支或節點上延伸出來，用 cd 進入到資料夾內，可以看到結構與內容都與當前專案相同，分支也會自動切換為剛剛新增的 fix/error-function，後續就可以依照開發流程進行開發。

```bash
git worktree add -b fix/error-funcion fix main
cd fix/error-function
```

結束後則退回原本的資料夾根目錄，刪除前面所新增的 worktree 工作區域，就可以繼續原本的開發。

```bash
git worktree remove fix
git branch -D fix/error-function
```

另外如果因為其他原因(e.g 資料夾刪除在重新建立)導致連動資料夾本身失去連結，就會遇到無法刪除同名 branch 與新增同名 worktree ，這時候可以用 prune 的方式進行清理，在手動移除資料夾。

```bash
git worktree prune
rm -rf error-function
git branch -D fix/error-function
```

最後在額外提個有趣的用法，一些簡易專案沒有 CI ，只在本地進行打包，而後再把他推至遠端分支，可以用使用 `--orphan` 會提供一個空白的工作區，再進行打包與一般推送流程即可輕鬆完成，不用在手忙腳亂的切換分支與內容，另外要額外再次提醒，有些打包會先做刪除資料夾再打包，這樣原本的資料夾連動會失效，如果遇到了就使用 cp 大法的方式進行檔案複製貼到需要的資料夾就可以了。

```bash
git worktree add --orphan -b pages dist
```
