"use client";

import { FiTrendingUp, FiStar, FiUsers, FiDollarSign } from "react-icons/fi";
import { HiMail } from "react-icons/hi";
import { User } from "../../types/types";
import { useUser } from "../../context/UserContext";
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
      // Check if user is beta user
      const auth = localStorage.getItem("auth");
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");

      if (auth === "true" && email === "beta" && password === "beta123") {
        // Beta user - use mock data instead of backend fetch
        setAverageRating(4.5);
        setSatisfaction(90);
        setRecentOrders([
          {
            id: 1,
            product_name: "Handwoven Moroccan Rug",
            buyer_name: "Alice Johnson",
            buyer_image: null,
            price: 299.99,
            total_price: 299.99,
            status: "Delivered",
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            product_name: "Artisan Leather Bag",
            buyer_name: "Bob Wilson",
            buyer_image: null,
            price: 189.5,
            total_price: 189.5,
            status: "Shipped",
            created_at: new Date(Date.now() - 86400000).toISOString(),
          },
        ]);
        setLoading(false);
        return;
      }

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
        <div className="mb-5 py-8">
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
            <div className="bg-gradient-to-r from-[#015B46] to-[#017A5B] text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl group-hover:bg-white/30 transition-colors">
                    <FiTrendingUp className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Orders in Progress
                    </h3>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {orders?.length || 0}
              </div>
              <div className="text-sm text-white/80">
                <span className="text-orange-300 font-medium">+0%</span> from
                last week
              </div>
            </div>

            {/* Total Earnings */}
            <div className="bg-[#fff] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#015B46]/10 backdrop-blur-sm rounded-lg group-hover:bg-[#015B46]/20 transition-colors">
                    <FiDollarSign className="text-[#015B46]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#015B46]">
                      Total Earnings
                    </h3>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-[#015B46] mb-2">
                ${userData.balance || 0}
              </div>
              <div className="text-sm text-[#015B46]/70">
                <span className="text-green-600 font-medium">0%</span> from last
                month
              </div>
            </div>

            {/* Active Services */}
            <div className="bg-gradient-to-r from-[#015B46] to-[#017A5B] text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-white/30 transition-colors">
                    <FiUsers className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Active Services
                    </h3>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {products?.length}
              </div>
              <div className="text-sm text-white/80">
                Live products/services
              </div>
            </div>

            {/* Average Rating */}
            <div className="bg-[#fff] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#015B46]/10 backdrop-blur-sm rounded-lg group-hover:bg-[#015B46]/20 transition-colors">
                    <FiStar className="text-[#015B46]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#015B46]">
                      Average Rating
                    </h3>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-[#015B46] mb-2 flex items-center gap-2">
                {averageRating.toFixed(1)}
                <FiStar className="text-[#015B46]" size={20} />
              </div>
              <div className="text-sm text-[#015B46]/70">
                <span className="text-orange-600 font-medium">
                  {reviews?.length} review{reviews?.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-[#015B46] to-[#017A5B] text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-white/30 transition-colors">
                    <FiTrendingUp className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {"Today's Earnings"}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                ${userData.balance || 0}
              </div>
              <div className="text-sm text-white/80">
                <span className="text-emerald-300 font-medium">+5.2%</span> from
                yesterday
              </div>
            </div>

            <div className="bg-[#fff] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#015B46]/10 backdrop-blur-sm rounded-lg group-hover:bg-[#015B46]/20 transition-colors">
                    <FiDollarSign className="text-[#015B46]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#015B46]">
                      Weekly Earnings
                    </h3>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-[#015B46] mb-2">
                ${(userData.balance || 0) * 7}
              </div>
              <div className="text-sm text-[#015B46]/70">
                <span className="text-purple-600 font-medium">+12.3%</span> from
                last week
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#015B46] to-[#017A5B] text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-white/30 transition-colors">
                    <FiUsers className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Customer Satisfaction
                    </h3>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {satisfaction.toFixed(1)}%
              </div>
              <div className="text-sm text-white/80">
                <span className="text-indigo-300 font-medium">
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
                  className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    {order.buyer_image ? (
                      <img
                        src={order.buyer_image || "/public/EBAZAAR default.png"}
                        alt={order.buyer_name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 shadow-md"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gradient-to-r from-[#015B46] to-[#017A5B] rounded-full flex items-center justify-center shadow-lg">
                        <h1 className="text-white font-bold text-lg">
                          {order.buyer_name?.charAt(0)?.toUpperCase() || "C"}
                        </h1>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-gray-900">
                        {order.buyer_name || "Customer"}
                      </span>
                      <span className="text-sm text-gray-500">
                        Order #{order.id}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span
                      className={`px-4 py-2 rounded-lg text-sm font-semibold ${
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
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">
                        ${order.total_price || order.price || 0}
                      </span>
                      <p className="text-sm text-gray-500">Total</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg shadow-lg p-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#015B46] to-[#017A5B] rounded-full flex items-center justify-center mb-6 shadow-xl">
                <FiTrendingUp className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No Orders Yet
              </h3>
              <p className="text-gray-600 mb-4 max-w-md">
                Your orders will appear here once customers start purchasing
                your products and services.
              </p>
              <div className="bg-[#015B46]/10 rounded-lg p-4 max-w-sm">
                <p className="text-[#015B46] text-sm font-medium">
                  💡 Tip: Promote your services to get your first orders!
                </p>
              </div>
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
                  className="p-6 bg-white border border-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={GoToInbox}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {message.sender_image ? (
                        <img
                          src={
                            message.sender_image ||
                            "/public/EBAZAAR default.png"
                          }
                          alt={message.sender_name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 shadow-md"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gradient-to-r from-[#015B46] to-[#017A5B] rounded-full flex items-center justify-center shadow-lg">
                          <h1 className="text-white font-bold text-lg">
                            {message.sender_name?.charAt(0)?.toUpperCase() ||
                              "U"}
                          </h1>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-gray-900 truncate">
                            {message.sender_name || "Dummy"}
                          </h3>
                          {message.is_read ? (
                            <span className="bg-[#A44A3F] text-white px-3 py-1 rounded-full text-xs font-medium">
                              Unread
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {message.message || "No message preview"}
                        </p>
                        <span className="text-xs text-gray-500">
                          {message.time ||
                            new Date(message.created_at).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 p-3 bg-gray-50 rounded-lg group-hover:bg-[#015B46] group-hover:text-white transition-colors">
                      <HiMail className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg shadow-lg p-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#015B46] to-[#017A5B] rounded-full flex items-center justify-center mb-6 shadow-xl">
                <HiMail className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No Messages Yet
              </h3>
              <p className="text-gray-600 mb-4 max-w-md">
                Your messages from customers and other users will appear here.
              </p>
              <div className="bg-[#015B46]/10 rounded-lg p-4 max-w-sm">
                <p className="text-[#015B46] text-sm font-medium">
                  💬 Tip: Start engaging with customers to receive messages!
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
