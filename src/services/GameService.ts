import type { SceneData } from '../types/scene';

class GameService {
  private scenes: SceneData[] = [];
  private initialized: boolean = false;

  async loadScenes(): Promise<SceneData[]> {
    if (this.initialized) {
      return this.scenes;
    }

    try {
      const sceneModules = import.meta.glob<{ default: SceneData }>('../data/scenes/*.json');
      const loadedScenes = await Promise.all(Object.values(sceneModules).map((module) => module()));
      this.scenes = loadedScenes.map((scene) => scene.default);
      this.initialized = true;
      return this.scenes;
    } catch (error) {
      console.error('Ошибка загрузки сцен:', error);
      return [];
    }
  }

  getNextScene(currentSceneId: string): SceneData | null {
    const currentIndex = this.scenes.findIndex((scene) => scene.id === currentSceneId);
    if (currentIndex === -1 || currentIndex === this.scenes.length - 1) {
      return null;
    }
    return this.scenes[currentIndex + 1];
  }

  getSceneById(sceneId: string): SceneData | null {
    return this.scenes.find((scene) => scene.id === sceneId) || null;
  }

  getSceneByLetter(letter: string): SceneData | null {
    return this.scenes.find((scene) => scene.letter.toLowerCase() === letter.toLowerCase()) || null;
  }
}

export const gameService = new GameService();
