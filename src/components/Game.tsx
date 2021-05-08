import React from "react";
import { Canvas } from "react-three-fiber";

import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import { useInterval } from "../hooks/useInterval";
import { useStore } from "../hooks/useStore";
import { Ground } from "./Ground";
import { Player } from "./Player";
import { CubesWorld } from "./CubesWorld";
import { HelperNav } from "./HelperNav";

const Game = () => {
  const [cubes, saveWorld, clearWorld] = useStore((state) => [
    state.cubes,
    state.saveWorld,
    state.clearWorld,
  ]);

  useInterval(() => {
    saveWorld();
    console.log("Saved 🍀");
  }, 10000);

  return (
    <div className="static">
      <HelperNav />
      <Canvas
        style={{ height: "100vh", width: "100vw" }}
        mode="concurrent"
        shadows={true}
      >
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.25} />
        <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
        <Physics gravity={[0, -30, 0]}>
          <Ground position={[0, 0.5, 0]} />
          <Player position={[0, 3, 10]} />
          <CubesWorld />
        </Physics>
      </Canvas>
    </div>
  );
};

export default Game;
