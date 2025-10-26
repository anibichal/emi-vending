import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenWrapper from '../components/ScreenWrapper'
import { messages } from '../config/uiConfig'

export default function ErrorScreen() {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => navigate('/'), 5000)
  }, [])
  return (
    <ScreenWrapper>
      <h1>{messages.error}</h1>
    </ScreenWrapper>
  )
}
