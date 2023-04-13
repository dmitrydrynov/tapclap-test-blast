import { Container, TextStyle, Text } from "pixi.js";
import { IScene, SceneManager } from "../sceneManager";
import { HomeScene } from "./home";

export class GameScene extends Container implements IScene {
  constructor() {
    super();

    const styly: TextStyle = new TextStyle({
      align: "center",
      fill: "#000000",
      fontSize: 42,
      fontFamily: "Marvin"
    });

    const texty: Text = new Text("Game Scene", styly);
    texty.eventMode = "dynamic";
    this.addChild(texty);

    texty.on("pointertap", this.onClicky, this);
  }

  onClicky() {
    console.log('Go to Home')
    SceneManager.changeScene(new HomeScene());
  }

  update() {}
}
