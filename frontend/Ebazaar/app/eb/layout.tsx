"use client";
import { useState, useEffect, createContext, useContext } from "react";
import LayoutComp from "../component/LayoutComp/LayoutComp";
import { User } from "../types/types";
import LoadingSpinner from "../component/loading/page";
import InboxModal from "../component/InboxModal/InboxModal";
import ProtectedPageWrapper from "../component/ProtectedPage/ProtectedPageWrapper";

// 1. Create a context
const UserContext = createContext<User | null>(null);

export function useUser() {
  return useContext(UserContext);
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBetaUSer, setIsBetaUser] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (email === "beta@gmail.com" && password === "beta123") {
      setIsBetaUser(true);
      setUser({
        id: 0,
        name: "Beta Tester",
        email: "beta@gmail.com",
        role: "Beta",
        picture:
          "https://images.unsplash.com/photo-1622533277912-19027c3d14e5?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "beta location",
        language: "beta language",
        verified: false,
        phone: 1337,
        coverImage:
          "https://images.unsplash.com/photo-1574586597013-29bd92dc1617?q=80&w=2825&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isOnline: true,
        username: "BetaTester",
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
    <UserContext.Provider value={user}>
      <ProtectedPageWrapper>
        <div className="h-screen w-full flex flex-col gap-3 p-10 bg-overlay ">
          <LayoutComp setChatModalOpen={setChatModalOpen} />
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
        {chatModalOpen && <InboxModal setChatModalOpen={setChatModalOpen} />}
      </ProtectedPageWrapper>
    </UserContext.Provider>
  );
}
