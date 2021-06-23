interface fn1 {
  (): void
}

const Squirrel = {
  isSquirrelEvent: (): boolean => _isSquirrelEvent(),
  eventHandler: (callback: fn1): void => {
    if (_isSquirrelEvent()) {
      _spawnUpdate(callback)
    }
  }
}
function _isSquirrelEvent() {
  return process.argv.length !== 1
}
function _spawn(command, args) {
  const ChildProcess = require('child_process')
  return ChildProcess.spawn(command, args, { detached: true })
}
function _spawnUpdate(callback) {
  const squirrelEvent = process.argv[1]
  const path = require('path')
  const appFolder = path.resolve(process.execPath, '..')
  const rootAtomFolder = path.resolve(appFolder, '..')
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'))
  const exeName = path.basename(process.execPath)
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      _spawn(updateDotExe, ['--createShortcut', exeName])
      if (callback) {
        callback()
      }
      break
    case '--squirrel-uninstall':
      _spawn(updateDotExe, ['--removeShortcut', exeName])
      if (callback) {
        callback()
      }
      break
    case '--squirrel-obsolete':
      if (callback) {
        callback()
      }
      break
  }
}
export default Squirrel
