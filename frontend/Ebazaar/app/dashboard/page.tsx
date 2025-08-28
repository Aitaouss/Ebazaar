"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "../loading/page";
import toast from "react-hot-toast";
import { HiMail } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import { FaFilter } from "react-icons/fa6";
import NavBar from "../component/NavBar/NavBar";
import { IoLogOut } from "react-icons/io5";
import HomeNav from "../component/navComponents/HomeNav";

export default function EbazaarDashboard() {
  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }

  interface userProducts {
    id: number;
    name: string;
    owner: string;
    title: string;
    imageUrl: string | null;
    content: string;
    price: number | null;
  }
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [userProucts, setUserProducts] = useState<userProducts[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [isBetaUser, setIsBetaUser] = useState(false);

  const [naveSection, setNavSection] = useState<string>("Home");

  useEffect(() => {
    console.log("Fetching user data...");
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    if (email === "beta@gmail.com" && password === "beta123") {
      setIsBetaUser(true);
      setUserData({
        id: 0,
        name: "Beta Tester",
        email: "beta@gmail.com",
        role: "Beta",
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
          const res = await fetch("http://localhost:9000/me", {
            method: "GET",
            credentials: "include",
          });
          console.log("response:", res);
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
      const res = await fetch("http://localhost:9000/logout", {
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
  console.log("userData:", userData);
  console.log("userProduct:", userProucts);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      {/* <div className="fixed top-0 left-0 w-full bg-[#FDF9F4] z-50 p-6 shadow-md"></div> */}
      <div className=" cursor-pointer fixed z-10 bg-[#fff] rounded-full p-2 bottom-10 right-10 shadow-lg border border-[#A44A3F]/20 hover:scale-110 transition-transform duration-300">
        <IoLogOut
          size={50}
          className="text-[#A44A3F]  "
          onClick={logoutFunction}
        />
      </div>
      <div className="relative bg-[#FDF9F4] bg-overlay flex flex-col w-full h-full p-10">
        <header className="flex items-center justify-between gap-16">
          <h1 className="font-bold text-2xl text-[#13120F]">eBazaar</h1>
          <div className="flex items-center bg-[#FDF9F4] h-[50px] rounded-full shadow-lg px-4 w-full">
            <RiSearchLine size={20} className="text-gray-800 mr-2" />
            <input
              type="text"
              className="flex-1 bg-transparent outline-none"
              placeholder="items to search ..."
            />
            <FaFilter
              size={16}
              className="text-[#13120F] ml-2 cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-3  rounded-3xl">
            <button className="cursor-pointer">
              <IoNotifications size={27} className="text-[#015B46]" />
            </button>
            <button className="cursor-pointer">
              <HiMail size={27} className="text-[#015B46] ml-4" />
            </button>
            <div className="flex items-center cursor-pointer ml-4">
              <h1 className="text-lg font-bold">EN</h1>
              <IoIosArrowDown size={16} className="inline-block ml-1" />
            </div>
          </div>
          <div className="flex items-center gap-4  rounded-3xl">
            <div className="w-16 h-16 bg-[url('https://i.ibb.co/p6HDtfsk/me-real.jpg')] rounded-full bg-cover"></div>
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
        <NavBar navSection={naveSection} setNavSection={setNavSection} />
        {/* <NavBar /> */}
        {/* Main dashboard body content */}
        {naveSection === "Home" && <HomeNav />}
        {naveSection === "Dashboard" && <div>Dashboard Section</div>}
        {naveSection === "Orders" && <div>Orders Section</div>}
        {naveSection === "Messages" && <div>Messages Section</div>}
        {naveSection === "Settings" && <div>Settings Section</div>}
      </div>
    </>
  );
}
