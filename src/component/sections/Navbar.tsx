import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <div className="flex gap-2 items-center p-2 px-6 w-full max-w-6xl h-[80px] flex-gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/profile" className="[&.active]:font-bold">
        Profile
      </Link>
    </div>
  );
};

export default Navbar;
