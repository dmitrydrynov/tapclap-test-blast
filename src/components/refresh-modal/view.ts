import { Container, Graphics, Text } from "pixi.js";
import { RefreshModal } from "./component";
import { SceneManager } from "@/sceneManager";
import { gameConfig } from "@/config/game";
import { FancyButton } from "@pixi/ui";

export class ModalView extends Container {
  homeBtn: FancyButton;
  refreshBtn: FancyButton;

  constructor(component: RefreshModal) {
    super();

    const { width, height } = component.options;

    // Background
    const bg = new Graphics();
    bg.beginFill("000000aa");
    bg.drawRect(0, 0, SceneManager.width, SceneManager.height);
    bg.endFill();
    bg.eventMode = "static";
    component.addChild(bg);

    // Body
    const body = new Graphics();
    body.beginFill("ffffff");
    body.drawRoundedRect(0, 0, width, height, 42);
    body.endFill();
    component.addChild(body);

    body.position.x = (SceneManager.width - body.width) / 2;
    body.position.y = (SceneManager.height - body.height) / 2;

    // Text
    const textStyle = Object.assign({}, gameConfig.textStyle.text);
    textStyle.fontSize = 56;
    const text = new Text("You are out of moves", textStyle);
    body.addChild(text);
    text.position.x = (body.width - text.width) / 2;
    text.position.y = 50;

    // Refresh Button
    const refreshBtnStyle = Object.assign({}, gameConfig.textStyle.title);
    refreshBtnStyle.fill = "006699";
    this.refreshBtn = new FancyButton({
      text: new Text("Mix & Continue", refreshBtnStyle),
      animations: {
        hover: {
          props: {
            scale: {
              x: 1.1,
              y: 1.1,
            },
          },
          duration: 100,
        },
      },
    });
    body.addChild(this.refreshBtn);
    this.refreshBtn.position.x = (body.width - this.refreshBtn.width) / 2 + 80;
    this.refreshBtn.position.y = body.height - 250;

    const homeBtnStyle = Object.assign({}, gameConfig.textStyle.title);
    homeBtnStyle.fill = "006699";
    this.homeBtn = new FancyButton({
      text: new Text("Menu", homeBtnStyle),
      animations: {
        hover: {
          props: {
            scale: {
              x: 1.1,
              y: 1.1,
            },
          },
          duration: 100,
        },
      },
    });
    body.addChild(this.homeBtn);
    this.homeBtn.position.x = (body.width - this.homeBtn.width) / 2 + 30;
    this.homeBtn.position.y = body.height - 150;
  }
}
