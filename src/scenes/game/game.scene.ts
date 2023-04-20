import { Container } from "pixi.js";
import { GameView } from "./game.view";
import { gameConfig } from "@/config/game";
import { RefreshModal } from "@/components/refresh-modal/component";

export class GameScene extends Container implements IScene {
  renderView: GameView;
  levelConfig: ILevelConfig;
  refreshModal: RefreshModal;

  constructor() {
    super();

    this.levelConfig = gameConfig.levels[0];
    this.renderView = new GameView(this);

    this.refreshModal = new RefreshModal(this, {
      width: 900,
      height: 500,
      onRefreshClick: this.onRefreshClick.bind(this),
    });

    this.renderView.refreshBtn.onPress.connect(() => {
      this.renderView.gameBoard.refresh();
    });
  }

  onRefreshClick() {
    this.renderView.gameBoard.refresh();
    this.refreshModal.close();
    // this.removeChild(this.refreshModal);
  }

  onMovesEnd() {
    this.refreshModal.open();
  }

  update() {}
}
