import { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
  bundles: [
    {
      name: "homeScreenBundle",
      assets: {
        boxBlue: "./sprites/box-blue.png",
        boxGreen: "./sprites/box-green.png",
        boxPurple: "./sprites/box-purple.png",
        boxRed: "./sprites/box-red.png",
        boxYellow: "./sprites/box-yellow.png",
        scoreBlock: "./sprites/score-block.png",
      },
    },
  ],
};
