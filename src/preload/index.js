// src/preload/index.js
import { contextBridge, ipcRenderer } from 'electron' // 🆕 Importamos ipcRenderer para IPC
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  // 🆕 Agregamos funciones IPC para comunicación frontend-backend
  login: (data) => ipcRenderer.invoke('login', data), // Iniciar sesión 👤
  logout: (data) => ipcRenderer.invoke('logout', data), // Cerrar sesión 🚪
  registerEmployee: (data) => ipcRenderer.invoke('register-employee', data), // Registrar empleado 📝
  fetchLogs: () => ipcRenderer.invoke('fetch-logs') // Obtener logs 📊
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api) // 🆕 Exponemos las funciones IPC al frontend
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api // 🆕 Agregamos las funciones IPC al objeto global `window`
}
