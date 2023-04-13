import { Container, Graphics } from "pixi.js";
import { SceneManager } from "@/sceneManager";

export class LoaderView extends Container {
  loaderBar: Container;
  loaderBarBorder: Graphics;
  loaderBarFill: Graphics;

  constructor(scene: Container) {
    super();

    const loaderBarWidth = SceneManager.width * 0.8;

    // the fill of the bar.
    this.loaderBarFill = new Graphics();
    this.loaderBarFill.beginFill(0x008800, 1);
    this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
    this.loaderBarFill.endFill();
    this.loaderBarFill.scale.x = 0;

    // The border of the bar.
    this.loaderBarBorder = new Graphics();
    this.loaderBarBorder.lineStyle(10, 0x0, 1);
    this.loaderBarBorder.drawRect(0, 0, loaderBarWidth, 50);

    this.loaderBar = new Container();
    this.loaderBar.addChild(this.loaderBarFill);
    this.loaderBar.addChild(this.loaderBarBorder);

    this.loaderBar.position.x = (SceneManager.width - this.loaderBar.width) / 2;
    this.loaderBar.position.y =
      (SceneManager.height - this.loaderBar.height) / 2;
    scene.addChild(this.loaderBar);
  }

  updateProgress(progressRatio: number): void {
    this.loaderBarFill.scale.x = progressRatio;
  }
}
