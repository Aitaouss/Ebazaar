"use client";

import { useState, useRef, useEffect } from "react";
import { FaEnvelope, FaRegCommentDots } from "react-icons/fa";
import Image from "next/image";

const chats = [
  {
    id: 1,
    name: "Aimen Taoussi",
    username: "@aitaoussi",
    avatar: "/me hd.png",
    isNew: true,
    time: "2 minutes ago",
  },
  {
    id: 2,
    name: "Aimen Taoussi",
    username: "@aitaoussi",
    avatar: "/me hd.png",
    isNew: true,
    time: "2 minutes ago",
  },
  {
    id: 3,
    name: "Aimen Taoussi",
    username: "@aitaoussi",
    avatar: "/me hd.png",
    isNew: false,
    time: "2 minutes ago",
  },
];

export default function InboxModal() {
  return (
    <div className="fixed right-0 bottom-0 h-[700px] w-[400px] bg-white rounded-tl-2xl shadow-lg z-[50] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#015B46] overflow-hidden rounded-tl-2xl">
        <FaEnvelope className="text-white text-xl" />
        <span className="text-white text-lg font-semibold flex-1">Inbox</span>
        <button className="text-white cursor-pointer text-2xl font-bold">
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
            placeholder="Search"
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>
      </div>
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4 bg-white">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center bg-[#0A433D]/74 rounded-xl px-3 py-3 shadow-sm"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-white">
              <Image src={chat.avatar} alt={chat.name} width={48} height={48} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-base">
                  {chat.name}
                </span>
                {chat.isNew && (
                  <span className="bg-green-200 text-green-900 text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                    New
                  </span>
                )}
              </div>
              <span className="text-green-100 text-xs">{chat.username}</span>
            </div>
            <div className="flex flex-col items-end ml-2">
              <FaRegCommentDots className="text-white text-lg mb-1" />
              <span className="text-green-100 text-xs">{chat.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
