import Seller from "../Card/CardSeller";

export default function ExploreTreasure() {
  return (
    <div className=" bg-[#FDF9F4] h-full w-full pt-20 bg-overlay relative">
      <div className="flex flex-col gap-16">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-7xl font-bold text-center">
            Explore the Treasures of Morocco
          </h1>
          <p>
            Shop by category and uncover handmade excellence from every corner
            of the kingdom
          </p>
        </div>
        <Seller />
        <Seller />
        <Seller />
      </div>
    </div>
  );
}
