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
  export interface IScene extends Container {
    renderView: IRenderView;
    levelConfig?: ILevelConfig;
    update(framesPassed: number): void;
  }

  export interface IRenderView {}
  export interface IBoardTail extends Container {
    tailConfig: IBoardTailConfig;
    coord: number[];
  }

  export interface ILevelConfig {
    name: string;
    minBurnGroup: number;
    mixingAttempts: number;
    board: {
      columns: number;
      rows: number;
    };
    tails: string[];
    goal: {
      steps: number;
      score: number;
    };
  }

  export interface IBoardTailConfig {
    name: string;
    color: string;
    type: "basic";
  }

  export interface IGameConfig {
    cellSize: number;
    levels: ILevelConfig[];
    tails: IBoardTailConfig[];
  }
}
