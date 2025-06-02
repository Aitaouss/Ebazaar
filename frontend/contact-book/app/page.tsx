"use client";

import { useEffect, useState } from "react";
import RootLayout from "./layout";
import { FcGoogle } from "react-icons/fc";

export default function Home() {
  const [active, setActive] = useState<boolean>(false);
  const [isGoogle, setIsGoogle] = useState<boolean>(false);
  useEffect(() => {
    const sendReq = async () => {
      try {
        const res = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isGoogle: isGoogle,
          }),
        });
        if (!res.ok) {
          throw new Error("Error in fetching");
        }
      } catch (err) {
        console.error(err);
        return;
      }
    };
    sendReq();
  }, [active]);
  return (
    <RootLayout>
      <div className="w-[50%] h-[50%] px-3 flex flex-col items-center justify-center gap-6 bg-white/50 rounded-lg">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <input
              placeholder="Name"
              className="w-full bg-black/70 h-12 rounded-md p-3 outline-0"
            />
            <input
              placeholder="username"
              className="w-full bg-black/70 h-12 rounded-md p-3 outline-0"
            />
          </div>
          <div className="flex gap-3">
            <input
              placeholder="Email"
              className="w-full bg-black/70 h-12 rounded-md p-3 outline-0"
            />
            <input
              placeholder="Password"
              className="w-full bg-black/70 h-12 rounded-md p-3 outline-0"
            />
          </div>
          <div className="bg-[#1c1c1d] h-12 rounded-md flex items-center justify-center w-full px-6 cursor-pointer">
            <h1 className="text-[#F9F9F9] text-xl font-medium">Register</h1>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className="bg-[#F9F9F9] h-20 rounded-full flex items-center justify-between w-full px-6 cursor-pointer"
            onClick={() => {
              setIsGoogle(true);
              setActive(!active);
            }}
          >
            <h1 className="text-[#1c1c1d] text-xl font-medium">
              Continue with Google
            </h1>
            <FcGoogle size={24} />
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
