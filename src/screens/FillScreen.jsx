import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ScreenWrapper from '../components/ScreenWrapper'
import Button from '../components/Button'
import LoadingSpinner from '../components/LoadingSpinner'
import { uiConfig } from '../config/uiConfig'
import { connectBidonSocket, disconnectBidonSocket } from '../services/bidonService'

export default function FillScreen() {
  const { litros } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('waiting') // waiting | ready

  useEffect(() => {
    connectBidonSocket((statusBidon) => {
      if (statusBidon) setStatus('ready')
      else setStatus('waiting')
    })

    return () => disconnectBidonSocket()
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
            <Button
              text={uiConfig.buttons.startFill}
              onClick={() => navigate(`/filling/${litros}`)}
            />
          </div>
        </>
      )}
    </ScreenWrapper>
  )
}



