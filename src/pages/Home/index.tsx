import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import { StartMenu } from '../../components/StartMenu';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = (letter?: string) => {
    // Если буква не выбрана, начинаем с 'а'
    const startLetter = letter || 'а';
    navigate(`/game/${startLetter}`);
  };

  return (
    <div className='home-page'>
      <div className='home-page__content'>
        <StartMenu onStart={handleStart} />
      </div>
    </div>
  );
};

export default Home;
