// src/server.ts
import "dotenv/config";
import express from "express";
import { UserModel } from "./models/user.model";
import { connectDB } from "./config/db";
import morgan from "morgan";
import { OrderModel } from "./models/order.model";

async function bootstrap() {
  const app = express();
  app.use(morgan("dev"));
  app.use(express.json());
  app.get("/", async (_req, res) => {
    try {
      const orders = await OrderModel.find().lean();
      res.json({ message: "API is running", orders });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

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
