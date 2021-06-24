declare global {
  interface Window {
    electron: Electron
  }
}
export interface Electron {
  test: () => void
}
