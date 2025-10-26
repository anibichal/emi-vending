export async function initPOS() {
  const r = await globalThis.electronAPI.initPOS()
  return r
}

export async function doSale(amount, ticket, timeoutMs) {
  const r = await globalThis.electronAPI.doSale({ amount, ticket, timeoutMs })
  return r
}


