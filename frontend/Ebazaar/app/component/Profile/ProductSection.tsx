"use client";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function ProductSection({ products }: { products: any[] }) {
  return (
    <div className="flex flex-col gap-6 pt-6 min-w-0">
      {/* Store Cover & Description */}
      <div className="bg-white relative bg-overlay rounded-4xl shadow border border-gray-200 mb-2 w-full">
        <div className="w-full h-32 sm:h-48 rounded-t-2xl overflow-hidden relative">
          <Image
            src="/Background.jpg"
            alt="Store Cover"
            width={900}
            height={144}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col p-3 sm:p-6 gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
              Aimen Taoussi Bazaar
            </h1>
            <button className="cursor-pointer px-3 sm:px-4 py-1 bg-[#015B46] text-white rounded font-semibold hover:bg-[#013f3a] transition-colors">
              Edit Store
            </button>
          </div>
          <p className="text-gray-600 text-sm sm:text-lg">
            Aimen Taoussi Bazaar offers a curated mix of handcrafted Moroccan
            goods and modern lifestyle products. From traditional décor and
            handmade accessories to everyday essentials, every item is chosen
            with quality and authenticity in mind
          </p>
        </div>
      </div>
      {/* Products Section */}
      <div className="bg-white relative bg-overlay rounded-2xl shadow p-3 sm:p-6 border border-gray-200 flex flex-col gap-5 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Products
          </h2>
          <button className="cursor-pointer px-3 sm:px-4 py-1 bg-[#015B46] text-white rounded font-semibold hover:bg-[#013f3a] transition-colors">
            Create product
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white relative bg-overlay rounded-2xl shadow p-3 sm:p-4 border border-gray-200 flex flex-col"
            >
              <div className="relative w-full h-32 sm:h-40 rounded-xl overflow-hidden mb-3">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 left-1/2 -translate-x-1/2 px-3 bg-[#A44A3F] text-white text-xs  py-0.5 rounded font-semibold">
                  {product.category}
                </span>
              </div>
              <h3 className="text-xs lg:text-sm sm:text-base font-bold text-[#13120F] mb-1">
                {product.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                <FaMapMarkerAlt className="text-base" />
                <span>{product.location}</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-full bg-gray-200 rounded text-center py-1">
                  <span className="text-base lg:text-lg font-bold text-[#13120F] ">
                    {product.price}
                  </span>
                </div>
                <button className="cursor-pointer w-full py-1 text-base lg:text-lg bg-[#015B46] text-white rounded font-semibold hover:bg-[#013f3a] transition-colors">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
