"use client";
import { useUser } from "@/app/context/UserContext"; // your hook
import { usePathname, notFound } from "next/navigation";
import { useEffect } from "react";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function ProtectedPageWrapper({ children }: ProtectedProps) {
  const data = useUser();
  const user = data?.user;
  const pathname = usePathname();

  useEffect(() => {
    if (!user) return; // still loading

    const segments = pathname.split("/"); // /eb/{name}/dashboard
    const nameInPath = segments[2];

    // decode URL part to compare with plain username
    if (nameInPath === "eb" || !nameInPath) return; // allow /eb or /eb/
    if (decodeURIComponent(nameInPath) !== user.username) {
      console.log("Infos : ", decodeURIComponent(nameInPath), user.username);
      notFound(); // render 404 page
    }
  }, [user, pathname]);

  return <>{children}</>;
}
