import React from 'react';
import './StartMenu.scss';
import { Button } from '../UI';
import { progressService } from '../../services/ProgressService';

const RUSSIAN_ALPHABET = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

interface StartMenuProps {
  onStart: (letter?: string) => void;
  className?: string;
}

const StartMenu: React.FC<StartMenuProps> = ({ onStart, className = '' }) => {
  const [showLetterSelect, setShowLetterSelect] = React.useState(false);
  const hasProgress = progressService.hasProgress();
  const nextLetter = progressService.getNextLetter();

  const handleContinue = () => {
    if (nextLetter) {
      onStart(nextLetter);
    }
  };

  const handleLetterSelect = (letter: string) => {
    onStart(letter);
  };

  return (
    <div className={`start-menu ${className}`}>
      <h1 className="start-menu__title">Изучаем алфавит с Мурзиком</h1>
      
      <div className="start-menu__buttons">
        <Button 
          onClick={() => onStart(RUSSIAN_ALPHABET[0])} 
          variant="primary"
          size="large"
        >
          Начать сначала
        </Button>

        {hasProgress && nextLetter && (
          <Button 
            onClick={handleContinue} 
            variant="primary"
            size="large"
          >
            Продолжить с буквы "{nextLetter.toUpperCase()}"
          </Button>
        )}

        <Button 
          onClick={() => setShowLetterSelect(true)} 
          variant="secondary"
          size="large"
        >
          Выбрать букву
        </Button>
      </div>

      {showLetterSelect && (
        <div className="start-menu__letter-select">
          <h2>Выберите букву:</h2>
          <div className="start-menu__letters">
            {RUSSIAN_ALPHABET.split('').map((letter) => {
              const isCompleted = progressService.getProgress().completedLetters.includes(letter);
              return (
                <Button
                  key={letter}
                  onClick={() => handleLetterSelect(letter)}
                  variant={isCompleted ? "success" : "letter"}
                >
                  {letter.toUpperCase()}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export { StartMenu };
