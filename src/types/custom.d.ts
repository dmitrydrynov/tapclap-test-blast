export * from "pixi.js";

declare module "pixi.js" {
  export interface ICanvasStyle {
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
  }
}
