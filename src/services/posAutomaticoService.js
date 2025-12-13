import { networkConfig } from '../config/networkConfig'

let ws = null

/**
 * Ejecuta una venta automática por WebSocket
 *
 * @param {string} action  - ej: "sale"
 * @param {number} amount  - monto a cobrar
 * @param {string} ticket  - opcional (si backend lo ignora, no pasa nada)
 * @param {number} timeoutMs - timeout en ms
 *
 * @returns Promise<{ status: boolean, message: string }>
 */
export function posAutomatico(action, amount, ticket, timeoutMs = 15000) {
  return new Promise((resolve) => {
    if (ws) {
      console.warn('[WS][POS] Socket ya existe, cerrando anterior')
      ws.close()
      ws = null
    }

    ws = new WebSocket(networkConfig.wsUrlPosAutomatico)

    const timeout = setTimeout(() => {
      console.warn('[WS][POS] Timeout esperando respuesta')
      cleanup()
      resolve({
        status: false,
        message: 'Timeout POS automático'
      })
    }, timeoutMs)

    ws.onopen = () => {
      console.log('[WS][POS] Conectado a POS automático')

      const payload = {
        action,
        amount,
        ticket
      }

      console.log('[WS][POS] Enviando:', payload)
      ws.send(JSON.stringify(payload))
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        console.log('[WS][POS] Respuesta recibida:', data)

        clearTimeout(timeout)
        cleanup()

        resolve({
          status: Boolean(data.status),
          message: data.message ?? ''
        })
      } catch (err) {
        console.error('[WS][POS] Error parseando respuesta:', err)
        clearTimeout(timeout)
        cleanup()

        resolve({
          status: false,
          message: 'Respuesta inválida del POS'
        })
      }
    }

    ws.onerror = (err) => {
      console.error('[WS][POS] Error WebSocket:', err)
      clearTimeout(timeout)
      cleanup()

      resolve({
        status: false,
        message: 'Error de conexión POS'
      })
    }

    ws.onclose = () => {
      console.warn('[WS][POS] Socket cerrado')
    }

    function cleanup() {
      if (ws) {
        ws.close()
        ws = null
      }
    }
  })
}

