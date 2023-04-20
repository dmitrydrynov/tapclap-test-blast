import { SceneManager } from "@/sceneManager";
import { LoaderScene } from "@/scenes/loader/loader.scene";
import FontFaceObserver from "fontfaceobserver";

const init = async () => {
  let font = new FontFaceObserver("Marvin", {});

  await font.load();

  SceneManager.initialize(1920, 1080, 0x132424);
  SceneManager.toScene(new LoaderScene());
};

init();
