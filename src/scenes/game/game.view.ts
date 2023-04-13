import { Container, TextStyle, Text } from "pixi.js";

export class GameView extends Container {
  text: Text;

  constructor(scene: Container) {
    super();

    const style: TextStyle = new TextStyle({
      align: "center",
      fill: "#000000",
      fontSize: 42,
      fontFamily: "Marvin",
    });

    this.text = new Text("Game Scene", style);
    scene.addChild(this.text);
  }
}
