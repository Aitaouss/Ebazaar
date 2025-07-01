"use client";

import React, { useEffect, useRef, useState } from "react";
interface usernterface {
  username: string;
  email: string;
}

export default function Home() {
  const [flag, setFlag] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(true);
  const [userData, setUserData] = useState<usernterface>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    const start = async () => {
      try {
        const res = await fetch("http://localhost:9000/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          console.error("Error in the fetch");
        }
        const data = await res.json();
        if (data) {
          if (data.error === "Unauthorized") {
            window.location.href = "/login";
          } else {
            setLoad(false);
          }
        } else {
          console.error("Error in the Data");
        }
      } catch (err) {
        console.error(`This is the Error : ${err}`);
      }
    };
    start();
  }, [flag]);
  useEffect(() => {
    if (load) {
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const start = async () => {
      const res = await fetch("http://localhost:9000/api/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.error("Error in fetch api/me");
        return;
      }
      const data = await res.json();
      if (data) {
        setUserData(data);
      }
    };
    start();
  }, [load]);
  if (userData) {
    console.log(userData);
  }
  return (
    <>
      {load && <div>...Loading</div>}
      {!load && (
        <div className="bg-gray-50 min-h-screen text-gray-800 w-full">
          {/* Navbar */}
          <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
            <h1 className="text-2xl font-bold">StoreApp</h1>
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border rounded-md w-1/3"
            />
            <div className="space-x-4">
              <h1 className="text-black font-bold">{userData?.username}</h1>
              <button className="text-sm font-medium hover:text-blue-500">
                Cart
              </button>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="bg-[url('https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=3552&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-[60vh] flex items-center justify-center">
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
                    src={`https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
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
                    src={`https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
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
