import { PiQuotesFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";

interface ReviewInterface {
  id: number;
  name: string;
  rate: string;
  description: string;
  date: string;
  location: string;
  picture: string;
}

export default function ReviewsCard({
  id,
  name,
  rate,
  description,
  date,
  location,
  picture,
}: ReviewInterface) {
  return (
    <div className="w-[450px] h-[220px] lg:w-[500px] lg:h-[270px] bg-white rounded-4xl shadow-lg flex-shrink-0 relative p-5 flex flex-col justify-between">
      <div className="absolute bg-[#015B46] w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] flex-shrink-0 -top-2 right-7 rounded-lg flex items-center justify-center">
        <PiQuotesFill color="white" size={20} />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] flex-shrink-0 bg-black rounded-full"></div>
        <div>
          <div className="flex gap-3">
            <h1 className="text-sm lg:text-lg font-bold">{name}</h1>
            <div className="flex items-center gap-1">
              <FaStar color="#015B46" size={20} />
              <h1 className="text-sm lg:text-lg">{rate}</h1>
            </div>
          </div>
          <div>
            <h1>
              On {date}, {location}
            </h1>
          </div>
        </div>
      </div>
      <h1 className="text-sm lg:text-lg">{description}</h1>
    </div>
  );
}
