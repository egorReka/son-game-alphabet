import type { GameType } from '../components/Games/Game';

export interface SceneData {
  id: string;
  letter: string;
  word: string;
  background: string;
  characterMood: 'neutral' | 'happy' | 'sad' | 'thinking';
  character: {
    mood: 'neutral' | 'happy' | 'sad' | 'thinking';
    position: 'left' | 'center' | 'right';
  };
  dialogue: string[];
  game?: {
    type: GameType;
    question: string;
    options: string[];
    correctAnswer: string | string[];
  };
  successMessage: string[];
}

export interface SceneState {
  currentSceneId: string;
  completedScenes: string[];
  progress: {
    [sceneId: string]: {
      dialogueIndex: number;
      isGameCompleted: boolean;
      isComplete: boolean;
    };
  };
}
