import { Container } from "pixi.js";
import { SceneManager } from "@/sceneManager";
import { GameScene } from "@scenes/game/game.scene";
import { HomeView } from "./home.view";

export class HomeScene extends Container implements IScene {
  renderView: HomeView;

  constructor() {
    super();

    /** Init view */
    this.renderView = new HomeView(this);

    const { boxBlue } = this.renderView;

    /** Set interactive */
    boxBlue.on("pointertap", this.onClicky, this);
    boxBlue.eventMode = "dynamic";
  }

  onClicky() {
    SceneManager.toScene(new GameScene());
  }

  update() {}
}
