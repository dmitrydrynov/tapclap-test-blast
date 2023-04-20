import { Container } from "pixi.js";
import { GameBoard } from "@/components/game-board/component";
import { SceneManager } from "@/sceneManager";
import { gameConfig } from "@/config/game";
import { GameScene } from "./game.scene";

export class GameView extends Container implements ISceneView {
  gameBoard: GameBoard;

  constructor(scene: GameScene) {
    super();

    const {
      board: { columns, rows },
    } = scene.levelConfig;

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
