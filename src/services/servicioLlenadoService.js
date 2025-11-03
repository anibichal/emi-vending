import { networkConfig } from '../config/networkConfig'

let ws = null
let interval = null

export function connectServicioLlenado({ litros, densidad, onPesoUpdate, onFinish, onError }) {
  if (ws) {
    console.warn('[WS] servicioLlenado ya conectado.')
    return
  }

  try {
    ws = new WebSocket(networkConfig.wsUrlServicioLlenado)

    ws.onopen = () => {
      console.log('[WS] Conectado al servicio de llenado.')
      // Enviar mensaje inicial con los datos del llenado
      const data = {
        statusStart: true,
        cantidadVendida: litros * 1000, // convertir litros a mililitros
        densidad: densidad,
      }
      ws.send(JSON.stringify(data))
      console.log('[WS] Mensaje inicial enviado:', data)
    }

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)

        if ('peso' in msg && typeof msg.peso === 'number') {
          // Actualiza peso recibido
          onPesoUpdate?.(msg.peso)
        }

        if (msg.statusStop === true) {
          console.log('[WS] Proceso de llenado finalizado.')
          clearInterval(interval)
          onFinish?.()
          disconnectServicioLlenado()
        }
      } catch (err) {
        console.error('[WS] Error procesando mensaje:', err)
        onError?.(err)
      }
    }

    ws.onerror = (err) => {
      console.error('[WS] Error WebSocket:', err)
      onError?.(err)
    }

    ws.onclose = () => {
      console.warn('[WS] Conexión cerrada.')
      ws = null
      clearInterval(interval)
    }

    // En caso de no recibir peso durante mucho tiempo, podemos verificar cada 1s
    interval = setInterval(() => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ keepAlive: true }))
      }
    }, 1000)

  } catch (err) {
    console.error('[WS] Error al conectar:', err)
    onError?.(err)
  }
}

export function disconnectServicioLlenado() {
  if (ws) {
    ws.close()
    ws = null
  }
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}
