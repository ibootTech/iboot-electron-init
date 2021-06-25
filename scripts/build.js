const mainConfig = require('../electron.config')
const webpack = require('webpack')
const path = require('path')
const packager = require('electron-packager')
const Service = require('@vue/cli-service')
const rm = require('rimraf')
const fs = require('fs')
let electronProcess = null
let manualRestart = false
const buildConfig = {
  arch: 'x64',
  asar: true,
  dir: path.join(__dirname, '../dist'),
  ignore: /(^\/(src|node_modules|test|\.[a-z]+|README|yarn|static|dist\/web))|\.gitkeep/,
  out: path.join(__dirname, '../build'),
  overwrite: true,
  electronVersion: '13.1.4'
}
function buildMain() {
  return new Promise(resolve => {
    mainConfig.mode = 'production'
    const mainCompiler = webpack(mainConfig)
    mainCompiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
      done()
    })
    mainCompiler.watch({}, () => {
      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        build()
        setTimeout(() => {
          manualRestart = false
        }, 5000)
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
  fs.readFile(path.join(__dirname, '../package.json'), 'utf-8', (err, data) => {
    let package = path.join(__dirname, '../dist/package.json')
    let srcPackage = JSON.parse(data)
    let newPackage = {}
    newPackage.name = srcPackage.name
    newPackage.version = srcPackage.version
    newPackage.main = 'app.js'
    newPackage.author = srcPackage.author
    newPackage.description = srcPackage.description
    fs.writeFile(package, JSON.stringify(newPackage), () => {
      console.log('copy success')
    })
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
