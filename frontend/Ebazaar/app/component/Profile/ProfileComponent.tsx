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
import { useState } from "react";
import ProfileSection from "./ProfileSection";
import ProductSection from "./ProductSection";

export default function ProfileComponent() {
  const user = useUser();
  const [editOpen, setEditOpen] = useState(false);
  const [userState, setUserState] = useState(user);
  const [submitting, setSubmitting] = useState(false);
  // Dummy data for products and reviews
  const products = [
    {
      id: 1,
      title: "Hand-Painted Ceramics",
      category: "Ceramics",
      location: "Morocco, Casablanca",
      price: "120.99$",
      image: "https://i.ibb.co/VfPyNyS/hand-painted-ceramic.jpg",
    },
    {
      id: 2,
      title: "Hand-Painted Ceramics",
      category: "Ceramics",
      location: "Morocco, Casablanca",
      price: "120.99$",
      image: "https://i.ibb.co/VfPyNyS/hand-painted-ceramic.jpg",
    },
    {
      id: 3,
      title: "Hand-Painted Ceramics",
      category: "Ceramics",
      location: "Morocco, Casablanca",
      price: "120.99$",
      image: "https://i.ibb.co/VfPyNyS/hand-painted-ceramic.jpg",
    },
  ];

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
    <div className="flex flex-row gap-6 w-full h-full">
      <ProfileSection
        userState={userState}
        setEditOpen={setEditOpen}
        editOpen={editOpen}
        handleOnsave={handleOnsave}
      />
      <ProductSection products={products} />
    </div>
  );
}
