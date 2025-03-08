// Navigation.jsx (Server Component)
import Link from "next/link";
import NestedMenu from "./NestedMenu";

export default function Navigation() {
    return (
        <nav className="hidden  lg:flex bg-gray-200 dark:bg-secondary  dark:bg-opacity-50 mx-16 min-h-16 rounded-b-2xl justify-center items-center  ">
            <ul className="flex grow justify-center items-center mx-10">
                <li>
                    <Link
                        href="/"
                        className="w-fit p-3 hover:bg-blue-400 transition rounded-lg cursor-pointer"
                    >
                        خانه
                    </Link>
                </li>
                <li className="relative">
                    <NestedMenu
                        menuName={"دسته بندی ها"}
                        menuClassName="w-60 rounded-r-lg shadow-xl bg-secondary"  // استایل سفارشی منوی اصلی
                        items={[
                            {
                                name: "دسته‌بندی ۱",
                                href: "/categories/1",
                                subMenuClassName: "w-60 rounded-l-lg shadow-xl bg-secondary border-r-2", // استایل سفارشی برای زیر منو
                                subMenu: [
                                    { name: "زیر دسته ۱", href: "/categories/1-1" },
                                    { name: "زیر دسته ۲", href: "/categories/1-2" },
                                ],
                            },
                            {
                                name: "دسته‌بندی ۲",
                                href: "/categories/2",
                            },
                            {
                                name: "دسته‌بندی ۳",
                                href: "/categories/3",
                                subMenuClassName: "w-64 shadow-2xl bg-secondary border-r-2", // استایل سفارشی برای زیر منو
                                subMenu: [
                                    {
                                        name: "زیر دسته ۳-۱",
                                        href: "/categories/3-1",
                                        subMenuClassName: "w-56 rounded-l-md shadow-md bg-secondary border-r-2", // استایل سفارشی برای زیر زیر منو
                                        subMenu: [
                                            { name: "زیر زیر دسته", href: "/categories/3-1-1" },
                                        ],
                                    },
                                ],
                            },
                        ]}
                    />
                </li>
                <li>
                    <Link
                        href="/about"
                        className="w-fit p-3 hover:bg-blue-400 transition rounded-lg cursor-pointer"
                    >
                        درباره ما
                    </Link>
                </li>
                <li>
                    <Link
                        href="/"
                        className="w-fit p-3 hover:bg-blue-400 transition rounded-lg cursor-pointer"
                    >
                        آموزش های انلاین
                    </Link>
                </li>
                <li>
                    <Link
                        href="/"
                        className="w-fit p-3 hover:bg-blue-400 transition rounded-lg cursor-pointer"
                    >
                        مقالات
                    </Link>
                </li>
                <li className="relative">
                    <NestedMenu
                        menuName={"لینک های سریع"}
                        menuClassName="w-60 rounded-r-lg shadow-xl bg-secondary"  // استایل سفارشی منوی اصلی
                        items={[
                            {
                                name: "دسته‌بندی ۱",
                                href: "/categories/1",
                                subMenuClassName: "w-60 rounded-l-lg shadow-xl bg-secondary border-r-2", // استایل سفارشی برای زیر منو
                                subMenu: [
                                    { name: "زیر دسته ۱", href: "/categories/1-1" },
                                    { name: "زیر دسته ۲", href: "/categories/1-2" },
                                ],
                            },
                            {
                                name: "دسته‌بندی ۲",
                                href: "/categories/2",
                            },
                            {
                                name: "دسته‌بندی ۳",
                                href: "/categories/3",
                                subMenuClassName: "w-64 shadow-2xl bg-secondary border-r-2", // استایل سفارشی برای زیر منو
                                subMenu: [
                                    {
                                        name: "زیر دسته ۳-۱",
                                        href: "/categories/3-1",
                                        subMenuClassName: "w-56 rounded-l-md shadow-md bg-secondary border-r-2", // استایل سفارشی برای زیر زیر منو
                                        subMenu: [
                                            { name: "زیر زیر دسته", href: "/categories/3-1-1" },
                                        ],
                                    },
                                ],
                            },
                        ]}
                    />
                </li>
            </ul>
        </nav>
    );
}
