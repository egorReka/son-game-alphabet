interface Progress {
  lastLetter?: string;
  completedLetters: string[];
}

class ProgressService {
  private readonly STORAGE_KEY = 'alphabet_game_progress';

  saveProgress(letter: string) {
    const progress = this.getProgress();
    progress.lastLetter = letter;
    if (!progress.completedLetters.includes(letter)) {
      progress.completedLetters.push(letter);
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
  }

  getProgress(): Progress {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      return { completedLetters: [] };
    }
    return JSON.parse(stored);
  }

  hasProgress(): boolean {
    const progress = this.getProgress();
    return progress.completedLetters.length > 0;
  }

  getNextLetter(): string | null {
    const progress = this.getProgress();
    if (!progress.lastLetter) return null;

    const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    const currentIndex = alphabet.indexOf(progress.lastLetter.toLowerCase());
    if (currentIndex === -1 || currentIndex === alphabet.length - 1) return null;
    
    return alphabet[currentIndex + 1];
  }
}

export const progressService = new ProgressService();