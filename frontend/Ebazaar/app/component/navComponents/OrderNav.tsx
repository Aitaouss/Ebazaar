"use client";

import { useState } from "react";

export default function OrderNav() {
  const [loading, setLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);

  const createOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seller_id: 1,
          product_id: 2,
          total_price: 1000,
        }),
      });

      if (res.ok) {
        console.log("Order created successfully");
      } else {
        console.error("Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };
  const addReview = async () => {
    setReviewLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 1,
            rating: 5,
            comment: "Great product!",
          }),
        }
      );

      if (res.ok) {
        console.log("Review added successfully");
      } else {
        console.error("Failed to add review");
      }
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-full p-10">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center border border-gray-200">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Orders Section
        </h1>
        <p className="text-gray-500 mb-6">
          Your Orders details will appear here soon. We’re working on giving you
          a personalized dashboard.
        </p>
        <button
          onClick={createOrder}
          disabled={loading}
          className="px-6 py-2 bg-[#A44A3F] text-white rounded-full shadow-md hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Order..." : "Create Order 🚀"}
        </button>
        <button
          onClick={addReview}
          disabled={reviewLoading}
          className="ml-4 px-6 py-2 bg-[#015B46] text-white rounded-full shadow-md hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {reviewLoading ? "Adding Review..." : "Add Review ⭐"}
        </button>
      </div>
      <div className="mt-6 text-gray-400 text-sm">
        (This is a placeholder. Actual order data will be displayed here soon.)
      </div>
    </div>
  );
}
