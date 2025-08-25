import { Camera } from "lucide-react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="col-[content] relative text-center leading-4 text-xs">
      <div className="mb-8 leading-[2]">
        <div className="bg-red-200 text-blue-500 px-[0.3rem] py-[0.1rem] rounded-[0.1rem] inline-block mx-[0.5rem] leading-3">
          tab
        </div>
        {" + "}
        <div className="bg-red-200 text-blue-500 px-[0.3rem] py-[0.1rem] rounded-[0.1rem] inline-block mx-[0.5rem] leading-3">
          enter
        </div>
        {" - restart test "}
        <br />
        <div className="bg-red-200 text-blue-500 px-[0.3rem] py-[0.1rem] rounded-[0.1rem] inline-block mx-[0.5rem] leading-3">
          esc
        </div>
        {" or "}
        <div className="bg-red-200 text-blue-500 px-[0.3rem] py-[0.1rem] rounded-[0.1rem] inline-block mx-[0.5rem] leading-3">
          ctrl
        </div>
        {" + "}
        <div className="bg-red-200 text-blue-500 px-[0.3rem] py-[0.1rem] rounded-[0.1rem] inline-block mx-[0.5rem] leading-3">
          shift
        </div>
        {" + "}
        <div className="bg-red-200 text-blue-500 px-[0.3rem] py-[0.1rem] rounded-[0.1rem] inline-block mx-[0.5rem] leading-3">
          p
        </div>
        {" - command line "}
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-row flex-wrap">
          <button className="flex flex-row items-center gap-1 px-2 py-1">
            <Camera />
            <p>contact</p>
          </button>
          <button className="flex flex-row items-center gap-1 px-2 py-1">
            <Camera />
            <p>contact</p>
          </button>
          <button className="flex flex-row items-center gap-1 px-2 py-1">
            <Camera />
            <p>contact</p>
          </button>
          <button className="flex flex-row items-center gap-1 px-2 py-1">
            <Camera />
            <p>contact</p>
          </button>
          <button className="flex flex-row items-center gap-1 px-2 py-1">
            <Camera />
            <p>contact</p>
          </button>
          <button className="flex flex-row items-center gap-1 px-2 py-1">
            <Camera />
            <p>contact</p>
          </button>
          <button className="flex flex-row items-center gap-1 px-2 py-1">
            <Camera />
            <p>contact</p>
          </button>
          <button className="flex flex-row items-center gap-1 px-2 py-1">
            <Camera />
            <p>contact</p>
          </button>
        </div>
        <div className="flex flex-col xl:flex-wrap items-end">
          <button className="flex flex-row items-center gap-1 px-2 py-1">
            <Camera />
            <p>contact</p>
          </button>
          <button className="flex flex-row items-center gap-1 px-2 py-1">
            <Camera />
            <p>contact</p>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
