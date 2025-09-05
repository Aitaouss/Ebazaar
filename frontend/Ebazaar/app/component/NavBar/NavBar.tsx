"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiHome5Fill } from "react-icons/ri";
import { RiDashboardFill } from "react-icons/ri";
import { SiEventstore } from "react-icons/si";
import { RiSettings4Fill } from "react-icons/ri";
import { IoMail } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

export default function NavBar() {
  const pathname = usePathname(); // current path
  interface NavItem {
    name: string;
    href: string;
    icon?: React.ReactNode;
  }
  const navItems: NavItem[] = [
    { name: "Home", href: "/eb", icon: <RiHome5Fill /> },
    { name: "Dashboard", href: "/eb/dashboard", icon: <RiDashboardFill /> },
    { name: "Orders", href: "/eb/orders", icon: <SiEventstore /> },
    { name: "Settings", href: "/eb/settings", icon: <RiSettings4Fill /> },
    { name: "Inbox", href: "/eb/inbox", icon: <IoMail /> },
    { name: "Profile", href: "/eb/profile", icon: <FaUser /> },
  ];

  return (
    <nav className="mt-8 mb-6 flex">
      <div className="flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-[#015B46] text-white hover:bg-[#014a39]"
                  : "text-[#13120F] hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
