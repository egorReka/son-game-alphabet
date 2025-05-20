class SpeechService {
  private synthesis: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;
  private isMuted: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.initializeVoice();
  }

  private initializeVoice() {
    window.speechSynthesis.onvoiceschanged = () => {
      const voices = window.speechSynthesis.getVoices();
      this.voice = voices.find(voice => voice.lang.includes('ru')) || voices[0];
    };
  }

  speak(text: string) {
    if (this.isMuted || !this.voice) return;

    // Останавливаем предыдущее произношение
    this.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.voice;
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'ru-RU';

    this.currentUtterance = utterance;
    this.synthesis.speak(utterance);
  }

  cancel() {
    if (this.currentUtterance) {
      this.synthesis.cancel();
      this.currentUtterance = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.cancel();
    }
  }
}

export const speechService = new SpeechService();
