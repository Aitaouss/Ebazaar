// App.jsx"
"use client";
import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const [check, setCheck] = useState<string | null>(null);
  const refcheck = useRef<boolean>(true);
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
    <div
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/featured/?store,shopping')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <nav className="flex justify-between items-center px-8 py-4 relative z-10">
        <h1 className="text-white text-2xl font-bold">StoreApp</h1>
        <div>
          <button
            className="text-white border border-white px-4 py-2 rounded-md mr-4 hover:bg-white hover:text-black transition cursor-pointer"
            onClick={() => {
              setCheck("login");
            }}
          >
            Login
          </button>

          <button
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition cursor-pointer"
            onClick={() => {
              setCheck("register");
            }}
          >
            Sign Up
          </button>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center h-full text-center relative z-10 text-white px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to StoreApp
        </h2>
        <p className="text-lg md:text-xl max-w-xl">
          Discover amazing products at unbeatable prices. Sign up and start
          shopping today!
        </p>
      </div>
    </div>
  );
}
