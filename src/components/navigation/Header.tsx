import { Camera } from "lucide-react";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="grid grid-cols-[50px_1fr] leading-[2.3rem] text-[2.3rem] items-center gap-0.5">
      <a
        id="logo"
        href="/"
        className="grid px-1 py-1.5 justify-center items-center"
      >
        <div>
          <img src="vite.svg" />
        </div>
      </a>
      <nav className="w-full grid grid-flow-col grid-cols-[auto_auto_auto_auto_1fr_auto] gap-0.5">
        <a className="">
          <Camera color="red" size={32} />
        </a>
        <a className="">
          <Camera color="blue" size={32} />
        </a>
        <a className="">
          <Camera color="pink" size={32} />
        </a>
        <a className="">
          <Camera color="purple" size={32} />
        </a>
        <div></div>
        <a className="">
          <Camera color="green" size={32} />
        </a>
        <a className="">
          <Camera color="black" size={32} />
        </a>
      </nav>
    </header>
  );
};

export default Header;
