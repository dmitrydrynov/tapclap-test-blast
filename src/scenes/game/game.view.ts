import { Container, Text } from "pixi.js";
import { GameBoard } from "@/components/game-board";
import { SceneManager } from "@/sceneManager";
import { gameConfig } from "@/config/game";
import { GameScene } from "./game.scene";
import { FancyButton } from "@pixi/ui";

export class GameView extends Container implements ISceneView {
  refreshBtn: FancyButton;
  gameBoard: GameBoard;

  constructor(scene: GameScene) {
    super();

    const {
      board: { columns, rows },
    } = scene.levelConfig;

    this.refreshBtn = new FancyButton({
      text: new Text("Refresh", gameConfig.textStyle.title),
      animations: {
        hover: {
          props: {
            scale: {
              x: 1.1,
              y: 1.1,
            },
          },
          duration: 100,
        },
      },
    });
    this.refreshBtn.position.set(150, SceneManager.height / 2);
    scene.addChild(this.refreshBtn);

    this.gameBoard = new GameBoard({
      levelConfig: scene.levelConfig,
      onMovesEnd: scene.onMovesEnd.bind(scene),
    });
    const width = columns * gameConfig.cellSize;
    const height = rows * gameConfig.cellSize;
    this.gameBoard.position.x = (SceneManager.width - width) / 2;
    this.gameBoard.position.y = (SceneManager.height - height) / 2;
    scene.addChild(this.gameBoard);
  }
}
