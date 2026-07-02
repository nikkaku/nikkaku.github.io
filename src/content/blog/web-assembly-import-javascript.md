---
slug: web-assembly-import-javascript
title: 用 Rust 來試試 WebAssembly 吧
date: 2026-07-02
category: frontend
---

俗話說萬物皆可 Rust，
已經有好一陣子前端圈很多工具慢慢導入 Rust，
優點很多但最特別莫過於它獨有的所有權機制，
有效減少記憶體安全性延伸的問題，
如果也想嘗試看看他的魅力，
Rust 也支援輸出 WebAssembly 也就是 wasm，
能在編譯後以接近原生的速度來執行內容，
對於需要大量計算的專案來說是目前最佳選擇之一，
可也並非能完全取 Javascript，
以現行來說操作 DOM 與畫面互動這件是還是用 Javascript 是比較成熟的方案，
WebAssembly 上還是得仰賴 Javascript 來與頁面進行溝通，
如果在 WebAssembly 內過於頻繁與 Javascript 溝通反而還需要花費更多時間與效能，
這也是需要取捨的。

第一步當然是先去官方看看如何安裝 Rust，接著透過 cargo 這個套管理器安裝 wasm-pack


```bash
cargo install wasm-pack
```

接著建立專案，並在 cargo.toml 內加上 wasm-bindgen 與 cdylib

```bash
cargo new --lib hello-wasm
```

```toml
[dependencies]
wasm-bindgen = "0.2"

[lib]
crate-type = ["cdylib"]
```

我們就用一億次 sqrt 這種比較極端數量但單純計算來測試，各自寫法如下

```js
// javascript
const jsLoop (itr) => {
  let sum = 0

  for (let i = 0; i < itr; i++)
    sum += Math.sqrt(i)
    
  return sum
} 
```

```rust
// Rust to WebAssembly

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn wasm_loop(itr: i32) -> i64 {
    let mut sum: i64 = 0.0;
    
    for i in 0..itr {
        sum += (i as i64).sqrt();
    }
    
    sum
}
```

使用 wasm-pack build --target web --release 來進行輸出 .wasm，輸出的 .wasm 不能直接使用會觸發跨域(CORS)，可以透過 Vite 或其他常用的方式來執行本地環境

```
====
js:   195ms
wasm: 183ms
====

====
js:   210ms
wasm: 186ms
====

====
js:   206ms
wasm: 184ms
====

====
js:   199ms
wasm: 188ms
====

```

經過多輪測試可以看見在單純的結構計算上體感沒有多明顯差別，但這樣就已經拉開時間長度，更何況是那些隨時需要同步大量運算的內容我想是不可或缺的，另外在收集 WebAssembly 運用時才知道只能傳遞數字，字串、陣列與物件需要透過記憶體操作傳遞等方式進行，而 wasm-bindgen 讓流程處理簡化提供使用者有更快的開發體驗，想體驗細節可以試試 C++ 或 Zig，打包後的 WebAssembly 檔案也會更小哦。

