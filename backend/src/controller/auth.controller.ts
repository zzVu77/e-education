import { Request, Response } from "express";
import { LoginUserDto } from "../dtos/users.dto";
import { authService } from "../services/auth.service";
import { JWT_CONFIG } from "../config/jwt";

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const body = req.body as LoginUserDto;
      const { accessToken, refreshToken } = await authService.login(body.username, body.password);
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: JWT_CONFIG.ACCESS_EXPIRES_IN,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: JWT_CONFIG.REFRESH_EXPIRES_IN,
      });
      return res.json({ message: "Login success" });
    } catch {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  },
  refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies["refreshToken"] as string;
      console.log("Refresh token:", refreshToken);
      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token missing" });
      }
      const { accessToken } = authService.refreshToken(refreshToken);
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: JWT_CONFIG.ACCESS_EXPIRES_IN,
      });
      return res.json({ message: "Access token refreshed" });
    } catch {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  },
};
