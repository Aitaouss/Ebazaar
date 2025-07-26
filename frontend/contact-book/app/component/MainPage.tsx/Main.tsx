import React, { useEffect, useState, useRef } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

export default function MainPage() {
  const [check, setCheck] = useState<string | null>(null);
  const [sizeLg, setSizeLg] = useState<number>(0);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const refcheck = useRef<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setSizeLg(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (refcheck.current) {
      refcheck.current = false;
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      console.log(
        `${token} Token not found, redirecting to login or register page`
      );

      if (check === "login") {
        window.location.href = "http://localhost:3000/login";
      } else if (check === "register") {
        window.location.href = "http://localhost:3000/register";
      }
    } else {
      console.log(`${token} Token found, redirecting to dashboard page`);
      window.location.href = "http://localhost:3000/dashboard";
    }
    return;
  }, [check]);
  return (
    <>
      {modalActive && sizeLg < 640 && (
        <div className="w-full h-full bg-[#13120F]/80 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="w-[80%] h-[300px] bg-[#FDF9F4] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-5 rounded-lg ">
            <div className="w-full h-full flex justify-end ">
              {/* <div
                onClick={() => setModalActive(false)}
                className="w-[30px] h-[30px] bg-[#015B46] rounded-sm flex items-center justify-center hover:bg-[#014b3c] transition-all duration-300 cursor-pointer"
              >
                <div>
                  <IoCloseSharp
                    size={12}
                    className="text-[#FDF9F4] hover:text-[#FDF9F4]/80 cursor-pointer"
                  />
                </div>
              </div> */}
            </div>
            <button className="w-[90px] h-[30px] bg-[#015B46] rounded-sm text-[#FDF9F4] text-sm">
              Login
            </button>
          </div>
          {/* modal content */}
        </div>
      )}

      <div className="relative min-h-screen w-full px-6 sm:px-10 lg:px-20 bg-overlay flex flex-col">
        <div className="w-full h-[100px]  flex items-center justify-between relative">
          <h1 className="font-bold text-2xl">eBazaar</h1>
          {sizeLg > 640 ? (
            <div className="items-center gap-4 flex">
              <button
                className="transition-all duration-300 bg-white text-[#015B46] px-10 sm:px-12 py-2 cursor-pointer font-semibold text-[0.8rem] sm:text-sm rounded border border-gray-200 shadow-sm hover:bg-gray-100"
                onClick={() => setCheck("login")}
              >
                Login
              </button>
              <button
                className="transition-all duration-300 bg-[#015B46] text-white px-10 sm:px-12 py-2 cursor-pointer font-semibold text-[0.8rem] sm:text-sm rounded shadow-sm hover:bg-[#014b3c]"
                onClick={() => setCheck("register")}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <button
              className="w-[40px] h-[30px] bg-[#015B46] rounded flex items-center justify-center cursor-pointer"
              onClick={() => setModalActive(true)}
            >
              <FaUserLarge size={10} color="#FDF9F4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between flex-1 h-full">
          {sizeLg > 1024 ? (
            <>
              <div className="w-[68%] pr-5 lg:pr-10">
                <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-[#13120F]">
                  Discover the Soul of Morocco One Product at a Time
                </h1>
                <p className="text-[#13120F] text-sm xl:text-current 2xl:text-xl mt-2">
                  Step into a vibrant digital souk where the rich tapestry of
                  Moroccan heritage comes alive — every product a reflection of
                  age-old craftsmanship, infused with cultural depth and
                  authenticity. From handwoven textiles and aromatic spices to
                  artisan-made treasures, each item is carefully curated to
                  bring the soul of Morocco to those who value tradition,
                  beauty, and meaningful storytelling
                </p>
                <div className="flex items-center gap-4 mt-6 justify-start">
                  <button
                    className="transition-all  duration-300 bg-[#015B46] text-white px-12 py-4 cursor-pointer font-semibold text-sm rounded shadow-sm hover:bg-[#014b3c] mt-4"
                    onClick={() => setCheck("register")}
                  >
                    Get Started
                  </button>
                  <button
                    className="transition-all duration-300 bg-white text-[#015B46] px-12 py-4 border border-gray-200 cursor-pointer font-semibold text-sm rounded shadow-sm hover:bg-[#f1f1f1] mt-4"
                    onClick={() => setCheck("register")}
                  >
                    Explore Categorie
                  </button>
                </div>
              </div>
              <div className="w-[400px] h-[80%] bg-[url('https://i.ibb.co/4n9cV1JG/background.jpg')] rounded-4xl"></div>
            </>
          ) : (
            <div className="w-full text-center">
              <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-[#13120F]">
                Discover the Soul of Morocco One Product at a Time
              </h1>
              <p className="text-[#13120F] text-[0.8rem] sm:text-sm xl:text-current 2xl:text-xl mt-4">
                Step into a vibrant digital souk where the rich tapestry of
                Moroccan heritage comes alive — every product a reflection of
                age-old craftsmanship, infused with cultural depth and
                authenticity. From handwoven textiles and aromatic spices to
                artisan-made treasures, each item is carefully curated to bring
                the soul of Morocco to those who value tradition, beauty, and
                meaningful storytelling
              </p>
              <div className="flex items-center gap-4 mt-6 justify-center">
                <button className="transition-all  duration-300 bg-[#015B46] text-white px-8 sm:px-12  py-3 sm:py-4 cursor-pointer font-semibold text-[0.8rem] sm:text-sm rounded shadow-sm hover:bg-[#014b3c] mt-4">
                  Get Started
                </button>
                <button className="transition-all duration-300 bg-white text-[#015B46] px-8 sm:px-12  py-3 sm:py-4 border border-gray-200 cursor-pointer font-semibold text-[0.8rem] sm:text-sm rounded shadow-sm hover:bg-[#f1f1f1] mt-4">
                  Explore Categorie
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
