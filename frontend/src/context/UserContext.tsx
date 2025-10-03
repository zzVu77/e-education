/* eslint-disable @typescript-eslint/no-explicit-any */
// context/UserContext.tsx
"use client";
import axiosInstance from "@/config/axiosConfig";
import { UserInfo } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type User = { id: string; fullName: string };
type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get<UserInfo>("/auth/me");
        setUser(res);
      } catch (err: any) {
        if (err.response?.status === 401) {
          console.log(err.response?.data?.message);
          setUser(null);
        } else {
          console.error("Error fetching user", err);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
