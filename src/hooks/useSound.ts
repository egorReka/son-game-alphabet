import { useCallback } from 'react';
import { audioService } from '../services/AudioService';

export const useSound = () => {
  const playSound = useCallback((type: 'ui' | 'game' | 'voice', id: string) => {
    try {
      audioService.play(type, id);
    } catch (error) {
      console.warn('Ошибка воспроизведения звука:', error);
    }
  }, []);

  const playLetter = useCallback((letter: string) => {
    try {
      audioService.playLetter(letter);
    } catch (error) {
      console.warn('Ошибка воспроизведения буквы:', error);
    }
  }, []);

  return { playSound, playLetter };
};