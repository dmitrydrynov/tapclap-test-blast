import { TextStyle } from "pixi.js";

export const styleConfig: IStyleConfig = {
  text: {
    title: new TextStyle({
      align: "center",
      fill: "#000000",
      fontSize: 60,
      fontFamily: "Marvin",
    }),
    score: new TextStyle({
      align: "center",
      fill: "ffffff",
      fontSize: 32,
      fontFamily: "Marvin",
    }),
    scoreSubTitle: new TextStyle({
      align: "center",
      fill: "ffffff",
      fontSize: 18,
      fontFamily: "Marvin",
    }),
    steps: new TextStyle({
      align: "center",
      fill: "ffffff",
      fontSize: 60,
      fontFamily: "Marvin",
    }),
    result: new TextStyle({
      align: "center",
      fill: "#979797",
      fontSize: 80,
      fontWeight: "bold",
      fontFamily: "Marvin",
    }),
    button: new TextStyle({
      align: "center",
      fill: "#ffffff",
      fontSize: 36,
      fontFamily: "Marvin",
    }),
  },
  animations: {
    buttonHover: {
      hover: {
        props: {
          scale: {
            x: 1.1,
            y: 1.1,
          },
        },
        duration: 100,
      },
    },
  },
};
