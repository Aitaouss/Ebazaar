"use client";

import { useState } from "react";
import {
  FiPackage,
  FiTruck,
  FiCheck,
  FiClock,
  FiX,
  FiFilter,
  FiSearch,
  FiEye,
  FiDownload,
  FiRefreshCw,
} from "react-icons/fi";

export default function OrderNav() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Static order data
  const orders = [
    {
      id: "ORD-2024-001",
      customerName: "Sarah Johnson",
      customerImage: null,
      product: "Handwoven Moroccan Rug",
      quantity: 1,
      price: 299.99,
      status: "processing",
      orderDate: "2024-03-15",
      estimatedDelivery: "2024-03-22",
      shippingAddress: "123 Main St, New York, NY 10001",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-2024-002",
      customerName: "Michael Chen",
      customerImage: null,
      product: "Artisan Leather Bag",
      quantity: 2,
      price: 189.5,
      status: "shipped",
      orderDate: "2024-03-14",
      estimatedDelivery: "2024-03-20",
      shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
      paymentMethod: "PayPal",
    },
    {
      id: "ORD-2024-003",
      customerName: "Emma Wilson",
      customerImage: null,
      product: "Traditional Ceramic Set",
      quantity: 1,
      price: 149.99,
      status: "delivered",
      orderDate: "2024-03-10",
      estimatedDelivery: "2024-03-17",
      shippingAddress: "789 Pine St, Chicago, IL 60601",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-2024-004",
      customerName: "David Rodriguez",
      customerImage: null,
      product: "Handcrafted Silver Jewelry",
      quantity: 3,
      price: 425.0,
      status: "processing",
      orderDate: "2024-03-16",
      estimatedDelivery: "2024-03-25",
      shippingAddress: "321 Elm St, Miami, FL 33101",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-2024-005",
      customerName: "Lisa Park",
      customerImage: null,
      product: "Vintage Brass Lantern",
      quantity: 1,
      price: 89.99,
      status: "cancelled",
      orderDate: "2024-03-12",
      estimatedDelivery: "2024-03-19",
      shippingAddress: "654 Maple Ave, Seattle, WA 98101",
      paymentMethod: "Credit Card",
    },
  ];

  const filterTabs = [
    { id: "all", name: "All Orders", count: orders.length },
    {
      id: "processing",
      name: "Processing",
      count: orders.filter((o) => o.status === "processing").length,
    },
    {
      id: "shipped",
      name: "Shipped",
      count: orders.filter((o) => o.status === "shipped").length,
    },
    {
      id: "delivered",
      name: "Delivered",
      count: orders.filter((o) => o.status === "delivered").length,
    },
    {
      id: "cancelled",
      name: "Cancelled",
      count: orders.filter((o) => o.status === "cancelled").length,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-500 text-white border-yellow-500";
      case "shipped":
        return "bg-blue-500 text-white border-blue-500";
      case "delivered":
        return "bg-green-500 text-white border-green-500";
      case "cancelled":
        return "bg-orange-500 text-white border-orange-500";
      default:
        return "bg-gray-500 text-white border-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <FiClock size={16} />;
      case "shipped":
        return <FiTruck size={16} />;
      case "delivered":
        return <FiCheck size={16} />;
      case "cancelled":
        return <FiX size={16} />;
      default:
        return <FiPackage size={16} />;
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      activeFilter === "all" || order.status === activeFilter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="h-full w-full p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Orders Management
            </h1>
            <p className="text-gray-600">
              Track and manage all your customer orders
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <FiRefreshCw size={16} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#015B46] to-[#017A5B] text-white rounded-lg hover:shadow-lg transition-all">
              <FiDownload size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search orders, customers, or products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <FiFilter size={16} />
            Filters
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === tab.id
                  ? "bg-gradient-to-r from-[#015B46] to-[#017A5B] text-white shadow-lg"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab.name} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left Section - Order Info */}
                <div className="flex items-start gap-4 flex-1">
                  {/* Customer Avatar */}
                  {order.customerImage ? (
                    <img
                      src={order.customerImage}
                      alt={order.customerName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-r from-[#015B46] to-[#017A5B] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {order.customerName.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Order Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">
                          {order.id}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          {order.customerName}
                        </p>
                        <p className="text-sm text-gray-500">{order.product}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${order.price}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {order.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span>
                        Ordered:{" "}
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>
                        Delivery:{" "}
                        {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>{order.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                {/* Right Section - Status and Actions */}
                <div className="flex items-center gap-4 flex-col">
                  {/* Status Badge */}
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    <span className="font-medium capitalize">
                      {order.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-[#015B46] hover:bg-gray-100 rounded-lg transition-colors">
                      <FiEye size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-[#015B46] hover:bg-gray-100 rounded-lg transition-colors">
                      <FiDownload size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPackage className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "No orders match your search criteria."
                : "You haven't received any orders yet."}
            </p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.length}
              </p>
            </div>
            <div className="p-3 bg-blue-500 rounded-lg">
              <FiPackage className="text-white" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                $
                {orders
                  .reduce(
                    (sum, order) =>
                      sum + (order.status !== "cancelled" ? order.price : 0),
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg">
              <FiTruck className="text-white" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter((o) => o.status === "processing").length}
              </p>
            </div>
            <div className="p-3 bg-yellow-500 rounded-lg">
              <FiClock className="text-white" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter((o) => o.status === "delivered").length}
              </p>
            </div>
            <div className="p-3 bg-emerald-500 rounded-lg">
              <FiCheck className="text-white" size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
