import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScreenWrapper from "../components/ScreenWrapper.jsx";
import ButtonOne from "../components/ButtonOne.jsx";
import ButtonTwo from "../components/ButtonTwo.jsx";
import ButtonThree from "../components/ButtonThree.jsx";
import { uiConfig } from "../config/uiConfig.js";
import { playSound } from "../utils/AudioManager.js";

export default function QtyScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    playSound("seleccionarCantidad");
  }, []);

  return (
    <ScreenWrapper>
      <h1 className="screen-title">{uiConfig.messages.qty}</h1>

      <div className="qty-row">
        {/* ITEM 1 */}
        <div className="qty-item">
          <ButtonOne onClick={() => navigate(`/pago/1`, { state: { price: uiConfig.prices[0] } })} />
          <h1 className="qty-price">{uiConfig.prices[0]}</h1>
        </div>

        {/* ITEM 2 */}
        <div className="qty-item">
          <ButtonTwo onClick={() => navigate(`/pago/2`, { state: { price: uiConfig.prices[1] } })} />
          <h1 className="qty-price">{uiConfig.prices[1]}</h1>
        </div>

        {/* ITEM 3 */}
        <div className="qty-item">
          <ButtonThree onClick={() => navigate(`/pago/3`, { state: { price: uiConfig.prices[2] } })} />
          <h1 className="qty-price">{uiConfig.prices[2]}</h1>
        </div>
      </div>
    </ScreenWrapper>
  );
}















