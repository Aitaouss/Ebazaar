"use client";

import { useUser } from "@/app/eb/layout";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  isOnline: boolean;
  picture: string | null;
  verified: boolean;
  username: string;
  phone: string | null;
  location: string;
  language: string;
  coverImage: string | null;
}

export default function ProfileComponent() {
  const user = useUser();
  if (!user) {
    return (
      <div className="w-full flex items-center justify-center h-full">
        <p className="text-gray-500">No user found.</p>
      </div>
    );
  }

  return (
    <div className=" flex flex-col items-center justify-center h-full p-10">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center border border-gray-200">
        {/* Cover Image */}
        {user.coverImage && (
          <img
            src={user.coverImage}
            alt="Cover"
            className="w-screen h-32 rounded-t-2xl object-cover mb-6"
          />
        )}

        {/* Profile Image */}
        <img
          src={user.picture || "/default-profile.png"}
          alt={`${user.name} profile`}
          className="w-24 h-24 mx-auto rounded-full mb-4 object-cover border-2 border-gray-300"
        />

        {/* Name and Username */}
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h1>
        <p className="text-gray-500 mb-2">@{user.username}</p>

        {/* Email */}
        <p className="text-gray-500 mb-2">{user.email}</p>

        {/* Role */}
        <p className="text-gray-500 mb-2">
          Role: <span className="font-medium text-gray-700">{user.role}</span>
        </p>

        {/* Verified */}
        <p className="text-gray-500 mb-2">
          Verified:{" "}
          <span className={user.verified ? "text-green-500" : "text-red-500"}>
            {user.verified ? "Yes" : "No"}
          </span>
        </p>

        {/* Online Status */}
        <p
          className={`mb-2 font-medium ${
            user.isOnline ? "text-green-500" : "text-red-500"
          }`}
        >
          {user.isOnline ? "Online" : "Offline"}
        </p>

        {/* Phone, Location, Language */}
        <p className="text-gray-500 mb-1">Phone: {user.phone || "N/A"}</p>
        <p className="text-gray-500 mb-1">Location: {user.location}</p>
        <p className="text-gray-500 mb-4">Language: {user.language}</p>

        <button className="cursor-pointer px-6 py-2 bg-[#A44A3F] text-white rounded-full shadow-md hover:scale-105 transition-transform duration-300">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
