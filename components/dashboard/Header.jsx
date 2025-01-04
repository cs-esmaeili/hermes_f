import React from "react";
import { FaBell } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { RiMenu3Line } from "react-icons/ri";

const Header = ({ open, setOpen }) => {

  return (
    <div className="flex items-center p-5 pr-10">

      <div className="mr-3 hidden sm:flex">
        <MdSunny className="text-2xl" />
        <FaBell className="ml-3 text-2xl" />
        <FaBell className="ml-3 text-2xl" />
        <FaBell className="ml-3 text-2xl" />
      </div>

      <div className="flex  grow flex-wrap justify-around gap-1 rounded-xl p-2">
      </div>
      <div className={`flex flex-row justify-center items-center gap-5 ${process.env.NEXT_PUBLIC_DIRECTION}`}>
        <span className="rtl font-bold text-2xl">جواد اسماعیلی عزیز ؛خوش اومدی. 👋</span>.
        <div className="border-l border-gray-400 h-[40px]"></div>
        <span className="font-bold">شنبه, 15 دی 1403</span>

      </div>

      <RiMenu3Line
        className="ml-3 text-2xl lg:hidden"
        onClick={() => setOpen(!open)}
      />
    </div>
  );
};

export default Header;
