import Lottie from "lottie-react";
import EmiLogo from "../assets/EmiLogoAnimation.json";


export default function EmiLogoAnimation({ loop = true, style = {} }) {
  return (
    
      <Lottie
        animationData={EmiLogo}
        loop={loop}
      />
   
  );
}