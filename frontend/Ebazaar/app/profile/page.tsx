"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  LogOut,
  Home,
  User,
  Mail,
  Shield,
  Edit3,
  Camera,
  Package,
  ShoppingBag,
  Heart,
  Star,
  TrendingUp,
  Eye,
  DollarSign,
} from "lucide-react";
import LoadingSpinner from "../loading/page";
import ProfileAvatar from "../component/profile-avatar";

export default function Profile() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:9000/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          window.location.href = "/login";
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        if (data.user) {
          setUserData(data.user);
        } else {
          console.error("Invalid response structure", data);
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    const response = await fetch("http://localhost:9000/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      window.location.href = "/login";
    } else {
      console.error("Logout failed");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // Check if user is admin/seller
  const isAdmin = userData?.role === "admin";

  // Dynamic stats based on user role
  const adminStats = [
    { label: "Products", value: "24", color: "text-[#015B46]", icon: Package },
    {
      label: "Orders",
      value: "156",
      color: "text-[#C9A66B]",
      icon: ShoppingBag,
    },
    {
      label: "Revenue",
      value: "$12.4K",
      color: "text-[#A44A3F]",
      icon: DollarSign,
    },
    { label: "Views", value: "2.3K", color: "text-[#015B46]", icon: Eye },
  ];

  const buyerStats = [
    {
      label: "Orders",
      value: "12",
      color: "text-[#015B46]",
      icon: ShoppingBag,
    },
    { label: "Wishlist", value: "8", color: "text-[#C9A66B]", icon: Heart },
    { label: "Reviews", value: "15", color: "text-[#A44A3F]", icon: Star },
    {
      label: "Spent",
      value: "$890",
      color: "text-[#015B46]",
      icon: DollarSign,
    },
  ];

  const stats = isAdmin ? adminStats : buyerStats;

  // Dynamic recent activity based on role
  const adminActivity = [
    {
      icon: Package,
      color: "bg-[#015B46]",
      title: "New product added",
      time: "2 hours ago",
    },
    {
      icon: ShoppingBag,
      color: "bg-[#C9A66B]",
      title: "Order #EB001 completed",
      time: "5 hours ago",
    },
    {
      icon: TrendingUp,
      color: "bg-[#A44A3F]",
      title: "Monthly analytics updated",
      time: "1 day ago",
    },
    {
      icon: User,
      color: "bg-[#015B46]",
      title: "Profile updated",
      time: "2 days ago",
    },
  ];

  const buyerActivity = [
    {
      icon: ShoppingBag,
      color: "bg-[#015B46]",
      title: "Order #EB003 delivered",
      time: "1 hour ago",
    },
    {
      icon: Heart,
      color: "bg-[#C9A66B]",
      title: "Added item to wishlist",
      time: "3 hours ago",
    },
    {
      icon: Star,
      color: "bg-[#A44A3F]",
      title: "Left a 5-star review",
      time: "1 day ago",
    },
    {
      icon: User,
      color: "bg-[#015B46]",
      title: "Profile updated",
      time: "2 days ago",
    },
  ];

  const recentActivity = isAdmin ? adminActivity : buyerActivity;

  // Dynamic account settings based on role
  const adminSettings = [
    {
      title: "Order Notifications",
      description: "Get notified when you receive new orders",
      enabled: true,
    },
    {
      title: "Product Analytics",
      description: "Receive weekly reports about your product performance",
      enabled: false,
    },
    {
      title: "Customer Messages",
      description: "Get notified when customers send you messages",
      enabled: true,
    },
  ];

  const buyerSettings = [
    {
      title: "Order Updates",
      description: "Receive updates about your order status",
      enabled: true,
    },
    {
      title: "Wishlist Alerts",
      description: "Get notified when wishlist items go on sale",
      enabled: false,
    },
    {
      title: "New Products",
      description:
        "Be the first to know about new products from your favorite sellers",
      enabled: true,
    },
  ];

  const accountSettings = isAdmin ? adminSettings : buyerSettings;

  return (
    <div className="min-h-screen bg-[#FDF9F4]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-[#015B46]">eBazaar</h1>
            <span className="text-gray-400">|</span>
            <h2 className="text-xl font-semibold text-[#13120F]">Profile</h2>
            <div className="hidden sm:flex items-center gap-2 bg-[#015B46]/10 px-3 py-1 rounded-full">
              <Shield className="h-4 w-4 text-[#015B46]" />
              <span className="text-sm font-medium text-[#015B46]">
                {isAdmin ? "Seller Account" : "Buyer Account"}
              </span>
            </div>
          </div>
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="flex items-center gap-2 bg-[#015B46] text-[#FDF9F4] px-4 py-2 rounded-lg hover:bg-[#014b3c] transition-colors"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {userData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-[#015B46]/10">
                {/* Profile Avatar */}
                <div className="relative mb-6">
                  <ProfileAvatar
                    src={userData.picture}
                    username={userData.username}
                    size="xl"
                    className="mx-auto"
                  />
                  <button className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 bg-[#015B46] text-[#FDF9F4] p-2 rounded-full hover:bg-[#014b3c] transition-colors shadow-lg">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-[#13120F] mb-2">
                  {userData.username}
                </h2>
                <p className="text-[#015B46] font-medium mb-4">
                  {userData.email}
                </p>

                {/* Role Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#015B46] to-[#014b3c] text-[#FDF9F4] px-4 py-2 rounded-full text-sm font-semibold shadow-md mb-6">
                  <Shield className="h-4 w-4" />
                  {isAdmin ? "Seller" : "Buyer"} • {userData.role || "Member"}
                </div>

                {/* Dynamic Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={index}
                        className="bg-[#FDF9F4] p-4 rounded-lg border border-[#015B46]/10 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-center mb-2">
                          <Icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                        <div className={`text-xl font-bold ${stat.color}`}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-[#015B46] text-[#FDF9F4] px-6 py-3 rounded-lg hover:bg-[#014b3c] transition-all duration-300 font-semibold shadow-md hover:shadow-lg">
                    <Edit3 className="h-4 w-4" />
                    Edit Profile
                  </button>
                  {isAdmin && (
                    <button className="w-full flex items-center justify-center gap-2 bg-[#C9A66B] text-white px-6 py-3 rounded-lg hover:bg-[#b8956a] transition-all duration-300 font-semibold shadow-md hover:shadow-lg">
                      <Package className="h-4 w-4" />
                      Manage Store
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-[#A44A3F] text-[#FDF9F4] px-6 py-3 rounded-lg hover:bg-[#8f3f36] transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-[#015B46]/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#13120F]">
                    Personal Information
                  </h3>
                  <button className="text-[#015B46] hover:text-[#014b3c] transition-colors">
                    <Edit3 className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-2" />
                      Username
                    </label>
                    <div className="bg-[#FDF9F4] p-3 rounded-lg border border-[#015B46]/10">
                      <p className="text-[#13120F] font-medium">
                        {userData.username}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email Address
                    </label>
                    <div className="bg-[#FDF9F4] p-3 rounded-lg border border-[#015B46]/10">
                      <p className="text-[#13120F] font-medium">
                        {userData.email}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Shield className="h-4 w-4 inline mr-2" />
                      Account Type
                    </label>
                    <div className="bg-[#FDF9F4] p-3 rounded-lg border border-[#015B46]/10">
                      <p className="text-[#13120F] font-medium">
                        {isAdmin ? "Seller Account" : "Buyer Account"} (
                        {userData.role || "Member"})
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Settings className="h-4 w-4 inline mr-2" />
                      Member Since
                    </label>
                    <div className="bg-[#FDF9F4] p-3 rounded-lg border border-[#015B46]/10">
                      <p className="text-[#13120F] font-medium">January 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-[#015B46]/10">
                <h3 className="text-xl font-bold text-[#13120F] mb-6">
                  {isAdmin ? "Seller Settings" : "Account Settings"}
                </h3>

                <div className="space-y-4">
                  {accountSettings.map((setting, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-[#FDF9F4] rounded-lg border border-[#015B46]/10"
                    >
                      <div>
                        <h4 className="font-semibold text-[#13120F]">
                          {setting.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {setting.description}
                        </p>
                      </div>
                      <div
                        className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                          setting.enabled ? "bg-[#015B46]" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                            setting.enabled ? "right-0.5" : "left-0.5"
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between p-4 bg-[#FDF9F4] rounded-lg border border-[#015B46]/10">
                    <div>
                      <h4 className="font-semibold text-[#13120F]">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-gray-600">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button className="bg-[#015B46] text-[#FDF9F4] px-4 py-2 rounded-lg hover:bg-[#014b3c] transition-colors text-sm font-medium">
                      Enable
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-[#015B46]/10">
                <h3 className="text-xl font-bold text-[#13120F] mb-6">
                  Recent Activity{" "}
                  {isAdmin && (
                    <span className="text-sm font-normal text-gray-500">
                      (Seller)
                    </span>
                  )}
                </h3>

                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-[#FDF9F4] rounded-lg border border-[#015B46]/10 hover:shadow-md transition-shadow"
                      >
                        <div
                          className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center`}
                        >
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#13120F]">
                            {activity.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Role-specific Additional Section */}
              {isAdmin ? (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-[#015B46]/10">
                  <h3 className="text-xl font-bold text-[#13120F] mb-6">
                    Seller Tools
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="flex items-center gap-3 p-4 bg-[#FDF9F4] rounded-lg border border-[#015B46]/10 hover:shadow-md transition-shadow text-left">
                      <Package className="h-6 w-6 text-[#015B46]" />
                      <div>
                        <h4 className="font-semibold text-[#13120F]">
                          Product Manager
                        </h4>
                        <p className="text-sm text-gray-600">
                          Add, edit, and manage your products
                        </p>
                      </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-[#FDF9F4] rounded-lg border border-[#015B46]/10 hover:shadow-md transition-shadow text-left">
                      <TrendingUp className="h-6 w-6 text-[#C9A66B]" />
                      <div>
                        <h4 className="font-semibold text-[#13120F]">
                          Analytics
                        </h4>
                        <p className="text-sm text-gray-600">
                          View detailed sales and performance data
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-[#015B46]/10">
                  <h3 className="text-xl font-bold text-[#13120F] mb-6">
                    Shopping Preferences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="flex items-center gap-3 p-4 bg-[#FDF9F4] rounded-lg border border-[#015B46]/10 hover:shadow-md transition-shadow text-left">
                      <Heart className="h-6 w-6 text-[#015B46]" />
                      <div>
                        <h4 className="font-semibold text-[#13120F]">
                          Wishlist
                        </h4>
                        <p className="text-sm text-gray-600">
                          Manage your saved items
                        </p>
                      </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-[#FDF9F4] rounded-lg border border-[#015B46]/10 hover:shadow-md transition-shadow text-left">
                      <ShoppingBag className="h-6 w-6 text-[#C9A66B]" />
                      <div>
                        <h4 className="font-semibold text-[#13120F]">
                          Order History
                        </h4>
                        <p className="text-sm text-gray-600">
                          View all your past purchases
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-[#015B46] rounded-full"></div>
            <div className="w-2 h-2 bg-[#C9A66B] rounded-full"></div>
            <div className="w-2 h-2 bg-[#A44A3F] rounded-full"></div>
          </div>
          <p className="text-center text-gray-600 mt-4">
            © 2024 eBazaar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
