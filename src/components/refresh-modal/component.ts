import { Container, Ticker } from "pixi.js";
import { ModalView } from "./view";
import { Group, Tween } from "tweedle.js";
import { SceneManager } from "@/sceneManager";
import { HomeScene } from "@/scenes/home/home.scene";

export class RefreshModal extends Container {
  renderView: ModalView;
  options: Record<string, any>;
  scene: IScene;

  constructor(scene: IScene, options: Record<string, any>) {
    super();

    this.scene = scene;
    this.options = options;
    this.renderView = new ModalView(this);

    this.renderView.homeBtn.eventMode = "dynamic";
    this.renderView.homeBtn.onPress.connect(() => {
      this.onHomeClick();
    });

    this.renderView.refreshBtn.eventMode = "dynamic";
    this.renderView.refreshBtn.onPress.connect(() => {
      this.options.onRefreshClick();
    });

    Ticker.shared.add(this.update, this);
  }

  open() {
    this.scene.addChild(this);

    this.renderView.background.eventMode = "static";

    new Tween(this)
      .to({ alpha: 1 }, 250)
      // .easing(Easing.Back.In)
      .start()
      .onComplete(() => {});
  }

  close(callback = () => {}) {
    this.renderView.background.eventMode = "none";

    new Tween(this)
      .to({ alpha: 0 }, 250)
      .start()
      .onComplete(() => {
        callback();

        this.scene.removeChild(this);
      });
  }

  onHomeClick() {
    SceneManager.toScene(new HomeScene());
  }

  private update(): void {
    Group.shared.update();
  }
}
