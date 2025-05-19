export interface GameData {
  type: 'guess-letter';
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface SceneData {
  id: number;
  letter: string;
  word: string;
  background: string;
  characterMood: 'happy' | 'sad' | 'thinking';
  dialogue: string[];
  game: GameData;
  successMessage: string[];
}
