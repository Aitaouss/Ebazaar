"use client";

import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Toaster, toast } from "react-hot-toast";
import LoadingSpinner from "../loading/page";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [LogFail, setLogFail] = useState<boolean>(false);
  const [isInLogIn, setIsInLogin] = useState<boolean>(true);

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Redirect to your backend Google auth endpoint
    window.location.href = "http://localhost:9000/auth/google";
  };

  // ✅ Check login status using cookies
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("http://localhost:9000/me", {
          method: "GET",
          credentials: "include", // 👈 include cookies
        });

        if (res.ok) {
          window.location.href = "/dashboard"; // already logged in
        } else {
          setLoading(false); // not logged in
        }
      } catch (err) {
        console.error("Error checking login:", err);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  // ✅ Submit login and rely on cookie for session
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:9000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 👈 important: include cookie
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 404) {
        toast.error("Password incorrect!");
        return;
      }

      const data = await res.json();
      if (!res.ok || data.success === false) {
        setLogFail(true);
        toast.error(data.message || "Login failed");
        return;
      }

      // No need to store token manually
      setLogFail(false);
      toast.success("Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login error:", err);
      setLogFail(true);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && (
        <div className="h-full w-full flex items-center justify-center ">
          <div className="relative flex-1 h-full flex flex-col items-center justify-center gap-12 bg-overlay">
            <h1 className="font-bold text-4xl text-[#13120F]">eBazzar</h1>
            <div className="flex items-center gap-16">
              <div className="flex flex-col items-center transition-all duration-300">
                <button
                  onClick={() => setIsInLogin(true)}
                  className={`font-bold ${
                    isInLogIn ? "text-[#13120F]" : "text-[#13120F] opacity-50"
                  }  cursor-pointer text-xl transition-all duration-300`}
                >
                  Log in
                </button>
                {isInLogIn && (
                  <div className="w-6 h-1 rounded-full bg-[#015B46] transition-all duration-300"></div>
                )}
              </div>
              <div className="flex flex-col items-center transition-all duration-300">
                <button
                  onClick={() => setIsInLogin(false)}
                  className={`font-bold ${
                    !isInLogIn ? "text-[#13120F]" : "text-[#13120F] opacity-50"
                  } cursor-pointer text-xl transition-all duration-300`}
                >
                  Sign Up
                </button>
                {!isInLogIn && (
                  <div className="w-6 h-1 rounded-full bg-[#015B46] transition-all duration-300"></div>
                )}
              </div>
            </div>
            {isInLogIn && (
              <form className="w-[420px]">
                <div className="text-[#13120F] mb-4">
                  <label className="block font-semibold text-[#13120F] mb-1">
                    Email Adress
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full  px-2 h-[45px] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#015B46] bg-white"
                    placeholder="Enter your email address ..."
                  />
                </div>
                <div className="text-[#13120F] mb-4">
                  <label className="block font-semibold text-[#13120F] mb-1">
                    Password
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full h-[45px] px-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#015B46] bg-white"
                    placeholder="Enter your email address ..."
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        className="mr-2 cursor-pointer"
                      />
                      <label htmlFor="rememberMe" className="text-sm">
                        Remember me
                      </label>
                    </div>
                    <h1 className="text-sm font-semibold">Forgot password?</h1>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-[#015B46] text-white text-sm cursor-pointer mb-4 font-semibold h-[45px] px-4 rounded hover:bg-[#013f3a] transition-colors duration-300"
                >
                  Log in
                </button>
                <div className="w-full">
                  <div className="w-full flex items-center justify-center gap-2 mb-4">
                    <div className="h-[1px] w-full bg-black/10 rounded-full"></div>
                    <h1 className="font-bold">Or</h1>
                    <div className="h-[1px] w-full bg-black/10 rounded-full"></div>
                  </div>
                  <button
                    type="button"
                    className="w-full bg-white h-[45px] border border-gray-300 rounded font-bold cursor-pointer"
                    onClick={handleGoogleLogin}
                  >
                    <FcGoogle className="inline-block mr-2" size={25} />
                    Continue with Google{" "}
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="h-full w-[40%] bg-[url('https://i.ibb.co/fdZBFRtF/Bazaaro.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
            {/* content */}
          </div>
        </div>
      )}
    </>
  );
}

// https://i.ibb.co/CKR4RHsW/ZELIJ.png
// https://i.ibb.co/fdZBFRtF/Bazaaro.jpg
