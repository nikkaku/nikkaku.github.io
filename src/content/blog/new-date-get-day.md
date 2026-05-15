---
slug: new-date-get-day
title: 如何用原生的 new Date() 計算取得固定的日期
date: 2024-05-11
tags: [javascript]
category: frontend
---

很多需求會在固定的日期或範圍內顯示不一樣的內容或效果，

可總不能等到當天才進行上線或佈署太冒險了，

這時候就可以用 new Date 進行判斷，

下面以母親節作為例子(五月的第二個禮拜日)，

初始步驟先轉跳至當年的五月份，接著可以從兩種思路上去做計算，

## 第一天作為計算

先取得五月的第一天為星期幾，並且加上當天，且跟兩週的時間做相減即可取得正確的母親節日期。

```js
const month = new Date(new Date().setMonth(4)).setDate(1)
const day = 14 - new Date(month).getDay() + 1
console.log(day)
```

## 第二週日期與星期做相減

一樣先取得五月，接著把日期設定為 14 日也就是兩個禮拜，可因起始的星期不一定是週日，所以須在扣除多餘的天數即可得到第二週日期了。

```js
const month = new Date(new Date().setMonth(4)).setDate(14)
const day = 14 - new Date(month).getDay()
console.log(day)
```

兩種方法都是用星期與週去進行計算，

可以再搭配 setInterval 或是 web worker 的方式去更新或觸發事件，

另外如果有安裝 dayjs 也可以這樣寫

```js
const month = dayjs().month(4).startOf('month')
const day = 14 - month.day() + 1
console.log(day)
```
