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
    <div className="fixed right-0 bottom-0 h-1/2 w-[400px] rounded-tl-2xl shadow-lg z-[50] flex flex-col bg-overlay bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#015B46] overflow-hidden rounded-tl-2xl">
        <FaEnvelope className="text-white text-xl" />
        <span className="text-white text-lg font-semibold flex-1">Inbox</span>
        <button
          className="text-white cursor-pointer text-2xl font-bold"
          onClick={() => setChatModalOpen(false)}
        >
          &times;
        </button>
      </div>

      {/* Search */}
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

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {filteredInbox.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500 text-sm animate-bounce">No messages</p>
          </div>
        ) : (
          filteredInbox.map((chat: any) => (
            <div
              key={chat.id}
              className={`flex items-center ${
                chat.is_read ? "bg-[#0A433D]/60" : "bg-[#011916]/60"
              } rounded-xl px-3 py-3 shadow-sm`}
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                {chat.sender_image ? (
                  <Image
                    src={chat.sender_image}
                    alt={chat.sender_name}
                    width={48}
                    height={48}
                  />
                ) : (
                  <div className="w-full h-full bg-[#015B46] rounded-full flex items-center justify-center">
                    <h1 className="text-white font-semibold">
                      {chat.sender_name.charAt(0).toUpperCase()}
                    </h1>
                  </div>
                )}
              </div>

              {/* Sender Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-base">
                    {chat.sender_name}
                  </span>
                  {chat.is_read ? (
                    <span className="bg-green-200 text-green-900 text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                      New
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <span className="text-green-100 text-xs">
                  {chat.sender_name}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end ml-2">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    window.location.href = `/eb/${user.username}/inbox`;
                  }}
                >
                  <FaRegCommentDots className="text-white text-lg mb-1" />
                </button>
                <span className="text-green-100 text-xs">
                  {chat.created_at}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
