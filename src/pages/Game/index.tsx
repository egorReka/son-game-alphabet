import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import Scene from '../../components/Scene';
import { useScene } from '../../contexts/SceneContext';
import { gameService } from '../../services/GameService';
import { progressService } from '../../services/ProgressService';
import './Game.scss';
import { useParams } from 'react-router-dom';

const GamePage: React.FC = () => {
  const { letter } = useParams();
  const { state, currentScene, dispatch } = useScene();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const initializeScenes = async () => {
      try {
        setIsLoading(true);
        const scenes = await gameService.loadScenes();
        if (scenes.length > 0) {
          // Находим сцену, соответствующую выбранной букве
          const targetScene = scenes.find(
            (scene) => scene.letter.toLowerCase() === letter.toLowerCase()
          );
          if (targetScene) {
            dispatch({ type: 'SET_SCENE', payload: targetScene.id });
          } else {
            console.error('Сцена для буквы не найдена:', letter);
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Ошибка при загрузке сцен:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeScenes();
  }, [dispatch, letter, navigate]);

  const handleSceneComplete = async () => {
    if (currentScene) {
      setIsTransitioning(true);
      dispatch({ type: 'COMPLETE_SCENE', payload: currentScene.id });
      
      // Сохраняем прогресс
      progressService.saveProgress(currentScene.letter);

      const nextScene = gameService.getNextScene(currentScene.id);
      if (nextScene) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        dispatch({ type: 'SET_SCENE', payload: nextScene.id });
      } else {
        navigate('/results');
      }
      setIsTransitioning(false);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!currentScene) {
    return <div>Сцена не найдена</div>;
  }

  return (
    <div className='game-page'>
      <TransitionGroup>
        <Scene key={currentScene.id} data={currentScene} onComplete={handleSceneComplete} />
      </TransitionGroup>
    </div>
  );
};

export default GamePage;
