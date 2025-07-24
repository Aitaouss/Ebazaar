import React from "react";
import Image from "next/image";

interface ItemInterface {
  id: number;
  title: string;
  description: string;
  location: string;
}

export default function Seller({}: ItemInterface) {
  return (
    <div className="w-[370px] h-[430px] rounded-2xl bg-white shadow-lg p-2 flex flex-col gap-3 flex-shrink-0">
      {/* <Image
        src="/public/Background.jpg"
        alt="Seller Image"
        width={370}
        height={430}
        className="rounded-t-2xl object-cover"
      /> */}
      <div className="bg-[url(https://i.ibb.co/4n9cV1JG/background.jpg)] w-full h-[50%] rounded-t-2xl"></div>
      <div className="rounded-full w-[40px] h-[40px] bg-black"></div>
    </div>
  );
}
