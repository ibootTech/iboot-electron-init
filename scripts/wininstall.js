const electronInstaller = require('electron-winstaller')
const path = require('path')
const { getName } = require('../config/package')
async function start() {
  const name = getName() + '-win32-x64'
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: path.join(__dirname, '../build/' + name),
      outputDirectory: path.join(__dirname, '../build/winInstall'),
      exe: getName() + '.exe',
      noMsi: true
    })
    console.log('It worked!')
  } catch (e) {
    console.log(`No dice: ${e.message}`)
  }
}
start()
