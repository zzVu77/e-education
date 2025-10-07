// src/lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    const userId =
      localStorage.getItem("userId") ||
      (() => {
        const id = crypto.randomUUID();
        localStorage.setItem("userId", id);
        return id;
      })();

    socket = io("http://localhost:8080", {
      query: { userId },
      transports: ["websocket"],
    });

    // socket.on("connect", () => {
    //   console.log("🔌 Connected to socket server with userId:", userId);
    // });

    // socket.on("updateOnlineUsers", (count: number) => {
    //   console.log("👥 Online users:", count);
    // });
  }
  return socket;
};
