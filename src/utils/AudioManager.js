// src/utils/AudioManager.js

import SeleccioneCantidad from "../assets/sounds/SeleccioneCantidad.wav";
import ColoqueEnvase from "../assets/sounds/Coloca.wav";
import Gracias from "../assets/sounds/Gracias.wav";
import TapSound from "../assets/sounds/tapSound.wav";
import VerificandoStock from "../assets/sounds/VerificandoStock.wav";

// Creamos una lista de sonidos que queremos precargar
const sounds = {
  seleccionarCantidad: new Audio(SeleccioneCantidad),
  coloqueEnvase: new Audio(ColoqueEnvase),
  gracias: new Audio(Gracias),
  tapSound: new Audio(TapSound),
  verificandoStock: new Audio(VerificandoStock),
};

// Precargar todos los sonidos (para que estén listos)
export function preloadSounds() {
  Object.values(sounds).forEach((audio) => {
    audio.load();
  });
}

// Reproducir uno específico
export function playSound(name) {
  const audio = sounds[name];
  if (audio) {
    audio.currentTime = 0; // reinicia desde el inicio
    audio.play().catch((err) =>
      console.warn(`Error reproduciendo ${name}:`, err)
    );
  } else {
    console.warn(`⚠️ No se encontró el sonido: ${name}`);
  }
}
