import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenWrapper from '../components/ScreenWrapper.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import Button from '../components/Button.jsx'
import { uiConfig } from '../config/uiConfig.js'
import { connectStockLevelSocket, disconnectStockLevelSocket } from '../services/stockLevelService.js'

export default function StartScreen() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('ready') // 'ready' | 'checking' | 'lowStock' | 'timeout'

  const handleStart = () => {
    setStatus('checking')

    // Timeout de 10 segundos (10000 ms)
    const timeout = setTimeout(() => {
      console.warn('[WS] Timeout sin respuesta del servidor')
      setStatus('timeout')
      disconnectStockLevelSocket()
      // Volver a inicio después de 2 segundos
      setTimeout(() => {
        setStatus('ready')
      }, 3000)
    }, 5000)

    connectStockLevelSocket((stockLevel) => {
      clearTimeout(timeout)
      if (stockLevel === true) {
        disconnectStockLevelSocket()
        navigate('/qty')
      } else {
        setStatus('lowStock')
        disconnectStockLevelSocket()
        setTimeout(() => setStatus('ready'), 5000)
      }
    })
  }

  return (
    <ScreenWrapper>
      {status === 'ready' && (
        <>
          <h1 className="screen-title">{uiConfig.messages.start}</h1>
          <div style={{ marginTop: 18 }}>
            <Button text={uiConfig.buttons.start} onClick={handleStart} />
          </div>
        </>
      )}

      {status === 'checking' && (
        <>
          <h1 className="screen-title">{uiConfig.messages.checkingStock}</h1>
          <LoadingSpinner />
        </>
      )}

      {status === 'lowStock' && (
          <h1 className="screen-title">{uiConfig.messages.lowStock}</h1>
      )}

      {status === 'timeout' && (
          <h1 className="screen-title">{uiConfig.messages.timeoutStockService}</h1>
      )}
    </ScreenWrapper>
  )
}



