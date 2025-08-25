import {
  Bell,
  CodeXmlIcon,
  Crown,
  Info,
  Keyboard,
  SettingsIcon,
  User,
} from "lucide-react";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="col-[content] grid grid-cols-[auto_1fr] leading-[2.3rem] text-[2.3rem] items-center gap-0.5">
      <a
        id="logo"
        href="/"
        className="grid grid-cols-[auto_1fr] gap-2 px-1 py-1.5 justify-center items-center"
      >
        <div className="text-main">
          <CodeXmlIcon size={40} />
        </div>
        <p className="hidden md:block lg:text-2xl 2xl:text-4xl leading-8 text-text -mt-2">
          typedev
        </p>
      </a>
      <nav className="w-full grid grid-flow-col grid-cols-[auto_auto_auto_auto_1fr_auto] gap-0.5">
        <a className="text-colorful-error appearance-none p-2">
          <Keyboard size={18} />
        </a>
        <a className="text-primary-orange appearance-none p-2">
          <Crown size={18} fill="#fab387" />
        </a>
        <a className="text-primary-yellow appearance-none p-2">
          <Info size={18} />
        </a>
        <a className="text-primary-green appearance-none p-2">
          <SettingsIcon size={18} />
        </a>
        <div></div>
        <a className="text-primary-blue appearance-none p-2">
          <Bell size={18} />
        </a>
        <a className="text-sub appearance-none p-2">
          <User size={18} />
        </a>
      </nav>
    </header>
  );
};

export default Header;
