import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';

export default function PagoScreen() {
  const handleSale = async () => {
    const result = await globalThis.electronAPI.doSale();
    console.log('Resultado:', result);
  };

  return (
    <ScreenWrapper>
      <h1>Procesando pago...</h1>
      <Button text="Pagar" onClick={handleSale} />
    </ScreenWrapper>
  );
}
