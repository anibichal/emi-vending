import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenWrapper from '../components/ScreenWrapper'
import { messages } from '../config/uiConfig'

export default function ThanksScreen() {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => navigate('/'), 5000)
  }, [])
  return (
    <ScreenWrapper>
      <h1>{messages.thanks}</h1>
    </ScreenWrapper>
  )
}
