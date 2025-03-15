'use client'

import React, { useState, useRef } from 'react';
import Link from 'next/link';

const MenuItem = ({ icon, title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    return (
        <div className="bg-secondary text-textcolor select-none">
            <div
                className="flex items-center justify-between py-3 px-4 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3 text-right">
                    <span>
                        {icon}
                    </span>
                    <span className="font-medium">{title}</span>
                </div>
                {children && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                )}
            </div>

            <div
                ref={contentRef}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                    maxHeight: isOpen ? (contentRef.current ? contentRef.current.scrollHeight : '1000px') : '0',
                    opacity: isOpen ? 1 : 0
                }}
            >
                <div className="text-right pr-6 pl-12 pb-3">
                    {children}
                </div>
            </div>
        </div>
    );
};

const CollapsibleMenu = ({ menuItems }) => {
    return (
        <div className="w-full max-w-full mx-auto  rounded-lg shadow-sm overflow-hidden rtl select-none" dir="rtl">
            {menuItems.map((item, index) => (
                <MenuItem
                    key={index}
                    icon={item.icon}
                    title={item.title}
                >
                    {item.subItems && (
                        <ul className="space-y-2 text-textcolor">
                            {item.subItems.map((subItem, subIndex) => (
                                <li key={subIndex} className="w-full">
                                    <Link
                                        href={subItem.url}
                                        className={`block w-full ${subItem.isActive ? 'text-accent' : 'text-textcolor hover:text-accent transition-colors'}`}
                                    >
                                        {subItem.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </MenuItem>
            ))}
        </div>
    );
};

export default CollapsibleMenu;