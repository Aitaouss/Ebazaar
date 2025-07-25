import { useEffect, useRef } from "react";
import Seller from "../Card/CardSeller";

export default function ExploreTreasure() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;

    const scroll = () => {
      if (!scrollContainer) return;

      scrollAmount += 1;
      scrollContainer.scrollLeft += 1;

      // Reset scroll if reached end
      if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth
      ) {
        scrollContainer.scrollLeft = 0;
        scrollAmount = 0;
      }
    };

    const interval = setInterval(scroll, 20); // speed of scroll

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="bg-[#FDF9F4] h-full w-full px-6 sm:px-10 lg:px-20 pt-20 bg-overlay">
      <div className="flex flex-col gap-16">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center ">
            Explore the Treasures of Morocco
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600">
            Shop by category and uncover handmade excellence from every corner
            of the kingdom
          </p>
        </div>

        {/* Scrollable wrapper with shadow overlays */}
        <div className="relative w-full">
          <div
            ref={scrollRef}
            className="w-full flex flex-nowrap overflow-x-auto gap-x-12 px-4 scroll-smooth scroll-hide"
          >
            <Seller />
            <Seller />
            <Seller />
            <Seller />
            <Seller />
            <Seller />
            <Seller />
            <Seller />
            <Seller />
          </div>

          {/* Left shadow */}
          <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-[#FDF9F4] to-transparent pointer-events-none z-10" />

          {/* Right shadow */}
          <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#FDF9F4] to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </div>
  );
}
