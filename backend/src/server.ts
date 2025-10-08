// src/server.ts
import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db";
import courseRouter from "./routes/courses.route";
import userRouter from "./routes/users.route";
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";
import orderRouter from "./routes/orders.route";
import { setupSwagger } from "./swagger";
import passport from "passport";
import "./config/passport";

import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
async function bootstrap() {
  // Create Express app
  const app = express();
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://10.0.40.208:3000"],
      credentials: true,
    }),
  );
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // To handle request body from HTML forms
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(passport.initialize());
  // Define routes
  app.get("/", (_req, res) => {
    res.send("E-Education API is running");
  });
  app.use("/api/courses", courseRouter);
  app.use("/api/users", userRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/orders", orderRouter);
  const uri = process.env.MONGODB_URI!;
  await connectDB(uri);
  const port = Number(process.env.PORT) || 3000;
  setupSwagger(app);
  // Initialize HTTP server
  const httpServer = createServer(app);

  // Initialize Socket.IO server
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: ["http://localhost:3000", "http://10.0.40.208:3000"],
      credentials: true,
    },
  });

  // Save connected users
  const connectedUsers = new Map<string, number>(); // userId -> connection count
  console.log("connectedUsers", connectedUsers);
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId as string;

    if (userId) {
      const count = connectedUsers.get(userId) || 0;
      connectedUsers.set(userId, count + 1);
    }

    console.log("User connected:", userId);
    console.log("Total connected users:", connectedUsers.size);
    console.log("connectedUsers", connectedUsers);

    io.emit("updateOnlineUsers", connectedUsers.size);

    socket.on("disconnect", () => {
      if (userId) {
        const count = connectedUsers.get(userId)! - 1;
        if (count <= 0) connectedUsers.delete(userId);
        else connectedUsers.set(userId, count);
      }
      io.emit("updateOnlineUsers", connectedUsers.size);
    });
  });

  httpServer.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger docs at http://localhost:${port}/api-docs`);
  });
}

bootstrap().catch((err) => {
  console.error("Startup error:", err);
  process.exit(1);
});
