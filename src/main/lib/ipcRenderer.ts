import { ipcRenderer, MessageBoxOptions } from 'electron'
import IpcOption from '../config/electron.ipc'
const IpcRendererApi = {
  dialogInvoke: (arg1: string, arg2: MessageBoxOptions): void => {
    ipcRenderer.invoke(IpcOption.fnName.dialogIpc, arg1, arg2)
  }
}
export default IpcRendererApi
