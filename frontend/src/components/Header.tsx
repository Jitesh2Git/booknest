import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.svg";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link to="/" className="flex items-center gap-4">
        <img src={logo} alt="Logo" width={40} height={40} />
        <span className="hidden sm:block text-3xl font-semibold font-bebas">
          BookNest
        </span>
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            to="/"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/"
                ? "text-custom-light-200"
                : "text-custom-light-100"
            )}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/favourites"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/favourites"
                ? "text-custom-light-200"
                : "text-custom-light-100"
            )}
          >
            Favourites
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
