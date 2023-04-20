import { styleConfig } from "@/config/style";
import { HomeScene } from "./home.scene";
import { FancyButton } from "@pixi/ui";
import { Text } from "pixi.js";
import { SceneManager } from "@/sceneManager";

export class HomeView {
  startBtn: FancyButton;

  constructor(scene: HomeScene) {
    // this.boxBlue = Sprite.from("tile-blue");
    // this.boxBlue.anchor.set(0.5);
    // this.boxBlue.x = SceneManager.width / 2;
    // this.boxBlue.y = SceneManager.height / 2;
    // scene.addChild(this.boxBlue);

    // Restart Button
    this.startBtn = new FancyButton({
      text: new Text("Play", styleConfig.text.button),
      animations: styleConfig.animations.buttonHover,
    });
    scene.addChild(this.startBtn);

    this.startBtn.position.x = SceneManager.width / 2;
    this.startBtn.position.y = SceneManager.height / 2;
  }
}
