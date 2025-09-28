"use client";

import { useUser } from "@/app/eb/layout";
import { useState, useEffect } from "react";
import {
  FiUser,
  FiBell,
  FiLock,
  FiCreditCard,
  FiGlobe,
  FiShield,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEye,
  FiEyeOff,
  FiCamera,
  FiEdit3,
  FiTrash2,
  FiCheck,
  FiX,
  FiSettings,
  FiHelpCircle,
  FiSave,
} from "react-icons/fi";

export default function SettingNav() {
  const data = useUser();
  const user = data?.user;
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    orderUpdates: true,
    marketingEmails: false,
    securityAlerts: true,
  });

  const [activeTab, setActiveTab] = useState("profile");

  // User data state for editing - populated from real user data
  const [userData, setUserData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone?.toString() || "",
    location: user?.location || "",
    bio: user?.bio, // Not available in current user schema
    language: user?.language || "English",
    timezone: "EST (UTC-5)", // Not available in current user schema
    joinedDate: user?.created_at
      ? new Date(user.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })
      : "Unknown",
    profileImage: user?.profileImage,
  });

  // Update userData when user data changes
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone?.toString() || "",
        location: user.location || "",
        bio: user?.bio, // Not available in current user schema
        language: user.language || "English",
        timezone: "EST (UTC-5)", // Not available in current user schema
        joinedDate: user.created_at
          ? new Date(user.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })
          : "Unknown",
        profileImage: user.profileImage,
      });
    }
  }, [user]);

  const paymentMethods = [
    { id: 1, type: "visa", last4: "4242", expiry: "12/27", isDefault: true },
    {
      id: 2,
      type: "mastercard",
      last4: "8888",
      expiry: "09/26",
      isDefault: false,
    },
    { id: 3, type: "paypal", email: "john@example.com", isDefault: false },
  ];

  const handleNotificationChange = (key: string) => {
    setNotifications((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleUserDataChange = (field: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/edit`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userData.name,
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
            location: userData.location,
            language: userData.language,
          }),
        }
      );

      if (response.ok) {
        // Show success message or refresh user data
        console.log("User data updated successfully");
        // Optionally refresh the page or show a toast notification
        window.location.reload();
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const tabs = [
    { id: "profile", name: "Profile", icon: FiUser },
    { id: "notifications", name: "Notifications", icon: FiBell },
    { id: "security", name: "Security", icon: FiLock },
    { id: "payments", name: "Payments", icon: FiCreditCard },
    { id: "preferences", name: "Preferences", icon: FiSettings },
  ];
  console.log("user Data : ", userData);
  return (
    <div className="h-full w-full ">
      <div className="w-full mx-auto px-4 py-8">
        {/* Header */}
        {/* <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#13120F] mb-2">
            Account Settings
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your account preferences and security settings
          </p>
        </div> */}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-[#015B46] to-[#017A5B] text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon size={20} />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Profile Picture
                  </h2>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      {userData.profileImage ? (
                        <img
                          src={userData.profileImage}
                          alt={userData.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gradient-to-r from-[#015B46] to-[#017A5B] rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {userData.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <button className="cursor-pointer absolute -bottom-2 -right-2 bg-[#A44A3F] text-white p-2 rounded-full hover:bg-[#8B3E35] transition-colors">
                        <FiCamera size={16} />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {userData.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        Member since {userData.joinedDate}
                      </p>
                      <div className="flex gap-2">
                        <button className="cursor-pointer px-4 py-2 bg-[#015B46] text-white rounded-lg text-sm font-medium hover:bg-[#014239] transition-colors">
                          Upload Photo
                        </button>
                        <button className="cursor-pointer px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Personal Information
                    </h2>
                    <button className="cursor-pointer flex items-center gap-2 px-4 py-2 text-[#015B46] hover:bg-gray-50 rounded-lg transition-colors">
                      <FiEdit3 size={16} />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) =>
                          handleUserDataChange("name", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        type="text"
                        value={userData.username}
                        onChange={(e) =>
                          handleUserDataChange("username", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) =>
                          handleUserDataChange("email", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) =>
                          handleUserDataChange("phone", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46]"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        value={userData.location}
                        onChange={(e) =>
                          handleUserDataChange("location", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46]"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <textarea
                        value={userData.bio}
                        onChange={(e) =>
                          handleUserDataChange("bio", e.target.value)
                        }
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46] resize-none"
                      />
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={saveUserData}
                      className="px-6 py-3 bg-[#015B46] text-white rounded-lg font-medium hover:bg-[#014239] transition-colors flex items-center gap-2"
                    >
                      <FiSave size={16} />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Notification Preferences
                </h2>
                <div className="space-y-6">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {key === "emailNotifications" &&
                            "Receive notifications via email"}
                          {key === "pushNotifications" &&
                            "Get push notifications on your device"}
                          {key === "orderUpdates" &&
                            "Updates about your orders and purchases"}
                          {key === "marketingEmails" &&
                            "Promotional emails and offers"}
                          {key === "securityAlerts" &&
                            "Important security-related notifications"}
                        </p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange(key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? "bg-[#015B46]" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="px-6 py-3 bg-[#015B46] text-white rounded-lg font-medium hover:bg-[#014239] transition-colors flex items-center gap-2">
                    <FiSave size={16} />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                {/* Change Password */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Change Password
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46] pr-12"
                          placeholder="Enter current password"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <FiEyeOff size={20} />
                          ) : (
                            <FiEye size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46]"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46]"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-[#015B46] text-white rounded-2xl font-medium hover:bg-[#014239] transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Two-Factor Authentication
                  </h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Authenticator App
                      </h3>
                      <p className="text-sm text-gray-500">
                        Use an authenticator app to generate verification codes
                      </p>
                    </div>
                    <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                      Setup
                    </button>
                  </div>
                </div>

                {/* Login Activity */}
                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Recent Login Activity
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        device: "MacBook Pro",
                        location: "New York, NY",
                        time: "2 hours ago",
                        current: true,
                      },
                      {
                        device: "iPhone 15",
                        location: "New York, NY",
                        time: "1 day ago",
                        current: false,
                      },
                      {
                        device: "Chrome Browser",
                        location: "Los Angeles, CA",
                        time: "3 days ago",
                        current: false,
                      },
                    ].map((session, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">
                              {session.device}
                            </h3>
                            {session.current && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {session.location} • {session.time}
                          </p>
                        </div>
                        {!session.current && (
                          <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === "payments" && (
              <div className="space-y-6">
                {/* Payment Methods */}
                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Payment Methods
                    </h2>
                    <button className="px-4 py-2 bg-[#015B46] text-white rounded-xl text-sm font-medium hover:bg-[#014239] transition-colors">
                      Add Payment Method
                    </button>
                  </div>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-gradient-to-r from-[#015B46] to-[#017A5B] rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {method.type === "paypal"
                                ? "PP"
                                : method.type.toUpperCase().slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900 capitalize">
                                {method.type}
                              </h3>
                              {method.isDefault && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {method.type === "paypal"
                                ? method.email
                                : `•••• ${method.last4} • Expires ${method.expiry}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!method.isDefault && (
                            <button className="text-sm text-[#015B46] hover:underline">
                              Make Default
                            </button>
                          )}
                          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Billing Information */}
                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Billing Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Billing Address
                      </label>
                      <input
                        type="text"
                        defaultValue="123 Main Street, Apt 4B"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        defaultValue="New York"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        State
                      </label>
                      <input
                        type="text"
                        defaultValue="NY"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        defaultValue="10001"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46]"
                      />
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button className="px-6 py-3 bg-[#015B46] text-white rounded-2xl font-medium hover:bg-[#014239] transition-colors flex items-center gap-2">
                      <FiSave size={16} />
                      Save Billing Info
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                {/* Language & Region */}
                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Language & Region
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Language
                      </label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46]">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Time Zone
                      </label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#015B46]/20 focus:border-[#015B46]">
                        <option value="EST">EST (UTC-5)</option>
                        <option value="PST">PST (UTC-8)</option>
                        <option value="GMT">GMT (UTC+0)</option>
                        <option value="CET">CET (UTC+1)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Privacy Settings
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Profile Visibility",
                        desc: "Make your profile visible to other users",
                        enabled: true,
                      },
                      {
                        name: "Show Online Status",
                        desc: "Let others see when you are online",
                        enabled: false,
                      },
                      {
                        name: "Allow Contact",
                        desc: "Allow other users to contact you directly",
                        enabled: true,
                      },
                    ].map((setting, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {setting.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {setting.desc}
                          </p>
                        </div>
                        <button
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            setting.enabled ? "bg-[#015B46]" : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              setting.enabled
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-red-500">
                  <h2 className="text-xl font-bold text-red-600 mb-6">
                    Danger Zone
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Deactivate Account
                        </h3>
                        <p className="text-sm text-gray-500">
                          Temporarily disable your account
                        </p>
                      </div>
                      <button className="px-4 py-2 border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors">
                        Deactivate
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Delete Account
                        </h3>
                        <p className="text-sm text-gray-500">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
