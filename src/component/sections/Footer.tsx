import { FaGithub } from "react-icons/fa6";
import { MdPrivacyTip, MdPalette, MdEmail } from "react-icons/md";
import { IoDocument } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="container flex justify-between items-end py-4 px-6 mx-auto w-full max-w-6xl h-[80px] text-foreground-footer">
      <div className="flex gap-2 items-center text-sm">
        <div className="flex flex-col gap-1 justify-between items-start">
          <div className="flex gap-2 items-center px-2">
            <MdPrivacyTip className="w-4 h-4" />
            <p>Privacy</p>
          </div>
          <div className="flex gap-2 items-center px-2">
            <IoDocument className="w-4 h-4" />
            <p>Terms</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 justify-between items-start">
          <div className="flex gap-2 items-center px-2">
            <MdEmail className="w-4 h-4" />
            <p>Contact</p>
          </div>
          <div className="flex gap-2 items-center px-2">
            <MdPalette className="w-4 h-4" />
            <p>Theme</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 justify-between items-end text-sm">
        <div className="flex gap-2 items-center">
          <FaGithub className="w-4 h-4" />
          <p>Tecu23</p>
        </div>
        <p>v1.0.0</p>
      </div>
    </div>
  );
};

export default Footer;
