import { HashRouter, Routes, Route } from 'react-router-dom';
import StartScreen from './screens/StartScreen';
import QtyScreen from './screens/QtyScreen';
import PagoScreen from './screens/PagoScreen';
import FillScreen from './screens/FillScreen';
import FillingScreen from './screens/FillingScreen';
import ThanksScreen from './screens/ThanksScreen';
import ErrorScreen from './screens/ErrorScreen';
import './index.css';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/qty" element={<QtyScreen />} />
        <Route path="/pago" element={<PagoScreen />} />
        <Route path="/fill" element={<FillScreen />} />
        <Route path="/filling" element={<FillingScreen />} />
        <Route path="/thanks" element={<ThanksScreen />} />
        <Route path="/error" element={<ErrorScreen />} />
      </Routes>
    </HashRouter>
  );
}

