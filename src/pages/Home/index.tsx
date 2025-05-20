import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/UI';
import './Home.scss';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <div className="home-page">
      <div className="home-page__content">
        <Card className="home-page__card">
          <h1 className="home-page__title">Изучаем алфавит</h1>
          <p className="home-page__description">
            Привет! Давай вместе с котиком Мурзиком изучать буквы и слова!
          </p>
          <Button 
            variant="primary"
            size="large"
            onClick={handleStartGame}
          >
            Начать игру
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;