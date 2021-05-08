import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useStore } from "../hooks/useStore";
import {texturesImages} from "../textures";


interface TextureTypeProps {
    image: string;
    name: string;
    current: string;
    change: (texture: string) => void;
}

const TextureType = ({image, name, current, change}: TextureTypeProps) => {
    if(name === current){
        return (
            <div className="w-12 h-12 border-4 border-red-500 shadow-md">
                <img src={image} alt="texture" className="w-full h-full"/>
            </div>
        )
    }
    return (
        <div className="w-12 h-12" onClick={() => change(name)}>
            <img src={image} alt="texture" className="w-full h-full"/>
        </div>
    )
}


interface InstructionsProps {
    change: (bool: boolean) => void;
}
const Instructions = ({change}: InstructionsProps) => (
    <div className="absolute flex top-0 left-0 h-full w-full z-30">
        <div className="font-mono flex flex-col m-auto bg-yellow-300 p-4 shadow-md" onClick={() =>change(false)}>
            <span className=" text-2xl mb-4">How to play</span>
            <ul className="list-disc list-inside mb-4">
                <li>Use <span className="font-bold">1 2 3 4 5</span> on your keyboard to change the texture of a new Cube.</li>
                <li>Use <span className='font-bold'>W A S D </span>to move around.</li>
                <li>Use the mouse to change the point of view.</li>
                <li><span className="font-bold">Click</span> in order to create a new Cube on the highlighted surface.</li>
                <li><span className="font-bold">Click</span> on a Cube while pressing the <span className="font-bold">Alt Key</span> to delete it.</li>
                <li>Use the <span className="font-bold">Clear all</span> button to reset the World</li>
                <li>Press the <span className="font-bold">Esc Key</span> to release the locked mouse controller.</li>
            </ul>
            <span className="mx-auto text-2xl">Click here & Let's go!</span>
        </div>
    </div>
)

export const HelperNav = () => {
  const [cubes, texture, setTexture, clearWorld] = useStore((state) => [
    state.cubes,
    state.texture,
    state.setTexture,
    state.clearWorld,
  ]);

  const [open, setOpen] = useState(true);

  return (
      <>
      {open && <Instructions change={setOpen}/>}
    <section className="absolute top-2 left-2 z-10 flex">
      <button className="bg-yellow-300 p-2 shadow-md h-12">
        <Link to="/">
          <span>Take me back</span>
        </Link>
      </button>

      <button
        className="mx-4 bg-yellow-300 p-2 shadow-md"
        onClick={clearWorld}
      >
        <span className="font-black">
          {cubes.length}
          {"  "}
        </span>
        <span>Clear All</span>
      </button>

      {
          texturesImages.map(t => 
            <TextureType image={t.img} name={t.type} current={texture} change={setTexture}/>
          )
      }
         <button
        className="mx-4 bg-yellow-300 p-2 shadow-md"
        onClick={() => setOpen(true)}
      >
          <span>Help</span>
      </button>
    </section>
    </>
  );
};
