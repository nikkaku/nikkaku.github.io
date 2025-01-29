import fs from 'fs'
import axios from 'axios'

const init = async () => {
  const folder = './src/content/blog'

  // delete template file 
  await new Promise((resolve) => {
    fs.readdir(folder, (err, files) => {
      Promise.all(files.map(item => (
        new Promise((resolve) => fs.unlink(`${folder}/${item}`, function () { resolve() }))
      ))).then(() => resolve())
    })
  })
  
  // get issue posts convert markdown
  const response = await axios('https://api.github.com/repos/nikkaku/nikkaku.github.io/issues')
  const target = response.data.reduce((acc, cur) => (
    cur.author_association !== 'OWNER' ? acc : acc.concat({ id: cur.id, body: cur.body })
  ), [])

  await Promise.all(target.map(item => (
    new Promise((resolve) => fs.writeFile(`${folder}/${item.id}.md`, item.body, function () { resolve() }))
  )))
}

init()