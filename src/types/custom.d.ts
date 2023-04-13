import { Container, DisplayObject } from "pixi.js";

export * from "pixi.js";

declare module "pixi.js" {
  export interface ICanvasStyle {
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
  }
}

declare global {
  export interface IScene extends DisplayObject {
    renderView: IRenderView;
    update(framesPassed: number): void;
  }

  export interface IRenderView {}
}
