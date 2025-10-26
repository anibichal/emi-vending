import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import LoadingSpinner from '../components/LoadingSpinner'
import { messages } from '../config/uiConfig'
import { LlenarLiquido } from '../services/mockServices'

export default function FillingScreen() {
  const { litros } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    LlenarLiquido(litros)
      .then(() => navigate('/thanks'))
      .catch(() => navigate('/error'))
  }, [])

  return (
    <ScreenWrapper>
      <h1>{messages.filling}</h1>
      <LoadingSpinner />
    </ScreenWrapper>
  )
}
