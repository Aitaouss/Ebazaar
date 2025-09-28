"use client";

import { useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { FaEnvelope, FaRegCommentDots } from "react-icons/fa";
import Image from "next/image";

export default function InboxModal({
  setChatModalOpen,
}: {
  setChatModalOpen: (open: boolean) => void;
}) {
  const data = useUser();
  const Inbox = data?.inbox || [];
  const user = data?.user;
  const [inputName, setInputName] = useState<string>("");

  // Filter inbox based on input
  const MessagesWithouMeAsReceiver = Inbox.filter(
    (msg: any) => msg.sender_name !== user.name
  );
  const messagesWithoutDuplicateName = Array.from(
    new Map(
      MessagesWithouMeAsReceiver.map((msg: any) => [msg.sender_name, msg])
    ).values()
  );
  const filteredInbox = messagesWithoutDuplicateName.filter((chat: any) =>
    chat.sender_name.toLowerCase().includes(inputName.toLowerCase())
  );

  return (
    <div className="fixed right-0 bottom-0 h-3/5 w-[450px] rounded-t-2xl shadow-2xl z-[50] flex flex-col bg-white border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#015B46] to-[#017A5B] p-4 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <FaEnvelope className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-white text-lg font-bold">Messages</h1>
              <p className="text-white/80 text-xs">Quick view</p>
            </div>
          </div>
          <button
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors cursor-pointer"
            onClick={() => setChatModalOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 bg-gray-50/50 border-b border-gray-100">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400 group-focus-within:text-[#015B46] transition-colors"
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
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46] transition-all text-sm"
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredInbox.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <FaEnvelope className="text-gray-400 text-lg" />
            </div>
            <h3 className="text-gray-600 font-medium mb-1 text-sm">
              No messages found
            </h3>
            <p className="text-gray-400 text-xs">
              {inputName ? "Try a different search" : "Start a conversation"}
            </p>
          </div>
        ) : (
          filteredInbox.map((chat: any) => (
            <div
              key={chat.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-md bg-white hover:bg-gray-50 border border-gray-100 hover:border-gray-200"
              onClick={() => {
                window.location.href = `/eb/${user.username}/inbox`;
              }}
            >
              <div className="p-3 flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  {chat.sender_image ? (
                    <Image
                      src={chat.sender_image}
                      alt={chat.sender_name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-r from-[#015B46] to-[#017A5B] rounded-full flex items-center justify-center font-bold text-sm text-white">
                      {chat.sender_name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                  {/* Online indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                {/* Message Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold truncate text-gray-900 text-sm">
                      {chat.sender_name || "Unknown User"}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(chat.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs truncate text-gray-600">
                      {chat.message || "No message preview"}
                    </p>
                    <div className="flex items-center gap-2 ml-2">
                      {chat.is_read && (
                        <div className="w-2 h-2 bg-[#A44A3F] rounded-full"></div>
                      )}
                      <FaRegCommentDots className="text-[#015B46] text-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
