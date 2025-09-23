"use client";

import { FiTrendingUp, FiStar, FiUsers, FiDollarSign } from "react-icons/fi";
import { HiMail } from "react-icons/hi";
import { User } from "../../types/types";
import { useUser } from "../../eb/layout";
import { useEffect, useState } from "react";

export default function HomeNav() {
  // const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const [orders, setOrders] = useState<any[]>([]);
  // const [products, setProducts] = useState<any[]>([]);
  // const [reviews, setRreviews] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [satisfaction, setSatisfaction] = useState<number>(0);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  // const [messages, setMessages] = useState<any[]>([]);
  const data = useUser();
  const userData = data?.user;
  const orders = data?.orders;
  const products = data?.products;
  const reviews = data?.reviews;
  const messages = data?.inbox;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/me`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          // setUserData(data.user);
          // setOrders(data.orders || []);
          // setProducts(data.products || []);
          // setRreviews(data.reviews || []);
          // setMessages(data.inbox || []);
          if (data.reviews && data.reviews.length > 0) {
            const total = data.reviews.reduce(
              (sum: number, review: any) => sum + review.rating,
              0
            );
            const avgRating = total / data.reviews.length;
            setAverageRating(avgRating);

            // Customer satisfaction % (avg / 5 * 100)
            const satisfaction = (avgRating / 5) * 100;
            setSatisfaction(satisfaction);
          } else {
            setAverageRating(0);
            setSatisfaction(0);
          }
          if (data.orders) {
            const recent = data.orders
              .slice(-5) // take last 5
              .reverse(); // make newest first
            setRecentOrders(recent);
          }
          setLoading(false);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-semibold">Wait a moment</h1>
      </div>
    );
  }
  return (
    <main className="flex-1">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#13120F] mb-2">
          Welcome {userData.name}
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          {"Here's an overview of your business today."}
        </p>
      </div>

      {/* Overview Section */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[#13120F] mb-6">
          Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Orders in Progress */}
          <div className="bg-[#015B46] text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium opacity-90">
                Orders in Progress
              </h3>
              <FiTrendingUp className="text-orange-400" size={20} />
            </div>
            <div className="text-3xl font-bold mb-2">{orders.length}</div>
            <div className="text-xs opacity-75">
              <span className="text-orange-400">+0%</span> from last week
            </div>
          </div>

          {/* Total Earnings */}
          <div className="bg-[#015B46] text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium opacity-90">Total Earnings</h3>
              <FiDollarSign className="text-green-400" size={20} />
            </div>
            <div className="text-3xl font-bold mb-2">
              ${userData.balance || 0}
            </div>
            <div className="text-xs opacity-75">
              <span className="text-green-400">0%</span> from last month
            </div>
          </div>

          {/* Active Services */}
          <div className="bg-[#015B46] text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium opacity-90">
                Active Services
              </h3>
              <FiUsers className="text-blue-400" size={20} />
            </div>
            <div className="text-3xl font-bold mb-2">{products.length}</div>
            <div className="text-xs opacity-75">Live products/services</div>
          </div>

          {/* Average Rating */}
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium opacity-90">Average Rating</h3>
              <FiStar className="text-yellow-200" size={20} />
            </div>
            <div className="text-3xl font-bold mb-2 flex items-center gap-2">
              {averageRating}
              <FiStar className="text-yellow-200" size={24} />
            </div>
            <div className="text-xs opacity-75">
              <span className="text-yellow-200">
                {reviews.length} review{reviews.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#015B46] text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium opacity-90">
                {"Today's Earnings"}
              </h3>
              <FiTrendingUp className="text-green-400" size={20} />
            </div>
            <div className="text-3xl font-bold">${userData.balance || 0}</div>
          </div>

          <div className="bg-gray-600 text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium opacity-90">Weekly earning</h3>
              <FiDollarSign className="text-red-400" size={20} />
            </div>
            <div className="text-3xl font-bold">${userData.balance || 0}</div>
          </div>

          <div className="bg-[#015B46] text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium opacity-90">
                Customer Satisfaction
              </h3>
              <FiUsers className="text-blue-400" size={20} />
            </div>
            <div className="text-3xl font-bold mb-2">{satisfaction}%</div>
            <div className="text-xs opacity-75">
              from {reviews.length} client
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Preview */}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#13120F]">
            Recent Orders Preview
          </h2>
          <button className="text-sm sm:text-base text-[#015B46] hover:underline font-medium flex items-center gap-2 cursor-pointer">
            View All orders →
          </button>
        </div>
        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  {order.buyer_image ? (
                    <img
                      src={order.buyer_image || "/public/EBAZAAR default.png"}
                      alt={order.buyer_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-[#015B46] rounded-full flex items-center justify-center">
                      <h1 className="text-white font-semibold">
                        {order.buyer_name.charAt(0).toUpperCase()}
                      </h1>
                    </div>
                  )}
                  <span className="text-sm sm:text-base font-medium text-[#13120F]">
                    {order.buyer_name || "test"}
                  </span>
                </div>
                <div className="flex items-center gap-4 justify-between w-[50%]">
                  <span
                    className={` px-4 py-1 rounded-full text-[0.8rem] sm:text-sm font-medium ${
                      order.status === "Processing"
                        ? "bg-yellow-500 text-white"
                        : order.status === "Shipped"
                        ? "bg-blue-500 text-white"
                        : order.status === "Delivered"
                        ? "bg-[#015B46] text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#13120F]">
                    ${order.total_price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600">No recent orders available.</div>
        )}
      </div>

      {/* Messages Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#13120F]">
              Messages
            </h2>
            <span className="bg-[#015B46] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
              {messages.length} new <HiMail size={16} />
            </span>
          </div>
          <button className="text-sm sm:text-base text-[#015B46] hover:underline font-medium flex items-center gap-2 cursor-pointer">
            View All messages →
          </button>
        </div>
        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message: any) => (
              <div
                key={message.id}
                className={`p-6 rounded-xl ${
                  message.is_read
                    ? "bg-[#015B46] text-white"
                    : "bg-gray-600 text-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {message.sender_image ? (
                      <img
                        src={
                          message.sender_image || "/public/EBAZAAR default.png"
                        }
                        alt={message.sender_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-[#015B46] rounded-full flex items-center justify-center">
                        <h1 className="text-white font-semibold">
                          {message.sender_name.charAt(0).toUpperCase()}
                        </h1>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold">
                          {message.sender_name || "Dummy"}
                        </h3>
                        {message.is_read ? (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            New
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <p className="text-sm opacity-90 mb-2">
                        {message.message}
                      </p>
                      <span className="text-xs opacity-75">{message.time}</span>
                    </div>
                  </div>
                  {/* <button className="w-4 h-4 px-2 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"> */}
                  <HiMail className="w-8 h-8" />
                  {/* </button> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600">No new messages available.</div>
        )}
      </div>
    </main>
  );
}
