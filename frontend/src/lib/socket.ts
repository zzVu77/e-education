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

    socket = io(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080", {
      query: { userId },
      // transports: ["websocket"],
    });
  }
  return socket;
};
