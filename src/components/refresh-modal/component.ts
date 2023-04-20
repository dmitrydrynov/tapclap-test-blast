import { Container, Ticker } from "pixi.js";
import { ModalView } from "./view";
import { Easing, Group, Tween } from "tweedle.js";
import { SceneManager } from "@/sceneManager";
import { HomeScene } from "@/scenes/home/home.scene";

export class RefreshModal extends Container {
  renderView: ModalView;
  options: Record<string, any>;

  constructor(options: Record<string, any>) {
    super();

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

  open(scene: IScene) {
    scene.addChild(this);
  }

  close(callback = () => {}) {
    new Tween(this)
      .to({ scale: { x: 0.5, y: 0.5 }, alpha: 0 }, 250)
      .easing(Easing.Back.In)
      .start()
      .onComplete(() => {
        callback();

        setTimeout(() => this.destroy(), 250);
      });
  }

  onHomeClick() {
    SceneManager.toScene(new HomeScene());
  }

  private update(): void {
    Group.shared.update();
  }
}
