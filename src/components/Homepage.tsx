import { Link } from "react-router-dom";
import { HomeLogo } from "./HomeLogo";

import linkedin from "../images/linkedin.png";
import github from "../images/github.png";

const Homepage = () => {
  return (
    <div className="container mx-auto md:my-8 p-8 bg-green-200 font-mono border-8 border-gray-800">
      <header className="flex justify-center">
        <h1 className="font-black text-4xl tracking-wide">Minecraft clone</h1>
      </header>
      <div className="w-full h-48 mx-auto -m-4">
        <HomeLogo />
      </div>
      <section className="pt-8 flex justify-center">
        <button className="bg-indigo-300 hover:bg-indigo-400 border-gray-600 hover:shadow-md border-2 p-4 -mt-4 mb-4">
          <Link to="/game">
            <span className="font-bold">Let's play!</span>
          </Link>
        </button>
      </section>
      <main>
        {" "}
        <h4 className="text-xl font-bold my-4">About the project</h4>
        <p>
          I've tried recreating some of the main Minecraft actions with React
          hooks using{" "}
          <span className="font-semibold">
            <a
              href="https://github.com/pmndrs/react-three-fiber"
              className="hover:underline"
            >
              react-three-fiber
            </a>
            ,{" "}
            <a
              href="https://github.com/pmndrs/drei"
              className="hover:underline"
            >
              drei
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/pmndrs/use-cannon"
              className="hover:underline"
            >
              cannon
            </a>
          </span>{" "}
          when interacting with <span className="font-semibold">Three.js</span>{" "}
          while the state is being managed with{" "}
          <a
            href="https://github.com/pmndrs/zustand"
            className="font-semibold hover:underline"
          >
            zustand
          </a>
          . All the styling was done with{" "}
          <span className="font-semibold">
            <a href="https://tailwindcss.com/" className="hover:underline">
              tailwindcss
            </a>
          </span>
          .
        </p>
        <p className="mt-1">
          The game allows the player to navigate a plane using the keyboard and
          look around with the mouse (mobile is not supported yet, sorry). They
          can place/delete cubes with different textures when clicking. The game
          is autosaving the world every ten seconds so it can be reused and the
          user can clear everything with the reset button.
        </p>
      </main>
      <footer className="flex mt-12">
        <a
          href="https://www.linkedin.com/in/remus-andrei-plesa-67b156166/"
          className="ml-auto"
        >
          <img src={linkedin} alt="to linkedin" className="w-12 h-12" />
        </a>
        <a href="https://github.com/remusplesa/" className="mx-2">
          <img src={github} alt="to github" className="w-12 h-12" />
        </a>
      </footer>
    </div>
  );
};

export default Homepage;
