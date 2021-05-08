import dirtImg from "./images/dirt.jpg";
import grassImg from "./images/grass.jpg";
import glassImg from "./images/glass.jpg";
import logImg from "./images/log.jpg";
import woodImg from "./images/wood.png";
import { TextureLoader, Texture } from "three";

interface Textures {
  dirt: Texture;
  grass: Texture;
  glass: Texture;
  wood: Texture;
  log: Texture;
}

export const textures: Textures = {
  dirt: new TextureLoader().load(dirtImg),
  grass: new TextureLoader().load(grassImg),
  glass: new TextureLoader().load(glassImg),
  wood: new TextureLoader().load(woodImg),
  log: new TextureLoader().load(logImg),
};

export const texturesImages = [
  { type: "dirt", img: dirtImg },
  { type: "grass", img: grassImg },
  { type: "glass", img: glassImg },
  { type: "wood", img: woodImg },
  { type: "log", img: logImg },
];
