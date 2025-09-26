import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { RiSettingsFill } from "react-icons/ri";

export default function InboxChat({
  messages,
  userSelected,
  inboxSelectedId,
  sendMessage,
  input,
  setInput,
  user,
}: any) {
  const MessageForMe = messages.filter(
    (msg: any) =>
      // get messages between the logged-in user and the selected user
      (msg.sender_id === user.id &&
        msg.receiver_id === userSelected?.sender_id) ||
      (msg.sender_id === userSelected?.sender_id && msg.receiver_id === user.id)
  );
  console.log("Messages for me: ", MessageForMe);
  // Dummy online status
  const isOnline = true;
  return (
    <div className="flex flex-col  bg-white justify-between rounded-2xl shadow-md relative h-full flex-1 bg-overlay">
      {inboxSelectedId !== 0 ? (
        <>
          <div className="w-full min-h-[100px]  border-b border-[#E3E3E3] flex justify-between items-center px-5">
            {userSelected ? (
              <>
                <div className="w-full h-full p-3 flex items-center gap-3">
                  {userSelected.sender_image ? (
                    <img
                      src={userSelected.sender_image}
                      alt={userSelected.sender_name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#015B46] flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {userSelected.sender_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="">
                    <h1>{userSelected.sender_name}</h1>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 ${
                          isOnline ? "bg-green-700" : "bg-gray-500"
                        } rounded-full`}
                      ></div>
                      <span
                        className={`${
                          isOnline ? "text-green-700" : "text-gray-600"
                        }`}
                      >
                        {isOnline ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>
                </div>
                {/* <div className=""> */}
                <RiSettingsFill className="cursor-pointer text-black text-xl" />
                {/* </div> */}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="flex-1 w-full">
            {MessageForMe.map((msg: any, index: number) => (
              <div
                key={index}
                className={`w-full flex my-2 px-3 ${
                  msg.sender_id === user.id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[60%] p-3 rounded-2xl ${
                    msg.sender_id === user.id
                      ? "bg-[#015B46] text-white rounded-br-none"
                      : "bg-[#E3E3E3] text-black rounded-bl-none"
                  }`}
                >
                  <p>{msg.message}</p>
                  <span className="text-xs text-right block mt-1">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full h-[100px]  border-t border-[#E3E3E3]  p-3 flex gap-3 items-center">
            <MdOutlineEmojiEmotions className="cursor-pointer text-[#9D9D9D] text-4xl " />
            <input
              className="bg-transparent outline-none w-[90%] h-[90%] border border-[#E3E3E3] rounded-2xl pl-3"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="cursor-pointer hover:bg-[#015B46]/90 transition-all duration-300 bg-[#015B46] w-[70px] h-[70px] rounded-2xl flex items-center justify-center "
              onClick={sendMessage}
            >
              <IoMdSend className="text-white text-2xl m-5" />
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
