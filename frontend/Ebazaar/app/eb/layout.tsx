"use client";
import { useState, useEffect, createContext, useContext } from "react";
import LayoutComp from "../component/LayoutComp/LayoutComp";
import { User } from "../types/types";
import LoadingSpinner from "../component/loading/page";
import InboxModal from "../component/InboxModal/InboxModal";
import ProtectedPageWrapper from "../component/ProtectedPage/ProtectedPageWrapper";

// 1. Create a context
const UserContext = createContext<any>(null);

export function useUser() {
  return useContext(UserContext);
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBetaUSer, setIsBetaUser] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (auth === "true" && email === "beta" && password === "beta123") {
      setIsBetaUser(true);

      const betaUser = {
        id: 0,
        name: "Beta Tester",
        email: "beta",
        role: "Beta",
        picture:
          "https://images.unsplash.com/photo-1622533277912-19027c3d14e5?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        profileImage:
          "https://images.unsplash.com/photo-1622533277912-19027c3d14e5?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "San Francisco, CA",
        language: "English",
        verified: false,
        phone: 1234567890,
        coverImage:
          "https://images.unsplash.com/photo-1574586597013-29bd92dc1617?q=80&w=2825&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isOnline: true,
        username: "BetaTester",
      };

      setUser(betaUser);
      // Create userData structure that matches backend response with mock data
      setUserData({
        success: true,
        user: betaUser,
        message: "Beta user authenticated",
        orders: [
          {
            id: 1,
            product_name: "Handwoven Moroccan Rug",
            buyer_name: "Alice Johnson",
            buyer_image: null,
            price: 299.99,
            total_price: 299.99,
            status: "Delivered",
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            product_name: "Artisan Leather Bag",
            buyer_name: "Bob Wilson",
            buyer_image: null,
            price: 189.5,
            total_price: 189.5,
            status: "Shipped",
            created_at: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: 3,
            product_name: "Traditional Ceramic Set",
            buyer_name: "Carol Martinez",
            buyer_image: null,
            price: 149.99,
            total_price: 149.99,
            status: "Processing",
            created_at: new Date(Date.now() - 172800000).toISOString(),
          },
        ],
        products: [
          {
            id: 1,
            name: "Beta Product 1",
            owner: "BetaTester",
            title: "Sample Product",
            imageUrl:
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
            content: "This is a sample product for testing",
            price: 99.99,
          },
        ],
        reviews: [
          {
            id: 1,
            rating: 5,
            comment: "Great seller!",
            reviewer_name: "Jane Doe",
          },
          {
            id: 2,
            rating: 4,
            comment: "Good quality products",
            reviewer_name: "John Smith",
          },
        ],
        inbox: [
          {
            id: 1,
            sender_id: 999,
            sender_name: "Alice Johnson",
            sender_image: null,
            message: "Hello! I'm interested in your products",
            is_read: true,
            time: "2:30 PM",
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            sender_id: 998,
            sender_name: "Bob Wilson",
            sender_image: null,
            message: "Do you have any discounts available?",
            is_read: false,
            time: "1:15 PM",
            created_at: new Date(Date.now() - 3600000).toISOString(),
          },
        ],
      });
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/me`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          window.location.href = "/login";
          return;
        }
        const data = await res.json();
        setUser(data.user);
        setUserData(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        window.location.href = "/login";
      }
    };

    fetchUser();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <UserContext.Provider value={userData}>
      {/* <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComp setChatModalOpen={setChatModalOpen} />
      </div> */}
      <ProtectedPageWrapper>
        <div className="h-screen bg-gradient-to-br from-[#fff] to-[#fff] w-full flex flex-col gap-3 py-10 px-2 md:px-8 lg:px-24 xl:px-48 bg-overlay ">
          <LayoutComp setChatModalOpen={setChatModalOpen} />
          <div className="flex-1 overflow-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-200">
            {children}
          </div>
        </div>
        {chatModalOpen && <InboxModal setChatModalOpen={setChatModalOpen} />}
      </ProtectedPageWrapper>
    </UserContext.Provider>
  );
}
