import { useState } from "react";
import {
  IoHome,
  IoHomeOutline,
  IoPerson,
  IoPersonOutline,
  IoSearch,
  IoSearchOutline,
} from "react-icons/io5";
import { useLocation } from "react-router-dom";
import CreatePost from "./CreatePost";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const { user } = useAuth();

  return (
    <div className="fixed bottom-0 flex items-center justify-center py-2 w-full  md:h-screen md:left-0 md:flex-col md:justify-between md:w-20 bg-black z-10">
      <div className="hidden md:block h-16"></div>
      <div className="flex md:flex-col items-center">
        <a
          href="/"
          className="w-14 h-14 flex items-center justify-center hover:bg-[#171717] rounded-lg"
        >
          {active === "/" ? (
            <IoHome className="text-white w-7 h-7" />
          ) : (
            <IoHomeOutline className="text-[#565656] w-7 h-7" />
          )}
        </a>
        <a
          href="/search"
          className="w-14 h-14 flex items-center justify-center hover:bg-[#171717] rounded-lg"
        >
          {active === "/search" ? (
            <IoSearch className="text-white w-7 h-7" />
          ) : (
            <IoSearchOutline className="text-[#565656] w-7 h-7" />
          )}
        </a>
        <a
          href={user ? `/${user._id}` : "/login"}
          className="w-14 h-14 flex items-center justify-center hover:bg-[#171717] rounded-lg"
        >
          {active === `/${user?._id}` ? (
            <IoPerson className="text-white w-7 h-7" />
          ) : (
            <IoPersonOutline className="text-[#565656] w-7 h-7" />
          )}
        </a>
      </div>
      <div className="flex flex-col items-center md:h-16">
        <CreatePost />
      </div>
    </div>
  );
};

export default Sidebar;
