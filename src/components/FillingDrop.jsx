import Lottie from "lottie-react";
import fillingdrop from "../assets/fillingdrop.json";


export default function FillingDrop({ loop = true, style = {} }) {
  return (
    
      <Lottie
        animationData={fillingdrop}
        loop={loop}
      />
   
  );
}


