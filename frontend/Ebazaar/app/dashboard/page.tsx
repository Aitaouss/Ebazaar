"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Eye,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Star,
  DollarSign,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Heart,
  ShoppingBag,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../component/ui/card";
import { Button } from "../component/ui/button";
import { Input } from "../component/ui/input";
import { Badge } from "../component/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../component/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../component/ui/dropdown-menu";

export default function EbazaarDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:9000/me", {
          method: "GET",
          credentials: "include", // 🔥 required to send cookies
        });

        if (!res.ok) {
          window.location.href = "/login";
          return;
        }

        const data = await res.json();
        if (data?.user) {
          setUserData(data.user); // ✅ set user data
        } else {
          console.error("Invalid response structure", data);
          window.location.href = "/login";
        }
      } catch (err) {
        console.error("Fetch error:", err);
        window.location.href = "/login";
      } finally {
        setLoading(false); // hide spinner
      }
    };

    fetchUserData();
  }, []);

  const logoutFunction = async () => {
    try {
      const res = await fetch("http://localhost:9000/logout", {
        method: "POST",
        credentials: "include", // 🔥 required to send cookies
      });

      if (res.ok) {
        window.location.href = "/login"; // redirect to login on success
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  console.log("userData:", userData);

  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if user is admin/seller
  const isAdmin = userData?.role === "admin";

  // Dynamic sidebar items based on user role
  const sellerSidebarItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "products", label: "My Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "customers", label: "Customers", icon: Users },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ];

  const buyerSidebarItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "browse", label: "Browse Products", icon: Search },
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "profile", label: "Profile", icon: Users },
  ];

  const sidebarItems = isAdmin ? sellerSidebarItems : buyerSidebarItems;

  // Dynamic stats based on user role
  const sellerStats = [
    {
      title: "Total Revenue",
      value: "$12,450",
      change: "+12%",
      icon: DollarSign,
      color: "text-[#015B46]",
    },
    {
      title: "Active Products",
      value: "24",
      change: "+3",
      icon: Package,
      color: "text-[#C9A66B]",
    },
    {
      title: "Total Orders",
      value: "156",
      change: "+8%",
      icon: ShoppingCart,
      color: "text-[#A44A3F]",
    },
    {
      title: "Profile Views",
      value: "2,340",
      change: "+15%",
      icon: Eye,
      color: "text-[#015B46]",
    },
  ];

  const buyerStats = [
    {
      title: "Total Orders",
      value: "12",
      change: "+2",
      icon: ShoppingBag,
      color: "text-[#015B46]",
    },
    {
      title: "Wishlist Items",
      value: "8",
      change: "+1",
      icon: Heart,
      color: "text-[#C9A66B]",
    },
    {
      title: "Total Spent",
      value: "$890",
      change: "+$120",
      icon: DollarSign,
      color: "text-[#A44A3F]",
    },
    {
      title: "Reviews Given",
      value: "15",
      change: "+3",
      icon: Star,
      color: "text-[#015B46]",
    },
  ];

  const stats = isAdmin ? sellerStats : buyerStats;

  const recentOrders = [
    {
      id: "#EB001",
      customer: "Sarah Johnson",
      product: "Handwoven Berber Rug",
      amount: "$245",
      status: "Completed",
      date: "2 hours ago",
    },
    {
      id: "#EB002",
      customer: "Ahmed Hassan",
      product: "Ceramic Tagine Set",
      amount: "$89",
      status: "Processing",
      date: "5 hours ago",
    },
    {
      id: "#EB003",
      customer: "Maria Garcia",
      product: "Leather Pouf",
      amount: "$156",
      status: "Shipped",
      date: "1 day ago",
    },
    {
      id: "#EB004",
      customer: "John Smith",
      product: "Argan Oil Set",
      amount: "$67",
      status: "Pending",
      date: "2 days ago",
    },
  ];

  // Buyer orders (different structure)
  const buyerOrders = [
    {
      id: "#EB001",
      seller: "Fatima's Crafts",
      product: "Handwoven Berber Rug",
      amount: "$245",
      status: "Delivered",
      date: "2 days ago",
    },
    {
      id: "#EB002",
      seller: "Atlas Pottery",
      product: "Ceramic Tagine Set",
      amount: "$89",
      status: "Shipped",
      date: "5 days ago",
    },
    {
      id: "#EB003",
      seller: "Marrakech Leather",
      product: "Leather Pouf",
      amount: "$156",
      status: "Processing",
      date: "1 week ago",
    },
  ];

  const topProducts = [
    {
      name: "Handwoven Berber Rug",
      sales: 45,
      revenue: "$2,250",
      rating: 4.8,
      image: "https://i.ibb.co/fdZBFRtF/Bazaaro.jpg",
    },
    {
      name: "Ceramic Tagine Set",
      sales: 32,
      revenue: "$1,680",
      rating: 4.9,
      image: "https://i.ibb.co/fdZBFRtF/Bazaaro.jpg",
    },
    {
      name: "Leather Pouf Ottoman",
      sales: 28,
      revenue: "$1,400",
      rating: 4.7,
      image: "https://i.ibb.co/fdZBFRtF/Bazaaro.jpg",
    },
    {
      name: "Argan Oil Beauty Set",
      sales: 56,
      revenue: "$1,120",
      rating: 4.6,
      image: "https://i.ibb.co/fdZBFRtF/Bazaaro.jpg",
    },
  ];

  // Featured products for buyers
  const featuredProducts = [
    {
      name: "Handwoven Berber Rug",
      seller: "Fatima's Crafts",
      price: "$245",
      rating: 4.8,
      image: "https://i.ibb.co/fdZBFRtF/Bazaaro.jpg",
      location: "Marrakech",
    },
    {
      name: "Ceramic Tagine Set",
      seller: "Atlas Pottery",
      price: "$89",
      rating: 4.9,
      image: "https://i.ibb.co/fdZBFRtF/Bazaaro.jpg",
      location: "Fez",
    },
    {
      name: "Leather Pouf Ottoman",
      seller: "Marrakech Leather",
      price: "$156",
      rating: 4.7,
      image: "https://i.ibb.co/fdZBFRtF/Bazaaro.jpg",
      location: "Marrakech",
    },
    {
      name: "Argan Oil Beauty Set",
      seller: "Atlas Beauty",
      price: "$67",
      rating: 4.6,
      image: "https://i.ibb.co/fdZBFRtF/Bazaaro.jpg",
      location: "Essaouira",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
      case "Delivered":
        return "bg-[#015B46] text-[#FDF9F4]";
      case "Processing":
        return "bg-[#C9A66B] text-[#13120F]";
      case "Shipped":
        return "bg-[#015B46]/20 text-[#015B46]";
      case "Pending":
        return "bg-[#A44A3F]/20 text-[#A44A3F]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Show loading spinner while fetching user data
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF9F4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#015B46] mx-auto mb-4"></div>
          <p className="text-[#015B46] font-medium">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF9F4]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#015B46]">eBazaar</h1>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {isAdmin ? "Seller Dashboard" : "Buyer Dashboard"}
          </p>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-[#015B46] text-[#FDF9F4]"
                    : "text-[#13120F] hover:bg-[#015B46]/10"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-[#13120F]"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-[#A44A3F]"
            onClick={logoutFunction}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-[#13120F]">
                  Welcome back, {userData?.username || "User"}!
                </h2>
                <p className="text-gray-600">
                  {isAdmin
                    ? "Here's what's happening with your bazaar today."
                    : "Discover amazing handcrafted products from Moroccan artisans."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar>
                <div
                  onClick={() => {
                    window.location.href = "/profile";
                  }}
                  className="cursor-pointer"
                >
                  <AvatarImage src={userData?.picture || "/placeholder.svg"} />
                  <AvatarFallback className="bg-[#015B46] text-[#FDF9F4]">
                    {userData?.username?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </div>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={index} className="border-0 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">
                              {stat.title}
                            </p>
                            <p className="text-2xl font-bold text-[#13120F] mt-1">
                              {stat.value}
                            </p>
                            <p className={`text-sm mt-1 ${stat.color}`}>
                              {stat.change} from last month
                            </p>
                          </div>
                          <div className={`p-3 rounded-lg bg-[#015B46]/10`}>
                            <Icon className={`h-6 w-6 ${stat.color}`} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Charts and Tables Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Orders Section */}
                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-[#13120F]">
                        {isAdmin ? "Recent Orders" : "My Recent Orders"}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#015B46]"
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(isAdmin ? recentOrders : buyerOrders).map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 bg-[#FDF9F4] rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-[#13120F]">
                                {order.id}
                              </span>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              {isAdmin ? order.customer : order.seller}
                            </p>
                            <p className="text-sm font-medium text-[#13120F]">
                              {order.product}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#015B46]">
                              {order.amount}
                            </p>
                            <p className="text-xs text-gray-500">
                              {order.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Products Section */}
                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-[#13120F]">
                      {isAdmin ? "Top Selling Products" : "Featured Products"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(isAdmin ? topProducts : featuredProducts).map(
                        (product, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-3 bg-[#FDF9F4] rounded-lg"
                          >
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-[#13120F] text-sm">
                                {product.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                {isAdmin ? (
                                  <span className="text-xs text-gray-600">
                                    {product.sales} sales
                                  </span>
                                ) : (
                                  <>
                                    <span className="text-xs text-gray-600">
                                      {product.seller}
                                    </span>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3 text-gray-400" />
                                      <span className="text-xs text-gray-600">
                                        {product.location}
                                      </span>
                                    </div>
                                  </>
                                )}
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-[#C9A66B] text-[#C9A66B]" />
                                  <span className="text-xs text-gray-600">
                                    {product.rating}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-[#015B46] text-sm">
                                {isAdmin ? product.revenue : product.price}
                              </p>
                              {!isAdmin && (
                                <Button
                                  size="sm"
                                  className="bg-[#015B46] hover:bg-[#014b3c] text-[#FDF9F4] mt-1"
                                >
                                  View
                                </Button>
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-[#13120F]">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {isAdmin ? (
                      <>
                        <Button className="bg-[#015B46] hover:bg-[#014b3c] text-[#FDF9F4] h-12">
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Product
                        </Button>
                        <Button
                          variant="outline"
                          className="border-[#015B46] text-[#015B46] hover:bg-[#015B46]/10 h-12 bg-transparent"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View My Store
                        </Button>
                        <Button
                          variant="outline"
                          className="border-[#C9A66B] text-[#C9A66B] hover:bg-[#C9A66B]/10 h-12 bg-transparent"
                        >
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Analytics
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button className="bg-[#015B46] hover:bg-[#014b3c] text-[#FDF9F4] h-12">
                          <Search className="h-4 w-4 mr-2" />
                          Browse Products
                        </Button>
                        <Button
                          variant="outline"
                          className="border-[#015B46] text-[#015B46] hover:bg-[#015B46]/10 h-12 bg-transparent"
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          View Wishlist
                        </Button>
                        <Button
                          variant="outline"
                          className="border-[#C9A66B] text-[#C9A66B] hover:bg-[#C9A66B]/10 h-12 bg-transparent"
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Track Orders
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Products Tab - Only show for admin */}
          {activeTab === "products" && isAdmin && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#13120F]">
                  My Products
                </h2>
                <Button className="bg-[#015B46] hover:bg-[#014b3c] text-[#FDF9F4]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10 border-gray-200 focus:border-[#015B46]"
                  />
                </div>
                <Button
                  variant="outline"
                  className="border-[#015B46] text-[#015B46] bg-transparent"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topProducts.map((product, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-md overflow-hidden"
                  >
                    <div className="aspect-square relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="bg-white/80 hover:bg-white"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Edit Product</DropdownMenuItem>
                            <DropdownMenuItem>View Analytics</DropdownMenuItem>
                            <DropdownMenuItem className="text-[#A44A3F]">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#13120F] mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[#C9A66B] text-[#C9A66B]" />
                          <span className="text-sm text-gray-600">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.sales} sold
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#015B46]">
                          {product.revenue}
                        </span>
                        <Badge className="bg-[#015B46]/10 text-[#015B46]">
                          Active
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Browse Products Tab - Only show for buyers */}
          {activeTab === "browse" && !isAdmin && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#13120F]">
                  Browse Products
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-[#015B46] text-[#015B46] bg-transparent"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10 border-gray-200 focus:border-[#015B46]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-white/80 hover:bg-white"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#13120F] mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-600">
                          {product.seller}
                        </span>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-600">
                            {product.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[#C9A66B] text-[#C9A66B]" />
                          <span className="text-sm text-gray-600">
                            {product.rating}
                          </span>
                        </div>
                        <span className="font-bold text-[#015B46] text-lg">
                          {product.price}
                        </span>
                      </div>
                      <Button className="w-full bg-[#015B46] hover:bg-[#014b3c] text-[#FDF9F4]">
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#13120F]">
                  {isAdmin ? "Orders Management" : "My Orders"}
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-[#015B46] text-[#015B46] bg-transparent"
                  >
                    {isAdmin ? "Export" : "Track All"}
                  </Button>
                </div>
              </div>

              {/* Mobile Cards View */}
              <div className="block md:hidden space-y-4">
                {(isAdmin ? recentOrders : buyerOrders).map((order) => (
                  <Card key={order.id} className="border-0 shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-[#015B46]">
                              {order.id}
                            </span>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            {isAdmin && (
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              {isAdmin ? "Contact Customer" : "Contact Seller"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            {isAdmin ? "Customer" : "Seller"}
                          </p>
                          <p className="text-sm font-medium text-[#13120F]">
                            {isAdmin ? order.customer : order.seller}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Product
                          </p>
                          <p className="text-sm font-medium text-[#13120F]">
                            {order.product}
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              Amount
                            </p>
                            <p className="text-lg font-bold text-[#015B46]">
                              {order.amount}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop Table View */}
              <Card className="border-0 shadow-md hidden md:block">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#FDF9F4] border-b">
                        <tr>
                          <th className="text-left p-4 font-semibold text-[#13120F]">
                            Order ID
                          </th>
                          <th className="text-left p-4 font-semibold text-[#13120F]">
                            {isAdmin ? "Customer" : "Seller"}
                          </th>
                          <th className="text-left p-4 font-semibold text-[#13120F]">
                            Product
                          </th>
                          <th className="text-left p-4 font-semibold text-[#13120F]">
                            Amount
                          </th>
                          <th className="text-left p-4 font-semibold text-[#13120F]">
                            Status
                          </th>
                          <th className="text-left p-4 font-semibold text-[#13120F]">
                            Date
                          </th>
                          <th className="text-left p-4 font-semibold text-[#13120F]">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(isAdmin ? recentOrders : buyerOrders).map((order) => (
                          <tr
                            key={order.id}
                            className="border-b hover:bg-[#FDF9F4]/50"
                          >
                            <td className="p-4 font-medium text-[#015B46]">
                              {order.id}
                            </td>
                            <td className="p-4 text-[#13120F]">
                              {isAdmin ? order.customer : order.seller}
                            </td>
                            <td className="p-4 text-[#13120F]">
                              {order.product}
                            </td>
                            <td className="p-4 font-semibold text-[#015B46]">
                              {order.amount}
                            </td>
                            <td className="p-4">
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </td>
                            <td className="p-4 text-gray-600">{order.date}</td>
                            <td className="p-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    View Details
                                  </DropdownMenuItem>
                                  {isAdmin && (
                                    <DropdownMenuItem>
                                      Update Status
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem>
                                    {isAdmin
                                      ? "Contact Customer"
                                      : "Contact Seller"}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Wishlist Tab - Only for buyers */}
          {activeTab === "wishlist" && !isAdmin && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#13120F]">
                  My Wishlist
                </h2>
                <Button
                  variant="outline"
                  className="border-[#015B46] text-[#015B46] bg-transparent"
                >
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.slice(0, 3).map((product, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-md overflow-hidden"
                  >
                    <div className="aspect-square relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-white/80 hover:bg-white text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-[#13120F] mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-600">
                          {product.seller}
                        </span>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-600">
                            {product.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[#C9A66B] text-[#C9A66B]" />
                          <span className="text-sm text-gray-600">
                            {product.rating}
                          </span>
                        </div>
                        <span className="font-bold text-[#015B46] text-lg">
                          {product.price}
                        </span>
                      </div>
                      <Button className="w-full bg-[#015B46] hover:bg-[#014b3c] text-[#FDF9F4]">
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
