import { UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";
import { JWT_CONFIG } from "../config/jwt";
import jwt from "jsonwebtoken";
import { JwtPayloadDto } from "../dtos/jwt.dto";
export const authService = {
  async login(userName: string, password: string) {
    const user = await UserModel.findOne({ username: userName });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");
    const payload = { id: user._id, fullName: user.fullName };
    const accessToken = jwt.sign(payload, JWT_CONFIG.ACCESS_SECRET, {
      expiresIn: JWT_CONFIG.ACCESS_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(payload, JWT_CONFIG.REFRESH_SECRET, {
      expiresIn: JWT_CONFIG.REFRESH_EXPIRES_IN,
    });
    return { accessToken, refreshToken };
  },

  refreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_CONFIG.REFRESH_SECRET) as JwtPayloadDto;
      const accessToken = jwt.sign(
        {
          id: decoded.id,
          fullName: decoded.fullName,
        },
        JWT_CONFIG.ACCESS_SECRET,
        {
          expiresIn: JWT_CONFIG.ACCESS_EXPIRES_IN,
        },
      );
      return { accessToken };
    } catch {
      throw new Error("Invalid refresh token");
    }
  },
};
