const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  get: (key, defaultValue) =>
    ipcRenderer.invoke('store:get', key, defaultValue),
  set: (key, value) => ipcRenderer.invoke('store:set', key, value),
});
