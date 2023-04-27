import { Container, Sprite, Spritesheet, Texture } from "pixi.js";
import { SceneManager } from "@/sceneManager";
import { LoaderScene } from "./loader.scene";

export class LoaderView extends Container {
  scene: LoaderScene;
  loaderBar?: Container;
  loaderBarFill?: {
    left: Sprite;
    center: Sprite;
    right: Sprite;
  };

  constructor(scene: LoaderScene) {
    super();

    this.scene = scene;
    this.renderProgressBar();
  }

  async renderProgressBar() {
    const loaderBarWidth = SceneManager.width * 0.8;

    this.loaderBar = new Container();

    const progressBarSheet = new Spritesheet(
      Texture.from("./sprites/progress-bar.png"),
      {
        meta: { scale: "1" },
        frames: {
          fillLeft: {
            frame: { x: 0, y: 0, w: 50, h: 85 },
          },
          fillCenter: {
            frame: { x: 50, y: 0, w: 10, h: 85 },
          },
          fillRight: {
            frame: { x: 206, y: 0, w: 50, h: 85 },
          },
          barLeft: {
            frame: { x: 0, y: 87, w: 50, h: 105 },
          },
          barCenter: {
            frame: { x: 50, y: 87, w: 10, h: 105 },
          },
          barRight: {
            frame: { x: 206, y: 87, w: 50, h: 105 },
          },
        },
      }
    );

    const progressBarTextures = await progressBarSheet.parse();

    const barLeft = new Sprite(progressBarTextures.barLeft);
    this.loaderBar.addChild(barLeft);
    barLeft.position.set(0, 0);

    const barRight = new Sprite(progressBarTextures.barRight);
    this.loaderBar.addChild(barRight);
    barRight.position.set(loaderBarWidth - barRight.width, 0);

    const barCenter = new Sprite(progressBarTextures.barCenter);
    this.loaderBar.addChild(barCenter);
    barCenter.position.set(50, 0);
    barCenter.width = loaderBarWidth - barLeft.width - barRight.width;

    const fillLeft = new Sprite(progressBarTextures.fillLeft);
    this.loaderBar.addChild(fillLeft);
    fillLeft.position.set(8, 8);

    const fillRight = new Sprite(progressBarTextures.fillRight);
    this.loaderBar.addChild(fillRight);
    fillRight.position.set(8 + 50, 8);

    const fillCenter = new Sprite(progressBarTextures.fillCenter);
    this.loaderBar.addChild(fillCenter);
    fillCenter.position.set(50, 8);
    fillCenter.width = 0;

    this.loaderBarFill = {
      left: fillLeft,
      center: fillCenter,
      right: fillRight,
    };

    this.loaderBar.scale.set(0.5);
    this.loaderBar.position.x = (SceneManager.width - this.loaderBar.width) / 2;
    this.loaderBar.position.y =
      (SceneManager.height - this.loaderBar.height) / 2;

    this.scene.addChild(this.loaderBar);
  }

  updateProgress(progressRatio: number): void {
    if (!this.loaderBarFill) return;

    const loaderBarWidth = SceneManager.width * 0.8;
    const progressWidth =
      progressRatio * (loaderBarWidth - this.loaderBarFill.right.width);

    if (progressWidth < 100) return;

    this.loaderBarFill.right.position.x = progressWidth - 8;
    this.loaderBarFill.center.width = progressWidth - 50;
  }
}
