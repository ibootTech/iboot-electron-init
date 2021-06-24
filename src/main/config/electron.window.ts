import * as path from 'path'
import { app } from 'electron'
const defaultWindow = {
  minWidth: 900,
  minHeight: 600,
  width: 900,
  height: 600,
  frame: true,
  autoHideMenuBar: true,
  hasShadow: true,
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js'),
    contextIsolation: true
  }
}
export default defaultWindow
