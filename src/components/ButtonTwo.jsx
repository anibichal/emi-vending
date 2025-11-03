// EmiLogoAnimation.jsx
import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import ButtonTwoAnimation from "../assets/ButtonTwoAnimation.json"; // ajusta la ruta si es necesario

export default function ButtonTwo({ loop = true, style = {}, onClick }) {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current && loop) {
      // Reproduce solo entre los frames 0 y 145, en loop
      lottieRef.current.playSegments([0, 145], true);
    }
  }, [loop]);

  return (
    <div
      onClick={onClick}
      style={{
        display: "inline-block",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={ButtonTwoAnimation}
        loop={loop} // el loop se limita por los segmentos
      />
    </div>
  );
}

