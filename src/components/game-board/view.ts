import { Texture, Container, Graphics, Spritesheet, Sprite } from "pixi.js";
import * as math from "mathjs";
import { BoardTile } from "@/components/tile/component";
import { gameConfig } from "@/config/game";
import { GameBoard } from "./component";
import { BoosterTile } from "../booster-tile/component";

export class GameBoardView extends Container {
  tiles: math.Matrix;
  tilesContainer: Container;
  boardContainer: Container;
  component: GameBoard;
  boardWidth: number;
  boardHeight: number;

  constructor(component: GameBoard) {
    super();

    const {
      board: { columns, rows },
    } = component.options.levelConfig;

    /** Setting for containers order */
    this.sortableChildren = true;

    /** Init data */
    this.component = component;
    this.tiles = math.zeros([rows, columns]) as math.Matrix;
    this.tilesContainer = new Container();
    this.boardContainer = new Container();
    this.boardWidth = columns * gameConfig.cellSize + 100;
    this.boardHeight = rows * gameConfig.cellSize + 100;

    this.drawBoard();
    this.drawTiles(this.component.tilesMap);

    component.addChild(this);
  }

  async drawBoard() {
    const sheet = new Spritesheet(Texture.from("board"), {
      frames: {
        leftTop: {
          frame: { x: 0, y: 0, w: 100, h: 100 },
        },
        rightTop: {
          frame: { x: 156, y: 0, w: 100, h: 100 },
        },
        leftBottom: {
          frame: { x: 0, y: 156, w: 100, h: 100 },
        },
        rightBottom: {
          frame: { x: 156, y: 156, w: 100, h: 100 },
        },
        top: {
          frame: { x: 100, y: 0, w: 40, h: 100 },
        },
        left: {
          frame: { x: 0, y: 100, w: 100, h: 40 },
        },
        right: {
          frame: { x: 156, y: 100, w: 100, h: 40 },
        },
        bottom: {
          frame: { x: 100, y: 156, w: 40, h: 100 },
        },
      },
      meta: { scale: "1" },
    });

    const textures = await sheet.parse();

    const board = new Graphics();
    /** background */
    board.beginFill("001E3B");
    board.drawRect(100, 100, this.boardWidth - 200, this.boardHeight - 200);
    board.endFill();
    this.boardContainer.addChild(board);

    const leftTop = new Sprite(textures.leftTop);
    this.boardContainer.addChild(leftTop);
    leftTop.position.set(0, 0);

    const rightTop = new Sprite(textures.rightTop);
    this.boardContainer.addChild(rightTop);
    rightTop.position.set(this.boardWidth - rightTop.width, 0);

    const leftBottom = new Sprite(textures.leftBottom);
    this.boardContainer.addChild(leftBottom);
    leftBottom.position.set(0, this.boardHeight - leftBottom.height);

    const rightBottom = new Sprite(textures.rightBottom);
    this.boardContainer.addChild(rightBottom);
    rightBottom.position.set(
      this.boardWidth - rightTop.width,
      this.boardHeight - leftBottom.height
    );

    const top = new Sprite(textures.top);
    this.boardContainer.addChild(top);
    top.position.set(leftTop.width, 0);
    top.width = this.boardWidth - leftTop.width - rightTop.width;

    const bottom = new Sprite(textures.bottom);
    this.boardContainer.addChild(bottom);
    bottom.position.set(leftBottom.width, this.boardHeight - leftBottom.height);
    bottom.width = this.boardWidth - leftBottom.width - rightBottom.width;

    const left = new Sprite(textures.left);
    this.boardContainer.addChild(left);
    left.position.set(0, leftTop.height);
    left.height = this.boardHeight - leftTop.height - leftBottom.height;

    const right = new Sprite(textures.right);
    this.boardContainer.addChild(right);
    right.position.set(rightTop.x, rightTop.height);
    right.height = this.boardHeight - rightTop.height - rightBottom.height;

    this.addChild(this.boardContainer);

    this.boardContainer.zIndex = 0;
    this.boardContainer.position.x -= 50;
    this.boardContainer.position.y -= 50;
  }

  drawTiles(tilesMap: math.Matrix) {
    this.tilesContainer.removeChildren();

    const tiles = tilesMap.map((tileIndex, [row, col]) => {
      const newTile = new BoardTile(tileIndex, { col, row });
      newTile.eventMode = "dynamic";
      newTile.on("pointertap", () => this.component.onTileClick(newTile));

      this.tilesContainer.addChild(newTile);

      return newTile;
    });

    this.tilesContainer.zIndex = 1;
    this.tiles = tiles;

    this.addChild(this.tilesContainer);
  }

  addBoosterTile(config: IBoardBoosterConfig, coord: TCoord) {
    const booster = new BoosterTile({
      config,
      coord,
    });

    this.addChild(booster);
    this.tiles.set([coord.row, coord.col], booster);
    booster.zIndex = 1;
    booster.eventMode = "dynamic";
    booster.birthAnimation();
    booster.on("pointertap", () => this.component.onBoosterTileClick(booster));
  }
}
