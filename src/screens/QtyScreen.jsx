import { useNavigate } from 'react-router-dom'
import ScreenWrapper from '../components/ScreenWrapper.jsx'
import Button from '../components/Button.jsx'
import { uiConfig } from '../config/uiConfig.js'

export default function QtyScreen() {
  const navigate = useNavigate()

  const options = [1, 2, 3]

  return (
    <ScreenWrapper>
      <h1 className="screen-title">{uiConfig.messages.qty}</h1>
      <div className="qty-row">
        {options.map(n => (
          <Button
            key={n}
            text={`${n} L - $${uiConfig.prices[n]}`}
            className="qty-button"
            onClick={() => navigate(`/pago/${n}`)}
          />
        ))}
      </div>
    </ScreenWrapper>
  )
}

