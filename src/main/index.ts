import { app, BrowserWindow } from 'electron'
import defaultWindow from '../../config/electron.window.js'
import Squirrel from './squirrel'
function createWindow() {
  const win = new BrowserWindow(defaultWindow)
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://127.0.0.1:' + process.env.port)
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile('./render/index.html')
  }
}
app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  app.quit()
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0 && !Squirrel.isSquirrelEvent()) {
    createWindow()
  }
})
Squirrel.eventHandler(app.quit)
