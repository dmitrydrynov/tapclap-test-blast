import { Container } from "pixi.js";
import { GameView } from "./game.view";
import { gameConfig } from "@/config/game";

export class GameScene extends Container implements IScene {
  renderView: GameView;
  levelConfig: ILevelConfig;

  constructor() {
    super();

    this.levelConfig = gameConfig.levels[0];
    this.renderView = new GameView(this);

    const { refreshBtn } = this.renderView;

    refreshBtn.onPress.connect(() => {
      this.onClickText();
    });
  }

  onClickText() {
    this.renderView.gameBoard.refresh();
  }

  update() {}
}
