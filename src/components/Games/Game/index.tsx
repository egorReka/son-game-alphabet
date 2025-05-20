import React, { useState } from 'react';
import './Game.scss';
import { Card } from '../../UI';
import { speechService } from '../../../services/SpeechService';
import successSound from '../../../assets/sounds/game/success.wav';

export type GameType =
  | 'guess-letter'
  | 'find-letter'
  | 'build-word'
  | 'connect-pairs'
  | 'color-letter';

interface GameProps {
  type: GameType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  onAnswer: (answer: string | string[]) => void;
  onComplete: () => void;
  successMessage: string[];
  className?: string;
}

const Game: React.FC<GameProps> = ({
  type,
  question,
  options = [],
  correctAnswer,
  onAnswer,
  onComplete,
  successMessage,
  className = '',
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  const playSuccessSound = async () => {
    try {
      const audio = new Audio(successSound);
      await audio.play();
    } catch (error) {
      console.warn('Не удалось воспроизвести звук успеха:', error);
    }
  };

  const handleAnswer = async (answer: string) => {
    onAnswer(answer);
    if (answer === correctAnswer && successMessage?.length > 0) {
      setShowSuccess(true);
      await playSuccessSound();
      setDisplayedText(successMessage[currentMessageIndex]);
      speechService.speak(successMessage[currentMessageIndex]);
    }
  };

  const handleNextMessage = () => {
    if (currentMessageIndex < successMessage.length - 1) {
      const nextIndex = currentMessageIndex + 1;
      setCurrentMessageIndex(nextIndex);
      setDisplayedText(successMessage[nextIndex]);
      speechService.speak(successMessage[nextIndex]);
    } else {
      onComplete();
    }
  };

  return (
    <div className={`game game--${type} ${className}`}>
      <Card className='game__container'>
        {!showSuccess ? (
          <>
            <h3 className='game__question'>{question}</h3>
            <div className='game__content'>
              {type === 'guess-letter' && (
                <div className='game__options'>
                  {options.map((option, index) => (
                    <button
                      key={index}
                      className='game__option'
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className='game__success'>
            <p className='game__success-message'>{displayedText}</p>
            <button 
              className='game__next-button' 
              onClick={handleNextMessage}
            >
              {currentMessageIndex < successMessage.length - 1 ? 'Дальше' : 'Завершить'}
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Game;
