import { Container } from "pixi.js";
import { GameBoardView } from "./view";

export class GameBoard extends Container {
  renderView: GameBoardView;

  constructor(levelConfig: any) {
    super();

    this.renderView = new GameBoardView(this, levelConfig);
  }
}
