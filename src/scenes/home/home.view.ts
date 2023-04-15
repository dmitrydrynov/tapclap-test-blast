import { Container, Sprite } from "pixi.js";
import { SceneManager } from "@/sceneManager";

export class HomeView {
  boxBlue: Sprite;

  constructor(scene: Container) {
    this.boxBlue = Sprite.from("tile-blue");
    this.boxBlue.anchor.set(0.5);
    this.boxBlue.x = SceneManager.width / 2;
    this.boxBlue.y = SceneManager.height / 2;
    scene.addChild(this.boxBlue);
  }
}
