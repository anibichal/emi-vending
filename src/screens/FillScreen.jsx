import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ScreenWrapper from '../components/ScreenWrapper'
import LoadingSpinner from '../components/LoadingSpinner'
import { uiConfig } from '../config/uiConfig'
import { connectBidonSocket, disconnectBidonSocket } from '../services/bidonService'
import ButtonStart from '../components/ButtonStart'
import { playSound } from "../utils/AudioManager.js";


export default function FillScreen() {
  const { litros } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('waiting')

  useEffect(() => {
    playSound("coloqueEnvase");
  }, []);

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
            <ButtonStart onClick={() => navigate(`/filling/${litros}`)} />
          </div>
        </>
      )}


    </ScreenWrapper>
  )
}




