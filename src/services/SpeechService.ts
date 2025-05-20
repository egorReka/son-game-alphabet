class SpeechService {
  private synthesis: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.synthesis = window.speechSynthesis;
  }

  speak(text: string, utterance?: SpeechSynthesisUtterance) {
    this.cancel();
    
    if (utterance) {
      this.currentUtterance = utterance;
    } else {
      this.currentUtterance = new SpeechSynthesisUtterance(text);
    }
    
    // Настройки для русского языка
    this.currentUtterance.lang = 'ru-RU';
    this.currentUtterance.rate = 1.0;
    this.currentUtterance.pitch = 1.0;
    
    this.synthesis.speak(this.currentUtterance);
  }

  cancel() {
    if (this.currentUtterance) {
      this.synthesis.cancel();
      this.currentUtterance = null;
    }
  }
}

export const speechService = new SpeechService();
