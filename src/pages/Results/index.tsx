import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useScene } from '../../contexts/SceneContext';
import { Button } from '../../components/UI';
import './Results.scss';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useScene();

  const handlePlayAgain = () => {
    navigate('/');
  };

  return (
    <div className="results-page">
      <div className="results-content">
        <h1>Поздравляем!</h1>
        <p>Вы успешно прошли все задания!</p>
        <p>Изученные буквы: {state.completedScenes.length}</p>
        <Button onClick={handlePlayAgain} variant="primary">
          Играть снова
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;