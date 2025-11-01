import { networkConfig } from '../config/networkConfig'

let ws = null

export function connectStockLevelSocket(onStatusChange) {
  if (ws) return // evitar reconexión múltiple

  ws = new WebSocket(networkConfig.wsUrlStockLevel)

  ws.onopen = () => {
    console.log('[WS] Conectado al servidor de stock')
  }

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      if ('stockLevel' in data) {
        console.log('[WS] Stock recibido:', data.stockLevel)
        if (onStatusChange) onStatusChange(data.stockLevel)
      } else {
        console.warn('[WS] Mensaje sin campo stockLevel:', data)
      }
    } catch (e) {
      console.error('[WS] Error parseando mensaje:', e)
    }
  }

  ws.onerror = (err) => {
    console.error('[WS] Error:', err)
  }

  ws.onclose = () => {
    console.warn('[WS] Desconectado del servidor de stock')
    ws = null
  }
}

export function disconnectStockLevelSocket() {
  if (ws) {
    ws.close()
    ws = null
  }
}

