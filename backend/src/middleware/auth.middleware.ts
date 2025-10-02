import { JWT_CONFIG } from "../config/jwt";
import { JwtPayloadDto, jwtPayloadSchema } from "../dtos/jwt.dto";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export interface AuthRequest extends Request {
  user?: JwtPayloadDto;
}
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["accessToken"] as string;
    if (!token) return res.status(401).json({ message: "Access token missing" });
    const decoded = jwt.verify(token, JWT_CONFIG.ACCESS_SECRET);
    const validationResult = jwtPayloadSchema.safeParse(decoded);
    if (!validationResult.success) {
      console.log("Invalid token payload:", validationResult.error);
      return res.status(401).json({ message: "Invalid token payload" });
    }
    console.log("Decoded token:", decoded);
    console.log("Validation result:", validationResult);
    req.user = validationResult.data;
    next();
  } catch (error) {
    console.log("Error:", error);
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
};
