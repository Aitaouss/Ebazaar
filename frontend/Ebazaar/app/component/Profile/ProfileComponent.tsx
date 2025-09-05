"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  isOnline: boolean;
  picture: string | null;
}

export default function ProfileComponent() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/me`, {
          method: "GET",
          credentials: "include", // include cookies
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full flex items-center justify-center h-full">
        <p className="text-gray-500">No user found.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center h-full p-10">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center border border-gray-200">
        {/* Profile Image */}
        <img
          src={user.picture || "/default-profile.png"}
          alt={`${user.name} profile`}
          className="w-24 h-24 mx-auto rounded-full mb-6 object-cover border-2 border-gray-300"
        />

        {/* Name */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h1>

        {/* Email */}
        <p className="text-gray-500 mb-2">{user.email}</p>

        {/* Role */}
        <p className="text-gray-500 mb-2">
          Role: <span className="font-medium text-gray-700">{user.role}</span>
        </p>

        {/* Online Status */}
        <p
          className={`mb-6 font-medium ${
            user.isOnline ? "text-green-500" : "text-red-500"
          }`}
        >
          {user.isOnline ? "Online" : "Offline"}
        </p>

        <button className="cursor-pointer px-6 py-2 bg-[#A44A3F] text-white rounded-full shadow-md hover:scale-105 transition-transform duration-300">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
