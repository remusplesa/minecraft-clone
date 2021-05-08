import React, { useState, memo } from "react";
import { useBox } from "@react-three/cannon";
import { Box } from "@react-three/drei";

import { textures } from "../textures";

interface CubeProps {
  id: string;
  position: [x: number, y: number, z: number];
  texture: string;
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (x: number, y: number, z: number) => void;
}

export const Cube = memo(
  ({ id, position, texture, addCube, removeCube }: CubeProps) => {
    const [hover, setHover] = useState<number | null>(null);

    const [ref] = useBox(() => ({
      mass: 0,
      type: "Static",
      position,
    }));

    function handleClick(e: any) {
      e.stopPropagation();
      const clickedFace = Math.floor(e.faceIndex / 2);
      const { x, y, z } = ref?.current?.position ?? { x: 0, y: 0, z: 0 };

      if (clickedFace === 0) {
        e.altKey ? removeCube(x, y, z) : addCube(x + 1, y, z);
        return;
      }
      if (clickedFace === 1) {
        e.altKey ? removeCube(x, y, z) : addCube(x - 1, y, z);
        return;
      }
      if (clickedFace === 2) {
        e.altKey ? removeCube(x, y, z) : addCube(x, y + 1, z);
        return;
      }
      if (clickedFace === 3) {
        e.altKey ? removeCube(x, y, z) : addCube(x, y - 1, z);
        return;
      }
      if (clickedFace === 4) {
        e.altKey ? removeCube(x, y, z) : addCube(x, y, z + 1);
        return;
      }
      if (clickedFace === 5) {
        e.altKey ? removeCube(x, y, z) : addCube(x, y, z - 1);
        return;
      }
    }

    return (
      <Box
        castShadow
        ref={ref}
        onPointerMove={(e) => {
          e.stopPropagation();
          setHover(Math.floor((e.faceIndex ? e.faceIndex : 0) / 2));
        }}
        onPointerOut={() => {
          setHover(null);
        }}
        onClick={handleClick}
      >
        {[...Array(6)].map((_, index) => (
          <meshStandardMaterial
            attachArray="material"
            map={(textures as any)[texture]}
            key={index}
            color={hover === index ? "pink" : "white"}
            opacity={texture === "glass" ? 0.8 : 1}
            transparent={true}
          />
        ))}
        <boxBufferGeometry attach="geometry" />
      </Box>
    );
  },
  (prevProps, nextProps) => {
    const equalPosition =
      prevProps.position[0] === nextProps.position[0] &&
      prevProps.position[1] === nextProps.position[1] &&
      prevProps.position[2] === nextProps.position[2];

    return equalPosition && prevProps.texture === nextProps.texture;
  }
);
