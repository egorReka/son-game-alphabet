import React from 'react';
import './Character.scss';

export type CharacterMood = 'neutral' | 'happy' | 'sad' | 'thinking';

interface CharacterProps {
  mood?: CharacterMood;
  speaking?: boolean;
  className?: string;
  onClick?: () => void;
}

const Character: React.FC<CharacterProps> = ({
  mood = 'neutral',
  speaking = false,
  className = '',
  onClick
}) => {
  return (
    <div 
      className={`character character--${mood} ${speaking ? 'character--speaking' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="character__container">
        {/* Здесь будет изображение персонажа */}
        <div className="character__image">
          {/* Временный плейсхолдер для персонажа */}
          <div className="character__placeholder">
            😺
          </div>
        </div>
        
        {/* Анимация разговора */}
        {speaking && (
          <div className="character__speech-indicator">
            <div className="character__speech-dot"></div>
            <div className="character__speech-dot"></div>
            <div className="character__speech-dot"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Character;