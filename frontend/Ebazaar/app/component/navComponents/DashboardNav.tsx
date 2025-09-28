"use client";

import {
  FiTrendingUp,
  FiStar,
  FiUsers,
  FiDollarSign,
  FiPackage,
  FiShoppingCart,
  FiEye,
  FiCalendar,
  FiArrowUp,
  FiArrowDown,
  FiMoreVertical,
} from "react-icons/fi";
import { HiMail } from "react-icons/hi";
import { Clock, TrendingUp, TrendingDown } from "lucide-react";

export default function DashboardNav() {
  // Static data for the dashboard
  const stats = {
    totalRevenue: 24576,
    totalOrders: 1430,
    totalProducts: 89,
    activeCustomers: 2847,
    conversionRate: 3.2,
    averageOrderValue: 89.5,
  };

  const recentOrders = [
    {
      id: 1,
      customer: "John Smith",
      product: "Wireless Headphones",
      amount: 199.99,
      status: "Processing",
      date: "2025-09-28",
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      product: "Laptop Stand",
      amount: 49.99,
      status: "Shipped",
      date: "2025-09-27",
    },
    {
      id: 3,
      customer: "Mike Chen",
      product: "Gaming Mouse",
      amount: 79.99,
      status: "Delivered",
      date: "2025-09-27",
    },
    {
      id: 4,
      customer: "Emma Davis",
      product: "Phone Case",
      amount: 24.99,
      status: "Processing",
      date: "2025-09-26",
    },
    {
      id: 5,
      customer: "Alex Wilson",
      product: "Bluetooth Speaker",
      amount: 129.99,
      status: "Cancelled",
      date: "2025-09-26",
    },
  ];

  const topProducts = [
    {
      id: 1,
      name: "Wireless Headphones Pro",
      sales: 234,
      revenue: 46800,
      growth: 12.5,
    },
    {
      id: 2,
      name: "Smart Watch Series X",
      sales: 189,
      revenue: 37800,
      growth: -3.2,
    },
    {
      id: 3,
      name: "Gaming Keyboard RGB",
      sales: 156,
      revenue: 15600,
      growth: 8.7,
    },
    {
      id: 4,
      name: "USB-C Hub Multiport",
      sales: 143,
      revenue: 7150,
      growth: 15.3,
    },
    { id: 5, name: "Wireless Mouse", sales: 128, revenue: 6400, growth: -1.8 },
  ];

  const salesData = [
    { month: "Jan", sales: 4200 },
    { month: "Feb", sales: 3800 },
    { month: "Mar", sales: 5200 },
    { month: "Apr", sales: 4700 },
    { month: "May", sales: 6100 },
    { month: "Jun", sales: 5800 },
  ];

  return (
    <div className="h-full w-full">
      <div className="w-full mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#13120F] mb-2">
            Dashboard Analytics
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Monitor your business performance and key metrics
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#13120F] mb-6">
            Key Performance Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Revenue */}
            <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#015B46] rounded-lg group-hover:bg-[#014239] transition-colors">
                    <FiDollarSign className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">
                      Total Revenue
                    </h3>
                  </div>
                </div>
                <div className="flex items-center text-green-500">
                  <FiArrowUp size={16} />
                  <span className="text-xs font-medium ml-1">+12.5%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ${stats.totalRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-green-500 font-medium">+$2,450</span> from
                last month
              </div>
            </div>

            {/* Total Orders */}
            <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#A44A3F] rounded-lg group-hover:bg-[#8B3E35] transition-colors">
                    <FiShoppingCart className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">
                      Total Orders
                    </h3>
                  </div>
                </div>
                <div className="flex items-center text-green-500">
                  <FiArrowUp size={16} />
                  <span className="text-xs font-medium ml-1">+8.2%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stats.totalOrders.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-green-500 font-medium">+105</span> orders
                this month
              </div>
            </div>

            {/* Active Customers */}
            <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#015B46] rounded-lg group-hover:bg-[#014239] transition-colors">
                    <FiUsers className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">
                      Active Customers
                    </h3>
                  </div>
                </div>
                <div className="flex items-center text-green-500">
                  <FiArrowUp size={16} />
                  <span className="text-xs font-medium ml-1">+5.7%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stats.activeCustomers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-green-500 font-medium">+162</span> new
                customers
              </div>
            </div>

            {/* Total Products */}
            <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#A44A3F] rounded-lg group-hover:bg-[#8B3E35] transition-colors">
                    <FiPackage className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">
                      Total Products
                    </h3>
                  </div>
                </div>
                <div className="flex items-center text-blue-500">
                  <FiEye size={16} />
                  <span className="text-xs font-medium ml-1">Live</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stats.totalProducts}
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-blue-500 font-medium">12</span> added this
                month
              </div>
            </div>

            {/* Conversion Rate */}
            <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#015B46] rounded-lg group-hover:bg-[#014239] transition-colors">
                    <FiTrendingUp className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">
                      Conversion Rate
                    </h3>
                  </div>
                </div>
                <div className="flex items-center text-red-500">
                  <FiArrowDown size={16} />
                  <span className="text-xs font-medium ml-1">-0.8%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stats.conversionRate}%
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-red-500 font-medium">-0.3%</span> from
                last month
              </div>
            </div>

            {/* Average Order Value */}
            <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#A44A3F] rounded-lg group-hover:bg-[#8B3E35] transition-colors">
                    <FiStar className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">
                      Avg Order Value
                    </h3>
                  </div>
                </div>
                <div className="flex items-center text-green-500">
                  <FiArrowUp size={16} />
                  <span className="text-xs font-medium ml-1">+4.3%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ${stats.averageOrderValue}
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-green-500 font-medium">+$3.20</span>{" "}
                improvement
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                Sales Overview
              </h3>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FiMoreVertical className="text-gray-400" size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {salesData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#015B46] rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                      {item.month}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">
                      ${item.sales.toLocaleString()}
                    </span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#015B46] to-[#017A5B] rounded-full"
                        style={{ width: `${(item.sales / 6500) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Top Products</h3>
              <button className="text-sm text-[#015B46] hover:underline font-medium">
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#015B46] to-[#017A5B] rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      ${product.revenue.toLocaleString()}
                    </p>
                    <p
                      className={`text-xs font-medium flex items-center gap-1 ${
                        product.growth >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {product.growth >= 0 ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}
                      {Math.abs(product.growth)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
            <button className="text-sm text-[#015B46] hover:underline font-medium">
              View All Orders →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                      #{order.id.toString().padStart(4, "0")}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#015B46] rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">
                            {order.customer.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {order.customer}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      {order.product}
                    </td>
                    <td className="py-4 px-4 text-sm font-semibold text-gray-900">
                      ${order.amount}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-[#015B46] to-[#017A5B] rounded-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <FiPackage size={24} />
              <h3 className="text-lg font-bold">Add New Product</h3>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Create a new product listing to expand your inventory
            </p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Add Product
            </button>
          </div>

          <div className="bg-gradient-to-r from-[#A44A3F] to-[#B55A4F] rounded-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <HiMail size={24} />
              <h3 className="text-lg font-bold">Customer Messages</h3>
            </div>
            <p className="text-sm opacity-90 mb-4">
              You have 5 unread messages from customers
            </p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              View Messages
            </button>
          </div>

          <div className="bg-gradient-to-r from-[#015B46] to-[#017A5B] rounded-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <FiCalendar size={24} />
              <h3 className="text-lg font-bold">Schedule Report</h3>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Generate and schedule automated reports
            </p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Schedule Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
