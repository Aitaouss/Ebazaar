"use client";

import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { HiMail } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import { FaFilter } from "react-icons/fa6";
import NavBar from "../NavBar/NavBar";

import { User, userProducts, LanguagesInterface } from "../../types/types";

export default function LayoutComp({
  setChatModalOpen,
}: {
  setChatModalOpen: (open: boolean) => void;
}) {
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [userProucts, setUserProducts] = useState<userProducts[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [isBetaUser, setIsBetaUser] = useState(false);

  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [language, setLanguage] = useState("EN");

  const languages: LanguagesInterface[] = [
    { code: "EN", name: "English", country_code: "gb" },
    { code: "FR", name: "French", country_code: "fr" },
    { code: "DE", name: "German", country_code: "de" },
    { code: "ES", name: "Spanish", country_code: "es" },
    { code: "IT", name: "Italian", country_code: "it" },
  ];
  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    if (email === "beta@gmail.com" && password === "beta123") {
      setIsBetaUser(true);
      setUserData({
        id: 0,
        name: "Beta Tester",
        email: "beta@gmail.com",
        role: "Beta",
        picture: null,
      });
      setUserProducts([
        {
          id: 1,
          name: "Sample Product 1",
          owner: "Beta Tester",
          title: "Amazing Gadget",
          imageUrl:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
          content: "This is an amazing gadget that you will love!",
          price: 49.99,
        },
        {
          id: 2,
          name: "Sample Product 2",
          owner: "Beta Tester",
          title: "Incredible Widget",
          imageUrl:
            "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
          content: "An incredible widget that makes life easier.",
          price: 29.99,
        },
        {
          id: 3,
          name: "Sample Product 3",
          owner: "Beta Tester",
          title: "Fantastic Device",
          imageUrl:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
          content: "A fantastic device for all your needs.",
          price: null,
        },
      ]);
      console.log("Beta user logged in");
      setLoading(false);
      return;
    }
    if (!isBetaUser) {
      const fetchUserData = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/me`, {
            method: "GET",
            credentials: "include",
          });
          if (!res.ok) {
            window.location.href = "/login";
            return;
          }

          const data = await res.json();
          if (data?.user) {
            setUserData(data.user); // ✅ set user data
          } else {
            console.error("Invalid response structure", data);
            window.location.href = "/login";
          }
          if (data?.products) {
            setUserProducts(data.products); // ✅ set user data
          }
          setLoading(false); // ✅ set loading to false after data is fetched
        } catch (err) {
          console.error("Fetch error:", err);
          window.location.href = "/login";
        }
      };

      fetchUserData();
    }
  }, []);

  const logoutFunction = async () => {
    if (isBetaUser) {
      toast.success("Beta user logged out");
      setUserData(undefined);
      setUserProducts(undefined);
      setIsBetaUser(false);
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      window.location.href = "/login";
      return;
    }
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
      <header className="flex items-center justify-between gap-16">
        <h1 className="font-bold text-2xl text-[#13120F]">eBazaar</h1>
        <div className="flex items-center bg-[#fff] h-[50px] rounded-xl shadow-lg px-4 w-full">
          <RiSearchLine size={20} className="text-gray-800 mr-2" />
          <input
            type="text"
            className="flex-1 bg-transparent outline-none"
            placeholder="items to search ..."
          />
          <FaFilter size={16} className="text-[#13120F] ml-2 cursor-pointer" />
        </div>
        <div className="flex items-center gap-3  rounded-3xl">
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
                <h1 className="text-white font-semibold">Logout</h1>
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4  rounded-3xl">
          <div
            className={`w-16 h-16 rounded-full bg-cover border-2 border-[#015B46] shadow`}
          >
            {userData?.picture ? (
              <img
                src={userData?.picture}
                alt="Profile"
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
          <div className="flex flex-col">
            <h1 className="font-bold text-xl">{userData?.name}</h1>
            <div className="flex items-center gap-2">
              <h1 className="text-sm">@aimenTaoussi</h1>
              <div className="py-1 bg-[#A44A3F]/70 text-[#FDF9F4] rounded-full text-xs px-4">
                {userData?.role}
              </div>
            </div>
          </div>
        </div>
      </header>
      <NavBar />
    </div>
  );
}
