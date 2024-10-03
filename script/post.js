const axios = require('axios')
const fs = require('fs')

const init = async () => {
  const response = await axios('https://api.github.com/repos/nikkaku/nikkaku.github.io/issues')
  const target = response.data.reduce((acc, cur) => {
    if (cur.author_association !== 'OWNER') acc
    return acc.concat({
      id: cur.id,
      body: cur.body,
    })
  }, [])
  fs.unlink('./source/_posts/template.md', function () { })
  for (const item of target) fs.writeFile(`./source/_posts/${item.id}.md`, item.body, function () { })
}

init()