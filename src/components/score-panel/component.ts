import { Container } from "pixi.js";
import { ScorePanelView } from "./view";

export class ScorePanel extends Container {
  renderView: ScorePanelView;

  constructor() {
    super();

    this.renderView = new ScorePanelView(this);
  }

  update({ scores, steps }: { scores: number; steps: number }) {
    this.renderView.scoreText.text = scores;
    this.renderView.stepsText.text = steps;

    this.renderView.updateAlign()
  }
}
