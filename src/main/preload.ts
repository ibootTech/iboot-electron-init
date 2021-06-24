import { contextBridge } from 'electron'
import ipcRenderer from './lib/ipcRenderer'
contextBridge.exposeInMainWorld('electron', {
  test: (): void => {
    ipcRenderer.dialogInvoke('showMessageBox', { title: '测试', message: 'hello Electron!' })
  }
})
