import { Container, Sprite, Text } from "pixi.js";
import { ScorePanel } from "./component";
import { styleConfig } from "@/config/style";

export class ScorePanelView extends Container {
  component: ScorePanel;
  stepsText: Text;
  scoreText: Text;

  constructor(component: ScorePanel) {
    super();

    this.component = component;

    const scorePanel = Sprite.from("panel-score");
    component.addChild(scorePanel);

    scorePanel.scale.set(0.25);

    this.stepsText = new Text("", styleConfig.text.steps);
    component.addChild(this.stepsText);

    this.stepsText.position.x = component.width / 2 - this.stepsText.width / 2;
    this.stepsText.position.y = 45;

    this.scoreText = new Text("", styleConfig.text.score);
    component.addChild(this.scoreText);

    this.scoreText.position.x = component.width / 2 - this.scoreText.width / 2;
    this.scoreText.position.y = component.height - 82;

    const scoreSubTitle = new Text("Scores", styleConfig.text.scoreSubTitle);
    component.addChild(scoreSubTitle);

    scoreSubTitle.position.x = component.width / 2 - scoreSubTitle.width / 2;
    scoreSubTitle.position.y = component.height - 102;
  }

  updateAlign() {
    this.stepsText.position.x = this.component.width / 2 - this.stepsText.width / 2;
    this.scoreText.position.x = this.component.width / 2 - this.scoreText.width / 2;
  }
}
