import { contextBridge, remote } from 'electron'
contextBridge.exposeInMainWorld('electron', {
  showMessage: (options: any):void => {
  }
})
declare global {
  interface Window {
    electron: Electron
  }
}
export interface Electron {
  contextBridge: (options) => void
}
