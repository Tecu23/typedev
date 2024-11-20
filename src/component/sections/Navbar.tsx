import { Link } from "@tanstack/react-router";
import { FaInfo, FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="container flex justify-between items-center p-2 px-6 mx-auto w-full max-w-6xl h-[80px]">
      <h2 className="text-3xl font-bold tracking-wide text-foreground">
        typeDev
      </h2>
      <div className="flex gap-8 items-center text-lg text-foreground">
        <Link to="/settings" className="[&.active]:font-bold">
          <IoMdSettings className="w-6 h-6" />
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          <FaInfo className="w-6 h-6" />
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          <FaUser className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
