const { POSAutoservicio } = require('transbank-pos-sdk')

let pos = null

async function initPOS() {
  try {
    pos = new POSAutoservicio()
    pos.setDebug(true)
    const port = await pos.autoconnect()
    if (!port) return { ok: false, msg: 'No se encontró POS' }
    await pos.loadKeys()
    return { ok: true, msg: `Conectado en ${port.path}` }
  } catch (e) {
    console.error(e)
    return { ok: false, msg: e.message }
  }
}

async function doSale({ amount, ticket }) {
  try {
    const response = await pos.sale(amount, ticket)
    return { ok: true, data: response }
  } catch (e) {
    console.error(e)
    return { ok: false, msg: e.message }
  }
}

async function closePOS() {
  try {
    await pos.disconnect()
    return { ok: true }
  } catch {
    return { ok: false }
  }
}

module.exports = { initPOS, doSale, closePOS }
