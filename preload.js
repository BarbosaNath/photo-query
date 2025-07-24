/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line no-undef
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
});
