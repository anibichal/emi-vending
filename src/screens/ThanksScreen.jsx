import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenWrapper from '../components/ScreenWrapper.jsx'
import { uiConfig } from '../config/uiConfig.js'
import Gracias from "../assets/sounds/Gracias.wav";

export default function ThanksScreen() {
  const navigate = useNavigate()

  const playSound = () => {
    const audio = new Audio(Gracias);
    audio.play().catch((err) => {
      console.warn("No se pudo reproducir el audio automáticamente:", err);
    });
  };

  // ✅ Reproducir el sonido al renderizar la pantalla
  useEffect(() => {
    playSound();
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

