import React, { useRef } from "react";
import { Box } from "@react-three/drei";
import { Canvas, useFrame } from "react-three-fiber";

import { textures } from "../textures";

interface SpinnersProps {
  position: [x: number, y: number, z: number];
}

const Spinners = ({ position }: SpinnersProps) => {
  const mesh = useRef<any>();

  useFrame(() => {
    mesh.current.rotation.y += 0.005;
    mesh.current.rotation.x += 0.005;
  });
  return (
    <Box ref={mesh} position={position}>
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial
          attachArray="material"
          map={(textures as any)["dirt"]}
          key={index}
          transparent={true}
        />
      ))}
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
    </Box>
  );
};

export const HomeLogo = () => (
  <Canvas>
    <ambientLight intensity={0.8} />
    <spotLight position={[10, 10, 10]} angle={0.2} />
    <Spinners position={[0, 0, 0]} />
    <Spinners position={[-5, 0, 0]} />
    <Spinners position={[5, 0, 0]} />
  </Canvas>
);
