import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let win;

async function waitForVite(url, retries = 20, delay = 500) {
  const fetch = (await import('node-fetch')).default;
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch (e) {
      await new Promise(r => setTimeout(r, delay));
    }
  }
  throw new Error(`No se pudo conectar con Vite en ${url}`);
}

async function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#4285f4',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    const devUrl = process.env.VITE_DEV_SERVER_URL;

    // Espera hasta que el servidor de Vite esté listo
    try {
      await waitForVite(devUrl);
      await win.loadURL(devUrl);
    } catch (err) {
      console.error('❌ No se pudo conectar con Vite:', err);
    }
  } else {
    await win.loadFile(path.join(__dirname, 'dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});