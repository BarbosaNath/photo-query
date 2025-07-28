import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'url';
import process from 'node:process';
import {
  addProduct,
  getProductById,
  addProductImage,
  shareImages,
  addProductCharacteristic,
  updateProductCategory,
  deleteProductCharacteristic,
  deleteProductImage,
  filterProductsByMultipleCriteria,
} from './src/services/product/index.js';
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategoryName,
} from './src/services/category/index.js';
import {
  addCharacteristic,
  deleteCharacteristic,
  getAllCharacteristics,
  getCharacteristicById,
  updateCharacteristicName,
  addSubcharacteristic,
  updateSubcharacteristic,
  deleteSubcharacteristic,
  getSubcharacteristicsByCharacteristicId,
} from './src/services/characteristic/index.js';
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

ipcMain.handle('get-product', (_event, body) => {
  return getProductById(body);
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
  return deleteCategory(body);
});

ipcMain.handle('add-product-characteristic', (_event, body) => {
  return addProductCharacteristic(body);
});

ipcMain.handle('remove-product-characteristic', (_event, body) => {
  return deleteProductCharacteristic(body);
});

ipcMain.handle('remove-product-image', (_event, body) => {
  return deleteProductImage(body);
});

ipcMain.handle('update-category', (_event, body) => {
  return updateCategoryName(body);
});

ipcMain.handle('add-product-image', (_event, body) => {
  return addProductImage(body);
});

ipcMain.handle('share-images', (_event, body) => {
  return shareImages(body);
});

ipcMain.handle('update-product-category', (_event, body) => {
  return updateProductCategory(body);
});

ipcMain.handle('get-characteristic', (_event, body) => {
  return getCharacteristicById(body);
});

ipcMain.handle('get-characteristics', (_event, body) => {
  return getAllCharacteristics(body);
});

ipcMain.handle('add-characteristic', (_event, body) => {
  return addCharacteristic(body);
});

ipcMain.handle('remove-characteristic', (_event, body) => {
  return deleteCharacteristic(body);
});

ipcMain.handle('update-characteristic', (_event, body) => {
  return updateCharacteristicName(body);
});

ipcMain.handle('get-subcharacteristics', (_event, body) => {
  return getSubcharacteristicsByCharacteristicId(body);
});

ipcMain.handle('add-subcharacteristic', (_event, body) => {
  return addSubcharacteristic(body);
});

ipcMain.handle('update-subcharacteristic', (_event, body) => {
  return updateSubcharacteristic(body);
});

ipcMain.handle('remove-subcharacteristic', (_event, body) => {
  return deleteSubcharacteristic(body);
});
