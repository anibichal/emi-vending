const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  initPOS: () => ipcRenderer.invoke('pos:init'),
  doSale: (data) => ipcRenderer.invoke('pos:sale', data),
  closePOS: () => ipcRenderer.invoke('pos:close')
})
