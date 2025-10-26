import ScreenWrapper from '../components/ScreenWrapper';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import { useEffect, useState } from 'react';

export default function FillScreen() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScreenWrapper>
      {ready ? (
        <>
          <h1>Listo para llenar</h1>
          <Button text="Iniciar llenado" onClick={() => console.log('Iniciando...')} />
        </>
      ) : (
        <>
          <h1>Preparando...</h1>
          <LoadingSpinner />
        </>
      )}
    </ScreenWrapper>
  );
}

