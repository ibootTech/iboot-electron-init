const path = require('path')
const Platform = require('./platform')
const { getElectronVersion } = require('./package')
class BuildConfig {
  constructor(platformVal, asar, location) {
    const platform = new Platform(platformVal)
    this.arch = platform.arch
    this.platform = platform.platform
    this.asar = asar
    this.electronVersion = getElectronVersion()
    this.dir = path.join(__dirname, '../dist')
    this.ignore = /(^\/(src|node_modules|test|\.[a-z]+|README|yarn|static|dist\/web))|\.gitkeep/
    this.out = path.join(__dirname, '../build')
    this.overwrite = true
    if (location) {
      this.electronZipDir = path.join(__dirname, '../')
    }
  }
}
module.exports = BuildConfig
