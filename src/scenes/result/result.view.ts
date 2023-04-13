import { Container, Text, TextStyle } from "pixi.js";

export class ResultView extends Container {
  textMenu: Text;
  textRestart: Text;

  constructor(scene: Container) {
    super();

    const styly: TextStyle = new TextStyle({
      align: "center",
      fill: "#000000",
      fontSize: 42,
      fontFamily: "Marvin",
    });

    this.textRestart = new Text("Restart", styly);
    scene.addChild(this.textRestart);

    this.textMenu = new Text("Menu", styly);
    scene.addChild(this.textMenu);
  }
}
