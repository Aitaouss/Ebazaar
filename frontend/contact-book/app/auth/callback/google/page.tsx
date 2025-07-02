"use client";

import { useEffect } from "react";

export default function GoogleAuth() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    const start = async () => {
      try {
        console.log("fetchiiiing ......");
        const response = await fetch(
          "http://localhost:9000/auth/google/callback",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          }
        );

        if (!response.ok) {
          console.error("Error in fetching Google callback");
          return;
        }

        const res = await response.json();
        const token = res.token;
        console.log("token:", token);

        localStorage.setItem("token", token);
        console.log("token set in localStorage");
        window.location.href = "/dashboard";
      } catch (err) {
        console.error("Google auth error:", err);
      }
    };

    start();
  }, []);

  return (
    <div className="h-full w-full bg-black flex items-center justify-center">
      <h1 className="text-white text-4xl">Hello from Google auth</h1>
    </div>
  );
}
