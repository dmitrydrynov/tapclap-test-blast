import { Container } from "pixi.js";
import { GameBoardView } from "./view";
import { BoardTile } from "@/components/tile/component";
import * as math from "mathjs";
import { randomInteger } from "@/helpers/math";
import { gameConfig } from "@/config/game";

export class GameBoard extends Container {
  renderView: GameBoardView;
  options: {
    levelConfig: ILevelConfig;
    onMovesEnd: () => void;
    onDiedTiles: (newScore: number) => void;
    onUpdate: () => void;
  };

  constructor(options: any) {
    super();

    this.options = options;
    this.renderView = new GameBoardView(this);

    if (!this.playability()) this.refresh();

    this.on<any>("boardUpdate", this.onBoardUpdate, this);
    this.on<any>("movesEnd", this.options.onMovesEnd, this);
    this.boardUpdate();
  }

  boardUpdate() {
    this.emit<any>("boardUpdate");
  }

  onBoardUpdate() {
    this.options.onUpdate();

    if (!this.playability()) {
      this.emit<any>("movesEnd");
    }

    this.fillEmptyBlocks();
  }

  refresh() {
    if (this.renderView) {
      this.renderView.destroy();
      this.renderView = new GameBoardView(this);

      while (!this.playability()) {
        this.renderView.destroy();
        this.renderView = new GameBoardView(this);
      }
    }

    this.boardUpdate();
  }

  playability() {
    const { tiles } = this.renderView;
    let relativesParts: BoardTile[][] = [];

    tiles.forEach((tile) => {
      if (tile === null) return;

      for (const t of relativesParts) {
        if (t.find((_t) => _t == tile)) return;
      }

      const relatives = this.getRelatives(tile);

      if (relatives.length >= this.options.levelConfig.minBurnGroup) {
        relativesParts.push(relatives);
      }
    });

    return relativesParts.length > 0;
  }

  onTileClick(tile: BoardTile) {
    const { tiles } = this.renderView;

    let relatives = this.getRelatives(tile);

    if (relatives.length >= this.options.levelConfig.minBurnGroup) {
      const scores = relatives
        .map((r) => r.config.score)
        .reduce((a, b) => a + b, 0);
      this.options.onDiedTiles(scores);

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
    /** Add only unique tiles */
    if (!relatives.find((r) => r === currentTile)) relatives.push(currentTile);

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
      case this.options.levelConfig.board.columns - 1:
        colsForSearch.pop();
        break;
    }

    switch (row) {
      case 0:
        rowsForSearch.shift();
        break;
      case this.options.levelConfig.board.rows - 1:
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

    for (let col = 0; col < this.options.levelConfig.board.columns; col++) {
      for (let row = this.options.levelConfig.board.rows - 1; row >= 0; row--) {
        const tile: BoardTile | null = tiles.get([row, col]);
        let lastRow = row + 1;
        let newTopTile: BoardTile | null = null;
        let tileBelow: BoardTile | null | undefined =
          row < this.options.levelConfig.board.rows - 1
            ? tiles.get([lastRow, col])
            : undefined;

        /** if block is hanging then move down */
        if (tile && tileBelow === null) {
          while (tileBelow === null) {
            lastRow++;
            tileBelow =
              lastRow <= this.options.levelConfig.board.rows - 1
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
    const { tiles } = this.options.levelConfig;

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

  shuffle() {
    const { tiles } = this.renderView;
    const oldTiles = Object.assign({}, tiles);

    tiles.forEach((tile, [row, col]) => {
      let newCol = Math.floor(Math.random() * (col + 1));
      let newRow = Math.floor(Math.random() * (row + 1));

      oldTiles.set([newRow, newCol], tile);
    });
  }
}
