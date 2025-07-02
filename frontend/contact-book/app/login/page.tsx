"use client";

import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { start } from "repl";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [LogFail, setLogFail] = useState<boolean>(false);
  useEffect(() => {
    try {
      setLogFail(false);
      const start = async () => {
        const token = localStorage.getItem("token");
        if (token) {
          window.location.href = "/dashboard";
        }
      };
      start();
    } catch (err) {
      console.error(err);
    }
  });
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:9000/auth/google";
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (data.success) {
      setLogFail(false);
      window.location.href = "/dashboard";
      console.log("Login successful");
    } else {
      setLogFail(true);
      console.error("Login failed");
    }
    console.log("Data token : ", data.token);
    localStorage.setItem("token", data.token);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black w-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black py-2 rounded hover:bg-white transition duration-200 disabled:opacity-50 text-white hover:text-black hover:border-black border-2 text-lg font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {LogFail && (
            <p className="text-red-500 text-sm mt-2">
              Login failed. Please check your credentials.
            </p>
          )}
        </form>
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full  flex items-center justify-between px-12  bg-black py-2 rounded hover:bg-white transition duration-200 disabled:opacity-50 text-white hover:text-black hover:border-black border-2 text-lg font-semibold"
        >
          <FcGoogle size={30} />
          {loading ? "Logging in..." : "Login with google"}
        </button>
      </div>
    </div>
  );
}
