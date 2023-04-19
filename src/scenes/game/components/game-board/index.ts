import { Container } from "pixi.js";
import { GameBoardView } from "./view";
import { BoardTile } from "../tile";
import * as math from "mathjs";
import { randomInteger } from "@/helpers/math";
import { gameConfig } from "@/config/game";

export class GameBoard extends Container {
  renderView: GameBoardView;
  levelConfig: ILevelConfig;

  constructor(levelConfig: ILevelConfig) {
    super();

    this.levelConfig = levelConfig;
    this.renderView = new GameBoardView(this);

    this.on<any>("boardUpdate", this.onBoardUpdate, this);
    this.boardUpdate();
  }

  boardUpdate() {
    this.emit<any>("boardUpdate");
  }

  onBoardUpdate() {
    console.log("onBoardUpdate");

    if (!this.playability()) {
      console.log("you can not play");
    }

    this.fillEmptyBlocks();
  }

  refresh() {
    if (this.renderView) {
      this.renderView.destroy();
    }

    this.renderView = new GameBoardView(this);
    this.boardUpdate();
  }

  playability() {
    const { tiles } = this.renderView;
    let relativesParts: BoardTile[][] = [];

    tiles.map((tile) => {
      if (tile === null) return;

      const relatives = this.getRelatives(tile);

      if (relatives.length >= this.levelConfig.minBurnGroup) {
        relativesParts.push(relatives);
      }
    });

    return relativesParts.length > 0;
  }

  onTileClick(tile: BoardTile) {
    console.log("click to", tile.index, tile.coord);

    const { tiles } = this.renderView;

    let relatives = this.getRelatives(tile);

    if (relatives.length >= this.levelConfig.minBurnGroup) {
      for (const t of relatives) {
        const _coord = t.coord;
        tiles.set([_coord.row, _coord.col], null);

        t.remove(() => {
          this.removeChild(t);

          this.boardUpdate();
        });
      }
    }
  }

  getRelatives(currentTile: BoardTile, relatives: BoardTile[] = []) {
    relatives.push(currentTile);

    const closeRelatives = this.getCloseRelatives(currentTile, relatives);

    if (closeRelatives.length > 0) {
      for (const tile of closeRelatives) {
        this.getRelatives(tile, relatives);
      }
    }

    return relatives;
  }

  getCloseRelatives(tile: BoardTile, exclude: BoardTile[] = []) {
    const relatives: BoardTile[] = [];
    const { tiles } = this.renderView;
    const { col, row } = tile.coord;
    const colsForSearch = [col - 1, col, col + 1];
    const rowsForSearch = [row - 1, row, row + 1];

    switch (col) {
      case 0:
        colsForSearch.shift();
        break;
      case this.levelConfig.board.columns - 1:
        colsForSearch.pop();
        break;
    }

    switch (row) {
      case 0:
        rowsForSearch.shift();
        break;
      case this.levelConfig.board.rows - 1:
        rowsForSearch.pop();
        break;
    }

    const neighbours = tiles.subset(math.index(rowsForSearch, colsForSearch));

    neighbours.map((neighbour: BoardTile) => {
      if (
        neighbour !== null &&
        neighbour.coord !== tile.coord &&
        neighbour.index == tile.index && // if the same tile
        (neighbour.coord.col == col || neighbour.coord.row == row) && // if the same row or col
        (!exclude || !exclude.includes(neighbour)) // ecxlude
      ) {
        relatives.push(neighbour);
      }
    });

    return relatives;
  }

  fillEmptyBlocks() {
    const { tiles } = this.renderView;

    for (let col = 0; col < this.levelConfig.board.columns; col++) {
      for (let row = this.levelConfig.board.rows - 1; row >= 0; row--) {
        const tile: BoardTile | null = tiles.get([row, col]);
        let lastRow = row + 1;
        let newTopTile: BoardTile | null = null;
        let tileBelow: BoardTile | null | undefined =
          row < this.levelConfig.board.rows - 1
            ? tiles.get([lastRow, col])
            : undefined;

        /** if block is hanging then move down */
        if (tile && tileBelow === null) {
          while (tileBelow === null) {
            lastRow++;
            tileBelow =
              lastRow <= this.levelConfig.board.rows - 1
                ? tiles.get([lastRow, col])
                : undefined;
          }

          tiles.set([row, col], null);
          tiles.set([lastRow - 1, col], tile);

          // animate moving
          tile.moveTo({ row: lastRow - 1, col }, () => {
            this.boardUpdate();
          });
        }

        // if top block is empty then add new one
        if (row == 0 && tile === null) {
          newTopTile = this.addTopTile(col);
          tiles.set([0, col], newTopTile);

          // animate adding new block
          newTopTile.moveToWithAlpha({ col, row: 0 }, () => this.boardUpdate());
        }
      }
    }
  }

  getRandomIndex() {
    const { tiles } = this.levelConfig;

    return randomInteger(0, tiles.length - 1);
  }

  addTopTile(col: number) {
    const newTile = new BoardTile(this.getRandomIndex(), {
      col,
      row: 0,
    });
    newTile.position.y -= gameConfig.cellSize;
    newTile.alpha = 0;

    newTile.eventMode = "dynamic";
    newTile.on("pointertap", () => this.onTileClick(newTile));

    this.addChild(newTile);

    return newTile;
  }
}
