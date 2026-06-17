---
slug: zola-ssg
title: 另類的 SSG 靜態網站方案 Zola
date: 2026-06-18
category: frontend
---

一般常見前端框架都使用 CSR 或 SSR 的方式來進行規劃，而對於靜態或變動性質不頻繁的網站來說，SSG 是個很好的選擇，最推薦莫過於 Astro，不過使用上仰賴 npm，以套件迭代速度和安全更新來說要持續維護也是個負擔，所以今天要介紹 Zola，Zola 由 Rust 開發，但使用上不會寫到任何 Rust 語言，他提供了相對的比較直覺的 html、markdown 與 tera 模板語言作為書寫，大大的降低了開發時間與負擔。

Mac 安裝可以透過 homebrew，Linux 各大發行版 package 內也有收錄，Windows 則使用 choco 之類的管理工具皆可，如果沒有的話也可以透過 cargo，但 cargo 收錄的版本已經落後很多，官方文件有提到加上使用 `--git` 的方式進行編譯與安裝即可順利安裝完成，這邊指令也只要記得三條，分別是 init、serve、build，init 初始化動作時分別會詢問後續部署的 URL，沒有的話可以先使用預設後續在變更、是否使用 Sass 編譯、是否啟用語法高亮和是否建立內容索引，因為佈署後是無服務(serverless)，所以如果有需要作到搜尋相關就需要建立索引。

```bash
$ zola init <project_name>
$ zola serve
$ zola build
```

建立檔案的結構如下，每個資料夾作用的細節可以參考官方網站

```
.
├── zola.toml
├── content
├── sass
├── static
├── templates
└── themes
```

比較重點的部份是 content 內會分類對應的 template 內的 html，在 html 內會使用 {{ section.title }} 這樣的 tera 語法操作取得 markdown 內的資料，需要 for 迴圈也可以像下面這樣寫

```html
{% for page in section.pages %}
  <div><a href="{{ page.permalink | safe }}">{{ page.title }}</a></div>
{% endfor %}
```

某些需要仰賴 JSON 或 RESTful API 顯示的資訊可以利用 load_data 來取得

```html
{# JSON #}
{% set data1 = load_data(path="<json address>") %}

{# RESTful API #}
{% set data2 = load_data(url="<https url link>") %}
```

要作到 filter 的行為就組合 for 與 if 使用

```html
{% for page in section.pages %}
  {% if page.extra.img %}
    <img src={{ get_url(path=page.extra.img) }} alt={{ page.title }} />
  {% endif %}
{% endfor %}
```

這樣使用下來體驗相當不錯而且算是完整，但如果有意把專案轉為 Zola，在完全取代前建議可以先逐步嘗試，舉例來說 Astro 架構就會遇到使用 getStaticPaths() 會取得資料建立多筆頁面的情境，在 Zola 並沒有這樣的作法，土法煉鋼可以透過腳本來讓資料轉為 markdown 結構的方向來做，但維護或新增上就沒有這麼優雅了。

## 參考
1. https://www.getzola.org
2. https://keats.github.io/tera/
