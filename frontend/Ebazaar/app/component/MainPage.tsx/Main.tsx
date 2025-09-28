"use client";

import { useEffect, useState, useRef } from "react";
import {
  User,
  X,
  Star,
  ShoppingBag,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  Heart,
} from "lucide-react";
import LoadingSpinner from "@/app/component/loading/page";

export default function MainPage() {
  const [check, setCheck] = useState<string | null>(null);
  const [sizeLg, setSizeLg] = useState<number>(0);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const refcheck = useRef<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setSizeLg(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // sleep 2 sec the make the loading false
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (refcheck.current) {
      refcheck.current = false;
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      console.log(
        `${token} Token not found, redirecting to login or register page`
      );

      if (check === "login") {
        window.location.href = "/login";
      } else if (check === "register") {
        window.location.href = "/register";
      }
    } else {
      console.log(`${token} Token found, redirecting to dashboard page`);
      window.location.href = "/dashboard";
    }
    console.log("button cliked");
    return;
  }, [check]);

  const stats = [
    { icon: Users, value: "10K+", label: "Active Sellers" },
    { icon: ShoppingBag, value: "50K+", label: "Products" },
    { icon: Star, value: "4.9", label: "Rating" },
    { icon: Award, value: "99%", label: "Satisfaction" },
  ];

  return (
    <>
      {/* Loading Spinner */}
      {loading && <LoadingSpinner />}
      {/* Enhanced Mobile Modal */}
      {modalActive && sizeLg < 640 && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-sm bg-white rounded-2xl p-8 relative shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Decorative Pattern */}
            <div className="absolute inset-0 bg-[url('https://i.ibb.co/CKR4RHsW/ZELIJ.png')] opacity-5 rounded-2xl"></div>

            <button
              onClick={() => setModalActive(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors group"
            >
              <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
            </button>

            <div className="text-center space-y-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#015B46] to-[#014b3c] rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                <Sparkles className="h-8 w-8 text-white animate-pulse" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#13120F] mb-2">
                  Welcome to eBazaar
                </h2>
                <p className="text-gray-600 text-sm">
                  Join thousands discovering authentic Moroccan crafts
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setCheck("login")}
                  className="w-full bg-[#015B46] hover:bg-[#014b3c] text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get Started
                </button>
                <button
                  onClick={() => setCheck("login")}
                  className="w-full bg-white hover:bg-gray-50 text-[#015B46] py-3 px-6 rounded-xl font-semibold border-2 border-[#015B46] transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content with Enhanced Background */}
      <div className="relative min-h-screen w-full bg-[#fff] overflow-hidden">
        <div className="bg-overlay"></div>
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#015B46]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#C9A66B]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#015B46]/3 via-transparent to-[#C9A66B]/3 rounded-full blur-3xl"></div>

        <div className="relative z-10 px-6 sm:px-10 lg:px-20 flex flex-col min-h-screen items-center">
          {/* Enhanced Header */}
          <header className="w-full flex py-10 items-center justify-between relative">
            <div className="flex items-center space-x-3">
              <h1 className="font-bold text-2xl text-[#13120F]">eBazaar</h1>
              <div className="hidden sm:flex items-center space-x-1 bg-[#015B46]/10 px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3 text-[#015B46]" />
                <span className="text-xs font-medium text-[#015B46]">
                  Authentic
                </span>
              </div>
            </div>

            {sizeLg > 640 ? (
              <div className="flex items-center space-x-4">
                <button
                  className="group relative overflow-hidden bg-white text-[#015B46] px-10 py-2.5 font-semibold text-sm rounded-lg border border-[#015B46] transition-all duration-300 hover:bg-[#015B46] hover:text-white shadow-lg hover:shadow-xl cursor-pointer"
                  onClick={() => setCheck("login")}
                >
                  <span className="relative z-10">Login</span>
                </button>
                <button
                  className="group bg-[#015B46] text-white px-10 py-2.5 font-semibold text-sm rounded-lg transition-all duration-300 hover:bg-[#014b3c] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
                  onClick={() => setCheck("login")}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <button
                className="w-12 h-12 bg-[#015B46] hover:bg-[#014b3c] rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={() => setModalActive(true)}
              >
                <User className="h-5 w-5 text-white" />
              </button>
            )}
          </header>

          {/* Enhanced Hero Section */}
          <div className="flex items-center self-center flex-1 justify-center">
            {sizeLg > 1024 ? (
              <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
                {/* Left Content */}
                <div className="space-y-8">
                  <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#015B46]/20 shadow-sm">
                    <Sparkles className="h-4 w-4 text-[#015B46] animate-pulse" />
                    <span className="text-sm font-medium text-[#015B46]">
                      Authentic Moroccan Marketplace
                    </span>
                  </div>

                  <h1 className="font-bold text-5xl lg:text-6xl xl:text-7xl text-[#13120F] leading-tight">
                    Discover the{" "}
                    <span className=" bg-[#015B46] bg-clip-text text-transparent">
                      Soul of Morocco
                    </span>{" "}
                    One Product at a Time
                  </h1>

                  <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                    Step into a vibrant digital souk where the rich tapestry of
                    Moroccan heritage comes alive — every product a reflection
                    of age-old craftsmanship, infused with cultural depth and
                    authenticity. From handwoven textiles and aromatic spices to
                    artisan-made treasures.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="group bg-[#015B46] hover:bg-[#014b3c] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 transform hover:-translate-y-1 cursor-pointer"
                      onClick={() => setCheck("login")}
                    >
                      <span>Get Started</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      className="group bg-white hover:bg-gray-50 text-[#015B46] px-8 py-4 rounded-lg font-semibold border-2 border-[#015B46] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 transform hover:-translate-y-1 cursor-pointer"
                      onClick={() => setCheck("login")}
                    >
                      <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span>Explore Categories</span>
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-6 pt-8 border-t border-gray-200">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="text-center group">
                          <div className="w-12 h-12 bg-[#015B46]/10 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-[#015B46]/20 transition-colors">
                            <Icon className="h-6 w-6 text-[#015B46] group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="text-2xl font-bold text-[#13120F]">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-600">
                            {stat.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Content - Enhanced Image */}
                <div className="relative">
                  <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
                    <img
                      src="https://i.ibb.co/4n9cV1JG/background.jpg"
                      alt="Moroccan Crafts"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                    {/* Floating Cards */}
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-bounce">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#015B46] rounded-xl flex items-center justify-center">
                          <Star className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-[#13120F]">
                            4.9/5
                          </div>
                          <div className="text-sm text-gray-600">
                            Customer Rating
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-pulse">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#C9A66B] rounded-xl flex items-center justify-center">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-[#13120F]">
                            10K+
                          </div>
                          <div className="text-sm text-gray-600">
                            Happy Customers
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#C9A66B]/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#015B46]/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                </div>
              </div>
            ) : (
              /* Enhanced Mobile Layout */
              <div className="w-full text-center space-y-8">
                <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#015B46]/20 shadow-sm">
                  <Sparkles className="h-4 w-4 text-[#015B46] animate-pulse" />
                  <span className="text-sm font-medium text-[#015B46]">
                    Authentic Moroccan Marketplace
                  </span>
                </div>

                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-[#13120F] leading-tight">
                  Discover the{" "}
                  <span className=" bg-[#015B46] bg-clip-text text-transparent">
                    Soul of Morocco
                  </span>{" "}
                  One Product at a Time
                </h1>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                  Step into a vibrant digital souk where the rich tapestry of
                  Moroccan heritage comes alive — every product a reflection of
                  age-old craftsmanship, infused with cultural depth and
                  authenticity.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    className="group bg-[#015B46] hover:bg-[#014b3c] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 transform hover:-translate-y-1"
                    onClick={() => setCheck("login")}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    className="group bg-white hover:bg-gray-50 text-[#015B46] px-8 py-4 rounded-xl font-semibold border-2 border-[#015B46] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 transform hover:-translate-y-1"
                    onClick={() => setCheck("login")}
                  >
                    <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span>Explore Categories</span>
                  </button>
                </div>

                {/* Mobile Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center group">
                        <div className="w-12 h-12 bg-[#015B46]/10 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-[#015B46]/20 transition-colors">
                          <Icon className="h-6 w-6 text-[#015B46] group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="text-xl font-bold text-[#13120F]">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
