// Navigation.jsx (Server Component)
import Link from "next/link";
import NestedMenu from "./NestedMenu";

export default function Navigation() {
    return (
        <nav className="p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link href="/" className="text-blue-600 hover:underline">
                        خانه
                    </Link>
                </li>
                <li className="relative">
                    <Link href="/categories" className="text-blue-600 hover:underline">
                        دسته‌بندی‌ها
                    </Link>
                    {/* کامپوننت NestedMenu به عنوان یک منوی popover */}
                    <NestedMenu
                        items={[
                            { name: "دسته‌بندی ۱", href: "/categories/1" },
                            { name: "دسته‌بندی ۲", href: "/categories/2" },
                            { name: "دسته‌بندی ۳", href: "/categories/3" },
                        ]}
                    />
                </li>
                <li>
                    <Link href="/about" className="text-blue-600 hover:underline">
                        درباره ما
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
