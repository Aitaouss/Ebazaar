import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface ItemInterface {
  id: number;
  title: string;
  description: string;
  location: string;
}

export default function Seller() {
  return (
    <div className="w-[270px] h-[330px] sm:w-[320px] sm:h-[380px] lg:w-[370px] lg:h-[430px] rounded-2xl bg-white shadow-md p-2 flex flex-col gap-3 flex-shrink-0">
      <div className="bg-[url(https://i.ibb.co/4n9cV1JG/background.jpg)] w-full h-[50%] rounded-t-2xl relative">
        <div className="flex items-center justify-center w-[30%] h-[25px] bg-[#A44A3F] absolute bottom-0 right-0 rounded-tl-lg">
          <h1 className="text-[#FDF9F4] text-sm">Spices</h1>
        </div>
      </div>
      <div className="rounded-full w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] overflow-hidden bg-cover bg-[url(https://i.ibb.co/4n9cV1JG/background.jpg)] flex-shrink-0"></div>
      <div className="">
        <h1 className="text-[0.93rem] sm:text-lg font-bold">
          Organic Turmeric Powder
        </h1>
        <p className="text-[0.7rem] sm:text-sm text-gray-600">
          Harvested from organically grown turmeric roots, this vibrant
          golden-yellow powder is renowned for its earthy flavor and powerful
          anti-inflammatory properties. Used traditionally in .
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <FaMapMarkerAlt color="#13120F" size={12} />
          <h1 className="text-[0.8rem] sm:text-sm">Casablanca, Morocco</h1>
        </div>
        <div>
          <button className="bg-[#015B46] text-white py-1 px-7 sm:px-10 sm:py-2 rounded mt-2">
            <h1 className="text-sm sm:text-base">View</h1>
          </button>
        </div>
      </div>
    </div>
  );
}
