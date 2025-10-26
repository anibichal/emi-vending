import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function StartScreen() {
  const navigate = useNavigate();

  return (
    <ScreenWrapper>
      <h1>Bienvenido</h1>
      <Button text="Comenzar" onClick={() => navigate('/qty')} />
    </ScreenWrapper>
  );
}
