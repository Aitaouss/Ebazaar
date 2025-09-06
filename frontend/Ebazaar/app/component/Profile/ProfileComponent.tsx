"use client";

import { useUser } from "@/app/eb/layout";
import Image from "next/image";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaStar,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

export default function ProfileComponent() {
  const user = useUser();
  // Dummy data for products and reviews
  const products = [
    {
      id: 1,
      title: "Hand-Painted Ceramics",
      category: "Ceramics & Pottery",
      location: "Morocco, Casablanca",
      price: "120.99$",
      image: "https://i.ibb.co/VfPyNyS/hand-painted-ceramic.jpg",
    },
    {
      id: 2,
      title: "Hand-Painted Ceramics",
      category: "Ceramics & Pottery",
      location: "Morocco, Casablanca",
      price: "120.99$",
      image: "https://i.ibb.co/VfPyNyS/hand-painted-ceramic.jpg",
    },
    {
      id: 3,
      title: "Hand-Painted Ceramics",
      category: "Ceramics & Pottery",
      location: "Morocco, Casablanca",
      price: "120.99$",
      image: "https://i.ibb.co/VfPyNyS/hand-painted-ceramic.jpg",
    },
  ];
  return (
    <div className="h-full flex flex-col md:flex-row gap-6 w-full bg-[#faf8f6]">
      {/* Left Column: Profile Card & Reviews */}
      <div className="flex flex-col gap-4 w-full max-w-xs pt-6">
        {/* Profile Card */}
        <div className="bg-white bg-overlay rounded-4xl shadow relative flex flex-col items-center border border-gray-200 overflow-hidden pb-6">
          {/* Cover Image */}
          <div className="w-full h-28 md:h-32 bg-gray-200 relative">
            <Image
              src="/Background.jpg"
              alt="cover"
              fill
              className="object-cover w-full h-full rounded-t-2xl"
            />
          </div>
          {/* Profile Image & Edit Button */}
          <div className="relative w-full flex justify-center">
            <div className="absolute -top-12 flex flex-col items-center w-full">
              <div className="w-24 h-24 rounded-full border-2 border-white shadow relative">
                <Image
                  src={user?.picture || "/default-profile.png"}
                  alt="profile"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full rounded-full"
                />
                <div>
                  <MdVerified className="text-[#015B46] text-lg absolute bottom-2 right-0 bg-white rounded-full" />
                </div>
              </div>
            </div>
            <button className="cursor-pointer absolute right-2 top-2 px-3 py-1 text-xs bg-[#015B46] text-white rounded font-semibold hover:bg-[#013f3a] transition-colors z-10">
              Edit profile
            </button>
          </div>
          {/* Name, Username, Admin Badge */}
          <div className="flex flex-col items-center gap-2 justify-center mt-16">
            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-800">{user?.name}</h1>
              <h1 className="text-gray-500 text-sm">@{user?.username}</h1>
            </div>
            <span className="bg-[#A44A3F] text-white text-xs px-7 py-0.5 rounded-full font-semibold mb-2">
              {user?.role}
            </span>
          </div>
          {/* Personal Infos Section */}
          <div className="w-full mt-2 px-6">
            <div className="w-full mb-2">
              <h2 className="font-bold text-gray-700 text-lg mb-1 flex items-center gap-2">
                Personal Infos
              </h2>
              <div className="h-[2px] w-8 bg-[#015B46] rounded-full mb-2"></div>
            </div>
            <div className="text-gray-600 text-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#13120F]">
                <FaEnvelope className="text-base text-[#13120F]" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[#13120F]">
                <FaPhoneAlt className="text-base text-[#13120F]" />
                <span>{user?.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[#13120F]">
                <FaMapMarkerAlt className="text-base text-[#13120F]" />
                <span>{user?.location}</span>
              </div>
              <div className="flex items-center gap-2 text-[#13120F]">
                <FaGlobe className="text-base text-[#13120F]" />
                <span>{user?.language}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Buyer Reviews Card */}
        <div className="bg-white rounded-4xl shadow p-6 border border-gray-200">
          <h2 className="text-base font-semibold text-gray-700 mb-2">
            Buyer Reviews
          </h2>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-gray-800">4.0</span>
            <div className="flex gap-0.5">
              {[...Array(4)].map((_, i) => (
                <FaStar key={i} className="text-[#015B46] text-lg" />
              ))}
              <FaStar className="text-gray-300 text-lg" />
            </div>
            <span className="text-xs text-gray-500 ml-1">
              based on 123 reviews
            </span>
          </div>
          <div className="w-full mt-2 space-y-1">
            {[5, 4, 3, 2, 1].map((star, idx) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-gray-600 w-4">{star}</span>
                <FaStar className="text-[#015B46] text-xs" />
                <div className="flex-1 h-2 bg-gray-200 rounded">
                  <div
                    className={`h-2 rounded bg-[#015B46]`}
                    style={{ width: ["70%", "21%", "5%", "2%", "2%"][idx] }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">
                  {[70, 21, 5, 2, 2][idx]}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right Column: Store Cover, Description, Products */}
      <div className="flex-1 flex flex-col gap-6 pt-6 overflow-auto">
        {/* Store Cover & Description */}
        <div className="bg-white rounded-4xl shadow border border-gray-200 mb-2">
          <div className="w-full h-48 rounded-t-2xl overflow-hidden relative">
            <Image
              src="/Background.jpg"
              alt="Store Cover"
              width={900}
              height={144}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-col p-6 gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">
                Aimen Taoussi Bazaar
              </h1>
              <button className="px-4 py-1 bg-[#015B46] text-white rounded font-semibold hover:bg-[#013f3a] transition-colors">
                Edit Store
              </button>
            </div>
            <p className="text-gray-600 text-lg">
              Aimen Taoussi Bazaar offers a curated mix of handcrafted Moroccan
              goods and modern lifestyle products. From traditional décor and
              handmade accessories to everyday essentials, every item is chosen
              with quality and authenticity in mind
            </p>
          </div>
        </div>
        {/* Products Section */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200 flex-1 flex flex-col gap-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-800">Products</h2>
            <button className="px-4 py-1 bg-[#015B46] text-white rounded font-semibold hover:bg-[#013f3a] transition-colors">
              Create product
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow p-4 border border-gray-200 flex flex-col"
              >
                <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#A44A3F] text-white text-xs px-2 py-0.5 rounded font-semibold">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#13120F] mb-1">
                  {product.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                  <FaMapMarkerAlt className="text-base" />
                  <span>{product.location}</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-full bg-gray-200 rounded text-center py-1">
                    <span className="text-lg font-bold text-[#13120F] ">
                      {product.price}
                    </span>
                  </div>
                  <button className="w-full py-1 text-lg bg-[#015B46] text-white rounded font-semibold hover:bg-[#013f3a] transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
