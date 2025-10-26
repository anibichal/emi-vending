import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ScreenWrapper from '../components/ScreenWrapper.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { LlenarLiquido } from '../services/mockServices.js'
import { uiConfig } from '../config/uiConfig.js'

export default function FillingScreen() {
  const { litros } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    LlenarLiquido(Number(litros))
      .then(() => { if (mounted) navigate('/thanks') })
      .catch(() => navigate('/error'))
    return () => { mounted = false }
  }, [])

  return (
    <ScreenWrapper>
      <h1 className="screen-title">{uiConfig.messages.filling}</h1>
      <LoadingSpinner />
    </ScreenWrapper>
  )
}

