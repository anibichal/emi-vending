import { useNavigate } from 'react-router-dom'
import ScreenWrapper from '../components/ScreenWrapper'
import Button from '../components/Button'
import { messages, prices } from '../config/uiConfig'

export default function QtyScreen() {
  const navigate = useNavigate()
  return (
    <ScreenWrapper>
      <h1>{messages.qty}</h1>
      <div>
        {[1, 2, 3].map((n) => (
          <Button key={n} text={`${n}L - $${prices[n]}`} onClick={() => navigate(`/pago/${n}`)} />
        ))}
      </div>
    </ScreenWrapper>
  )
}
