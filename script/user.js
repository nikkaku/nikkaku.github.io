const axios = require('axios')
const fs = require('fs')

const init = async () => {
  const response = await axios('https://api.github.com/users/akakaki')
  const { avatar_url, name } = response.data

  const configYmlFile = './_config.yml'
  const configYml = await fs.readFileSync(configYmlFile, 'utf-8')
  fs.writeFileSync(configYmlFile, configYml.replace(/(author: ).*/, `$1${name}`), function () {})
  
  const configNextYmlFile = './_config.next.yml'
  const configNextYml = await fs.readFileSync(configNextYmlFile, 'utf-8')
  fs.writeFileSync(configNextYmlFile, configNextYml.replace(/.*(avatar:.*\n.*)(\n.*)(url: )(.*)( #)/, `$1$2$3${avatar_url}$5`), function () {})
}

init()