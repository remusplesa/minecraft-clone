import React, { useEffect, useRef } from "react";
import { PointerLockControls as PointerLockControlsImpl } from "three/examples/jsm/controls/PointerLockControls";
import { extend, useThree } from "react-three-fiber";

extend({ PointerLockControlsImpl });

export const FPVControls = () => {
  const { camera, gl } = useThree();
  const controls = useRef(null);

  useEffect(() => {
    document.addEventListener("click", () => {
      if (controls.current !== null && controls.current !== undefined) {
        controls.current.lock();
      }
    });

    return () => {
      gl.domElement.onmousedown = null;
    };
  }, []);

  return (
    <pointerLockControlsImpl ref={controls} args={[camera, gl.domElement]} />
  );
};
