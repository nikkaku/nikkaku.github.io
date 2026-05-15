---
slug: flutter-develop-mac
title: flutter 在 mac 上開發
date: 2024-12-28
tags: [flutter]
category: frontend
---

明年開始有部分專案會轉用 flutter 開發並在多平台上發布，稍微順一下環境部署與開發至上線產品的流程~~少走一點歪路~~。

以下是用 mac 搭配 homebrew 管理安裝 fvm 與 cocoapods (ios 開發時需要，如果不用可以不安裝)並進行開發，當然也可以用的 sdkman，linux 或 windows 都有各自的方法管理，甚至用官方提供的安裝方法也是可以的沒有一定。

## homebrew 安裝 fvm

以下是新增 homebrew tap 與安裝 fvm 的過程，這裡先用 stable 穩定版號，如果需要也可以改為其他版本(e.g 3.14.0)，查閱更多版本號可以去 github 或是頁面，而 fvm list 會列出目前所有已安裝的版本，方便進行版本管理，另外一般官方的使用區別在於前面會加上 fvm，而後面則是與一般使用 flutter 沒多大差別。

```bash
# 新增 homebrew tap
brew tap leoafarias/fvm
brew install fvm

# 安裝且使用 stable 版本
fvm install stable
fvm use stable
fvm ls #(fvm list)

# 查看版本與檢查環境
fvm flutter --version
fvm flutter doctor

# 檢查特定版本更新(e.g 3.14.0)
fvm flutter doctor --version 3.14.0
```

這邊檢查後會列出個別的裝置下所需要的環境，例如我需要打包 ios 的 ipa 需要安裝 xcode 與 cocoapods，而我只有安裝 xcode 而且尚未進行任何設定出現這樣的內容。

```bash
[✗] Xcode - develop for iOS and macOS
    ✗ Xcode installation is incomplete; a full installation is necessary for iOS
      and macOS development.
      Download at: https://developer.apple.com/xcode/
      Or install Xcode via the App Store.
      Once installed, run:
        sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
        sudo xcodebuild -runFirstLaunch
    ✗ CocoaPods not installed.
        CocoaPods is a package manager for iOS or macOS platform code.
        Without CocoaPods, plugins will not work on iOS or macOS.
        For more info, see https://flutter.dev/to/platform-plugins
      For installation instructions, see
      https://guides.cocoapods.org/using/getting-started.html#installation
```

第一個錯誤可依照說明來修正，輸入指令設定開發環境即可解決。

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```

而第二個錯誤是缺少 cocoapods，這時候需要進行安裝，原本查資料是使用 gem 來安裝，但狀態一直卡著沒有任何反應，所以改為使用 homebrew 安裝，想想這樣也比較方便管理。

```bash
brew install cocoapods
```

解決完上述問題後再使用一次 fvm flutter doctor 檢查，就可以看到 ios 打包使用的環境基礎已經完成。

## 新增專案與預覽

這裡新增一個初始專案為 flutter_project，並進入資料夾初始化專案，這裡的 . 代表在當前位置建立。

```bash
mkdir flutter_project
cd flutter_project
fvm flutter create .
```

使用 chrome 預覽 lib/main.dart (入口)來進行開發熱加載，而這裡的 -d 是選擇開發的裝置，這裡使用 chrome 或是其他裝置(e.g macos)。

```bash
fvm flutter run -d chrome
```

而在 xcode 上則可以使用 open 來開啟 xcworkspace。

```bash
# fvm flutter pub get
# fvm flutter build ios
open ios/Runner.xcworkspace
```

大致上就是這樣 chill ( · ❛ ֊ ❛)。
