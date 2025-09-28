"use client";
import { createContext, useContext } from "react";

// Create a context
const UserContext = createContext<any>(null);

export function useUser() {
  return useContext(UserContext);
}

export { UserContext };
