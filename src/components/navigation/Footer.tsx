import {
  Camera,
  CodeIcon,
  FileIcon,
  GitBranchIcon,
  GithubIcon,
  HandHelpingIcon,
  HeadsetIcon,
  LockIcon,
  MailIcon,
  PaletteIcon,
  ShieldBanIcon,
  TwitterIcon,
} from "lucide-react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="col-[content] relative text-center leading-4 text-xs text-sub">
      <div className="mb-8 leading-[2]">
        <div className="bg-sub text-bg px-[0.3rem] py-[0.1rem] rounded-[0.1rem] inline-block mx-[0.5rem] leading-3 text-xs">
          tab
        </div>
        {" + "}
        <div className="bg-sub text-bg px-[0.3rem] py-[0.1rem] rounded-[0.1rem] inline-block mx-[0.5rem] leading-3 text-xs">
          enter
        </div>
        {" - restart test "}
        <br />
        <div className="bg-sub text-bg px-[0.3rem] py-[0.1rem] rounded-[0.1rem] inline-block mx-[0.5rem] leading-3 text-xs">
          esc
        </div>
        {" or "}
        <div className="bg-sub text-bg px-[0.3rem] py-[0.1rem] rounded-[0.1rem] inline-block mx-[0.5rem] leading-3 text-xs">
          ctrl
        </div>
        {" + "}
        <div className="bg-sub text-bg px-[0.3rem] py-[0.1rem] rounded-[0.1rem] inline-block mx-[0.5rem] leading-3 text-xs">
          shift
        </div>
        {" + "}
        <div className="bg-sub text-bg px-[0.3rem] py-[0.1rem] rounded-[0.1rem] inline-block mx-[0.5rem] leading-3 text-xs">
          p
        </div>
        {" - command line "}
      </div>
      <div className="grid grid-cols-[1fr_max-content] gap-8">
        <div className="grid grid-cols-[repeat(4,auto)] lg:flex lg:flex-row justify-start w-max">
          <button className="flex gap-1 py-[3px] px-1.5 justify-start items-center h-min w-max text-xs leading-3">
            <MailIcon size={15} />
            <p>contact</p>
          </button>
          <button className="flex gap-1 py-[3px] px-1.5 justify-start items-center h-min w-max text-xs leading-3">
            <HandHelpingIcon size={15} />
            <p>support</p>
          </button>
          <button className="flex gap-1 py-[3px] px-1.5 justify-start items-center h-min w-max text-xs leading-3">
            <CodeIcon size={15} />
            <p>github</p>
          </button>
          <button className="flex gap-1 py-[3px] px-1.5 justify-start items-center h-min w-max text-xs leading-3">
            <HeadsetIcon size={15} />
            <p>discord</p>
          </button>
          <button className="flex gap-1 py-[3px] px-1.5 justify-start items-center h-min w-max text-xs leading-3">
            <TwitterIcon size={15} />
            <p>twitter</p>
          </button>
          <button className="flex gap-1 py-[3px] px-1.5 justify-start items-center h-min w-max text-xs leading-3">
            <FileIcon size={15} />
            <p>terms</p>
          </button>
          <button className="flex gap-1 py-[3px] px-1.5 justify-start items-center h-min w-max text-xs leading-3">
            <ShieldBanIcon size={15} />
            <p>security</p>
          </button>
          <button className="flex gap-1 py-[3px] px-1.5 justify-start items-center h-min w-max text-xs leading-3">
            <LockIcon size={15} />
            <p>privacy</p>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:flex justify-self-end text-right w-max h-max">
          <button className="flex gap-1 py-[3px] px-1.5 justify-start items-center h-min w-max text-xs leading-3">
            <PaletteIcon size={15} />
            <p>catpuccin</p>
          </button>
          <button className="flex gap-1 py-[3px] px-1.5 justify-start items-center h-min w-max text-xs leading-3">
            <GitBranchIcon size={15} />
            <p>v1.0.0</p>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
