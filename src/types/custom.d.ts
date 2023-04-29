import { Container, TextStyle } from "pixi.js";

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
    renderView: ISceneView;
    update(framesPassed: number): void;
  }

  export interface ISceneView {}

  export type TCoord = {
    col: number;
    row: number;
  };

  export interface IBoardTile extends Container {
    tileConfig: IBoardTileConfig;
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
    tiles: string[];
    boosters: string[];
    goal: {
      steps: number;
      score: number;
    };
  }

  export interface IBoardTileConfig {
    name: string;
    type: "basic";
    color?: string;
    score: number;
    params?: Record<string, any>;
  }

  export interface IBoardBoosterConfig {
    name: string;
    score: number;
    type: "collector";
    params: Record<string, any>;
  }

  export interface IGameConfig {
    cellSize: number;

    levels: ILevelConfig[];
    tiles: IBoardTileConfig[];
    boosters: IBoardBoosterConfig[];
  }

  export interface IStyleConfig {
    text: { [key: string]: TextStyle };
    animations: { [key: string]: Record<string, any> };
  }
}
