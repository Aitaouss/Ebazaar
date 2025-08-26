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
  }
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [userProucts, setUserProducts] = useState<userProducts[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        } else {
          console.error("Invalid response structure", data);
          window.location.href = "/login";
        }
        setLoading(false); // ✅ set loading to false after data is fetched
      } catch (err) {
        console.error("Fetch error:", err);
        window.location.href = "/login";
      }
    };

    fetchUserData();
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
    <div className="h-full w-full flex items-center justify-center flex-col gap-8">
      <div className="flex-1 flex items-center justify-center flex-col gap-8">
        <h1 className="text-6xl">Dashboard</h1>
        <h1 className="text-5xl">Hello {userData?.name}</h1>
        <h1 className="text-xl">Role : {userData?.role}</h1>
        <button
          className="px-12 py-3 bg-[#015B46] text-white rounded-lg"
          onClick={logoutFunction}
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-3 w-[1200px] overflow-auto mb-10 bg-[#111]/10 rounded-lg p-5">
        {userProucts && userProucts.length > 0 ? (
          userProucts.map((product) => (
            <div
              key={product.id}
              className=" m-2 p-2 rounded-lg bg-[#FDF9F4] shadow-lg"
            >
              <h2 className="text-2xl font-bold">{product.title}</h2>
              <img
                src={
                  "https://images.unsplash.com/photo-1530435622277-39544076a5f8?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={product.title}
                className="w-full h-48 object-cover mt-2"
              />
              <p className="mt-2">{product.content}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
