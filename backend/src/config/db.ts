// src/config/db.ts
import mongoose from "mongoose";

export async function connectDB(uri: string) {
  // Bật autoIndex trong dev; tắt trong prod nếu cần hiệu năng
  await mongoose.connect(uri, { autoIndex: true });
  const conn = mongoose.connection;

  conn.on("connected", () => console.log("MongoDB connected"));
  conn.on("error", (err) => console.error("MongoDB error:", err));
  conn.on("disconnected", () => console.log("MongoDB disconnected"));

  // Đóng kết nối khi process kết thúc
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
}
