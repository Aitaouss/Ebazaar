import HomeNav from "../component/navComponents/HomeNav";

export default function EbazaarHome() {
  return (
    <div className="flex-1 w-full">
      <div className="fixed  right-0 bottom-0 h-[700px] w-[400px] bg-white rounded-t-2xl shadow-lg z-[50]  "></div>
      <HomeNav />
    </div>
  );
}
