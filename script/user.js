const axios = require('axios')
const fs = require('fs')

const init = async () => {
  const response = await axios('https://api.github.com/users/akakaki')
  const { avatar_url, name } = response.data

  const configYmlFile = './_config.yml'
  const configYml = await fs.readFileSync(configYmlFile, 'utf-8')
  fs.writeFileSync(configYmlFile, configYml.replace(/(author: ).*/, `$1${name}`), function () {})
}

init()