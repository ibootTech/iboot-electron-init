import { app, BrowserWindow } from 'electron'
import defaultWindow from './config/electron.window'
import Squirrel from './lib/squirrel'
import initIpcMain from './lib/ipcMain'
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
initIpcMain()
Squirrel.eventHandler(app.quit)
