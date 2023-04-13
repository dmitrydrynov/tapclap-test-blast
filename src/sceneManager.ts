import { Application } from "pixi.js";

export class SceneManager {
  constructor() {}

  private static app: Application;
  private static currentScene: IScene;

  private static _width: number;
  private static _height: number;

  public static get width(): number {
    return SceneManager._width;
  }

  public static get height(): number {
    return SceneManager._height;
  }

  public static initialize(width: number, height: number, background: number) {
    SceneManager._width = width;
    SceneManager._height = height;

    SceneManager.app = new Application({
      view: document.getElementById("game-canvas") as HTMLCanvasElement,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: background,
      width,
      height,
    });

    SceneManager.app.ticker.add(SceneManager.update);

    window.addEventListener("resize", SceneManager.resize);
    SceneManager.resize();
  }

  public static toScene(newScene: IScene) {
    if (SceneManager.currentScene) {
      SceneManager.app.stage.removeChild(SceneManager.currentScene);
      SceneManager.currentScene.destroy();
    }

    SceneManager.currentScene = newScene;
    SceneManager.app.stage.addChild(SceneManager.currentScene);
  }

  private static update(framesPassed: number) {
    if (SceneManager.currentScene) {
      SceneManager.currentScene.update(framesPassed);
    }
  }

  public static resize(): void {
    // current screen size
    const screenWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    const screenHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );

    // uniform scale for our game
    const scale = Math.min(
      screenWidth / SceneManager.width,
      screenHeight / SceneManager.height
    );

    // the "uniformly englarged" size for our game
    const enlargedWidth = Math.floor(scale * SceneManager.width);
    const enlargedHeight = Math.floor(scale * SceneManager.height);

    // margins for centering our game
    const horizontalMargin = (screenWidth - enlargedWidth) / 2;
    const verticalMargin = (screenHeight - enlargedHeight) / 2;

    // now we use css trickery to set the sizes and margins
    if (SceneManager.app.view.style) {
      SceneManager.app.view.style.width = `${enlargedWidth}px`;
      SceneManager.app.view.style.height = `${enlargedHeight}px`;
      SceneManager.app.view.style.marginLeft =
        SceneManager.app.view.style.marginRight = `${horizontalMargin}px`;
      SceneManager.app.view.style.marginTop =
        SceneManager.app.view.style.marginBottom = `${verticalMargin}px`;
    }
  }
}
