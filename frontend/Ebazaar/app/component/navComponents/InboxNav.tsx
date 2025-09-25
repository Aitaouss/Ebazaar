"use client";

import { useUser } from "@/app/eb/layout";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: string;
}

let socket: Socket;

export default function MailNav() {
  const data = useUser();
  const user = data?.user;
  const receivedMessages = data?.inbox;
  const [messages, setMessages] = useState<Message[]>([...receivedMessages]);
  const [input, setInput] = useState("");
  const userId = user?.id;
  const receiverId = user?.name == "Aimen Taoussi" ? 7 : 1; // Replace with the person you are chatting with
  const senderName = user?.name || "You";
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
      },
    ]);
    setInput("");
  };
  console.log("Messages : ", messages);
  return (
    <div className="w-full flex flex-col items-center justify-center h-full p-10">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-md text-center border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Inbox Chat</h1>

        <div className="h-64 overflow-y-auto border p-2 mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`text-left my-1 p-1 rounded ${
                msg.sender_id === userId ? "bg-green-200" : "bg-gray-200"
              }`}
            >
              {msg.message}
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            className="flex-1 border p-2 rounded-l"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            className="px-4 bg-blue-500 text-white rounded-r"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
