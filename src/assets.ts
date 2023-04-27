import { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
  bundles: [
    {
      name: "homeScreenBundle",
      assets: {
        "tile-blue": "./sprites/box-blue.png",
        "tile-green": "./sprites/box-green.png",
        "tile-purple": "./sprites/box-purple.png",
        "tile-red": "./sprites/box-red.png",
        "tile-yellow": "./sprites/box-yellow.png",
        scoreBlock: "./sprites/score-block.png",
        "panel-score": "./sprites/panel-score.png",
        board: "./sprites/board.png",
        "progres-bar": "./sprites/progress-bar.png",
        "tile-bomb": "./sprites/tile-bomb.png"
      },
    },
  ],
};
