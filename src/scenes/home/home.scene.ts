import { Container } from "pixi.js";
import { SceneManager } from "@/sceneManager";
import { GameScene } from "@/scenes/game/game.scene";
import { HomeView } from "./home.view";

export class HomeScene extends Container implements IScene {
  renderView: HomeView;

  constructor() {
    super();

    /** Init view */
    this.renderView = new HomeView(this);

    const { startBtn } = this.renderView;

    startBtn.onPress.connect(() => {
      this.onStartGame();
    });
  }

  onStartGame() {
    SceneManager.toScene(new GameScene({ currentLevel: 0 }));
  }

  update() {}
}
