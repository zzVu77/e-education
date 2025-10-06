import { Request, RequestHandler, Response } from "express";
import { JWT_CONFIG } from "../config/jwt";
import { LoginUserDto } from "../dtos/users.dto";
import { authService } from "../services/auth.service";
const isProduction = process.env.ENV === "production";
const setTokenCookie = (res: Response, tokenName: string, token: string, maxAge: number) => {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: isProduction,
    maxAge,
    domain: isProduction ? ".vucoder77.id.vn" : "localhost",
    path: "/",
  });
};
export const authController = {
  async login(req: Request, res: Response) {
    try {
      const body = req.body as LoginUserDto;
      const { accessToken, refreshToken } = await authService.login(body.username, body.password);
      setTokenCookie(res, "accessToken", accessToken, JWT_CONFIG.ACCESS_EXPIRES_IN);
      setTokenCookie(res, "refreshToken", refreshToken, JWT_CONFIG.REFRESH_EXPIRES_IN);
      return res.json({ message: "Login success" });
    } catch {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  },
  // Google login callback
  googleCallback: (async (req: Request, res: Response) => {
    try {
      const { email, fullName, googleId } = req.user as {
        email: string;
        fullName: string;
        googleId: string;
      };

      const user = await authService.findOrCreateGoogleUser({ email, fullName, googleId });
      const { accessToken, refreshToken } = authService.generateTokens(user);
      setTokenCookie(res, "accessToken", accessToken, JWT_CONFIG.ACCESS_EXPIRES_IN);
      setTokenCookie(res, "refreshToken", refreshToken, JWT_CONFIG.REFRESH_EXPIRES_IN);
      res.redirect(process.env.FE_REDIRECT_URI || "http://localhost:3000");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Google authentication failed" });
    }
  }) as RequestHandler,
  // Logout user
  logout(_req: Request, res: Response) {
    res.clearCookie("accessToken", { domain: ".vucoder77.id.vn", path: "/" });
    res.clearCookie("refreshToken", { domain: ".vucoder77.id.vn", path: "/" });
    return res.json({ message: "Logout success" });
  },
  // Refresh access token
  refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies["refreshToken"] as string;
      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token missing" });
      }
      const { accessToken } = authService.refreshToken(refreshToken);
      setTokenCookie(res, "accessToken", accessToken, JWT_CONFIG.ACCESS_EXPIRES_IN);
      return res.json({ message: "Access token refreshed" });
    } catch {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  },
};
