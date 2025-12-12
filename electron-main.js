import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import http from 'node:http'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
let win
let posInstance = null
let usingRealPos = false

// Try to require the SDK. If not available, we'll keep using mocks.
try {
  // note: require style so SDK can be CommonJS
  // eslint-disable-next-line unicorn/prefer-module
  const { POSAutoservicio } = await import('transbank-pos-sdk').then(m => m)
  // instantiate only when initPOS called to avoid errors at startup if not present
  posInstance = null
  usingRealPos = true
} catch (err) {
  // SDK not available — we will use mock logic below
  usingRealPos = false
}

async function initRealPOS() {
  win.webContents.send("log", {
  tag: "[MAIN] initRealPOS started",
  });
  
  try {
    const sdk = await import('transbank-pos-sdk')
    console.log("[MAIN] SDK loaded:",sdk);
    win.webContents.send("log", {
      tag: "[MAIN] SDK loaded:",
      value: Object.keys(sdk)
    });

    // 👈 importante: acceder al default primero
    const POSAutoservicio = sdk.default.POSAutoservicio

    if (!POSAutoservicio) {
      
      win.webContents.send("log", {
        tag: "[MAIN] POSAutoservicio no encontrado en SDK",
      });
      return { ok: false, error: "POSAutoservicio missing" }
    }

    posInstance = new POSAutoservicio()
    posInstance.setDebug(true)

    // 1️⃣ Intento normal
    const port = await posInstance.autoconnect();
    win.webContents.send("log", {
      tag: "[MAIN] autoconnect result:",
      value: port
    });
    
    // 2️⃣ Si falla → intenta listando puertos o por puerto 0
    if (!port) {
      win.webContents.send("log", {
        tag: "[MAIN] autoconnect failed → trying manual scan"
      });
      port = await posInstance.connect('/dev/ttyACM0');
      //port = await scanManualPorts(POSAutoservicio);
      win.webContents.send("log", {
        tag: "[MAIN] ACM0 result:",
        value: port
      });
    }

    if (port === false) return { ok: false, error: 'No POS found' }

    await posInstance.loadKeys()
    win.webContents.send("log", {
      tag: "[MAIN] keys loaded",
    });

    return { ok: true, msg: `Connected ${port.path}` }

  } catch (err) {
    win.webContents.send("log", {
      tag: "[PRELOAD] initRealPOS ERROR:",
      value: err
    });
    return { ok: false, error: String(err) }
  }
}

async function scanManualPorts(POSAutoservicio) {
  win.webContents.send("log", {
    tag: "[MAIN] starting manual port scan",
  });

  const inst = new POSAutoservicio();
  inst.setDebug(true);

  let ports;
  try {
    ports = await inst.listPorts();
    win.webContents.send("log", {
      tag: "[MAIN] ports detected:",
      value: ports
    });
  } catch (err) {
    win.webContents.send("log", {
      tag: "[MAIN] ERROR listing ports:",
      value: err
    });
    return false;
  }

  if (!ports || ports.length === 0) {
    win.webContents.send("log", {
      tag: "[MAIN] no ports found",
    });
    return false;
  }

  for (const port of ports) {
    try {
      win.webContents.send("log", {
        tag: "[MAIN] trying port:",
        value: port
      });

      const result = await inst.connect(port);
      win.webContents.send("log", {
        tag: "[MAIN] CONNECT result:",
        value: result
      });

      posInstance = inst;      // 👈 importante: dejar almacenado
      return port;             // éxito → devolvemos puerto
    } catch (err) {
      win.webContents.send("log", {
        tag: "[MAIN] failed port:",
        value: { port, err }
      });
    }
  }

  return false;
}

// Mock sale simulation used if SDK not available
function mockSaleSimulation(amount, ticket, timeoutMs) {
  return new Promise((resolve, reject) => {
    const delay = 2000 + Math.floor(Math.random() * 3000)
    const t = setTimeout(() => resolve({ success: true, amount, ticket }), delay)
    // timeout guard
    const to = setTimeout(() => {
      clearTimeout(t)
      reject(new Error('TIMEOUT'))
    }, timeoutMs ?? 180000)
  })
}

// IPC handlers
ipcMain.handle('pos:init', async () => {
  console.log("[MAIN] pos:init received")
  console.log("[MAIN] usingRealPos =", usingRealPos)
  if (usingRealPos) {
    const r = await initRealPOS()
    console.log("[MAIN] initRealPOS result:", r)
    return r
  }
  // mock init: pretend OK
  return { ok: true, msg: 'Mock POS initialized' }
})

ipcMain.handle('pos:sale', async (_, { amount, ticket, timeoutMs }) => {
  if (usingRealPos && posInstance) {
    try {
      const res = await posInstance.sale(amount, ticket)
      return { ok: true, data: res }
    } catch (err) {
      return { ok: false, error: String(err) } 
      
    }
  }
  // mock path
  try {
    const r = await mockSaleSimulation(amount, ticket, timeoutMs)
    return { ok: true, data: r }
  } catch (err) {
    //return { ok: false, error: String(err) } VOLVER A ESTADO ANTERIOR AAB
    return { ok: true, error: String(err) }
  }
})

ipcMain.handle('pos:close', async () => {
  if (usingRealPos && posInstance) {
    try {
      await posInstance.disconnect()
      posInstance = null
      return { ok: true }
    } catch (err) {
      return { ok: false, error: String(err) }
    }
  }
  posInstance = null
  return { ok: true }
})

// -- window + dev loading logic
async function waitForUrl(url, retries = 40, delay = 250) {
  // url like http://localhost:5173
  for (let i = 0; i < retries; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, res => {
          res.resume()
          resolve()
        })
        req.on('error', reject)
        req.setTimeout(2000, () => { req.destroy(); reject(new Error('timeout')) })
      })
      return true
    } catch {
      // wait
      await new Promise(r => setTimeout(r, delay))
    }
  }
  return false
}

async function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    backgroundColor: '#4285f4',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  const devUrl = process.env.VITE_DEV_SERVER_URL
  if (devUrl) {
    const ok = await waitForUrl(devUrl)
    if (ok) {
      await win.loadURL(devUrl)
      // win.webContents.openDevTools()
      return
    } else {
      console.error('Vite did not become available at', devUrl)
      // fallback to dist (likely missing) but continue
    }
  }
  await win.loadFile(path.join(__dirname, 'index.html'))
  //, 'dist'
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
