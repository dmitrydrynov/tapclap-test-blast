import { Container } from "pixi.js";
import { GameView } from "./game.view";
import { gameConfig } from "@/config/game";
import { RefreshModal } from "@/components/refresh-modal/component";
import { SceneManager } from "@/sceneManager";
import { ResultScene } from "@/scenes/result/result.scene";

export class GameScene extends Container implements IScene {
  renderView: GameView;
  levelConfig: ILevelConfig;
  refreshModal: RefreshModal;
  attempts: number = 0;

  constructor({ currentLevel = 0 }) {
    super();

    this.levelConfig = gameConfig.levels[currentLevel];
    this.renderView = new GameView(this);

    this.refreshModal = new RefreshModal(this, {
      width: 900,
      height: 500,
      onRefreshClick: this.onRefreshClick.bind(this),
    });
  }

  onRefreshClick() {
    this.renderView.gameBoard.refresh();
    this.refreshModal.close();
    this.attempts++;
  }

  onMovesEnd() {
    if (this.attempts < this.levelConfig.mixingAttempts) {
      this.refreshModal.open();
    } else {
      SceneManager.toScene(new ResultScene({ success: false }));
    }
  }

  update() {}
}
