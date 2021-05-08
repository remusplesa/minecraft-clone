import { useState, useEffect } from "react";
import { useStore } from "./useStore";

interface KeyEvent {
  code: string;
}

function actionByKey(key: string) {
  const keys = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
  };
  return (keys as any)[key];
}

function textureByKey(key: string) {
  const keys = {
    Digit1: "dirt",
    Digit2: "grass",
    Digit3: "glass",
    Digit4: "wood",
    Digit5: "log",
  };
  return (keys as any)[key];
}

export const useKeyboardControls = () => {
  const [movement, setMovement] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  });
  const setTexture = useStore((state) => state.setTexture);

  useEffect(() => {
    const handleKeyDown = (e: KeyEvent) => {
      if (actionByKey(e.code)) {
        setMovement((state) => ({ ...state, [actionByKey(e.code)]: true }));
      }

      if (textureByKey(e.code)) {
        setTexture(textureByKey(e.code));
      }
    };

    const handleKeyUp = (e: KeyEvent) => {
      if (actionByKey(e.code)) {
        setMovement((state) => ({ ...state, [actionByKey(e.code)]: false }));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [setTexture]);

  return movement;
};
