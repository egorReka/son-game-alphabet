import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Scene.scss';
import Character from '../Character';
import Dialogue from '../Dialogue';
import { Game } from '../Games';
import type { SceneData } from '../../types/scene';

interface SceneProps {
  data: SceneData;
  onComplete: () => void;
}

const Scene: React.FC<SceneProps> = ({ data, onComplete }) => {
  const [isDialogueComplete, setIsDialogueComplete] = useState(false);
  const [isCharacterSpeaking, setIsCharacterSpeaking] = useState(true);
  const [inProp, setInProp] = useState(true);
  const nodeRef = useRef(null);

  const handleDialogueComplete = () => {
    setIsDialogueComplete(true);
    setIsCharacterSpeaking(false);
  };

  const handleGameComplete = () => {
    setInProp(false);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  const handleGameAnswer = (answer: string | string[]) => {
    // Обновляем настроение персонажа при правильном ответе
    if (data.game && answer === data.game.correctAnswer) {
      setIsCharacterSpeaking(true);
    }
  };

  if (!data || !data.characterMood) {
    return <div>Загрузка сцены...</div>;
  }

  return (
    <CSSTransition
      in={inProp}
      timeout={500}
      classNames='scene-transition'
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className='scene' style={{ backgroundImage: `url(${data.background})` }}>
        <div className='scene__character'>
          <Character mood={data.characterMood} speaking={isCharacterSpeaking} />
        </div>

        <div className='scene__content'>
          {!isDialogueComplete ? (
            <Dialogue messages={data.dialogue} onComplete={handleDialogueComplete} />
          ) : data.game ? (
            <Game {...data.game} onComplete={handleGameComplete} onAnswer={handleGameAnswer} successMessage={data.successMessage} />
          ) : null}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Scene;
