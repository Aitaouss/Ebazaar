import React from "react";
import Image from "next/image";

export default function Seller() {
  return (
    <div className="w-[370px] h-[430px] rounded-2xl bg-white shadow-lg p-2 flex flex-col gap-3">
      {/* <Image
        src="/public/Background.jpg"
        alt="Seller Image"
        width={370}
        height={430}
        className="rounded-t-2xl object-cover"
      /> */}
      <div className="bg-red-500 w-full h-[50%] rounded-t-2xl"></div>
      <div className="rounded-full w-[40px] h-[40px] bg-black"></div>
    </div>
  );
}
