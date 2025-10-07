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
import dashboardRouter from "./routes/dashboard.route";
import { setupSwagger } from "./swagger";
import passport from "passport";
import "./config/passport";
async function bootstrap() {
  // Create Express app
  const app = express();
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://e-education-vu77.vercel.app",
        "https://vucoder77.id.vn",
        "http://10.0.40.208:3000",
      ],
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
  app.use("/api/dashboard", dashboardRouter);

  const uri = process.env.MONGODB_URI!;
  await connectDB(uri);
  const port = Number(process.env.PORT) || 3000;
  setupSwagger(app);
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger docs at http://localhost:${port}/api-docs`);
  });
}

bootstrap().catch((err) => {
  console.error("Startup error:", err);
  process.exit(1);
});
// Removed the conflicting cors function declaration
