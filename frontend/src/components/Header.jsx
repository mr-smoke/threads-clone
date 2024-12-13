import { useLocation } from "react-router-dom";
import Auth from "./Auth";
import { IoArrowBackCircle } from "react-icons/io5";

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="fixed w-full top-0 h-16 flex justify-center items-center bg-black z-10">
      <div className="absolute flex justify-center md:left-4">
        <a href="/" className="flex justify-center">
          <img
            src="/logo.svg"
            alt="logo"
            className="w-9 h-9 my-4 hover:scale-110 transition-transform"
          />
        </a>
      </div>
      <div className="w-[620px] flex justify-between px-4">
        {path !== "/" ? (
          <button onClick={() => window.history.back()}>
            <IoArrowBackCircle size={24} />
          </button>
        ) : (
          <div className="w-6"></div>
        )}
        <p className="hidden md:block text-white font-semibold text-lg">
          Threads
        </p>
        <div className="w-6"></div>
      </div>
      <Auth />
    </header>
  );
};

export default Header;
