import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import Scene from '../../components/Scene';
import { useScene } from '../../contexts/SceneContext';
import { gameService } from '../../services/GameService';
import './Game.scss';

const GamePage: React.FC = () => {
  const { state, currentScene, dispatch } = useScene();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const initializeScenes = async () => {
      try {
        setIsLoading(true);
        const scenes = await gameService.loadScenes();
        if (scenes.length > 0 && !state.currentSceneId) {
          dispatch({ type: 'SET_SCENE', payload: scenes[0].id });
        }
      } catch (error) {
        console.error('Ошибка при загрузке сцен:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeScenes();
  }, [dispatch]);

  const handleSceneComplete = async () => {
    if (currentScene) {
      setIsTransitioning(true);
      dispatch({ type: 'COMPLETE_SCENE', payload: currentScene.id });
      
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
