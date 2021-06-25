const mainConfig = require('../electron.config')
const webpack = require('webpack')
const path = require('path')
const packager = require('electron-packager')
const Service = require('@vue/cli-service')
const rm = require('rimraf')
const fs = require('fs')
const { getName, getVersion, getElectronVersion, getAuthor, getDescription } = require('../config/package')
let electronProcess = null
const BuildConfig = require('../config/buildConfig')
const argv = process.argv
const buildConfig = new BuildConfig(argv[2], true, !argv[3])
function buildMain() {
  return new Promise(resolve => {
    mainConfig.mode = 'production'
    const mainCompiler = webpack(mainConfig)
    mainCompiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
      done()
    })
    mainCompiler.watch({}, () => {
      if (electronProcess && electronProcess.kill) {
        process.kill(electronProcess.pid)
        electronProcess = null
        build()
      }
      resolve()
    })
  })
}
function buildRender() {
  return new Promise((resolve, reject) => {
    const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())
    service.run('build').then(() => {
      resolve()
    })
  })
}
function build() {
  let packageJSON = path.join(__dirname, '../dist/package.json')
  let newPackage = {}
  newPackage.name = getName()
  newPackage.version = getVersion()
  newPackage.main = 'app.js'
  newPackage.author = getAuthor()
  newPackage.description = getDescription()
  fs.writeFile(packageJSON, JSON.stringify(newPackage), () => {
    console.log('copy success')
  })
  packager(buildConfig).then(() => {
    process.exit()
  })
}
function start() {
  rm(path.join(__dirname, '../dist/'), err => {
    if (!err) {
      Promise.all([buildRender(), buildMain()]).then(() => {
        build()
      })
    }
  })
}
start()
