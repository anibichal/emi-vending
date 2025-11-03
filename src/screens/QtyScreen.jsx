import { useNavigate } from 'react-router-dom'
import ScreenWrapper from '../components/ScreenWrapper.jsx'
import Button from '../components/Button.jsx'
import { uiConfig } from '../config/uiConfig.js'
import ButtonOne from "../components/ButtonOne.jsx";
import ButtonTwo from "../components/ButtonTwo.jsx";
import ButtonThree from "../components/ButtonThree.jsx";

export default function QtyScreen() {
  const navigate = useNavigate()

  return (
    <ScreenWrapper>
      <h1 className="screen-title">{uiConfig.messages.qty}</h1>
      <div className="qty-row">
      <ButtonOne onClick={() => navigate(`/pago/${1}`)} />
      <ButtonTwo onClick={() => navigate(`/pago/${2}`)} />
      <ButtonThree onClick={() => navigate(`/pago/${3}`)} />
      </div>
    </ScreenWrapper>
  )
}

/*
//const options = [1, 2, 3]
        {options.map(n => (
          <Button
            key={n}
            text={`${n} L - $${uiConfig.prices[n]}`}
            className="qty-button"
            onClick={() => navigate(`/pago/${n}`)}
          />
        ))}
*/ 