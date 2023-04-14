import { SceneManager } from "@/sceneManager";
import { Container, Graphics } from "pixi.js";
import * as math from "mathjs";
import { randomInteger } from "@/helpers/math";
import { BoardTail } from "../tail";
import { gameConfig } from "@/config/game";

export class GameBoardView extends Container {
  constructor(scene: Container, levelConfig: ILevelConfig) {
    super();

    const {
      board: { columns, rows },
      tails,
    } = levelConfig;

    const cellSize = gameConfig.cellSize;
    const borderSize = 10;
    const width = columns * cellSize;
    const height = rows * cellSize;
    const x = (SceneManager.width - width) / 2;
    const y = (SceneManager.height - height) / 2;

    /** Createe board */
    const board = new Graphics();
    /** background */
    board.beginFill(0xffffff);
    board.drawRect(0, 0, width, height);
    board.endFill();
    /** grid */
    board.lineStyle(3, "00000020");
    for (let r = 1; r < rows; r++) {
      board.moveTo(0, r * cellSize);
      board.lineTo(width, r * cellSize);
    }
    for (let c = 1; c < columns; c++) {
      board.moveTo(c * cellSize, 0);
      board.lineTo(c * cellSize, height);
    }
    /** border */
    board.lineStyle(borderSize, 0x000000);
    board.drawRect(
      -borderSize / 2,
      -borderSize / 2,
      width + borderSize / 2,
      height + borderSize / 2
    );

    board.position.x = x;
    board.position.y = y;
    scene.addChild(board);

    /** Create Tails */
    const zeroTails = math.zeros(columns, rows);
    const fillTails = zeroTails.map(() => randomInteger(0, tails.length - 1));

    /** Draw tails */
    let tailsContainers: BoardTail[] = [];
    fillTails.map((value, idx) => {
      const newTail = new BoardTail(value, Array.isArray(idx) ? idx : [idx]);
      tailsContainers.push(newTail);
      scene.addChild(newTail);
    });

    console.log(fillTails.toString());
  }
}
