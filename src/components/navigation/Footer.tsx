import clsx from "clsx";
import {
  FileIcon,
  GitBranchIcon,
  HandHelpingIcon,
  HeadsetIcon,
  LockIcon,
  MailIcon,
  PaletteIcon,
  GithubIcon,
  ShieldBanIcon,
  TwitterIcon,
} from "lucide-react";
import Tooltip from "../standalone/Tooltip";

const Footer = () => {
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
          <div className="relative">
            <Tooltip content="Feature not implemented yet." position="top">
              <button
                className={clsx(
                  "relative h-min w-max py-[3px] px-1.5",
                  "flex gap-1 justify-start items-center",
                  "text-xs leading-3",
                  true ? "cursor-not-allowed" : "cursor-pointer",
                )}
              >
                <MailIcon size={15} />
                <p>contact</p>
              </button>
            </Tooltip>
          </div>
          <div className="relative">
            <Tooltip content="Feature not implemented yet." position="top">
              <button
                className={clsx(
                  "relative h-min w-max py-[3px] px-1.5",
                  "flex gap-1 justify-start items-center",
                  "text-xs leading-3",
                  true ? "cursor-not-allowed" : "cursor-pointer",
                )}
              >
                <HandHelpingIcon size={15} />
                <p>support</p>
              </button>
            </Tooltip>
          </div>
          <div className="relative">
            <Tooltip content="Feature not implemented yet." position="top">
              <button
                className={clsx(
                  "relative h-min w-max py-[3px] px-1.5",
                  "flex gap-1 justify-start items-center",
                  "text-xs leading-3",
                  true ? "cursor-not-allowed" : "cursor-pointer",
                )}
              >
                <GithubIcon size={15} />
                <p>github</p>
              </button>
            </Tooltip>
          </div>
          <div className="relative">
            <Tooltip content="Feature not implemented yet." position="top">
              <button
                className={clsx(
                  "relative h-min w-max py-[3px] px-1.5",
                  "flex gap-1 justify-start items-center",
                  "text-xs leading-3",
                  true ? "cursor-not-allowed" : "cursor-pointer",
                )}
              >
                <HeadsetIcon size={15} />
                <p>discord</p>
              </button>
            </Tooltip>
          </div>
          <div className="relative">
            <Tooltip content="Feature not implemented yet." position="top">
              <button
                className={clsx(
                  "relative h-min w-max py-[3px] px-1.5",
                  "flex gap-1 justify-start items-center",
                  "text-xs leading-3",
                  true ? "cursor-not-allowed" : "cursor-pointer",
                )}
              >
                <TwitterIcon size={15} />
                <p>twitter</p>
              </button>
            </Tooltip>
          </div>
          <div className="relative">
            <Tooltip content="Feature not implemented yet." position="top">
              <button
                className={clsx(
                  "relative h-min w-max py-[3px] px-1.5",
                  "flex gap-1 justify-start items-center",
                  "text-xs leading-3",
                  true ? "cursor-not-allowed" : "cursor-pointer",
                )}
              >
                <FileIcon size={15} />
                <p>terms</p>
              </button>
            </Tooltip>
          </div>
          <div className="relative">
            <Tooltip content="Feature not implemented yet." position="top">
              <button
                className={clsx(
                  "relative h-min w-max py-[3px] px-1.5",
                  "flex gap-1 justify-start items-center",
                  "text-xs leading-3",
                  true ? "cursor-not-allowed" : "cursor-pointer",
                )}
              >
                <ShieldBanIcon size={15} />
                <p>security</p>
              </button>
            </Tooltip>
          </div>
          <div className="relative">
            <Tooltip content="Feature not implemented yet." position="top">
              <button
                className={clsx(
                  "relative h-min w-max py-[3px] px-1.5",
                  "flex gap-1 justify-start items-center",
                  "text-xs leading-3",
                  true ? "cursor-not-allowed" : "cursor-pointer",
                )}
              >
                <LockIcon size={15} />
                <p>privacy</p>
              </button>
            </Tooltip>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:flex justify-self-end text-right w-max h-max">
          <div className="relative">
            <Tooltip content="Feature not implemented yet." position="top">
              <button
                className={clsx(
                  "relative h-min w-max py-[3px] px-1.5",
                  "flex gap-1 justify-start items-center",
                  "text-xs leading-3",
                  true ? "cursor-not-allowed" : "cursor-pointer",
                )}
              >
                <PaletteIcon size={15} />
                <p>catpuccin</p>
              </button>
            </Tooltip>
          </div>
          <div className="relative">
            <Tooltip content="Feature not implemented yet." position="top">
              <button
                className={clsx(
                  "relative h-min w-max py-[3px] px-1.5",
                  "flex gap-1 justify-start items-center",
                  "text-xs leading-3",
                  true ? "cursor-not-allowed" : "cursor-pointer",
                )}
              >
                <GitBranchIcon size={15} />
                <p>v1.0.0</p>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
