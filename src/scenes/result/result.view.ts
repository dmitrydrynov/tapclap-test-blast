import { styleConfig } from "@/config/style";
import { SceneManager } from "@/sceneManager";
import { FancyButton } from "@pixi/ui";
import { Container, Text } from "pixi.js";
import { ResultScene } from "./result.scene";

export class ResultView extends Container {
  homeBtn: FancyButton;
  restartBtn: FancyButton;

  constructor(scene: ResultScene) {
    super();

    // Result Text
    const tesultText = new Text(
      scene.success ? "You have won!" : "You have lost :(",
      styleConfig.text.result
    );
    scene.addChild(tesultText);

    tesultText.anchor.set(0.5);
    tesultText.position.x = SceneManager.width / 2;
    tesultText.position.y = 300;

    // Restart Button
    this.restartBtn = new FancyButton({
      text: new Text(
        scene.success ? "Restart" : "Try again",
        styleConfig.text.button
      ),
      animations: styleConfig.animations.buttonHover,
    });
    scene.addChild(this.restartBtn);

    this.restartBtn.position.x = SceneManager.width / 2;
    this.restartBtn.position.y = SceneManager.height / 2 - 50;

    // Home Button
    this.homeBtn = new FancyButton({
      text: new Text("Main menu", styleConfig.text.button),
      animations: styleConfig.animations.buttonHover,
    });
    scene.addChild(this.homeBtn);

    this.homeBtn.position.x = SceneManager.width / 2;
    this.homeBtn.position.y = SceneManager.height / 2 + 50;
  }
}
