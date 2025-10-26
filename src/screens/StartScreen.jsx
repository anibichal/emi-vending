import { useNavigate } from 'react-router-dom'
import ScreenWrapper from '../components/ScreenWrapper.jsx'
import Button from '../components/Button.jsx'
import { uiConfig } from '../config/uiConfig.js'

export default function StartScreen() {
  const navigate = useNavigate()
  return (
    <ScreenWrapper>
      <h1 className="screen-title">{uiConfig.messages.start}</h1>
      <div style={{ marginTop: 18 }}>
        <Button text={uiConfig.buttons.start} onClick={() => navigate('/qty')} />
      </div>
    </ScreenWrapper>
  )
}

