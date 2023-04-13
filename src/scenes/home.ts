import { Container, Sprite } from "pixi.js";
import { IScene, SceneManager } from "../sceneManager";
import { GameScene } from "./game";

export class HomeScene extends Container implements IScene {
  private clampy: Sprite;

  constructor() {
    super();

    this.clampy = Sprite.from("boxBlue");
    this.clampy.anchor.set(0.5);
    this.clampy.x = SceneManager.width / 2;
    this.clampy.y = SceneManager.height / 2;
    this.addChild(this.clampy);

    this.clampy.on("pointertap", this.onClicky, this);
    this.clampy.eventMode = "dynamic";
  }

  onClicky() {
    console.log('Go to Game')

    SceneManager.changeScene(new GameScene());
  }

  update() {}
}
