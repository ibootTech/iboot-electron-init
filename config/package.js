const packageJson = require('../package.json')
const defaultName = 'electron App'
const defaultVersion = '1.0.0'
function getName() {
  return packageJson.name ? packageJson.name : defaultName
}
function getVersion() {
  return packageJson.version ? packageJson.version : defaultVersion
}
module.exports = { getName, getVersion }
