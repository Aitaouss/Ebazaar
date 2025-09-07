"use client";

import { useUser } from "@/app/eb/layout";
import Image from "next/image";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaStar,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import EditProfileModal from "./EditProfileModal";
import { useState, useEffect } from "react";
import LoadingSpinner from "../loading/page";
import ProfileLeftSection from "./ProfileLeftSection";
import ProfileRightSection from "./ProfileRightSection";

export default function ProfileComponent() {
  const user = useUser();
  const [editOpen, setEditOpen] = useState(false);
  const [userState, setUserState] = useState(user);
  const [submitting, setSubmitting] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  // Move fetchProducts out of useEffect so it can be called from children
  const fetchProducts = async () => {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user_products`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) {
        const data = await res.json();
        setProductsError(data.error || "Failed to fetch products");
        setProducts([]);
      } else {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (err) {
      setProductsError("Failed to fetch products");
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOnsave = async (data: any) => {
    // Only send request if something actually changed
    if (!userState) {
      setEditOpen(false);
      return;
    }
    const changed = Object.entries(data).some(
      ([key, value]) => value !== "" && value !== (userState as any)[key]
    );
    if (!changed) {
      setEditOpen(false);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/edit`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...userState, ...data }),
        }
      );
      if (res.ok) {
        window.location.href = "/eb";
      } else {
        console.error("Failed to update user");
      }
    } catch (err) {
      console.error("Error updating user:", err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      <ProfileLeftSection userState={userState} setEditOpen={setEditOpen} />
      <ProfileRightSection
        products={products}
        productsLoading={productsLoading}
        productsError={productsError}
        setEditOpen={setEditOpen}
        fetchProducts={fetchProducts}
      />
      <EditProfileModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        user={userState}
        onSave={handleOnsave}
      />
    </div>
  );
}
