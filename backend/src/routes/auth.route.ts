/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from "express";
import { authController } from "../controller/auth.controller";
import { validate } from "../middleware/validation.middleware";
import { loginUserSchema } from "../dtos/users.dto";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";
import passport from "passport";
const authRouter = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login success
 */
authRouter.post("/login", validate(loginUserSchema), (req, res) => authController.login(req, res));
/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Current user info
 *       401:
 *         description: Unauthorized
 */
authRouter.get("/me", authenticate, (req: AuthRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return res.json({ id: req.user.id, fullName: req.user.fullName });
});
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout success
 */
authRouter.post("/logout", (req, res) => authController.logout(req, res));
/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOi...
 *     responses:
 *       200:
 *         description: Refresh success
 */
authRouter.post("/refresh", (req, res) => authController.refresh(req, res));
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleCallback,
);

export default authRouter;
