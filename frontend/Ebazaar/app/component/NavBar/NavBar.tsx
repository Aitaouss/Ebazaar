"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiHome5Fill } from "react-icons/ri";
import { RiDashboardFill } from "react-icons/ri";
import { SiEventstore } from "react-icons/si";
import { RiSettings4Fill } from "react-icons/ri";
import { IoMail } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useUser } from "@/app/eb/layout";

function removeSpaces(str: string) {
  return str.replace(/\s+/g, "");
}

export default function NavBar() {
  const pathname = usePathname();
  interface NavItem {
    name: string;
    href: string;
    icon?: React.ReactNode;
  }
  const data = useUser();
  const user = data?.user;
  const base = `${encodeURIComponent(user?.username as string)}`;

  const navItems: NavItem[] = [
    { name: "Home", href: `/eb`, icon: <RiHome5Fill /> },
    {
      name: "Dashboard",
      href: `/eb/${base}/dashboard`,
      icon: <RiDashboardFill />,
    },
    { name: "Orders", href: `/eb/${base}/orders`, icon: <SiEventstore /> },
    {
      name: "Settings",
      href: `/eb/${base}/settings`,
      icon: <RiSettings4Fill />,
    },
    { name: "Inbox", href: `/eb/${base}/inbox`, icon: <IoMail /> },
    { name: "Profile", href: `/eb/${base}/profile`, icon: <FaUser /> },
  ];
  return (
    <nav className="flex mt-4 w-full overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-200 pb-2">
      <div className="flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm sm:text-base cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-gradient-to-r from-[#015B46] to-[#017A5B] text-white hover:bg-[#014a39]"
                  : "text-[#13120F] hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {/* {isActive && item.name} */}
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
