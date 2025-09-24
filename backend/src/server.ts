// src/server.ts
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db";
import courseRouter from "./routes/courses.route";

async function bootstrap() {
  const app = express();
  app.use(morgan("dev"));
  app.use(express.json());
  app.get("/", async (_req, res) => {
    res.send("E-Education API is running");
  });
  app.use("/api/courses", courseRouter);
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
