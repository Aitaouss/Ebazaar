"use client";

import { useUser } from "@/app/eb/layout";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { HiMail } from "react-icons/hi";

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
  const receiverId = user?.name == "Aimen Taoussi" ? 7 : 1; // Replace with the person you are chatting with
  const senderName = user?.name || "You";
  const [inputName, setInputName] = useState<string>("");

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

    // Emit the message to the backend
    socket?.emit("chat_message", messagePayload);

    // Optionally, add it to your own messages instantly
    setMessages((prev) => [
      ...prev,
      {
        ...messagePayload,
        id: Date.now(),
        created_at: new Date().toISOString(),
        // is_read: false,
      },
    ]);
    setInput("");
  };
  console.log("Messages : ", messages);
  console.log("User : ", user);
  const filteredInbox = messages.filter((chat: any) =>
    chat.sender_name.toLowerCase().includes(inputName.toLowerCase())
  );
  const messagesWithotUser = messages.filter((msg) => msg.sender_id !== userId);
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
          {filteredInbox.length == 0 && (
            <div className="h-full flex items-center justify-center ">
              <h1 className="animate-bounce">No User Found</h1>
            </div>
          )}
          {filteredInbox.map((msg) => (
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
                  {/* <span className="text-sm text-white font-light">
                    {msg.message}
                  </span> */}
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
      <div className="bg-white rounded-2xl shadow-md h-full flex-1"></div>
    </div>
  );
}
