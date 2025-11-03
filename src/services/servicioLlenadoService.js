// src/services/servicioLlenadoService.js
import { networkConfig } from '../config/networkConfig'

let ws = null

export function connectServicioLlenado({ litros, densidad, onPesoUpdate, onFinish, onError }) {
  if (ws) {
    console.warn('[WS] servicioLlenado ya conectado.')
    return
  }

  try {
    const socket = new WebSocket(networkConfig.wsUrlServicioLlenado)
    ws = socket // guardamos referencia global por si queremos cerrar luego

    socket.onopen = () => {
      console.log('[WS] Conectado al servicio de llenado.')

      // ✅ usamos `socket.send`, no `ws.send`
      const msg = {
        statusStart: true,
        cantidadVendida: litros * 1000,
        densidad,
      }

      try {
        socket.send(JSON.stringify(msg))
        console.log('[WS] Mensaje inicial enviado:', msg)
      } catch (err) {
        console.error('[WS] Error enviando mensaje inicial:', err)
        onError?.(err)
      }
    }

    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)

        if (msg.statusStop === true) {
          console.log('[WS] Proceso de llenado finalizado.')
          onFinish?.()
          disconnectServicioLlenado()
          return
        }

        if ('peso' in msg && typeof msg.peso === 'number') {
          onPesoUpdate?.(msg.peso)
        }
      } catch (err) {
        console.error('[WS] Error procesando mensaje:', err)
        onError?.(err)
      }
    }

    socket.onerror = (err) => {
      console.error('[WS] Error WebSocket:', err)
      onError?.(err)
    }

    socket.onclose = () => {
      console.warn('[WS] Conexión cerrada.')
      ws = null
    }

  } catch (err) {
    console.error('[WS] Error al conectar:', err)
    onError?.(err)
  }
}

export function disconnectServicioLlenado() {
  if (ws) {
    try {
      ws.close()
    } catch (e) {
      console.warn('[WS] Error cerrando socket:', e)
    }
    ws = null
  }
}

