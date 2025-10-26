import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import Button from '../components/Button.jsx'
import { getBidonStatus } from '../services/mockServices.js'
import { uiConfig } from '../config/uiConfig.js'

export default function FillScreen() {
  const { litros } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('waiting')

  useEffect(() => {
    let mounted = true
    getBidonStatus()
      .then(() => { if (mounted) setStatus('ready') })
      .catch(() => navigate('/error'))
    return () => { mounted = false }
  }, [])

  return (
    <ScreenWrapper>
      {status === 'waiting' ? (
        <>
          <h1 className="screen-title">{uiConfig.messages.fillInsert}</h1>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <h1 className="screen-title">{uiConfig.messages.fillReady}</h1>
          <div style={{ marginTop: 12 }}>
            <Button text={uiConfig.buttons.startFill} onClick={() => navigate(`/filling/${litros}`)} />
          </div>
        </>
      )}
    </ScreenWrapper>
  )
}


