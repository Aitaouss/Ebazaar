"use client";

import { useUser } from "@/app/eb/layout";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { HiMail } from "react-icons/hi";
// import InboxChat from "./InboxChat";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { RiSettingsFill } from "react-icons/ri";

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: string;
  sender_name: string;
  is_read: boolean;
  sender_image?: string;
}

let socket: Socket;

export default function MailNav() {
  const [isSelected, setIsSelected] = useState<number>(0);
  const data = useUser();
  const user = data?.user;
  const receivedMessages = data?.inbox;
  const [messages, setMessages] = useState<any[]>([...receivedMessages]);
  const [input, setInput] = useState("");
  const userId = user?.id;
  const senderName = user?.name || "You";
  const [inputName, setInputName] = useState<string>("");
  const [userSelected, setUserSelected] = useState<any>(0);
  const receiverId = userSelected ? userSelected.sender_id : 0;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Selected ID changed: ", isSelected);
    const userSelected = messages.find((msg) => msg.id === isSelected);
    setUserSelected(userSelected);
  }, [isSelected]);

  useEffect(() => {
    // Connect to backend
    socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);

    // Join your private room
    socket.emit("join", userId);

    // Listen for new messages
    socket.on("new_message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const messagePayload = {
      sender_id: userId,
      receiver_id: receiverId,
      message: input,
      sender_name: senderName,
    };

    // Eit the message to the bmackend
    socket?.emit("chat_message", messagePayload);

    // Optionally, add it to your own messages instantly
    setMessages((prev) => [
      ...prev,
      {
        ...messagePayload,
        id: Date.now(),
        created_at: new Date().toISOString(),
      },
    ]);
    console.log("Sending message: ", input);
    setInput("");
  };
  const messagesWithoutUser = messages.filter(
    (msg) => msg.sender_id !== userId
  );
  const filteredInbox = messagesWithoutUser.filter((chat: any) =>
    chat.sender_name.toLowerCase().includes(inputName.toLowerCase())
  );
  const InboxWithoutDuplicates = Array.from(
    new Map(filteredInbox.map((item) => [item["sender_id"], item])).values()
  ).sort(
    (a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // for left side
  const MessageForMe = messages.filter(
    (msg: any) =>
      // get messages between the logged-in user and the selected user
      (msg.sender_id === user.id &&
        msg.receiver_id === userSelected?.sender_id) ||
      (msg.sender_id === userSelected?.sender_id && msg.receiver_id === user.id)
  );
  // Sort messages by date (oldest first) to show proper chat flow
  const MessageForMeSorted = [...MessageForMe].sort(
    (a: any, b: any) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [MessageForMeSorted]);

  console.log("Messages for me: ", MessageForMe);
  // Dummy online status
  const isOnline = true;
  return (
    <div className="h-full w-full flex gap-4">
      <div className="flex flex-col bg-white rounded-2xl shadow-md h-full w-[35%] overflow-hidden">
        <div className="h-[10%] w-full bg-[#015B46] flex items-center gap-2 p-3">
          <HiMail className="text-white text-3xl" />
          <h1 className="text-white font-semibold">Inbox</h1>
        </div>
        <div className="px-4 py-3 bg-white">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by name"
              className="bg-transparent outline-none flex-1 text-sm"
              onChange={(e) => setInputName(e.target.value)}
              value={inputName}
            />
          </div>
        </div>
        <div className="flex-1 bg-white w-full overflow-auto p-3 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-200">
          {InboxWithoutDuplicates.length == 0 && (
            <div className="h-full flex items-center justify-center ">
              <h1 className="animate-bounce">No User Found</h1>
            </div>
          )}
          {InboxWithoutDuplicates.map((msg) => (
            <div
              key={msg.id}
              onClick={() => setIsSelected(isSelected == msg.id ? 0 : msg.id)}
              className={`w-full min-h-[80px] ${
                !msg.is_read ? "bg-[#011916]/74" : "bg-[#0A433D]/74"
              } shadow-sm rounded-2xl ${
                isSelected === msg.id ? "border-2 border-green-500" : ""
              }`}
            >
              <div className="w-full h-full p-3 flex items-center gap-3">
                {msg.sender_image ? (
                  <img
                    src={msg.sender_image}
                    alt={msg.sender_name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#015B46] flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {msg.sender_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h1 className="text-white font-semibold">
                    {msg.sender_name}
                  </h1>
                </div>
                <div className="ml-auto flex flex-col items-end gap-2">
                  {msg.is_read ? (
                    <div className="hover:bg-[#015B46]/70 transition-all duration-300 bg-[#015B46] text-white text-xs rounded-full px-5 py-1">
                      Not read
                    </div>
                  ) : (
                    ""
                  )}
                  <span className="text-xs text-white font-light">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <InboxChat
        user={user}
        messages={messages}
        userSelected={userSelected}
        inboxSelectedId={isSelected}
        sendMessage={sendMessage}
        input={input}
        setInput={setInput}
      /> */}
      {/* Nextchat */}
      <div className="flex flex-col  bg-white justify-between rounded-2xl shadow-md relative h-full flex-1 bg-overlay">
        {isSelected !== 0 ? (
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
            <div className="flex-1 w-full overflow-auto p-3">
              {MessageForMeSorted.map((msg: any, index: number) => (
                <div
                  key={index}
                  className={`w-full flex my-2 ${
                    msg.sender_id === user.id ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[60%] p-3 rounded-2xl shadow-sm ${
                      msg.sender_id === user.id
                        ? "bg-[#015B46] text-white rounded-br-none"
                        : "bg-[#E3E3E3] text-black rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm mb-1">{msg.message}</p>
                    <span className={`text-xs block ${
                      msg.sender_id === user.id ? "text-gray-200" : "text-gray-500"
                    }`}>
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
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
    </div>
  );
}
