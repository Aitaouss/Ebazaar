import { PiQuotesFill } from "react-icons/pi";

export default function ReviewsCard() {
  return (
    <div className="w-[500px] h-[270px] bg-white rounded-4xl shadow-lg flex-shrink-0 relative">
      <div className="absolute bg-[#015B46] w-[40px] h-[40px] flex-shrink-0 -top-2 right-7 rounded-lg flex items-center justify-center">
        <PiQuotesFill color="white" size={20} />
      </div>
    </div>
  );
}
