import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper.jsx'
import { uiConfig } from '../config/uiConfig.js'
import {
  connectServicioLlenado,
  disconnectServicioLlenado,
} from '../services/servicioLlenadoService.js'
import { playSound } from "../utils/AudioManager.js"; //
import CornerLogo from "../components/CornerLogo.jsx";
import FillingAnimation from "../components/FillingAnimation.jsx";

export default function FillingScreen() {
  const { litros } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('preparing') // preparing | filling | finished
  const [peso, setPeso] = useState(null)

  useEffect(() => {
    let mounted = true

    // Paso 1: pantalla "Preparando llenado"
    setStatus('preparing')
    playSound("llenando");

    // Paso 2: conectar al websocket
    connectServicioLlenado({
      litros: Number(litros),
      densidad: uiConfig.messages.densidadLiquido,
      
      // Actualización del peso
      onPesoUpdate: (nuevoPeso) => {
        if (!mounted) return
        if (status !== 'filling') setStatus('filling')
        setPeso(nuevoPeso)
      },

      // Fin del proceso
      onFinish: () => {
        if (!mounted) return
        setStatus('finished')
        playSound("llenadoCompleto");
        setTimeout(() => navigate('/thanks'), 5000)
      },

      // Errores
      onError: () => {
        if (!mounted) return
        navigate('/error')
      },
    })

    // Cleanup
    return () => {
      mounted = false
      disconnectServicioLlenado()
    }
  }, [])

  return (
    <ScreenWrapper>
      {status === 'preparing' && (
        <h1 className="screen-title">{uiConfig.messages.preparingFilling}</h1>
      )}

      {status === 'filling' && (
        <>
          <h1 className="screen-title">{uiConfig.messages.filling}</h1>
          <FillingAnimation />
          <h2 style={{ marginTop: 20 }}>Peso actual: {peso?.toFixed(2) ?? '---'} kg</h2>
        </>
      )}

      {status === 'finished' && (
        <h1 className="screen-title">{uiConfig.messages.endFilling}</h1>
      )}
      <>
        <CornerLogo />
      </>
    </ScreenWrapper>
  )
}


