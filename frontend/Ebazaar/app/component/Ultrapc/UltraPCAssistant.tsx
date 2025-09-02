// components/UltraPCAssistant.jsx
import React, { useState, useEffect, useRef } from "react";

const QUICK_REPLIES = [
  "Show me gaming PCs",
  "What are the latest promotions?",
  "Where is the nearest store?",
  "How can I track my order?",
];

const FAQ_ANSWERS = {
  "What payment methods are accepted?":
    "We accept all major credit cards, PayPal, and cash on delivery at our stores.",
  "What is the warranty policy?":
    "All products come with a minimum 1-year warranty. Specific warranty details depend on the product category.",
  "How can I contact customer service?":
    "You can contact our customer service via email at support@ultrapc.ma or call us at +212 5 22 00 00 00.",
};

// Sample product recommendations based on keywords
const PRODUCT_RECOMMENDATIONS = {
  gaming: [
    {
      name: "PC Gamer UltraPC Ryzen 7 5700X/1TB SSD/16GB/RTX3060 12GB",
      price: "6 599 MAD",
      url: "#",
    },
    {
      name: "XTRMLAB GAME PAD (XXL)",
      price: "129 MAD",
      url: "#",
    },
  ],
  promotions: [
    {
      name: "Razer Blackshark V2 X (Noir) - Promo",
      price: "659 MAD (was 929 MAD)",
      url: "#",
    },
    {
      name: 'XTRMLAB X27G18IFF 27" 180Hz IPS - Promo',
      price: "1 399 MAD (was 1 799 MAD)",
      url: "#",
    },
  ],
};

export default function UltraPCAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hello! Welcome to UltraPC. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll chat to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mock AI response function - replace with real AI backend integration
  function getAIResponse(userMessage) {
    const msg = userMessage.toLowerCase();

    // Intents with keywords and response functions
    const intents = [
      {
        keywords: [
          "gaming pc",
          "gaming pcs",
          "gaming computer",
          "gaming laptop",
          "gaming",
        ],
        response: () =>
          "Here are some gaming PCs you might like:\n" +
          PRODUCT_RECOMMENDATIONS.gaming
            .map((p) => `- ${p.name} for ${p.price}`)
            .join("\n"),
      },
      {
        keywords: ["laptop", "laptops"],
        response: () =>
          "We offer a variety of laptops including gaming, office, and ultrabooks. Check out our catalog at https://www.ultrapc.ma/laptops",
      },
      {
        keywords: ["desktop", "desktops", "pc", "pcs", "computer", "computers"],
        response: () =>
          "We have desktops for gaming, office, and custom builds. Visit https://www.ultrapc.ma/desktops for more info.",
      },
      {
        keywords: ["monitor", "monitors", "screen", "screens"],
        response: () =>
          "Explore our selection of monitors here: https://www.ultrapc.ma/monitors",
      },
      {
        keywords: [
          "accessory",
          "accessories",
          "keyboard",
          "mouse",
          "headset",
          "gamepad",
        ],
        response: () =>
          "We have a wide range of accessories including keyboards, mice, headsets, and gamepads. Visit https://www.ultrapc.ma/accessories",
      },
      {
        keywords: ["custom pc", "custom build", "build my pc", "assemble pc"],
        response: () =>
          "Yes, we offer custom PC builds tailored to your needs. Contact us or visit https://www.ultrapc.ma/custom-builds",
      },
      {
        keywords: ["specs", "specifications", "details", "features"],
        response: () =>
          "Please specify the product name or category you want specs for, and I'll help you with details.",
      },
      {
        keywords: ["new", "refurbished", "condition"],
        response: () =>
          "All our products are brand new and come with official warranty and support.",
      },
      {
        keywords: [
          "promotion",
          "promotions",
          "discount",
          "sale",
          "offers",
          "bundle",
        ],
        response: () =>
          "Check out our latest promotions:\n" +
          PRODUCT_RECOMMENDATIONS.promotions
            .map((p) => `- ${p.name} at ${p.price}`)
            .join("\n"),
      },
      {
        keywords: [
          "nearest store",
          "store location",
          "where is the store",
          "store near me",
          "store hours",
          "opening hours",
          "hours",
        ],
        response: () =>
          "Our main store is located in Casablanca, Morocco. Store hours are Monday to Saturday, 9:00 AM to 7:00 PM. Visit https://www.ultrapc.ma/store-locator for details.",
      },
      {
        keywords: ["stores outside casablanca", "other stores", "branches"],
        response: () =>
          "Currently, our main store is in Casablanca. We plan to expand soon. Stay tuned!",
      },
      {
        keywords: [
          "track order",
          "order status",
          "where is my order",
          "order tracking",
        ],
        response: () =>
          "You can track your order by logging into your account on our website and visiting the 'My Orders' section.",
      },
      {
        keywords: [
          "shipping",
          "delivery",
          "shipping options",
          "delivery time",
          "how long delivery",
        ],
        response: () =>
          "We offer multiple shipping options including home delivery and store pickup. Delivery times vary by location, typically 2-5 business days.",
      },
      {
        keywords: ["change order", "cancel order", "modify order"],
        response: () =>
          "To change or cancel your order, please contact our customer service as soon as possible.",
      },
      {
        keywords: [
          "payment",
          "payment methods",
          "pay",
          "how to pay",
          "cash on delivery",
        ],
        response: () => FAQ_ANSWERS["What payment methods are accepted?"],
      },
      {
        keywords: [
          "warranty",
          "guarantee",
          "return policy",
          "return",
          "refund",
          "claim warranty",
        ],
        response: () => FAQ_ANSWERS["What is the warranty policy?"],
      },
      {
        keywords: [
          "contact",
          "customer service",
          "support",
          "help",
          "phone",
          "email",
          "live chat",
        ],
        response: () => FAQ_ANSWERS["How can I contact customer service?"],
      },
      {
        keywords: ["create account", "sign up", "register"],
        response: () =>
          "You can create an account by clicking on the 'Sign Up' button at the top right of the website.",
      },
      {
        keywords: ["reset password", "forgot password"],
        response: () =>
          "To reset your password, click on 'Forgot Password' on the login page and follow the instructions.",
      },
      {
        keywords: ["return policy", "return product", "how to return"],
        response: () =>
          "Our return policy allows returns within 14 days of purchase. Products must be in original condition. Contact customer service for assistance.",
      },
    ];

    // Score each intent by counting keyword matches
    let bestIntent = null;
    let bestScore = 0;

    for (const intent of intents) {
      let score = 0;
      for (const kw of intent.keywords) {
        if (msg.includes(kw)) score++;
      }
      if (score > bestScore) {
        bestScore = score;
        bestIntent = intent;
      }
    }

    // Threshold for matching intent (at least 1 keyword)
    if (bestIntent && bestScore > 0) {
      return bestIntent.response();
    }

    // If user input contains general PC-related words, respond accordingly
    if (
      msg.includes("pc") ||
      msg.includes("computer") ||
      msg.includes("laptop")
    ) {
      return "We have a wide range of PCs available! You can ask me about gaming PCs, laptops, desktops, or accessories. What are you interested in?";
    }

    // Generic fallback response
    return "I'm here to help! You can ask me about gaming PCs, promotions, store locations, order tracking, payment methods, warranty, or customer service. If you have a specific question, just ask!";
  }

  function handleSend() {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse = getAIResponse(userMessage);
      setMessages((prev) => [...prev, { from: "bot", text: botResponse }]);
    }, 700);
  }

  function handleQuickReply(reply) {
    setMessages((prev) => [...prev, { from: "user", text: reply }]);
    setIsOpen(true);

    setTimeout(() => {
      const botResponse = getAIResponse(reply);
      setMessages((prev) => [...prev, { from: "bot", text: botResponse }]);
    }, 500);
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        aria-label="Open chat"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-ultrapc-blue hover:bg-ultrapc-blue-dark p-4 shadow-lg text-white transition"
        title="Chat with UltraPC Assistant"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z"
            />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 max-w-full bg-white rounded-lg shadow-xl flex flex-col border border-ultrapc-blue">
          {/* Header */}
          <div className="bg-ultrapc-blue text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
            <h2 className="font-semibold text-lg">UltraPC Assistant</h2>
            <button
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
              className="hover:text-ultrapc-blue-light"
            >
              &times;
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-3 max-h-96 scrollbar-thin scrollbar-thumb-ultrapc-blue scrollbar-track-gray-100"
            aria-live="polite"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`rounded-lg px-3 py-2 max-w-[75%] whitespace-pre-line ${
                    msg.from === "bot"
                      ? "bg-ultrapc-blue-light text-ultrapc-blue-dark"
                      : "bg-ultrapc-blue text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="border-t border-ultrapc-blue-light px-4 py-2 bg-gray-50 flex flex-wrap gap-2">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => handleQuickReply(reply)}
                className="bg-ultrapc-blue text-white px-3 py-1 rounded hover:bg-ultrapc-blue-dark transition text-sm"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex border-t border-ultrapc-blue-light"
          >
            <input
              type="text"
              aria-label="Type your message"
              className="flex-1 px-4 py-2 focus:outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-ultrapc-blue text-white px-4 py-2 hover:bg-ultrapc-blue-dark transition"
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Tailwind CSS Custom Colors for UltraPC Branding */}
      <style jsx global>{`
        :root {
          --ultrapc-blue: #1e40af; /* Adjust to UltraPC's primary blue */
          --ultrapc-blue-dark: #1e3a8a;
          --ultrapc-blue-light: #bfdbfe;
        }
        .bg-ultrapc-blue {
          background-color: var(--ultrapc-blue);
        }
        .bg-ultrapc-blue-dark {
          background-color: var(--ultrapc-blue-dark);
        }
        .bg-ultrapc-blue-light {
          background-color: var(--ultrapc-blue-light);
        }
        .text-ultrapc-blue {
          color: var(--ultrapc-blue);
        }
        .text-ultrapc-blue-dark {
          color: var(--ultrapc-blue-dark);
        }
        .text-ultrapc-blue-light {
          color: var(--ultrapc-blue-light);
        }
        .border-ultrapc-blue {
          border-color: var(--ultrapc-blue);
        }
        .border-ultrapc-blue-light {
          border-color: var(--ultrapc-blue-light);
        }
      `}</style>
    </>
  );
}
