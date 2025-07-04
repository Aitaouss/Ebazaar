"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "../loading/page";

export default function Profile() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:9000/me", {
          method: "GET",
          credentials: "include", // ✅ Correct: Send cookies

          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          window.location.href = "/login"; // Redirect if not authenticated
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        if (data.user) {
          setUserData(data.user);
        } else {
          console.error("Invalid response structure", data);
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  console.log("User data:", userData);
  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="p-4 flex items-center justify-center flex-col w-full">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {userData && (
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex items-center justify-center flex-col">
            <h2 className="text-2xl font-semibold mb-2 text-black">
              User Information
            </h2>
            <img
              src={userData.picture || "/default-profile.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 border shadow-sm"
            />
            <p className="mb-2 text-black font-medium"> {userData.username}</p>
            <p className="mb-2 text-black font-medium">{userData.email}</p>
            <div className="">
              <div className="border border-black mb-2 text-black flex items-center justify-center px-12 p-2 rounded-lg">
                <p className="">{userData.role || "default"}</p>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <button
                  className="bg-black text-white px-12 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 cursor-pointer mb-2"
                  onClick={() => {
                    window.location.href = "/dashboard";
                  }}
                >
                  Go home
                </button>
                <button
                  // onClick={handleLogout}
                  className="text-sm font-medium hover:bg-red-400 cursor-pointer bg-red-500 text-white px-12 py-3 rounded-full transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
