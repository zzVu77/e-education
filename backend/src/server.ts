// src/server.ts
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db";
import courseRouter from "./routes/courses.route";
import userRouter from "./routes/users.route";
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";

async function bootstrap() {
  // Create Express app
  const app = express();
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cookieParser());
  // Define routes
  app.get("/", (_req, res) => {
    res.send("E-Education API is running");
  });
  app.use("/api/courses", courseRouter);
  app.use("/api/users", userRouter);
  app.use("/api/auth", authRouter);
  const uri = process.env.MONGODB_URI!;
  await connectDB(uri);
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

bootstrap().catch((err) => {
  console.error("Startup error:", err);
  process.exit(1);
});
