"use client";

interface NavBarProps {
  navSection?: string;
  setNavSection?: (section: string) => void;
}

export default function NavBar({ navSection, setNavSection }: NavBarProps) {
  const navItems = [
    {
      name: "Home",
      icon: "M3 9.75L12 4l9 5.75V19a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 19V9.75z",
    },
    {
      name: "Dashboard",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z M7 7l5-5l5 5",
    },
    {
      name: "Orders",
      icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
    },
    {
      name: "Settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    },
  ];

  return (
    <nav className="mt-8 mb-6">
      <div className="flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              navSection === item.name
                ? "bg-[#015B46] text-white hover:bg-[#014a39]"
                : "text-[#13120F] hover:bg-gray-100"
            }`}
            onClick={() => setNavSection && setNavSection(item.name)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={item.icon}
              />
            </svg>
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
