import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenWrapper from '../components/ScreenWrapper.jsx'
import { uiConfig } from '../config/uiConfig.js'

export default function ErrorScreen() {
  const navigate = useNavigate()
  useEffect(() => {
    const t = setTimeout(() => navigate('/'), 5000)
    return () => clearTimeout(t)
  }, [])
  return (
    <ScreenWrapper>
      <h1 className="screen-title">{uiConfig.messages.error}</h1>
    </ScreenWrapper>
  )
}

