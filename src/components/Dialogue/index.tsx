import React, { useState, useEffect } from 'react';
import './Dialogue.scss';
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
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Объединяем все сообщения в один текст с переносами строк
  const fullText = messages.join('\n\n');

  useEffect(() => {
    let index = 0;
    setIsTyping(true);

    // Создаем экземпляр utterance для отслеживания завершения речи
    const utterance = new SpeechSynthesisUtterance(fullText);

    utterance.onend = () => {
      // Когда речь закончилась, вызываем onComplete
      setIsCompleted(true);
      onComplete?.();
    };

    // Начинаем воспроизведение всего текста
    speechService.speak(fullText, utterance);

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText[index]);
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
  }, [fullText, speed, onComplete]);

  return (
    <div className={`dialogue ${className}`}>
      <div className='dialogue__box'>
        <div className='dialogue__text' style={{ whiteSpace: 'pre-wrap' }}>
          {displayedText}
        </div>
      </div>
    </div>
  );
};

export default Dialogue;
