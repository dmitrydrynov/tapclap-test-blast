import { Container } from "pixi.js";
import { SceneManager } from "@/sceneManager";
import { HomeScene } from "@/scenes/home/home.scene";
import { GameScene } from "@/scenes/game/game.scene";
import { ResultView } from "./result.view";

export class ResultScene extends Container implements IScene {
  renderView: ResultView;

  constructor() {
    super();

    this.renderView = new ResultView(this);

    const { textMenu, textRestart } = this.renderView;

    textMenu.eventMode = "dynamic";
    textMenu.on("pointertap", this.onClickMenu, this);

    textRestart.eventMode = "dynamic";
    textRestart.on("pointertap", this.onClickRestart, this);
  }

  onClickRestart() {
    SceneManager.toScene(new GameScene());
  }

  onClickMenu() {
    SceneManager.toScene(new HomeScene());
  }

  update() {}
}
