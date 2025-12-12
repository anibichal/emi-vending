const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  initPOS: () => {
    console.log("[PRELOAD] initPOS invoked from renderer")
    return ipcRenderer.invoke('pos:init')
  },
  doSale: (payload) => ipcRenderer.invoke('pos:sale', payload),
  closePOS: () => ipcRenderer.invoke('pos:close')
})

