"use client";

import LoadingSpinner from "@/app/component/loading/page";
import { Clock } from "lucide-react";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
function LoadinGoogle() {
  return (
    <div className="h-full w-full bg-black flex items-center justify-center">
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50 ">
        <div className="flex items-center gap-4 text-gray-700 animate-bounce">
          <Clock className="animate-spin h-8 w-8" color="#015B46" />
          <span className="text-xl font-semibold ">Google Auth Loading...</span>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
export default function GoogleAuth() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    console.log("Google auth code:", code);
    if (!code) return;

    const start = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/callback`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          }
        );

        if (!response.ok) {
          console.error(
            "Google callback response not ok:",
            response.statusText,
            response.status
          );
          console.error("❌ Google callback failed");
          return;
        }

        // Optionally log the response message
        const res = await response.json();
        toast.success("Login successful with google!");
        console.log("✅ Google login success:", res.message);

        // ✅ No need for localStorage when using cookies
        window.location.href = "/eb";
      } catch (err) {
        console.error("Google auth error:", err);
      }
    };

    start();
  }, []);

  return (
    <div className="h-full w-full bg-black flex items-center justify-center">
      <LoadinGoogle />
      <Toaster position="top-right" />
    </div>
  );
}
