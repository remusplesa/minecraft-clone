import React, { useEffect } from "react";
import { useStore } from "../hooks/useStore";
import { useInterval } from "../hooks/useInterval";

import { Cube } from "./Cube";

export function CubesWorld() {
  const [cubes, addCube, removeCube, saveWorld] = useStore((state) => [
    state.cubes,
    state.addCube,
    state.removeCube,
    state.saveWorld,
  ]);

  useInterval(
    () => {
      saveWorld();
    },
    // every 10 seconds
    10000
  );

  useEffect(() => {}, [cubes]);

  return (
    <group>
      {cubes.map((cube) => (
        <Cube
          id={cube.id}
          key={cube.id}
          texture={cube.texture}
          position={cube.pos}
          addCube={addCube}
          removeCube={removeCube}
        />
      ))}
    </group>
  );
}
