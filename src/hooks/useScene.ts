import { useContext } from 'react';
import { SceneContext } from '../contexts/SceneContext';

export const useScene = () => {
  const context = useContext(SceneContext);
  if (context === undefined) {
    throw new Error('useScene must be used within a SceneProvider');
  }
  return context;
};