const packageJson = require('../package.json')
const defaultName = 'Electron App'
const defaultVersion = '1.0.0'
const defaultElectronVersion = '13.1.4'
function getName() {
  return packageJson.name ? packageJson.name : defaultName
}
function getVersion() {
  return packageJson.version ? packageJson.version : defaultVersion
}
function getElectronVersion() {
  const electron = packageJson.devDependencies.electron
  return electron ? electron.substring(1, electron.length) : defaultElectronVersion
}
function getAuthor() {
  return packageJson.author ? packageJson.author : ''
}
function getDescription() {
  return packageJson.description ? packageJson.description : ''
}
module.exports = { getName, getVersion, getElectronVersion, getAuthor, getDescription }
