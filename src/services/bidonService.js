import { networkConfig } from '../config/networkConfig'

let ws = null

export function connectBidonSocket(onStatusChange) {
  if (ws) return // evitar reconexión múltiple
  ws = new WebSocket(networkConfig.wsUrl)

  ws.onopen = () => console.log('[WS] Conectado al servidor de bidón')

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      if ('statusBidon' in data && onStatusChange) {
        console.log('[WS] Estado recibido:', data.statusBidon)
        onStatusChange(data.statusBidon)
      }
    } catch (e) {
      console.error('[WS] Error parseando mensaje:', e)
    }
  }

  ws.onerror = (err) => console.error('[WS] Error:', err)
  ws.onclose = () => {
    console.warn('[WS] Desconectado del servidor')
    ws = null
  }
}

export function disconnectBidonSocket() {
  if (ws) {
    ws.close()
    ws = null
  }
}
