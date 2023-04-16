import { Container } from "pixi.js";
import { GameBoardView } from "./view";
import { BoardTile } from "../tile";
import * as math from "mathjs";

export class GameBoard extends Container {
  renderView: GameBoardView;
  levelConfig: ILevelConfig;

  constructor(levelConfig: ILevelConfig) {
    super();

    this.levelConfig = levelConfig;
    this.renderView = new GameBoardView(this);

    this.on<any>("boardUpdate", this.onBoardUpdate, this);
    this.emit<any>("boardUpdate");
  }

  onBoardUpdate() {
    console.log("onBoardUpdate");
  }

  refresh() {
    if (this.renderView) {
      this.renderView.destroy();
    }

    this.renderView = new GameBoardView(this);
    this.emit<any>("boardUpdate");
  }

  onTileClick(tile: BoardTile) {
    console.log("click to", tile.index, tile.coord);

    const { tiles } = this.renderView;

    let relatives = this.getRelatives(tile);

    if (relatives.length >= this.levelConfig.minBurnGroup) {
      relatives.map((t) => {
        t.destroy();
        tiles.set([t.coord.row, t.coord.col], null);
      });

      this.emit<any>("boardUpdate");
    }
  }

  getRelatives(currentTile: BoardTile, relatives: BoardTile[] = []) {
    relatives.push(currentTile);

    const closeRelatives = this.getCloseRelatives(currentTile, relatives);

    if (closeRelatives.length > 0) {
      closeRelatives.map((tile) => {
        this.getRelatives(tile, relatives);
      });
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

    console.log(
      "neighbours",
      neighbours.map((n) => {
        return n !== null ? n.coord : null;
      })
    );

    neighbours.map((neighbour: BoardTile) => {
      if (
        neighbour !== null &&
        neighbour.coord !== tile.coord &&
        neighbour.index == tile.index && // if the same tile
        (neighbour.coord.col == col || neighbour.coord.row == row) && // if the same row or col
        (!exclude || !exclude.includes(neighbour)) // ecxlude
      ) {
        console.log("relatives", neighbour.coord);
        relatives.push(neighbour);
      }
    });

    return relatives;
  }
}
