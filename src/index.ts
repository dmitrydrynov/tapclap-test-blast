import { SceneManager } from "./sceneManager";
import { LoaderScene } from "./scenes/loader";
import FontFaceObserver from "fontfaceobserver";

let font = new FontFaceObserver("Marvin", {});
font.load().then(() => {
  SceneManager.initialize(1920, 1080, 0xffff00);

  const loaderScene: LoaderScene = new LoaderScene();
  SceneManager.changeScene(loaderScene);
});
