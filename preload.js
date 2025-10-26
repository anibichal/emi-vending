const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  initPOS: () => ipcRenderer.invoke('pos:init'),
  doSale: (payload) => ipcRenderer.invoke('pos:sale', payload),
  closePOS: () => ipcRenderer.invoke('pos:close')
})

