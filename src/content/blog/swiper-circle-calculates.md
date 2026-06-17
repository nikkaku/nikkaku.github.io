---
slug: swiper-circle-calculates
title: 實現讓 Swiper 擁有圓弧度滑動的效果
description: 使用 Swiper 搭配圓形公式實現跟著圓形滑動的效果
date: 2026-04-20
updated: 2026-05-26
category: frontend
---

恰巧設計稿出了個我不太接觸但可蠻常見的動態，當滑動前面卡片區塊時，背景的區域也要以弧形的角度進行動態動作，這邊的重點是 `Math.sqrt(radius * radius - x * x)` 會運用到可能國中學到但還給數學老師的定理公式 \(x^2 + y^2 = r^2\) ，大概想像成他能依照你所提供的圓心進行移動，範例這邊就先以單純的 html、css 與 javascript 單區塊進行。

首要建立出 swiper ，而 class circle 的作用則可觀測出是否有依照給予的答案進行滑動依據

```html
<main>
  <div class="circle"></div>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="slide"></div>
      </div>
      <div class="swiper-slide">
        <div class="slide"></div>
      </div>
      <div class="swiper-slide">
        <div class="slide"></div>
      </div>
    </div>
  </div>
<main>
```

css 除了給予 circle 需要的弧度外，其他的可以替換為自己當下情境適合的內容，不用完全依照提供內容，這邊暫定圓的直徑是 800 像素，這個數值會運用在稍後 javascript 裡 radius

```css
main { width: 300px; height: 300px; margin: 0 auto; overflow: hidden; position: relative; }
.circle { width: 800px; aspect-ratio: 1/1; border-radius: 999px; border: 6px solid #000; position: absolute; transform: translate(-50%, 0); top: 150px; left: 50%; }
.slide { width: 40px; aspect-ratio: 1/1; background: #000; border-radius: 999px; transition: all .2s linear;  }
.swiper-slide { display: flex; align-items: center; justify-content: center;  }
.swiper-slide.swiper-slide-active .slide { width: 80px; }
```

這邊就是實現滑動的重點，建議初始 Swiper 的時間放在畫面完成後，因為會需要取得 swiper 布局的寬度，如果是滿版的話也可以直接取用 window.innerWidth，另外如果搭配 loop 效果可以加上 swiper.loopDestroy() 與 swiper.loopCreate() 來設定 loop，接著看到監聽的 progress ，這邊會用上一開始提到的圓形公式算出 y 在 x 的位置下該呈現在什麼位子高低位子，另外預設雖然 slide 本身的 transition 就有針對 transform 作用，但如果沒有的話可以自行增加 slide.style.transitionProperty = 'transform' 增加補間與順暢度，最後監聽的 setTransition 則會影響，放開後的動畫流程，預設參數會非常快的回到對應的位子，使用回傳的速率對於視覺漸變的過程非常有幫助

```javascript
let slideWidth = 0
const radius = 800
const swiper = new Swiper('.swiper', { init: false, watchSlidesProgress: true })

swiper.on('init', function(swiper) {
  slideWidth = swiper.width
  swiper.update()
})

swiper.on('progress', function(swiper, _progress) {
  const slides = swiper.slides
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i]
    const progress = slide.progress
    const x = progress * slideWidth
    let y = 0
    if (Math.abs(x) < radius) y = radius - Math.sqrt(radius * radius - x * x)
    slide.style.transform = `translateY(${y}px)`
  }
})

swiper.on('setTransition', function(swiper, transition) {
  const slides = swiper.slides
  for (let i = 0; i < slides.length; i++) {
    swiper.slides[i].style.transitionDuration = `${transition}ms`
  }
})

swiper.init()
```

至此大致上的流程就完成差不多了，只能說小時候不讀書長大忘光光，如果對各種公式有記憶有熟悉，肯定能對畫面的互動性增加很多趣味，這次收集資料花了點時間，最後所呈現效果讓我感到非常滿足，稍微有點想法要去惡補基本公式，另外 Swiper 也補齊了很多以前的 bug ，例如 loop 初始化偶爾會缺少往後滑動的區塊導致 ux 體感上不適，還有 controller 可以一次同步複數 Swiper 滑動操作 ，如果後續接觸到更多，再開一篇來紀錄一下這有趣的套件。
