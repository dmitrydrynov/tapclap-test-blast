import { Container } from "pixi.js";
import { SceneManager } from "@/sceneManager";
import { HomeScene } from "@/scenes/home/home.scene";
import { GameScene } from "@/scenes/game/game.scene";
import { ResultView } from "./result.view";

type TResultSceneOptions = {
  success: boolean;
};

export class ResultScene extends Container implements IScene {
  renderView: ResultView;
  success: boolean;

  constructor({ success }: TResultSceneOptions) {
    super();

    this.success = success;
    this.renderView = new ResultView(this);

    const { homeBtn, restartBtn } = this.renderView;

    homeBtn.onPress.connect(() => {
      this.onHomeClick();
    });

    restartBtn.onPress.connect(() => {
      this.onRestartClick();
    });
  }

  onRestartClick() {
    SceneManager.toScene(new GameScene({ currentLevel: 0 }));
  }

  onHomeClick() {
    SceneManager.toScene(new HomeScene());
  }

  update() {}
}
