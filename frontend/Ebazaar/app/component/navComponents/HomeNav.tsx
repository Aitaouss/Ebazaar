"use client";

import { FiTrendingUp, FiStar, FiUsers, FiDollarSign } from "react-icons/fi";
import { HiMail } from "react-icons/hi";
import { User } from "../../types/types";
import { useUser } from "../../eb/layout";
import { useEffect, useState } from "react";
import LoadingSpinner from "../loading/page";
import { Clock } from "lucide-react";

export default function HomeNav() {
  const [loading, setLoading] = useState<boolean>(true);

  const [averageRating, setAverageRating] = useState<number>(0);
  const [satisfaction, setSatisfaction] = useState<number>(0);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const data = useUser();
  const userData = data?.user;
  const orders = data?.orders;
  const products = data?.products;
  const reviews = data?.reviews;
  const messages = data?.inbox;
  const messagesWithoutMe = messages?.filter(
    (msg: any) => msg.sender_id !== userData.id
  );
  const messagesWithoutDuplicate = Array.from(
    new Map(
      messagesWithoutMe?.map((msg: any) => [msg.sender_name, msg])
    ).values()
  );
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/me`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();

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

  const GoToInbox = () => {
    window.location.href = `/eb/${userData.username}/inbox`;
  };
  console.log("Messages : ", messages);
  return (
    <>
      {loading && (
        <div className="fixed h-screen top-20 left-0 w-full z-50 flex items-center justify-center">
          <div className="flex items-center gap-4 text-white animate-bounce">
            <Clock className="animate-spin h-8 w-8" color="#fff" />
            <span className="text-white text-xl font-semibold ">
              Loading...
            </span>
          </div>
        </div>
      )}
      <main
        className={`flex-1 ${
          loading && "blur-xl bg-black/50 pointer-events-none"
        } `}
      >
        {/* Welcome Section */}
        <div className="mb-10 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Welcome back,{" "}
            <span className="text-gray-900 font-bold">{userData.name}</span>
          </h1>
          <p className="mt-2 text-base sm:text-lg text-gray-500 ">
            Here’s a quick snapshot of your business performance.
          </p>
        </div>

        {/* Overview Section */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#13120F] mb-6">
            Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Orders in Progress */}
            <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#015B46] rounded-xl group-hover:bg-[#014239] transition-colors">
                    <FiTrendingUp className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">
                      Orders in Progress
                    </h3>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {orders?.length || 0}
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-orange-500 font-medium">+0%</span> from
                last week
              </div>
            </div>

            {/* Total Earnings */}
            <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#A44A3F] rounded-xl group-hover:bg-[#8B3E35] transition-colors">
                    <FiDollarSign className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">
                      Total Earnings
                    </h3>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ${userData.balance || 0}
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-green-500 font-medium">0%</span> from last
                month
              </div>
            </div>

            {/* Active Services */}
            <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#015B46] rounded-xl group-hover:bg-[#014239] transition-colors">
                    <FiUsers className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">
                      Active Services
                    </h3>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {products?.length}
              </div>
              <div className="text-sm text-gray-600">
                Live products/services
              </div>
            </div>

            {/* Average Rating */}
            <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#FFD700] rounded-xl group-hover:bg-[#FFD709] transition-colors">
                    <FiStar className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">
                      Average Rating
                    </h3>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                {averageRating.toFixed(1)}
                <FiStar className="text-yellow-500" size={20} />
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-yellow-500 font-medium">
                  {reviews?.length} review{reviews?.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#015B46] rounded-xl group-hover:bg-[#014239] transition-colors">
                    <FiTrendingUp className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">
                      {"Today's Earnings"}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ${userData.balance || 0}
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-emerald-500 font-medium">+5.2%</span> from
                yesterday
              </div>
            </div>

            <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#A44A3F] rounded-xl group-hover:bg-[#8B3E35] transition-colors">
                    <FiDollarSign className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">
                      Weekly Earnings
                    </h3>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ${(userData.balance || 0) * 7}
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-purple-500 font-medium">+12.3%</span> from
                last week
              </div>
            </div>

            <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#015B46] rounded-xl group-hover:bg-[#014239] transition-colors">
                    <FiUsers className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">
                      Customer Satisfaction
                    </h3>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {satisfaction.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-indigo-500 font-medium">
                  {reviews?.length} client{reviews?.length !== 1 ? "s" : ""}
                </span>{" "}
                reviewed
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
                  className="flex items-center justify-between p-4 bg-[#015B46] rounded-xl shadow-sm"
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
                    <span className="text-sm sm:text-base font-semibold text-white">
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
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white">
                      ${order.total_price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white w-full h-[200px] rounded-lg shadow-lg flex items-center justify-center">
              <h1 className="text-xl text-black font-medium animate-bounce">
                No orders available.
              </h1>
            </div>
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
                {/* {messages?.map((message: any) => {
                message.is_read;
              })}
              new <HiMail size={16} /> */}
                {/* map on message and return the number of message that has is_read */}
                {messages?.filter((message: any) => message.is_read).length} Not
                seen
              </span>
            </div>
            <button
              className="text-sm sm:text-base text-[#015B46] hover:underline font-medium flex items-center gap-2 cursor-pointer"
              onClick={GoToInbox}
            >
              View All messages →
            </button>
          </div>
          {messagesWithoutDuplicate?.length > 0 ? (
            <div className="space-y-4">
              {messagesWithoutDuplicate?.map((message: any) => (
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
                            message.sender_image ||
                            "/public/EBAZAAR default.png"
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
                              Not seen
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <p className="text-sm opacity-90 mb-2">
                          {message.message}
                        </p>
                        <span className="text-xs opacity-75">
                          {message.time}
                        </span>
                      </div>
                    </div>
                    <button className="cursor-pointer" onClick={GoToInbox}>
                      <HiMail className="w-8 h-8 " />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-600">No new messages available.</div>
          )}
        </div>
      </main>
    </>
  );
}
