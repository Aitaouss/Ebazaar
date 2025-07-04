"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../loading/page";

interface usernterface {
  username: string;
  email: string;
  picture: string;
}

export default function Home() {
  const [userData, setUserData] = useState<usernterface>();
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && userData && (
        <div className="bg-gray-50 min-h-screen text-gray-800 w-full">
          {/* Navbar */}
          <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
            <h1 className="text-2xl font-bold">StoreApp</h1>
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border rounded-md w-1/3"
            />
            <div
              className="space-x-4 flex justify-center items-center cursor-pointer"
              onClick={() => (window.location.href = "/profile")}
            >
              <Image
                className="cursor-pointer border border-black rounded-full w-12 h-12"
                src={userData.picture || "https://i.ibb.co/FLP25y4n/beard.webp"}
                width={50}
                height={50}
                alt="profile Picture"
              />
              <h1 className="text-black font-bold">{userData.username}</h1>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="bg-[url('https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=3552&auto=format&fit=crop')] bg-cover bg-center h-[60vh] flex items-center justify-center">
            <div className="bg-black bg-opacity-60 p-10 rounded text-center text-white max-w-lg">
              <h2 className="text-4xl font-bold mb-4">
                Discover the Latest Trends
              </h2>
              <p className="mb-6">Shop the newest styles for every season.</p>
              <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition">
                Shop Now
              </button>
            </div>
          </section>

          {/* Categories */}
          <section className="py-10 px-6">
            <h3 className="text-2xl font-semibold mb-6">Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["Men", "Women", "Kids", "Accessories"].map((cat) => (
                <div
                  key={cat}
                  className="bg-white p-6 rounded shadow text-center hover:shadow-lg transition cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=3540&auto=format&fit=crop"
                    alt={cat}
                    className="h-32 w-full object-cover rounded mb-4"
                  />
                  <p className="font-medium">{cat}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Products */}
          <section className="py-10 px-6">
            <h3 className="text-2xl font-semibold mb-6">Featured Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((product) => (
                <div
                  key={product}
                  className="bg-white rounded shadow hover:shadow-lg transition p-4"
                >
                  <img
                    src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=3540&auto=format&fit=crop"
                    alt="Product"
                    className="h-40 w-full object-cover rounded mb-4"
                  />
                  <h4 className="font-semibold text-lg">Product {product}</h4>
                  <p className="text-sm text-gray-600">
                    Awesome description here
                  </p>
                  <p className="mt-2 font-bold text-blue-600">$29.99</p>
                  <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
