'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/general/Icon";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import CustomInput from "@/components/dashboard/CustomInput";

const Sidebar = () => {

    const [open, setOpen] = useState(false);

    const allItems = [
        { name: "صفحه اصلی پنل", url: "/dashboard", icon: <Icon name="dashboard" className="w-8 h-8" /> },
        { name: "آزمون و مدارک", url: "/dashboard/ExamAndCert", icon: <Icon name="exam" className="w-8 h-8" /> },
        { name: "دسترسی ها", url: "/dashboard/role", icon: <Icon name="permissions" className="w-8 h-8" /> },
        { name: "کاربران", url: "/dashboard/users", icon: <Icon name="users" className="w-8 h-8" /> },
        { name: "فایل ها", url: "/dashboard/filemanager", icon: <Icon name="file" className="w-8 h-8" /> },
        { name: "درخواست ها", url: "/dashboard/approval", icon: <Icon name="adminApproval" className="w-8 h-8" /> },
        { name: "دوره ها", url: "/dashboard/course", icon: <Icon name="course" className="w-8 h-8" /> },
        { name: "دسته بندی ها", url: "/dashboard/category", icon: <Icon name="category" className="w-8 h-8" /> },
        { name: "مطالب", url: "/dashboard/post", icon: <Icon name="stack" className="w-8 h-8" /> },
        { name: "تیکت ها", url: "/dashboard/tickets", icon: <Icon name="ticket" className="w-8 h-8" /> },
        { name: "تیکت ها", url: "/dashboard/tickets", icon: <Icon name="ticket" className="w-8 h-8" /> },
        { name: "تیکت ها", url: "/dashboard/tickets", icon: <Icon name="ticket" className="w-8 h-8" /> },
        { name: "تیکت ها", url: "/dashboard/tickets", icon: <Icon name="ticket" className="w-8 h-8" /> },
        { name: "تیکت ها", url: "/dashboard/tickets", icon: <Icon name="ticket" className="w-8 h-8" /> },
        { name: "تیکت ها", url: "/dashboard/tickets", icon: <Icon name="ticket" className="w-8 h-8" /> },
        { name: "تیکت ها", url: "/dashboard/tickets", icon: <Icon name="ticket" className="w-8 h-8" /> },
    ];

    return (
        <>
            <RiMenu3Line
                className="text-2xl cursor-pointer"
                onClick={() => setOpen(!open)}
            />

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-20 bg-black bg-opacity-50"></div>
            )}

            <aside
                className={
                    open
                        ? "fixed bottom-0 right-0 top-0 z-30 h-full min-w-max bg-primary p-3 duration-500 ease-in overflow-y-auto overflow-x-hidden ltr"
                        : "fixed right-[-100%] h-full z-30 min-w-max bg-primary p-3 duration-500 ease-in lg:static lg:flex overflow-y-auto overflow-x-hidden ltr flex-col"
                }>

                {open && (
                    <div
                        className="absolute top-5 left-5 z-40 cursor-pointer"
                        onClick={() => setOpen(false)}>
                        <RiCloseLine className="text-3xl text-white" />
                    </div>
                )}

                <div className="flex items-center justify-evenly min-w-[256px] mb-4 p-5">
                    <Image
                        className="rounded-md"
                        src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                        alt="Site logo"
                        width={100}
                        height={100}
                    />
                </div>

                <div className="bg-secondary flex grow justify-start items-center rounded-xl gap-1 p-2">
                    <Icon className="text-textcolor w-7 h-7" name="search" />
                    <CustomInput
                        className="bg-transparent !w-full outline-none"
                        containerClassName="!w-full"
                        placeholder="چه دوره ای نیاز دارید؟"
                    />
                </div>
                <hr className="my-7 opacity-75" />
                <nav aria-label="صفحات پنل">
                    <ul className="flex flex-col grow overflow-x-hidden overflow-y-auto pr-3">
                        {allItems.map((item, index) => (
                            <li key={index} className="mb-5">
                                <Link
                                    href={item.url}
                                    className="flex items-center p-3 text-dactive rtl">
                                    {item.icon}
                                    <span className="mr-3 text-nowrap text-lg">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
