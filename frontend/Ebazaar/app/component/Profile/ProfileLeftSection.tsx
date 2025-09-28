import Image from "next/image";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import BuyerReviews from "./BuyerReviews";

export default function ProfileLeftSection({ userState, setEditOpen }: any) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-full md:max-w-xs pt-6 md:sticky md:top-0 z-10">
      {/* Profile Card */}
      <div
        className="bg-white bg-overlay rounded-lg shadow relative flex flex-col items-center border border-gray-200 overflow-hidden pb-6 w-full max-w-full md:max-w-xs mx-auto"
        style={{ minWidth: 0 }}
      >
        {/* Cover Image */}
        <div className="w-full h-24 sm:h-28 md:h-32 bg-gray-200 relative">
          <Image
            src="/Background.jpg"
            alt="cover"
            fill
            className="object-cover w-full h-full rounded-t-lg"
          />
        </div>
        {/* Profile Image & Edit Button */}
        <div className="relative w-full flex justify-center">
          <div className="absolute -top-12 flex flex-col items-center w-full">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white shadow relative">
              <Image
                src={userState?.profileImage || "/EBAZAAR default.png"}
                alt="profile"
                width={96}
                height={96}
                className="object-cover w-full h-full rounded-full"
              />
              {userState?.verified ? (
                <div>
                  <MdVerified className="text-[#015B46] text-lg absolute bottom-2 right-0 bg-white rounded-full" />
                </div>
              ) : null}
            </div>
          </div>
          <button
            className="cursor-pointer absolute right-2 top-2 px-2 sm:px-3 py-1 text-xs bg-gradient-to-r from-[#015B46] to-[#017A5B] text-white rounded font-semibold hover:bg-[#013f3a] transition-colors z-10"
            onClick={() => setEditOpen(true)}
          >
            Edit profile
          </button>
        </div>
        {/* Name, Username, Admin Badge */}
        <div className="flex flex-col items-center gap-2 justify-center mt-16">
          <div className="text-center">
            <h1 className="text-base sm:text-lg font-bold text-gray-800">
              {userState?.name}
            </h1>
            <h1 className="text-gray-500 text-xs sm:text-sm">
              @{userState?.username}
            </h1>
          </div>
          <span className="bg-[#A44A3F] text-white text-xs px-5 sm:px-7 py-0.5 rounded-full font-semibold mb-2">
            {userState?.role}
          </span>
        </div>
        {/* Personal Infos Section */}
        <div className="w-full mt-2 px-3 sm:px-6">
          <div className="w-full mb-2">
            <h2 className="font-bold text-gray-700 text-base sm:text-lg mb-1 flex items-center gap-2">
              Personal Infos
            </h2>
            <div className="h-[2px] w-8 bg-[#015B46] rounded-full mb-2"></div>
          </div>
          <div className="text-gray-600 text-xs sm:text-sm flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#13120F]">
              <FaEnvelope className="text-base text-[#13120F]" />
              <span>{userState?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-[#13120F]">
              <FaPhoneAlt className="text-base text-[#13120F]" />
              <span>{userState?.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-[#13120F]">
              <FaMapMarkerAlt className="text-base text-[#13120F]" />
              <span>{userState?.location}</span>
            </div>
            <div className="flex items-center gap-2 text-[#13120F]">
              <FaGlobe className="text-base text-[#13120F]" />
              <span>{userState?.language}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Buyer Reviews Card */}
      <BuyerReviews userId={userState?.id} />
    </div>
  );
}
