'use client'

import { usePathname } from 'next/navigation';
import translation from "@/translation/translation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCookie } from 'cookies-next';
import { useSelector } from 'react-redux';
import Icon from "@/components/general/Icon";
import useLogout from "@/hooks/useLogout";

const Sidebar = ({ open, setOpen }) => {

  const pathname = usePathname();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const { goOut } = useLogout();
  const information = useSelector((state) => state.information.value);
  const permissions = useSelector((state) => state.permissions.value);

  const allItems = [
    { name: "صفحه اصلی پنل", url: "/dashboard", icon: <Icon name={"dashboard"} className="w-8 h-8" /> },
    { name: "دسترسی ها", url: "/dashboard/role", icon: <Icon name={"permissions"} className="w-8 h-8" /> },
    { name: "کاربران", url: "/dashboard/users", icon: <Icon name={"users"} className="w-8 h-8" /> },
    { name: "فایل ها", url: "/dashboard/filemanager", icon: <Icon name={"file"} className="w-8 h-8" /> },
    { name: "درخواست ها", url: "/dashboard/approval", icon: <Icon name={"adminApproval"} className="w-8 h-8" /> },
    { name: "دوره ها", url: "/dashboard/course", icon: <Icon name={"course"} className="w-8 h-8" /> },
    { name: "دسته بندی ها", url: "/dashboard/category", icon: <Icon name={"category"} className="w-8 h-8" /> },
    { name: "مطالب", url: "/dashboard/post", icon: <Icon name={"stack"} className="w-8 h-8" /> },
    { name: "ادمین / تیکت ها", url: "/dashboard/adminTickets", icon: <Icon name={"ticket"} className="w-8 h-8" /> },
    { name: "تیکت ها", url: "/dashboard/tickets", icon: <Icon name={"ticket"} className="w-8 h-8" /> },
  ];

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (permissions != null) {
      let tempItems = [];
      allItems.forEach(item => {
        permissions.forEach(permission => {
          if (item.url == permission.route) {
            tempItems.push(item);
          }
        });
      });
      setItems(tempItems);
    }
  }, [permissions, information, pathname]);

  useEffect(() => {
    if (permissions != null && permissions.length > 0 && information != null) {
      setLoading(false);
    }
  }, [permissions, information]);

  useEffect(() => {
    setUserName(getCookie('userName'));
  }, []);

  return (
    <aside
      className={
        open
          ? "fixed bottom-0 right-0 top-0 z-30 h-full min-w-max bg-primary p-3 duration-500 ease-in overflow-hidden"
          : "fixed  right-[-100%] h-full z-30 min-w-max bg-primary p-3 duration-500 ease-in lg:static lg:flex overflow-hidden flex-col"
      }
    >
      <div className="flex items-center justify-evenly min-w-[256px] mb-4">
        <div className="flex  justify-center">
          <span className="ml-3 text-2xl "> {process.env.NEXT_PUBLIC_APP_NAME} </span>
        </div>
        <Image
          className="rounded-md"
          src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
          alt="Site logo"
          width={60}
          height={60}
        />

      </div>
      {loading ?
        <div className="flex grow w-full justify-center items-center">
          <div className="relative w-20 h-20">
            <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
            <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-accent border-t-transparent shadow-md"></div>
          </div>
        </div>
        :
        <>
          <div className="flex flex-col grow overflow-x-hidden overflow-y-auto pr-3">
            {items.map((item, index) => {
              const { url, icon, name } = item;
              return (
                <Link href={url} key={index}>
                  <div className={(pathname == url) ?
                    "relative bg-siebar_item mb-5 flex items-center rounded-xl bg-secondary p-3 text-accent rtl"
                    :
                    "relative mb-5 flex items-center p-3 text-dactive rtl"
                  }>
                    <div>
                      {icon}
                    </div>
                    <span className={`mr-3 text-nowrap text-lg`}>
                      {name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="pr-3">
            {permissions && permissions.some(permission => "/dashboard/profile" === permission.route) &&
              <Link href="/dashboard/profile">
                <div className={(pathname == "/dashboard/profile") ?
                  "relative bg-siebar_item mb-5 flex items-center rounded-xl bg-secondary p-3 text-accent rtl"
                  :
                  "relative mb-5 flex items-center p-3 text-dactive rtl"
                }>
                  <div>
                    <Icon name={"profile"} className="w-10 h-10" />
                  </div>
                  <span className={`mr-3 text-nowrap`}>
                    اطلاعات حساب
                  </span>
                </div>
              </Link>
            }
            <Link href="" onClick={(e) => {
              e.preventDefault();
              goOut();
            }}>
              <div className={(pathname == "/adss") ?
                "relative bg-siebar_item mb-5 flex items-center rounded-xl bg-secondary p-3 text-accent rtl"
                :
                "relative mb-5 flex items-center p-3 text-dactive rtl"
              }>
                <div>
                  <Icon name={"exit"} className="w-10 h-10" />
                </div>
                <span className={`mr-3 text-nowrap`}>
                  خروج
                </span>
              </div>
            </Link>
          </div>
        </>
      }
    </aside>
  );
};

export default Sidebar;
