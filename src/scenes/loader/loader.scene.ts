import { Assets, Container } from "pixi.js";
import { SceneManager } from "@/sceneManager";
import { manifest } from "@/assets";
import { LoaderView } from "./loader.view";
import { HomeScene } from "@/scenes/home/home.scene";

export class LoaderScene extends Container implements IScene {
  renderView: LoaderView;

  constructor() {
    super();

    this.renderView = new LoaderView(this);

    this.initializeLoader().then(() => {
      this.gameLoaded();
    });
  }

  private async initializeLoader(): Promise<void> {
    await Assets.init({ manifest });

    const bundleIds = manifest.bundles.map((bundle) => bundle.name);

    await Assets.loadBundle(
      bundleIds,
      this.renderView.updateProgress.bind(this.renderView)
    );
  }

  private gameLoaded(): void {
    setTimeout(() => {
      SceneManager.toScene(new HomeScene());
    }, 600);
  }

  update() {}
}
