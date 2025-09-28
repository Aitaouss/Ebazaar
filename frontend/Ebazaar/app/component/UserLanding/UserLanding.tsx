"use client";

import React, { useRef } from "react";
import { TbNeedleThread } from "react-icons/tb";
import { FaTruckFast } from "react-icons/fa6";
import { BiSupport, BiSolidPackage } from "react-icons/bi";
import { GiWorld } from "react-icons/gi";
import { RiToolsFill } from "react-icons/ri";
import { FaSackDollar } from "react-icons/fa6";
import { IoMdCamera } from "react-icons/io";
import { motion, useInView } from "framer-motion";

interface ItemInterface {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export default function Buyer() {
  const itemsBuyer: ItemInterface[] = [
    {
      id: 1,
      title: "Authentic & Handcrafted",
      description:
        "Every product is sourced directly from Moroccan artisans — handmade, traditional, and full of soul.",
      icon: "TbNeedleThread",
    },
    {
      id: 2,
      title: "Reliable Worldwide Delivery",
      description:
        "From the medina to your door — trackable, secure, and carefully packed for every destination.",
      icon: "FaTruckFast",
    },
    {
      id: 3,
      title: "Personal Customer Support",
      description:
        "Need help? Our friendly support team is here for you — in Arabic, French, and English.",
      icon: "BiSupport",
    },
  ];
  const itemsSeller: ItemInterface[] = [
    {
      id: 1,
      title: "Sell Your Products Worldwide",
      description:
        "Reach customers across the globe and grow your presence beyond the souk — eBazare helps you sell internationally with ease.",
      icon: "GiWorld",
    },
    {
      id: 2,
      title: "Easy-to-Use Seller Dashboard",
      description:
        "Manage your products, orders, and inventory in one place. Our intuitive dashboard is designed to support artisans, not overwhelm them.",
      icon: "RiToolsFill",
    },
    {
      id: 3,
      title: "Fair Pricing, No Hidden Fees",
      description:
        "Keep more of what you earn. We offer transparent pricing with no surprises — because your work deserves fair rewards.",
      icon: "FaSackDollar",
    },
    {
      id: 4,
      title: "Personalized Store Support",
      description:
        "We help showcase your shop beautifully — with high-quality images, storytelling, and custom guidance to make your storefront stand out.",
      icon: "IoMdCamera",
    },
    {
      id: 5,
      title: "Integrated Shipping Assistance",
      description:
        "Manage your products, orders, and inventory in one place. Our intuitive dashboard is designed to support artisans, not overwhelm them.",
      icon: "BiSolidPackage",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full bg-[#fff] relative px-6 sm:px-10 lg:px-20 flex flex-col gap-20 py-16 bg-overlay"
    >
      {/* Buyer */}
      <div className="flex flex-col gap-10">
        <div className="flex justify-between md:items-center md:flex-row flex-col gap-4">
          <div>
            <div className="w-16 h-1 bg-[#015B46] rounded-full"></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Are You A Buyer?
            </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Every item tells a story — make it yours.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col gap-12">
          <div className="flex justify-between lg:items-center lg:flex-row flex-col gap-6">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Why Choose eBazaar?
            </h1>
            <p className="lg:w-[25%] text-gray-600 text-sm md:text-base">
              More than just shopping — a cultural journey rooted in tradition,
              trust, and timeless beauty.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {itemsBuyer.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gradient-to-br from-gray-50 to-white shadow-md rounded-xl flex flex-col gap-4 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#E7F3F0]">
                  {item.icon === "TbNeedleThread" && (
                    <TbNeedleThread size={28} color="#015B46" />
                  )}
                  {item.icon === "FaTruckFast" && (
                    <FaTruckFast size={28} color="#015B46" />
                  )}
                  {item.icon === "BiSupport" && (
                    <BiSupport size={28} color="#015B46" />
                  )}
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Seller */}
      <div className="flex flex-col gap-10">
        <div className="flex justify-between md:items-center md:flex-row flex-col gap-4">
          <div>
            <div className="w-16 h-1 bg-[#015B46] rounded-full"></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Are You A Seller?
            </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Bring your bazaar to the world.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col gap-12">
          <div className="flex justify-between lg:items-center lg:flex-row flex-col gap-6">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Why Join eBazaar?
            </h1>
            <p className="lg:w-[25%] text-gray-600 text-sm md:text-base">
              More than just shopping — a cultural journey rooted in tradition,
              trust, and timeless beauty.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {itemsSeller.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gradient-to-br from-gray-50 to-white shadow-md rounded-xl flex flex-col gap-4 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#E7F3F0]">
                  {item.icon === "GiWorld" && (
                    <GiWorld size={28} color="#015B46" />
                  )}
                  {item.icon === "RiToolsFill" && (
                    <RiToolsFill size={28} color="#015B46" />
                  )}
                  {item.icon === "FaSackDollar" && (
                    <FaSackDollar size={28} color="#015B46" />
                  )}
                  {item.icon === "IoMdCamera" && (
                    <IoMdCamera size={28} color="#015B46" />
                  )}
                  {item.icon === "BiSolidPackage" && (
                    <BiSolidPackage size={28} color="#015B46" />
                  )}
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}

            {/* CTA */}
            <div className="flex justify-center col-span-full">
              <button className="cursor-pointer bg-gradient-to-r from-[#015B46] to-[#05775c] text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 shadow-md transition-all duration-300">
                Become a Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
