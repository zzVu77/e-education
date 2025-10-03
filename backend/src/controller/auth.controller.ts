import { Request, Response } from "express";
import { JWT_CONFIG } from "../config/jwt";
import { LoginUserDto } from "../dtos/users.dto";
import { authService } from "../services/auth.service";

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const body = req.body as LoginUserDto;
      const { accessToken, refreshToken, user } = await authService.login(
        body.username,
        body.password,
      );
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
      return res.json({ message: "Login success", user });
    } catch {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  },
  logout(_req: Request, res: Response) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.json({ message: "Logout success" });
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
