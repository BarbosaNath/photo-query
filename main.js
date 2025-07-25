import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'url';
import process from 'node:process';
import {
  addProduct,
  filterProductsByMultipleCriteria,
} from './src/services/product/index.js';
import {
  addCategory,
  removeCategory,
  getAllCategories,
} from './src/services/category/index.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Optional: if you have a preload script
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL('http://localhost:5173'); // Change this to your Vite dev server URL
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('get-products', (_event, body) => {
  return filterProductsByMultipleCriteria(body);
});

ipcMain.handle('add-product', (_event, body) => {
  return addProduct(body);
});

ipcMain.handle('get-categories', (_event, body) => {
  return getAllCategories(body);
});

ipcMain.handle('add-category', (_event, body) => {
  return addCategory(body);
});

ipcMain.handle('remove-category', (_event, body) => {
  return removeCategory(body);
});
