"use client";
import { useUser } from "@/app/eb/layout"; // your hook
import { usePathname, notFound } from "next/navigation";
import { useEffect } from "react";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function ProtectedPageWrapper({ children }: ProtectedProps) {
  const user = useUser();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) return; // still loading

    const segments = pathname.split("/"); // /eb/{name}/dashboard
    const nameInPath = segments[2];

    // decode URL part to compare with plain username
    if (nameInPath === "eb" || !nameInPath) return; // allow /eb or /eb/
    if (decodeURIComponent(nameInPath) !== user.name) {
      console.log("Infos : ", decodeURIComponent(nameInPath), user.name);
      notFound(); // render 404 page
    }
  }, [user, pathname]);

  return <>{children}</>;
}
