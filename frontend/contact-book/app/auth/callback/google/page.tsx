"use client";

import LoadingSpinner from "@/app/loading/page";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function GoogleAuth() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    const start = async () => {
      try {
        const response = await fetch(
          "http://localhost:9000/auth/google/callback",
          {
            method: "POST",
            credentials: "include", // ✅ sends and receives cookies
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          }
        );

        if (!response.ok) {
          console.error("❌ Google callback failed");
          return;
        }

        // Optionally log the response message
        const res = await response.json();
        toast.success("Login successful with google!");
        console.log("✅ Google login success:", res.message);

        // ✅ No need for localStorage when using cookies
        window.location.href = "/dashboard";
      } catch (err) {
        console.error("Google auth error:", err);
      }
    };

    start();
  }, []);

  return (
    <div className="h-full w-full bg-black flex items-center justify-center">
      <LoadingSpinner />
      <Toaster position="top-right" />
    </div>
  );
}
