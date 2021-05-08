import React, { useRef, useEffect } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree, useFrame } from "react-three-fiber";
import { Vector3 } from "three";

import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { FPVControls } from "./FPVControls";

const SPEED = 6;

interface PlayerProps {
  position: [x: number, y: number, z: number]
}

export const Player = ({position}: PlayerProps) => {
  const {
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    jump,
  } = useKeyboardControls();
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position
  }));
  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  useFrame(() => {
    camera.position.copy(ref?.current?.position ?? new Vector3());
    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );
    const sidesVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector, sidesVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    api.velocity.set(direction.x, velocity.current[1], direction.z);
    if (jump && Math.abs(parseInt(velocity.current[1].toFixed(3))) < 0.03) {
      api.velocity.set(velocity.current[0], 8, velocity.current[2]);
    }
  });

  return (
    <>
      <FPVControls />
      <mesh ref={ref} />
    </>
  );
};
