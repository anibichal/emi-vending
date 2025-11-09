import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenWrapper from '../components/ScreenWrapper.jsx'
import { uiConfig } from '../config/uiConfig.js'
import { playSound } from "../utils/AudioManager.js"; //

export default function ThanksScreen() {
  const navigate = useNavigate()

  // ✅ Reproducir el sonido al renderizar la pantalla
  useEffect(() => {
    playSound("gracias");
  }, []);

  useEffect(() => {
    const t = setTimeout(() => navigate('/'), 5000)
    return () => clearTimeout(t)
  }, [])
  return (
    <ScreenWrapper>
      <h1 className="screen-title">{uiConfig.messages.thanks}</h1>
    </ScreenWrapper>
  )
}

