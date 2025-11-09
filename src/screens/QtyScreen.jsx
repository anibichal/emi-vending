import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScreenWrapper from "../components/ScreenWrapper.jsx";
import ButtonOne from "../components/ButtonOne.jsx";
import ButtonTwo from "../components/ButtonTwo.jsx";
import ButtonThree from "../components/ButtonThree.jsx";
import { uiConfig } from "../config/uiConfig.js";
import SeleccioneCantidad from "../assets/sounds/SeleccioneCantidad.wav";

export default function QtyScreen() {
  const navigate = useNavigate();

  const playSound = () => {
    const audio = new Audio(SeleccioneCantidad);
    audio.play().catch((err) => {
      console.warn("No se pudo reproducir el audio automáticamente:", err);
    });
  };

  // ✅ Reproducir el sonido al renderizar la pantalla
  useEffect(() => {
    playSound();
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















