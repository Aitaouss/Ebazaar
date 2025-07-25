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
    <div className="w-[370px] h-[430px] rounded-2xl bg-white shadow-lg p-2 flex flex-col gap-3 flex-shrink-0">
      {/* <Image
        src="/public/Background.jpg"
        alt="Seller Image"
        width={370}
        height={430}
        className="rounded-t-2xl object-cover"
      /> */}
      <div className="bg-[url(https://i.ibb.co/4n9cV1JG/background.jpg)] w-full h-[50%] rounded-t-2xl relative">
        <div className="flex items-center justify-center w-[30%] h-[25px] bg-[#A44A3F] absolute bottom-0 right-0 rounded-tl-lg">
          <h1 className="text-[#FDF9F4] text-sm">Spices</h1>
        </div>
      </div>
      <div className="rounded-full w-[40px] h-[40px] overflow-hidden bg-cover bg-[url(https://i.ibb.co/4n9cV1JG/background.jpg)]"></div>
      <div className="">
        <h1 className="text-lg font-bold">Organic Turmeric Powder</h1>
        <p className="text-sm text-gray-600">
          Harvested from organically grown turmeric roots, this vibrant
          golden-yellow powder is renowned for its earthy flavor and powerful
          anti-inflammatory properties. Used traditionally in .
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <FaMapMarkerAlt color="#13120F" size={12} />
          <h1 className="text-sm">Casablanca, Morocco</h1>
        </div>
        <div>
          <button className="bg-[#015B46] text-white px-10 py-2 rounded mt-2">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
