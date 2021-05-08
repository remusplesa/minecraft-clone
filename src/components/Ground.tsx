import React from "react";
import { usePlane } from "@react-three/cannon";
import { TextureLoader, RepeatWrapping } from "three";
import { Plane } from "@react-three/drei";
import grass from "../images/grass.jpg";

import { useStore } from "../hooks/useStore";

interface GroundProps {
  position: [x: number, y: number, z: number];
}
const texture = new TextureLoader().load(grass);

export const Ground = ({ position }: GroundProps) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position,
  }));
  const [addCube, type] = useStore((state) => [state.addCube, state.texture]);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(100, 100);

  return (
    <Plane
      ref={ref}
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = Object.values(e.point).map((coord) =>
          Math.ceil(coord)
        );
        addCube(x, y, z);
      }}
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial map={texture} attach="material" />
    </Plane>
  );
};
