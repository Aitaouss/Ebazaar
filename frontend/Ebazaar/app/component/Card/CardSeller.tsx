import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

interface ItemProps {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  name: string;
  reviews: number;
}

export default function Seller({
  id,
  title,
  description,
  location,
  category,
  name,
  reviews,
}: ItemProps) {
  return (
    <div className="w-[320px] sm:w-[340px] lg:w-[360px] rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col flex-shrink-0">
      {/* Image */}
      <div className="relative w-full h-[180px] sm:h-[200px] bg-gray-200 overflow-hidden">
        <img
          src="https://i.ibb.co/4n9cV1JG/background.jpg"
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-all duration-600"
        />
        <span className="absolute top-4 right-4 bg-gradient-to-r from-[#A44A3F] to-[#b55448] text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
          {category}
        </span>
        <div className="flex items-center gap-1 absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full shadow-md">
          <FaStar className="inline text-yellow-500" size={10} />
          <p className="text-[0.78rem]">{reviews}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-4 flex-1">
        {/* Seller Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://i.ibb.co/4n9cV1JG/background.jpg"
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <h1 className="font-semibold text-gray-800 text-sm sm:text-base">
              {name}
            </h1>
          </div>

          <div className="flex items-center gap-1 text-gray-500 text-[0.78rem] sm:text-sm">
            <FaMapMarkerAlt size={12} />
            <span>{location}</span>
          </div>
        </div>

        {/* Title + Description */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-lg font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-600 leading-snug line-clamp-3">
            {description}
          </p>
        </div>

        {/* Button */}
        <button
          className="cursor-pointer w-full py-2 rounded-xl mt-auto bg-gradient-to-r from-[#015B46] to-[#05775c] text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          onClick={() => {
            window.location.href = `/dashboard`;
          }}
        >
          View
        </button>
      </div>
    </div>
  );
}
