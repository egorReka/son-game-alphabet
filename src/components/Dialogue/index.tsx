import React, { useState, useEffect } from 'react';
import './Dialogue.scss';
import { Button } from '../UI';
import { useSound } from '../../hooks/useSound';
import { speechService } from '../../services/SpeechService';

interface DialogueProps {
  messages: string[];
  onComplete?: () => void;
  speed?: number;
  className?: string;
}

const Dialogue: React.FC<DialogueProps> = ({
  messages,
  onComplete,
  speed = 50,
  className = '',
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentMessage = messages[currentMessageIndex];

  useEffect(() => {
    if (!currentMessage) return;

    let index = 0;
    setIsTyping(true);

    // Начинаем воспроизведение всего текста сразу
    speechService.speak(currentMessage);

    const interval = setInterval(() => {
      if (index < currentMessage.length) {
        const nextChar = currentMessage[index];
        if (nextChar !== undefined) {
          setDisplayedText((prev) => prev + nextChar);
        }
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);

    return () => {
      clearInterval(interval);
      speechService.cancel();
    };
  }, [currentMessage, speed]);

  const handleNext = () => {
    if (isTyping) {
      setDisplayedText(currentMessage);
      setIsTyping(false);
      return;
    }

    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex((prev) => prev + 1);
      setDisplayedText('');
    } else {
      setIsCompleted(true);
      onComplete?.();
    }
  };

  return (
    <div className={`dialogue ${className}`}>
      <div className='dialogue__box'>
        <div className='dialogue__text'>{displayedText}</div>
        {!isCompleted && (
          <div className='dialogue__controls'>
            <Button onClick={handleNext} variant='primary'>
              {isTyping ? 'Пропустить' : 'Далее'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialogue;
