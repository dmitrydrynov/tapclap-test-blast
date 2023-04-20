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
    goal: {
      steps: number;
      score: number;
    };
  }

  export interface IBoardTileConfig {
    name: string;
    color: string;
    type: "basic";
    score: number;
  }

  export interface IGameConfig {
    cellSize: number;

    levels: ILevelConfig[];
    tiles: IBoardTileConfig[];
  }

  export interface IStyleConfig {
    text: { [key: string]: TextStyle };
    animations: { [key: string]: Record<string, any> };
  }
}
