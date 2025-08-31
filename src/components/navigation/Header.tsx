import { Bell, CodeXmlIcon, Crown, Info, Keyboard, SettingsIcon, User } from "lucide-react";
import Tooltip from "../standalone/Tooltip";
import clsx from "clsx";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="col-[content] grid grid-cols-[auto_1fr] grid-flow-col items-center gap-0.5 leading-[2.3rem] text-[2.3rem]">
      <a
        id="logo"
        href="/"
        className="grid grid-cols-[auto_1fr] gap-2 px-1 py-[0.35rem] -ml-1 -mr-1 justify-center items-center whitespace-nowrap"
      >
        <div className="text-main grid items-center bg-transparent">
          <CodeXmlIcon className="h-6" preserveAspectRatio="none" width={30} />
        </div>
        <h1 className="hidden md:block text-[1.5rem] lg:text-[2rem] leading-[2rem] text-text -mt-[.23em] my-[unset]">
          typedev
        </h1>
      </a>
      <nav className="w-full grid grid-flow-col grid-cols-[auto_auto_auto_auto_1fr_auto] gap-0.5">
        <a
          className={clsx(
            "relative text-colorful-error appearance-none p-2",
            true ? "cursor-not-allowed" : "cursor-pointer",
          )}
        >
          <Tooltip content="Feature not implemented yet." position="bottom">
            <Keyboard size={20} />
          </Tooltip>
        </a>
        <a
          className={clsx(
            "relative text-primary-orange appearance-none p-2",
            true ? "cursor-not-allowed" : "cursor-pointer",
          )}
        >
          <Tooltip content="Feature not implemented yet." position="bottom">
            <Crown size={20} fill="#fab387" />
          </Tooltip>
        </a>
        <a
          className={clsx(
            "relative text-primary-yellow appearance-none p-2",
            true ? "cursor-not-allowed" : "cursor-pointer",
          )}
        >
          <Tooltip content="Feature not implemented yet." position="bottom">
            <Info size={18} />
          </Tooltip>
        </a>
        <a
          className={clsx(
            "relative text-primary-green appearance-none p-2",
            true ? "cursor-not-allowed" : "cursor-pointer",
          )}
        >
          <Tooltip content="Feature not implemented yet." position="bottom">
            <SettingsIcon size={18} />
          </Tooltip>
        </a>
        <div></div>
        <a
          className={clsx(
            "relative text-primary-blue appearance-none p-2",
            true ? "cursor-not-allowed" : "cursor-pointer",
          )}
        >
          <Tooltip content="Feature not implemented yet." position="bottom">
            <Bell size={18} />
          </Tooltip>
        </a>
        <a className={clsx("relative text-sub appearance-none p-2", true ? "cursor-not-allowed" : "cursor-pointer")}>
          <Tooltip content="Feature not implemented yet." position="bottom">
            <User size={18} />
          </Tooltip>
        </a>
      </nav>
    </header>
  );
};

export default Header;
