import { Container } from "pixi.js";
import { SceneManager } from "@/sceneManager";
import { ResultScene } from "@/scenes/result/result.scene";
import { GameView } from "./game.view";

export class GameScene extends Container implements IScene {
  renderView: GameView;

  constructor() {
    super();

    this.renderView = new GameView(this);

    const { text } = this.renderView;

    text.eventMode = "dynamic";
    text.on("pointertap", this.onClickText, this);
  }

  onClickText() {
    SceneManager.toScene(new ResultScene());
  }

  update() {}
}
