"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "../loading/page";

export default function EbazaarDashboard() {
  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }

  interface userProducts {
    id: number;
    name: string;
    owner: string;
    title: string;
    imageUrl: string | null;
    content: string;
    price: number | null;
  }
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [userProucts, setUserProducts] = useState<userProducts[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [isBetaUser, setIsBetaUser] = useState(false);

  useEffect(() => {
    console.log("Fetching user data...");
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    if (email === "beta@gmail.com" && password === "beta123") {
      setIsBetaUser(true);
      setUserData({
        id: 0,
        name: "Beta Tester",
        email: "beta@gmail.com",
        role: "Beta User",
      });
      setUserProducts([
        {
          id: 1,
          name: "Sample Product 1",
          owner: "Beta Tester",
          title: "Amazing Gadget",
          imageUrl:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
          content: "This is an amazing gadget that you will love!",
          price: 49.99,
        },
        {
          id: 2,
          name: "Sample Product 2",
          owner: "Beta Tester",
          title: "Incredible Widget",
          imageUrl:
            "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
          content: "An incredible widget that makes life easier.",
          price: 29.99,
        },
        {
          id: 3,
          name: "Sample Product 3",
          owner: "Beta Tester",
          title: "Fantastic Device",
          imageUrl:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
          content: "A fantastic device for all your needs.",
          price: null,
        },
      ]);
      console.log("Beta user logged in");
      setLoading(false);
      return;
    }
    if (!isBetaUser) {
      const fetchUserData = async () => {
        try {
          const res = await fetch("http://localhost:9000/me", {
            method: "GET",
            credentials: "include",
          });
          console.log("response:", res);
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
          if (data?.products) {
            setUserProducts(data.products); // ✅ set user data
          }
          setLoading(false); // ✅ set loading to false after data is fetched
        } catch (err) {
          console.error("Fetch error:", err);
          window.location.href = "/login";
        }
      };

      fetchUserData();
    }
  }, []);

  const logoutFunction = async () => {
    try {
      const res = await fetch("http://localhost:9000/logout", {
        method: "POST",
        credentials: "include",
      });
      console.log("Logout response:", res);
      if (res.ok) {
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  console.log("userData:", userData);
  console.log("userProduct:", userProucts);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center">
      {/* Header Section */}
      <header className="w-full bg-white shadow-md py-6 px-10 flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500">
              Welcome back,{" "}
              <span className="font-semibold">{userData?.name}</span>
            </p>
          </div>
          <button
            className="px-6 py-2 bg-[#015B46] hover:bg-[#027a5c] text-white rounded-xl shadow-md transition-all duration-200 cursor-pointer"
            onClick={logoutFunction}
          >
            Logout
          </button>
        </div>

        {/* User Info */}
        <section className=" text-center">
          <h2 className="text-4xl font-semibold text-gray-800 animate-bounce">
            <span className="animate-bounce">👋</span> Hello {userData?.name}
          </h2>
          <p className="text-lg text-white mt-2 px-12 bg-[#A44A3F] rounded-lg">
            <span className="font-medium">{userData?.role}</span>
          </p>
        </section>
      </header>

      {/* Products Grid */}
      <section className="mt-12 w-full max-w-6xl px-6 flex-1 overflow-auto pb-10">
        {userProucts && userProucts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {userProucts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 relative flex flex-col justify-between "
              >
                <div className="overflow-hidden">
                  <img
                    src={
                      product.imageUrl ||
                      "https://images.unsplash.com/photo-1530435622277-39544076a5f8?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0"
                    }
                    alt={product.title}
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mt-2 line-clamp-3">
                    {product.content}
                  </p>
                </div>
                <button className="w-[30%] bg-[#A44A3F] hover:bg-[#c75c51] text-white py-3 text-center font-medium transition-colors duration-200 rounded-lg self-end m-3 cursor-pointer">
                  {product.price ? `$${product.price}` : "Free"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20 text-lg">
            No products found.
          </div>
        )}
      </section>
    </div>
  );
}
