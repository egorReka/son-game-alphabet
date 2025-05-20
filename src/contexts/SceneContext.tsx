import React, { createContext, useReducer, useContext } from 'react';
import type { ReactNode } from 'react';
import type { SceneData, SceneState } from '../types/scene';
import { gameService } from '../services/GameService';

interface SceneContextType {
  state: SceneState;
  currentScene: SceneData | null;
  dispatch: React.Dispatch<SceneAction>;
}

type SceneAction =
  | { type: 'SET_SCENE'; payload: string }
  | { type: 'COMPLETE_DIALOGUE'; payload: string }
  | { type: 'COMPLETE_GAME'; payload: string }
  | { type: 'COMPLETE_SCENE'; payload: string }
  | { type: 'RESET_PROGRESS' };

const initialState: SceneState = {
  currentSceneId: '',
  completedScenes: [],
  progress: {},
};

export const SceneContext = createContext<SceneContextType | undefined>(undefined);

export const SceneProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(sceneReducer, initialState);

  const currentScene = state.currentSceneId ? gameService.getSceneById(state.currentSceneId) : null;

  return (
    <SceneContext.Provider value={{ state, currentScene, dispatch }}>
      {children}
    </SceneContext.Provider>
  );
};

function sceneReducer(state: SceneState, action: SceneAction): SceneState {
  switch (action.type) {
    case 'SET_SCENE':
      return {
        ...state,
        currentSceneId: action.payload,
        progress: {
          ...state.progress,
          [action.payload]: state.progress[action.payload] || {
            dialogueIndex: 0,
            isGameCompleted: false,
            isComplete: false,
          },
        },
      };

    case 'COMPLETE_DIALOGUE':
      return {
        ...state,
        progress: {
          ...state.progress,
          [action.payload]: {
            ...state.progress[action.payload],
            dialogueIndex: state.progress[action.payload].dialogueIndex + 1,
          },
        },
      };

    case 'COMPLETE_GAME':
      return {
        ...state,
        progress: {
          ...state.progress,
          [action.payload]: {
            ...state.progress[action.payload],
            isGameCompleted: true,
          },
        },
      };

    case 'COMPLETE_SCENE':
      return {
        ...state,
        completedScenes: [...state.completedScenes, action.payload],
        progress: {
          ...state.progress,
          [action.payload]: {
            ...state.progress[action.payload],
            isComplete: true,
          },
        },
      };

    case 'RESET_PROGRESS':
      return initialState;

    default:
      return state;
  }
}

export const useScene = () => {
  const context = useContext(SceneContext);
  if (context === undefined) {
    throw new Error('useScene must be used within a SceneProvider');
  }
  return context;
};
