"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/general/Icon";
import DivButton from "../dashboard/DivButton";

export default function NestedMenu({ items }) {
    
    const [open, setOpen] = useState(false);

    return (
        <div
            className="relative inline-block mt-2"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <DivButton
                aria-expanded={open}
                aria-controls="nested-menu-popover"
                className=" text-textcolor px-3 py-2 rounded-md text-sm transition-colors duration-300 hover:bg-blue-600 focus:outline-none">
                <Icon name={"menu"} className={"h-7 w-7"} />
                <span>دسته بندی ها</span>
            </DivButton>

            <ul
                id="nested-menu-popover"
                className={`absolute right-0 top-full w-48 bg-secondary  rounded-md shadow-md transform transition duration-300 ease-out ${open
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
            >
                {items.map((item, index) => (
                    <MenuItem key={index} item={item} />
                ))}
            </ul>
            <noscript>
                <ul
                    id="nested-menu-popover-noscript"
                    className="absolute right-0 top-full w-48 text-textcolor   rounded-md shadow-md"
                >
                    {items.map((item, index) => (
                        <li key={index} className="">
                            <Link
                                href={item.href}
                                className="block px-4 py-2 text-textcolor hover:bg-gray-100 transition-colors duration-200"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </noscript>
        </div>
    );
}

function MenuItem({ item }) {
    const [openSub, setOpenSub] = useState(false);
    const hasSubMenu = item.subMenu && item.subMenu.length > 0;

    return (
        <li
            className="relative rounded-lg p-2"
            onMouseEnter={() => setOpenSub(true)}
            onMouseLeave={() => setOpenSub(false)}
        >
            <div className="flex items-center hover:bg-primary rounded-md transition-colors duration-200">
                {item.href ? (
                    <Link
                        href={item.href}
                        className="flex grow  px-4 py-2 text-textcolor"
                    >
                        {item.name}
                    </Link>
                ) : (
                    <span className="block px-4 py-2 text-textcolor">{item.name}</span>
                )}
                {hasSubMenu && <span className="px-2 text-textcolor">{">"}</span>}
            </div>
            {hasSubMenu && openSub && (
                <ul className="absolute right-full top-0 mt-0 ml-0 w-48 bg-secondary  rounded-md shadow-md">
                    {item.subMenu.map((subItem, subIndex) => (
                        <MenuItem key={subIndex} item={subItem} />
                    ))}
                </ul>
            )}
        </li>
    );
}
