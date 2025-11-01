// EmiLogoAnimation.jsx
import React from "react";
import Lottie from "lottie-react";
import EmiLogo from "../assets/EmiLogoAnimation.json"; // ajusta la ruta si es necesario

export default function EmiLogoAnimation({ loop = true, style = {}, onClick }) {
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
        animationData={EmiLogo}
        loop={loop}
      />
    </div>
  );
}
