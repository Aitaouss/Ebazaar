import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

export default function InboxChat({ messages, user, inboxSelectedId }: any) {
  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl shadow-md h-full flex-1">
      <div className="w-full h-[100px]  border-b border-[#E3E3E3]"></div>
      <div className="w-full h-[100px]  border-t border-[#E3E3E3]  p-3 flex gap-3 items-center">
        <MdOutlineEmojiEmotions className="cursor-pointer text-[#9D9D9D] text-4xl " />
        <input
          className="bg-transparent outline-none w-[90%] h-[90%] border border-[#E3E3E3] rounded-2xl pl-3"
          placeholder="Type a message..."
        />
        <button className="cursor-pointer hover:bg-[#015B46]/90 transition-all duration-300 bg-[#015B46] w-[70px] h-[70px] rounded-2xl flex items-center justify-center ">
          <IoMdSend className="text-white text-2xl m-5" />
        </button>
      </div>
    </div>
  );
}
