const Service = require('@vue/cli-service')
const mainConfig = require('../electron.config')
const webpack = require('webpack')
const electron = require('electron')
const { spawn } = require('child_process')
const path = require('path')
let electronProcess = null
let manualRestart = false
function runRender() {
  return new Promise(resolve => {
    const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())
    service.run('serve').then(() => {
      resolve()
    })
  })
}
function runMain() {
  return new Promise(resolve => {
    mainConfig.mode = 'development'
    const mainCompiler = webpack(mainConfig)
    mainCompiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
      done()
    })
    mainCompiler.watch({}, () => {
      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        runElectron()
        setTimeout(() => {
          manualRestart = false
        }, 5000)
      }
      resolve()
    })
  })
}
function runElectron() {
  const args = [path.join(__dirname, '../dist/app.js')]
  electronProcess = spawn(electron, args)
  electronProcess.on('close', () => {
    if (!manualRestart) {
      process.exit()
    }
  })
}
function start() {
  Promise.all([runRender(), runMain()]).then(() => {
    runElectron()
  })
}
start()
