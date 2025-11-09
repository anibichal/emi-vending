import { HashRouter, Routes, Route } from 'react-router-dom'
import StartScreen from './screens/StartScreen.jsx'
import QtyScreen from './screens/QtyScreen.jsx'
import PagoScreen from './screens/PagoScreen.jsx'
import FillScreen from './screens/FillScreen.jsx'
import FillingScreen from './screens/FillingScreen.jsx'
import ThanksScreen from './screens/ThanksScreen.jsx'
import ErrorScreen from './screens/ErrorScreen.jsx'
import { preloadSounds } from "./utils/AudioManager.js";
import './index.css'

export default function App() {

  useEffect(() => {
    preloadSounds(); // precarga todos los audios una sola vez
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/qty" element={<QtyScreen />} />
        <Route path="/pago/:litros" element={<PagoScreen />} />
        <Route path="/fill/:litros" element={<FillScreen />} />
        <Route path="/filling/:litros" element={<FillingScreen />} />
        <Route path="/thanks" element={<ThanksScreen />} />
        <Route path="/error" element={<ErrorScreen />} />
      </Routes>
    </HashRouter>
  )
}


