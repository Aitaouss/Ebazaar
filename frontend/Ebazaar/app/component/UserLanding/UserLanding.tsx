"use client";

import React from "react";
import { TbNeedleThread } from "react-icons/tb";
import { FaTruckFast } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { GiWorld } from "react-icons/gi";
import { RiToolsFill } from "react-icons/ri";
import { FaSackDollar } from "react-icons/fa6";
import { IoMdCamera } from "react-icons/io";
import { BiSolidPackage } from "react-icons/bi";
import { useRef } from "react";
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
      className="w-full bg-[#FDF9F4] bg-overlay relative px-6 sm:px-10 lg:px-20 flex flex-col gap-20"
    >
      <div className="flex flex-col gap-10">
        <div className="flex justify-between md:items-center md:flex-row flex-col">
          <div>
            <div className="w-16 h-1 bg-[#015B46] rounded-full"></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold ">
              Are You A Buyer?
            </h1>
          </div>
          <h1 className="text-sm md:text-lg">
            Every item tells a story — make it yours.
          </h1>
        </div>
        <div className="w-full h-auto bg-white rounded-xl shadow-md p-12 flex flex-col gap-16">
          <div className="flex justify-between lg:items-center lg:flex-row flex-col gap-4">
            <h1 className="text-4xl lg:text-5xl font-bold ">
              Why Choose eBazaar?
            </h1>
            <h1 className="lg:w-[22%] text-[0.8rem]">
              More than just shopping — a cultural journey rooted in tradition,
              trust, and timeless beauty.
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
            {itemsBuyer.map((item) => (
              <div key={item.id} className="flex flex-col gap-4">
                {item.icon === "TbNeedleThread" && (
                  <TbNeedleThread size={50} color="#015B46" />
                )}
                {item.icon === "FaTruckFast" && (
                  <FaTruckFast size={50} color="#015B46" />
                )}
                {item.icon === "BiSupport" && (
                  <BiSupport size={50} color="#015B46" />
                )}
                <div>
                  <h1 className="text-xl font-bold">{item.title}</h1>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Seller */}
      <div className="flex flex-col gap-10">
        <div className="flex justify-between md:items-center md:flex-row flex-col">
          <div className="">
            <div className="w-16 h-1 bg-[#015B46] rounded-full"></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold ">
              Are You A Seller?
            </h1>
          </div>
          <h1 className="text-sm md:text-lg">
            Bring your bazaar to the world.
          </h1>
        </div>
        <div className="w-full h-auto bg-white rounded-xl shadow-md p-12 flex flex-col gap-16">
          <div className="flex justify-between lg:items-center lg:flex-row flex-col gap-4">
            <h1 className="text-4xl lg:text-5xl font-bold ">
              Why Join eBazare ?
            </h1>
            <h1 className="lg:w-[22%] text-[0.8rem]">
              More than just shopping — a cultural journey rooted in tradition,
              trust, and timeless beauty.
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
            {itemsSeller.map((item) => (
              <div key={item.id} className="flex flex-col gap-4">
                {item.icon === "GiWorld" && (
                  <GiWorld size={50} color="#015B46" />
                )}
                {item.icon === "RiToolsFill" && (
                  <RiToolsFill size={50} color="#015B46" />
                )}
                {item.icon === "FaSackDollar" && (
                  <FaSackDollar size={50} color="#015B46" />
                )}
                {item.icon === "IoMdCamera" && (
                  <IoMdCamera size={50} color="#015B46" />
                )}
                {item.icon === "BiSolidPackage" && (
                  <BiSolidPackage size={50} color="#015B46" />
                )}

                <div>
                  <h1 className="text-xl font-bold">{item.title}</h1>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
            <button className="bg-[#015B46] text-[#FDF9F4] h-12 w-40 rounded self-center font-semibold cursor-pointer justify-self-center hover:bg-[#014b3c] transition-all duration-300">
              Become Seller
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
