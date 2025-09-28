"use client";

import { useUser } from "@/app/context/UserContext";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { HiMail } from "react-icons/hi";
// import InboxChat from "./InboxChat";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { RiSettingsFill } from "react-icons/ri";
import { MessageToDisplayFun } from "./MessageToDisplay";

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
  const receiverId = userSelected ? userSelected.sender_id : null;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const userSelected = messages.find((msg) => msg.id === isSelected);
    setUserSelected(userSelected);
  }, [isSelected]);

  useEffect(() => {
    if (!userId) {
      console.log("user is undefined");
      return;
    }
    // if (isSelected === 0 || isSelected === undefined) {
    //   return;
    // }
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
      receiver_name: userSelected.sender_name,
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
    setInput("");
  };

  // for left section
  const MessagesWithouMeAsReceiver = messages.filter(
    (msg) => msg.sender_name !== user.name
  );

  // Sort messages by date (oldest first) to show proper chat flow
  const messagesBetweenMeAndId = messages.filter(
    (msg) =>
      (msg.sender_id === user.id && msg.receiver_id === receiverId) ||
      (msg.sender_id === receiverId && msg.receiver_id === user.id)
  );
  const MessageForMeSorted = [...messagesBetweenMeAndId].sort(
    (a: any, b: any) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const MessageToDisplay = MessageToDisplayFun(messages, user, inputName);

  // Dummy online status
  const isOnline = true;

  const handleInput = (param: number) => {
    setIsSelected(param);
    setInput("");
    return;
  };

  return (
    <div className="h-full w-full flex flex-col lg:flex-row gap-4 lg:gap-6 p-2 sm:p-4">
      {/* Left Sidebar - Conversations List */}
      <div className={`flex flex-col bg-white bg-overlay rounded-lg border border-gray-100 h-full overflow-hidden ${
        isSelected === 0 ? 'w-full lg:w-[38%]' : 'hidden lg:flex lg:w-[38%]'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#015B46] to-[#017A5B] p-4 sm:p-6 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <HiMail className="text-white text-lg sm:text-2xl" />
            </div>
            <div>
              <h1 className="text-white text-lg sm:text-xl font-bold">Messages</h1>
              <p className="text-white/80 text-xs sm:text-sm">Stay connected</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-3 sm:p-4 bg-gray-50/50 border-b border-gray-100">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-[#015B46] transition-colors"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46] transition-all text-sm"
              onChange={(e) => setInputName(e.target.value)}
              value={inputName}
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-auto p-3 sm:p-4 space-y-3">
          {MessageToDisplay.length == 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <HiMail className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-gray-600 font-medium mb-2">
                No conversations found
              </h3>
              <p className="text-gray-400 text-sm">
                Start a conversation to see it here
              </p>
            </div>
          )}
          {MessageToDisplay.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleInput(isSelected === msg.id ? 0 : msg.id)}
              className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                isSelected === msg.id
                  ? "bg-gradient-to-r from-[#015B46] to-[#017A5B] text-white shadow-xl transform scale-[1.02]"
                  : "bg-white hover:bg-gray-50 border border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                <div className="relative">
                  {msg.sender_image ? (
                    <img
                      src={msg.sender_image}
                      alt={msg.sender_name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-md"
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-lg ${
                        isSelected === msg.id
                          ? "bg-white/20 text-white"
                          : "bg-gradient-to-r from-[#015B46] to-[#017A5B] text-white"
                      }`}
                    >
                      {msg.sender_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {/* Online indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      className={`font-semibold truncate text-sm sm:text-base ${
                        isSelected === msg.id ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {msg.sender_name === user.name
                        ? msg.receiver_name
                        : msg.sender_name}
                    </h3>
                    <span
                      className={`text-xs ${
                        isSelected === msg.id
                          ? "text-white/80"
                          : "text-gray-500"
                      }`}
                    >
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p
                      className={`text-sm truncate ${
                        isSelected === msg.id
                          ? "text-white/90"
                          : "text-gray-600"
                      }`}
                    >
                      {msg.message || "No messages yet"}
                    </p>
                    {!msg.is_read && (
                      <div
                        className={`ml-2 w-2 h-2 rounded-full ${
                          isSelected === msg.id ? "bg-white" : "bg-[#A44A3F]"
                        }`}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex flex-col bg-white bg-overlay rounded-lg shadow-xl border border-gray-100 h-full flex-1 overflow-hidden ${
        isSelected === 0 ? 'hidden lg:flex' : 'flex'
      }`}>
        {isSelected !== 0 ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-100 p-4 sm:p-6 rounded-t-lg">
              {userSelected ? (
                <div className="flex items-center justify-between">
                  {/* Back button for mobile */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setIsSelected(0)}
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                    </button>
                    {userSelected.sender_image ? (
                      <img
                        src={userSelected.sender_image}
                        alt={userSelected.sender_name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                      />
                    ) : (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#015B46] to-[#017A5B] flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm sm:text-lg">
                          {userSelected.sender_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        {userSelected.sender_name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                            isOnline ? "bg-green-500" : "bg-gray-400"
                          }`}
                        ></div>
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            isOnline ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          {isOnline ? "Online" : "Offline"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 sm:p-3 hover:bg-gray-100 rounded-lg transition-colors group">
                    <RiSettingsFill className="text-gray-600 group-hover:text-[#015B46] text-lg sm:text-xl transition-colors" />
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-auto p-3 sm:p-6 bg-gray-50/30 space-y-3 sm:space-y-4">
              {MessageForMeSorted.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#015B46] to-[#017A5B] rounded-full flex items-center justify-center mb-4">
                    <HiMail className="text-white text-3xl" />
                  </div>
                  <h3 className="text-gray-700 font-semibold text-lg mb-2">
                    Start the conversation
                  </h3>
                  <p className="text-gray-500">
                    Send a message to begin chatting with{" "}
                    {userSelected?.sender_name}
                  </p>
                </div>
              )}
              {MessageForMeSorted.map((msg: any, index: number) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender_id === user.id ? "justify-end" : "justify-start"
                  } mb-3 sm:mb-4`}
                >
                  <div
                    className={`group max-w-[85%] sm:max-w-[70%] ${
                      msg.sender_id === user.id
                        ? "bg-gradient-to-r from-[#015B46] to-[#017A5B] text-white rounded-lg rounded-br-none"
                        : "bg-white border border-gray-200 text-gray-800 rounded-lg rounded-bl-none shadow-sm"
                    } px-3 sm:px-5 py-2.5 sm:py-3 transition-all hover:shadow-md`}
                  >
                    <p className="text-sm leading-relaxed mb-1.5 sm:mb-2">
                      {msg.message}
                    </p>
                    <div className="flex items-center justify-end">
                      <span
                        className={`text-xs ${
                          msg.sender_id === user.id
                            ? "text-white/80"
                            : "text-gray-500"
                        }`}
                      >
                        {new Date(msg.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-100 p-3 sm:p-6 rounded-b-lg">
              <div className="flex items-center gap-2 sm:gap-4">
                <button className="p-2 sm:p-3 hover:bg-gray-100 rounded-lg transition-colors group">
                  <MdOutlineEmojiEmotions className="text-gray-500 group-hover:text-[#015B46] text-xl sm:text-2xl transition-colors" />
                </button>
                <div className="flex-1 relative">
                  <input
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46] transition-all placeholder-gray-500 text-sm sm:text-base"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                </div>
                <button
                  className={`p-3 sm:p-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    input.trim()
                      ? "bg-gradient-to-r from-[#015B46] to-[#017A5B] hover:shadow-xl"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={sendMessage}
                  disabled={!input.trim()}
                >
                  <IoMdSend className="text-white text-lg sm:text-xl" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-[#015B46] to-[#017A5B] rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 sm:mb-6 shadow-xl">
              <HiMail className="text-white text-2xl sm:text-3xl lg:text-4xl" />
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
              Welcome to Messages
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">
              Select a conversation to start chatting
            </p>
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 max-w-xs sm:max-w-md">
              <p className="text-gray-500 text-xs sm:text-sm">
                Your messages will appear here. Connect with other users and
                start meaningful conversations.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
