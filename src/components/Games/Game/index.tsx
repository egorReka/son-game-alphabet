import React from 'react';
import './Game.scss';
import { Card } from '../../UI';

export type GameType = 'guess-letter' | 'find-letter' | 'build-word' | 'connect-pairs' | 'color-letter';

interface GameProps {
  type: GameType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  onAnswer: (answer: string | string[]) => void;
  onComplete: () => void;
  className?: string;
}

const Game: React.FC<GameProps> = ({
  type,
  question,
  options = [],
  correctAnswer,
  onAnswer,
  onComplete,
  className = ''
}) => {
  return (
    <div className={`game game--${type} ${className}`}>
      <Card className="game__container">
        <h3 className="game__question">{question}</h3>
        
        <div className="game__content">
          {type === 'guess-letter' && (
            <div className="game__options">
              {options.map((option, index) => (
                <button
                  key={index}
                  className="game__option"
                  onClick={() => {
                    onAnswer(option);
                    if (option === correctAnswer) {
                      onComplete();
                    }
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          
          {/* Здесь будут добавляться другие типы игр */}
        </div>
      </Card>
    </div>
  );
};

export default Game;