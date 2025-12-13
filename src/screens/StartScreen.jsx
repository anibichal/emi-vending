import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenWrapper from '../components/ScreenWrapper.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { uiConfig } from '../config/uiConfig.js'
import { connectStockLevelSocket, disconnectStockLevelSocket } from '../services/stockLevelService.js'
import EmiLogo from "../components/EmiLogoAnimation.jsx";
import { playSound } from "../utils/AudioManager.js"; //

export default function StartScreen() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('ready') // 'ready' | 'checking' | 'lowStock' | 'timeout'


  const handleStart = () => {
    //navigate('/qty')
   
    setStatus('checking')
    playSound("tapSound");
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
        playSound("sinStock");
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
          <EmiLogo onClick={handleStart} />
        </>
      )}

      {status === 'checking' && (
        <>
          <h2 className="screen-title">{uiConfig.messages.checkingStock}</h2>
          <LoadingSpinner />
        </>
      )}

      {status === 'lowStock' && (
          <h2 className="screen-title">{uiConfig.messages.lowStock}</h2>
      )}

      {status === 'timeout' && (
          <h2 className="screen-title">{uiConfig.messages.timeoutStockService}</h2>
      )}
    </ScreenWrapper>
  )
}



