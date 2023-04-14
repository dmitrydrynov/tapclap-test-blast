import { Container, TextStyle, Text } from "pixi.js";
import { GameBoard } from "./components/game-board";

export class GameView extends Container {
  text: Text;
  board: Container;

  constructor(scene: IScene) {
    super();

    const style: TextStyle = new TextStyle({
      align: "center",
      fill: "#000000",
      fontSize: 42,
      fontFamily: "Marvin",
    });

    this.text = new Text("Game Scene", style);
    scene.addChild(this.text);

    this.board = new GameBoard(scene.levelConfig);
    scene.addChild(this.board);
  }
}
