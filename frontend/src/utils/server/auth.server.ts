"user server";
import { UserInfo } from "@/types";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.ACCESS_SECRET!;

export async function getUserFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as UserInfo;
    return decoded;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
