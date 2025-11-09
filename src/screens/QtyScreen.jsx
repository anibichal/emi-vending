import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScreenWrapper from "../components/ScreenWrapper.jsx";
import ButtonOne from "../components/ButtonOne.jsx";
import ButtonTwo from "../components/ButtonTwo.jsx";
import ButtonThree from "../components/ButtonThree.jsx";
import { uiConfig } from "../config/uiConfig.js";
import { playSound } from "../utils/AudioManager.js"; //

export default function QtyScreen() {
  const navigate = useNavigate();

  // ✅ Reproducir el sonido al renderizar la pantalla
  useEffect(() => {
    playSound("seleccionarCantidad");
  }, []);

  return (
    <ScreenWrapper>
      <h1 className="screen-title">{uiConfig.messages.qty}</h1>
      <div className="qty-row">
        <ButtonOne onClick={() => navigate(`/pago/1`)} />
        <ButtonTwo onClick={() => navigate(`/pago/2`)} />
        <ButtonThree onClick={() => navigate(`/pago/3`)} />
      </div>
    </ScreenWrapper>
  );
}















