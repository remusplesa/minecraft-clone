import create from "zustand";
import { nanoid } from "nanoid";

export interface Cube {
  pos: [x: number, y: number, z: number];
  texture: string;
  id: string;
}

type storeState = {
  cubes: Cube[];
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (x: number, y: number, z: number) => void;
  texture: string;
  setTexture: (texture: string) => void;
  saveWorld: () => void;
  clearWorld: () => void;
};

const startingPoint = '[{"id":"7rWmnzLILTB-SCKpxk91f","pos":[2,1,7],"texture":"dirt"},{"id":"MYjwH8i6QjvxVa7j_nWzv","pos":[1,1,7],"texture":"dirt"},{"id":"VJeUg_PN26PInwQk6KBf0","pos":[-1,1,3],"texture":"dirt"},{"id":"94oWXmkxWHgdWpHQHOdRb","pos":[-1,1,4],"texture":"dirt"},{"id":"Sr_9oT8HTtNpEyAXcEm7D","pos":[6,1,12],"texture":"wood"},{"id":"ntEFcZKm5fUjimjhHuogG","pos":[5,1,12],"texture":"wood"},{"id":"l33qvOo6aTxwbbZ9qi_T1","pos":[5,1,9],"texture":"log"},{"id":"5_sN-NEzUQbZMPQ9ebdqX","pos":[-1,1,12],"texture":"log"},{"id":"hhYa6d2smIYMi0aVbo8JV","pos":[-1,1,19],"texture":"glass"},{"id":"6ASlKR6f6HZPuNZtB-sGs","pos":[0,1,13],"texture":"glass"},{"id":"YwXUQeam5HOV5afCDqWA5","pos":[0,1,14],"texture":"glass"},{"id":"NH_al5TrakhIk5yxUlh1Z","pos":[0,2,13],"texture":"glass"}]'

const getLocalStorage = (key: string) =>
  JSON.parse(window.localStorage.getItem(key) || startingPoint);
const setLocalStorage = (key: string, value: Cube[]) =>
  window.localStorage.setItem(key, JSON.stringify(value));


export const useStore = create<storeState>((set) => ({
  cubes: getLocalStorage("world") || [],

  addCube: (x: number, y: number, z: number) =>
    set((state) => ({
      cubes: [
        ...state.cubes,
        {
          id: nanoid(),
          pos: [x, y, z],
          texture: state.texture,
        },
      ],
    })),
  removeCube: (x: number, y: number, z: number) =>
    set((state) => {
      console.log(`Deleting cube at: ${x} ${y} ${z}`);
      let filtered = state.cubes.filter(
        ({ pos }) => pos[0] !== x || pos[1] !== y || pos[2] !== z
      );
      return {
        cubes: filtered,
      };
    }),

  texture: "dirt",
  setTexture: (texture) => set((state) => ({ texture })),

  saveWorld: () =>
    set((state) => {
      setLocalStorage("world", state.cubes);
    }),

  clearWorld: () => set((state) => ({ cubes: [] })),
}));
