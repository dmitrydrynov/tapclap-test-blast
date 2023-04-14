import { Container } from "pixi.js";
import { SceneManager } from "@/sceneManager";
import { ResultScene } from "@/scenes/result/result.scene";
import { GameView } from "./game.view";
import { gameConfig } from "@/config/game";

export class GameScene extends Container implements IScene {
  renderView: GameView;
  levelConfig: any;

  constructor() {
    super();

    this.levelConfig = gameConfig.levels[0];
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
