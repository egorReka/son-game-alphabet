import { Howl } from 'howler';

class AudioService {
  private sounds: Map<string, Howl> = new Map();
  private isMuted: boolean = false;
  private synthesis: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.initializeVoice();
    this.initializeSounds();
  }

  private initializeVoice() {
    // Ждем загрузки голосов и выбираем русский
    window.speechSynthesis.onvoiceschanged = () => {
      const voices = window.speechSynthesis.getVoices();
      this.voice = voices.find((voice) => voice.lang.includes('ru')) || voices[0];
    };
  }

  private initializeSounds() {
    // UI звуки
    this.registerSound('ui/click', '/src/assets/sounds/ui/click.wav');
    this.registerSound('ui/hover', '/src/assets/sounds/ui/hover.ogg');

    // Игровые звуки
    this.registerSound('game/success', '/src/assets/sounds/game/success.wav');
    this.registerSound('game/error', '/src/assets/sounds/game/error.mp3');
    this.registerSound('game/complete', '/src/assets/sounds/game/complete.wav');
  }

  private registerSound(id: string, src: string) {
    try {
      this.sounds.set(
        id,
        new Howl({
          src: [src],
          preload: true,
          volume: 0.5,
          onloaderror: (soundId, error) => {
            console.warn(`Ошибка загрузки звука ${id}:`, error);
          },
        })
      );
    } catch (error) {
      console.warn(`Ошибка регистрации звука ${id}:`, error);
    }
  }

  play(type: 'ui' | 'game' | 'voice', id: string) {
    if (this.isMuted) return;

    const soundId = `${type}/${id}`;
    const sound = this.sounds.get(soundId);

    if (sound) {
      try {
        sound.play();
      } catch (error) {
        console.warn(`Ошибка воспроизведения звука ${soundId}:`, error);
      }
    } else {
      console.warn(`Звук ${soundId} не найден`);
    }
  }

  playLetter(letter: string) {
    if (this.isMuted || !this.voice) return;

    // Останавливаем предыдущее произношение
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.voice = this.voice;
    utterance.rate = 0.8; // Немного замедляем для четкости
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'ru-RU';

    this.synthesis.speak(utterance);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.sounds.forEach((sound) => sound.mute(this.isMuted));
    if (this.isMuted) {
      this.synthesis.cancel(); // Останавливаем произношение при отключении звука
    }
  }

  setVolume(volume: number) {
    this.sounds.forEach((sound) => sound.volume(volume));
  }
}

export const audioService = new AudioService();
