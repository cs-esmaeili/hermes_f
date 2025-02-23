import React from "react";
import { RiMenu3Line } from "react-icons/ri";
import ThemeToggleButton from "../general/ThemeToggleButton";
import Icon from "../general/Icon";
import { useSelector } from 'react-redux';
import Link from "next/link";
import useLogout from "@/hooks/useLogout";
const Header = ({ open, setOpen }) => {

  const fullName = useSelector((state) => state.information?.value?.data?.fullName);
  const { goOut } = useLogout();

  return (
    <div className="flex items-center p-5 pr-10">

      <div className="flex-row mr-3 gap-4  flex">

        <Link href="/dashboard/profile">
          <Icon name={"profile"} className="w-8 h-8 rounded-full" />
        </Link>
        <div className="cursor-pointer" onClick={() => goOut()}>
          <Icon name={"exit"} className="w-8 h-8" />
        </div>
        <ThemeToggleButton />

      </div>
      <div className="flex grow flex-wrap justify-around gap-1 rounded-xl p-2">
      </div>
      <div className={`flex flex-row justify-center items-center gap-5 ${process.env.NEXT_PUBLIC_DIRECTION}`}>
        <span className="rtl font-bold hidden sm:block  sm:text-sm md:text-2xl ">{`${fullName} عزیز ؛خوش اومدی 👋`}</span>
        <div className="border-l border-gray-400 h-[40px]"></div>
        <span className="font-bold  text-sm md:text-lg ">شنبه, 15 دی 1403</span>
      </div>

      <RiMenu3Line
        className="ml-3 text-2xl lg:hidden"
        onClick={() => setOpen(!open)}
      />
    </div >
  );
};

export default Header;
