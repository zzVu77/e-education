"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";

interface OnlineUserContextType {
  onlineUsers: number;
}

const OnlineUserContext = createContext<OnlineUserContextType>({
  onlineUsers: 0,
});

export const OnlineUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    const socket = getSocket();

    socket.on("updateOnlineUsers", (count: number) => {
      setOnlineUsers(count);
    });

    return () => {
      socket.off("updateOnlineUsers");
    };
  }, []);

  return (
    <OnlineUserContext.Provider value={{ onlineUsers }}>
      {children}
    </OnlineUserContext.Provider>
  );
};

export const useOnlineUsers = () => useContext(OnlineUserContext);
