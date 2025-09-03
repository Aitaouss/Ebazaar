"use client";

import { FiTrendingUp, FiStar, FiUsers, FiDollarSign } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import { HiMail } from "react-icons/hi";
import { User } from "../../types/types";
import { useUser } from "../../../app/home/layout";

export default function HomeNav() {
  const dashboardMetrics = {
    ordersInProgress: 12,
    totalEarnings: 3200,
    activeServices: 8,
    averageRating: 4.7,
    todaysEarnings: 120,
    weeklyEarnings: 850,
    customerSatisfaction: 96,
  };

  const recentOrders = [
    {
      id: 1,
      name: "Wassim Bolles",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      status: "In Progress",
      amount: 250,
    },
    {
      id: 2,
      name: "Othman dazai",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      status: "Completed",
      amount: 250,
    },
    {
      id: 3,
      name: "Oussama taoussi",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      status: "Cancelled",
      amount: 250,
    },
    {
      id: 4,
      name: "Othman dazai",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      status: "Completed",
      amount: 250,
    },
    {
      id: 5,
      name: "Othman dazai",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      status: "Completed",
      amount: 250,
    },
  ];

  const messages = [
    {
      id: 1,
      name: "Othman dazai",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      message:
        "Hi! I have a question about the custom logo design package. When can we schedule a call?",
      time: "2 minutes ago",
      isNew: true,
    },
    {
      id: 2,
      name: "Othman dazai",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      message:
        "Hi! I have a question about the custom logo design package. When can we schedule a call?",
      time: "2 minutes ago",
      isNew: true,
    },
    {
      id: 3,
      name: "Othman dazai",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      message:
        "Hi! I have a question about the custom logo design package. When can we schedule a call?",
      time: "2 minutes ago",
      isNew: false,
    },
  ];
  const userData = useUser() as User;

  return (
    <main className="mt-8 mb-8 flex-1 ">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#13120F] mb-2">
          Welcome {userData.name}
        </h1>
        <p className="text-gray-600">
          {"Here's an overview of your business today."}
        </p>
      </div>

      {/* Overview Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#13120F] mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Orders in Progress */}
          <div className="bg-[#015B46] text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium opacity-90">
                Orders in Progress
              </h3>
              <FiTrendingUp className="text-orange-400" size={20} />
            </div>
            <div className="text-3xl font-bold mb-2">
              {dashboardMetrics.ordersInProgress}
            </div>
            <div className="text-xs opacity-75">
              <span className="text-orange-400">+8.5%</span> from last week
            </div>
          </div>

          {/* Total Earnings */}
          <div className="bg-[#015B46] text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium opacity-90">Total Earnings</h3>
              <FiDollarSign className="text-green-400" size={20} />
            </div>
            <div className="text-3xl font-bold mb-2">
              ${dashboardMetrics.totalEarnings.toLocaleString()}
            </div>
            <div className="text-xs opacity-75">
              <span className="text-green-400">+12.3%</span> from last month
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
            <div className="text-3xl font-bold mb-2">
              {dashboardMetrics.activeServices}
            </div>
            <div className="text-xs opacity-75">Live products/services</div>
          </div>

          {/* Average Rating */}
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium opacity-90">Average Rating</h3>
              <FiStar className="text-yellow-200" size={20} />
            </div>
            <div className="text-3xl font-bold mb-2 flex items-center gap-2">
              {dashboardMetrics.averageRating}{" "}
              <FiStar className="text-yellow-200" size={24} />
            </div>
            <div className="text-xs opacity-75">
              <span className="text-yellow-200">3 new reviews</span> this week
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
            <div className="text-3xl font-bold">
              ${dashboardMetrics.todaysEarnings}
            </div>
          </div>

          <div className="bg-gray-600 text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium opacity-90">Weekly earning</h3>
              <FiDollarSign className="text-red-400" size={20} />
            </div>
            <div className="text-3xl font-bold">
              ${dashboardMetrics.weeklyEarnings}
            </div>
          </div>

          <div className="bg-[#015B46] text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium opacity-90">
                Customer Satisfaction
              </h3>
              <FiUsers className="text-blue-400" size={20} />
            </div>
            <div className="text-3xl font-bold mb-2">
              {dashboardMetrics.customerSatisfaction}%
            </div>
            <div className="text-xs opacity-75">
              <span className="text-blue-400">+2%</span> from last month
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Preview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#13120F]">
            Recent Orders Preview
          </h2>
          <button className="text-[#015B46] hover:underline font-medium flex items-center gap-2 cursor-pointer">
            View All orders →
          </button>
        </div>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <img
                  src={order.avatar || "/placeholder.svg"}
                  alt={order.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="font-medium text-[#13120F]">{order.name}</span>
              </div>
              <div className="flex items-center gap-4 justify-between w-[50%]">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    order.status === "In Progress"
                      ? "bg-yellow-500 text-white"
                      : order.status === "Completed"
                      ? "bg-[#015B46] text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {order.status}
                </span>
                <span className="font-bold text-[#13120F]">
                  ${order.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-[#13120F]">Messages</h2>
            <span className="bg-[#015B46] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
              2 new <HiMail size={16} />
            </span>
          </div>
          <button className="text-[#015B46] hover:underline font-medium flex items-center gap-2 cursor-pointer">
            View All messages →
          </button>
        </div>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-6 rounded-xl ${
                message.isNew
                  ? "bg-[#015B46] text-white"
                  : "bg-gray-600 text-white"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <img
                    src={message.avatar || "/placeholder.svg"}
                    alt={message.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold">{message.name}</h3>
                      {message.isNew && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm opacity-90 mb-2">{message.message}</p>
                    <span className="text-xs opacity-75">{message.time}</span>
                  </div>
                </div>
                <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <HiMail size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
