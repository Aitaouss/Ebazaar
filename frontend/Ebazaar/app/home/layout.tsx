"use client";
import { useState, useEffect, createContext, useContext } from "react";
import LayoutComp from "../component/LayoutComp/LayoutComp";
import { User } from "../types/types";
import LoadingSpinner from "../component/loading/page";
import InboxModal from "../component/InboxModal/InboxModal";

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
        picture: null,
      });
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:9000/me", {
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
      <div className="h-screen w-full flex flex-col gap-3 p-10 bg-overlay ">
        <LayoutComp setChatModalOpen={setChatModalOpen} />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
      {chatModalOpen && <InboxModal setChatModalOpen={setChatModalOpen} />}
    </UserContext.Provider>
  );
}
