import { RiHome5Fill } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { LuMail } from "react-icons/lu";
import { TbSettings2 } from "react-icons/tb";
import { useState } from "react";

export default function NavBar() {
  const [isActive, setIsActive] = useState<number>(0);
  const toggleMenu = (id: number) => {
    setIsActive(id);
  };

  interface NavItem {
    id: number;
    name: string;
    icon: React.ReactNode;
  }

  const navItems = [
    {
      id: 0,
      name: "Home",
      icon: <RiHome5Fill size={22} />,
    },
    {
      id: 1,
      name: "Dashboard",
      icon: <RxDashboard size={22} />,
    },
    {
      id: 2,
      name: "Profile",
      icon: <HiOutlineUser size={22} />,
    },
    {
      id: 3,
      name: "Messages",
      icon: <LuMail size={22} />,
    },
    {
      id: 4,
      name: "Settings",
      icon: <TbSettings2 size={22} />,
    },
  ];
  return (
    <div className="absolute right-0 bg-[#ffffff] shadow-lg  w-fit rounded-full top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-5 p-2">
      {navItems.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => toggleMenu(item.id)}
            className={`w-[50px] h-[50px] ${
              isActive === item.id
                ? "bg-[#015B46]"
                : "bg-[#015B46]/10 hover:bg-[#015B46]/20"
            } rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
              isActive === item.id ? "text-[#FDF9F4]" : "text-[#015B46]"
            }`}
          >
            <div>{item.icon}</div>
          </div>
        );
      })}
    </div>
  );
}

{
  /* <div className="w-[50px] h-[50px] bg-[#015B46] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#015B46]/90 transition-all duration-300">
  <RiHome5Fill size={22} className="text-white" />
</div>; */
}

{
  /* <div className="w-[50px] h-[50px] bg-[#015B46]/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#015B46]/20 transition-all duration-300">
  <TbSettings2 size={22} className="text-[#015B46]" />
</div>; */
}
