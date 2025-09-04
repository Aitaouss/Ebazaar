"use client";

import { userInfo } from "os";
import { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useUser } from "@/app/home/layout";

export default function DashboardNav() {
  const [becomeSeller, setBecomeSeller] = useState<boolean>(false);
  const user = useUser();
  // make me a ref for i check the current
  const becomeSellerRef = useRef<boolean>(becomeSeller);

  useEffect(() => {
    if (becomeSellerRef.current === becomeSeller) return;
    try {
      const start = async () => {
        const res = await fetch("http://localhost:9000/become-seller", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({}),
        });
        let dataError;
        await res.json().then((data) => (dataError = data.error));
        if (!res.ok) {
          if (dataError == "Already a seller") {
            toast.error("You are already a seller.");
            return;
          }
          console.error("Become seller response not ok:", res.statusText);
          toast.error("Failed to become a seller. Please try again.");
          return;
        }
        toast.success(`${user?.name} is now a seller!`);
      };
      start();
    } catch (err) {
      console.error(err);
    }
  }, [becomeSeller]);
  const handleBecomeSeller = () => {
    setBecomeSeller(!becomeSeller);
  };
  return (
    <div className="w-full flex flex-col items-center justify-center h-full p-10">
      <Toaster position="top-right" />
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center border border-gray-200">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Dashboard Section
        </h1>
        <p className="text-gray-500 mb-6">
          Your Dashboard details will appear here soon. We’re working on giving
          you a personalized dashboard.
        </p>
        <button
          className="px-6 py-2 bg-[#A44A3F] text-white rounded-full shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={handleBecomeSeller}
        >
          Become seller 🚀
        </button>
        {/* <button className="px-6 py-2 bg-[#A44A3F] text-white rounded-full shadow-md hover:scale-105 transition-transform duration-300">
          Coming Soon 🚀
        </button> */}
      </div>
    </div>
  );
}
