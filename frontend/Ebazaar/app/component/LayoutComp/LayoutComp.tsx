"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { HiMail } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import { FaFilter } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import NavBar from "../NavBar/NavBar";
import { MdOutlineLogout } from "react-icons/md";

import { User, userProducts, LanguagesInterface } from "../../types/types";
import { useUser } from "@/app/eb/layout";
import Image from "next/image";
import { BsList } from "react-icons/bs";

export default function LayoutComp({
  setChatModalOpen,
}: {
  setChatModalOpen: (open: boolean) => void;
}) {
  const userData = useUser();

  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [windowSize, setWindowSize] = useState<number>(0);

  useEffect(() => {
    // Function to update window size
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    // Initial size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const languages: LanguagesInterface[] = [
    { code: "EN", name: "English", country_code: "gb" },
    { code: "FR", name: "French", country_code: "fr" },
    { code: "DE", name: "German", country_code: "de" },
    { code: "ES", name: "Spanish", country_code: "es" },
    { code: "IT", name: "Italian", country_code: "it" },
  ];

  const logoutFunction = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      console.log("Logout response:", res);
      if (res.ok) {
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="relative flex flex-col w-full">
      <header className="flex items-center justify-between gap-5 sm:gap-16">
        <h1 className="font-bold hidden sm:block text-2xl text-[#13120F]">
          eBazaar
        </h1>
        <div className="flex items-center bg-[#fff] h-[50px] rounded-xl shadow-lg px-4 w-full">
          <RiSearchLine size={20} className="text-gray-800 mr-2" />
          <input
            type="text"
            className=" flex-1 bg-transparent outline-none"
            placeholder="items to search ..."
          />
          <FaFilter size={16} className="text-[#13120F] ml-2 cursor-pointer" />
        </div>
        <div
          className="p-2 flex lg:hidden items-center gap-4 bg-[#015B46] rounded cursor-pointer"
          onClick={() => setMobileMenuOpen(true)}
        >
          <BsList size={20} className="cursor-pointer lg:hidden text-white" />
        </div>
        <div className="hidden lg:flex items-center gap-3  rounded-3xl">
          <button className="cursor-pointer">
            <IoNotifications size={27} className="text-[#015B46]" />
          </button>
          <button
            className="cursor-pointer relative flex items-center justify-center"
            onClick={() => setChatModalOpen(true)}
          >
            <HiMail size={27} className="text-[#015B46] ml-4" />
          </button>
          <div className="flex items-center cursor-pointer ml-4 relative justify-center">
            <div
              className="flex items-center"
              onClick={() => setLanguageModalOpen(!languageModalOpen)}
            >
              <h1 className="text-lg font-bold">{language}</h1>
              {languageModalOpen ? (
                <IoIosArrowUp size={16} className="inline-block ml-1" />
              ) : (
                <IoIosArrowDown size={16} className="inline-block ml-1" />
              )}
              {languageModalOpen && (
                <div className="w-[80px] bg-white absolute -bottom-45 rounded-2xl shadow-xl">
                  {languages.map((lang) => (
                    <div
                      key={lang.code}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-2xl cursor-pointer"
                      onClick={() => {
                        setLanguage(lang.code);
                        setLanguageModalOpen(false);
                      }}
                    >
                      <img
                        src={`https://flagcdn.com/w20/${lang.country_code}.png`}
                        alt={lang.name}
                        className="w-5 h-auto rounded-sm"
                      />
                      <h1 className="text-sm">{lang.code}</h1>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 ml-4">
              {userData?.role === "admin" && (
                <button
                  className="py-1 px-2 bg-[#015B46] rounded-lg shadow-lg cursor-pointer text-white"
                  onClick={() => {
                    window.location.href = "/admin/pannel";
                  }}
                >
                  Pannel
                </button>
              )}
              <button
                className="py-1 px-2 bg-red-800 rounded-lg shadow-lg cursor-pointer"
                onClick={() => {
                  logoutFunction();
                }}
              >
                <MdOutlineLogout size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-4  rounded-3xl">
          <div
            className={`w-16 h-16 rounded-full bg-cover border-2 border-[#015B46] shadow`}
          >
            {userData?.picture ? (
              <Image
                src={userData.picture}
                alt="Profile"
                width={64}
                height={64}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-cover flex items-center justify-center bg-[#015B46]">
                <h1 className="text-white font-semibold text-xl">
                  {userData?.name[0].toUpperCase()}
                </h1>
              </div>
            )}
          </div>
          {/* <div className="flex-col">
            <h1 className="font-bold text-xl">{userData?.name}</h1>
            <div className="flex items-center gap-2">
              <h1 className="text-sm">@{userData?.username}</h1>
              <div className="py-1 bg-[#A44A3F] text-[#FDF9F4] rounded-full text-xs px-4">
                {userData?.role}
              </div>
            </div>
          </div> */}
        </div>
      </header>

      {/* Mobile Menu Modal */}
      {mobileMenuOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] lg:hidden">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-[10000]">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-[#13120F]">Menu</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <FaTimes size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="flex flex-col p-4 space-y-2">
                {/* User Profile Section */}
                <div className="flex items-center gap-3 p-3 border-b border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-cover border-2 border-[#015B46] shadow">
                    {userData?.picture ? (
                      <Image
                        src={userData.picture}
                        alt="Profile"
                        width={48}
                        height={48}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-cover flex items-center justify-center bg-[#015B46]">
                        <h1 className="text-white font-semibold text-sm">
                          {userData?.name?.[0]?.toUpperCase()}
                        </h1>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {userData?.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      @{userData?.username}
                    </p>
                  </div>
                </div>

                {/* Notifications */}
                <button className="cursor-pointer flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors w-full">
                  <IoNotifications size={24} className="text-[#015B46]" />
                  <span className="text-gray-800 font-medium">
                    Notifications
                  </span>
                </button>

                {/* Messages */}
                <button
                  className="cursor-pointer flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors w-full"
                  onClick={() => {
                    setChatModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <HiMail size={24} className="text-[#015B46]" />
                  <span className="text-gray-800 font-medium">Messages</span>
                </button>

                {/* Language Selector */}
                <div className="relative">
                  <button
                    className=" cursor-pointer flex items-center justify-between gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors w-full"
                    onClick={() => setLanguageModalOpen(!languageModalOpen)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://flagcdn.com/w20/${
                          languages.find((l) => l.code === language)
                            ?.country_code
                        }.png`}
                        alt="Language"
                        className="w-6 h-auto rounded-sm"
                      />
                      <span className="text-gray-800 font-medium">
                        Language ({language})
                      </span>
                    </div>
                    {languageModalOpen ? (
                      <IoIosArrowUp size={16} className="text-gray-600" />
                    ) : (
                      <IoIosArrowDown size={16} className="text-gray-600" />
                    )}
                  </button>

                  {languageModalOpen && (
                    <div className="mt-2 ml-6 space-y-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className=" flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer w-full"
                          onClick={() => {
                            setLanguage(lang.code);
                            setLanguageModalOpen(false);
                          }}
                        >
                          <img
                            src={`https://flagcdn.com/w20/${lang.country_code}.png`}
                            alt={lang.name}
                            className="w-5 h-auto rounded-sm"
                          />
                          <span className="text-sm text-gray-700">
                            {lang.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Admin Panel */}
                {userData?.role === "admin" && (
                  <button
                    className="cursor-pointer flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors w-full"
                    onClick={() => {
                      window.location.href = "/admin/pannel";
                    }}
                  >
                    <div className="w-6 h-6 bg-[#015B46] rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                    <span className="text-gray-800 font-medium">
                      Admin Panel
                    </span>
                  </button>
                )}

                {/* Logout */}
                <button
                  className="cursor-pointer flex items-center gap-3 p-3 hover:bg-red-50 text-red-600 rounded-lg transition-colors w-full mt-4"
                  onClick={() => {
                    logoutFunction();
                    setMobileMenuOpen(false);
                  }}
                >
                  <MdOutlineLogout size={24} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      <NavBar />
    </div>
  );
}
