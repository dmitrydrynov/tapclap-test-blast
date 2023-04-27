import { Container, Graphics, Text } from "pixi.js";
import { RefreshModal } from "./component";
import { SceneManager } from "@/sceneManager";
import { FancyButton } from "@pixi/ui";
import { styleConfig } from "@/config/style";

export class ModalView extends Container {
  homeBtn: FancyButton;
  refreshBtn: FancyButton;
  background: Graphics;

  constructor(component: RefreshModal) {
    super();

    const { width, height } = component.options;

    // Background
    this.background = new Graphics();
    this.background.beginFill("000000aa");
    this.background.drawRect(0, 0, SceneManager.width, SceneManager.height);
    this.background.endFill();
    component.addChild(this.background);

    // Body
    const body = new Graphics();
    body.beginFill("ffffff");
    body.drawRoundedRect(0, 0, width, height, 42);
    body.endFill();
    component.addChild(body);

    body.position.x = (SceneManager.width - body.width) / 2;
    body.position.y = (SceneManager.height - body.height) / 2;

    // Text
    const text = new Text("You are out of moves", styleConfig.text.title);
    body.addChild(text);
    text.position.x = (body.width - text.width) / 2;
    text.position.y = 50;

    // Refresh Button
    this.refreshBtn = new FancyButton({
      text: new Text("Mix & Continue", styleConfig.text.buttonBlack),
      animations: styleConfig.animations.buttonHover,
    });
    body.addChild(this.refreshBtn);
    this.refreshBtn.position.x = (body.width - this.refreshBtn.width) / 2 + 80;
    this.refreshBtn.position.y = body.height - 250;

    this.homeBtn = new FancyButton({
      text: new Text("Menu", styleConfig.text.buttonBlack),
      animations: styleConfig.animations.buttonHover,
    });
    body.addChild(this.homeBtn);
    this.homeBtn.position.x = (body.width - this.homeBtn.width) / 2 + 30;
    this.homeBtn.position.y = body.height - 150;

    component.alpha = 0;
  }
}
