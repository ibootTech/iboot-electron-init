import { ipcMain, dialog } from 'electron'
import IpcOption from '../config/electron.ipc'
function _dialogEvent(): void {
  ipcMain.handle(IpcOption.fnName.dialogIpc, async (event, ...args) => {
    switch (args[0]) {
      case 'showMessageBox':
        dialog.showMessageBox(args[1])
        break
      default:
        break
    }
  })
}
function initIpcMain(): void {
  _dialogEvent()
}
export default initIpcMain
