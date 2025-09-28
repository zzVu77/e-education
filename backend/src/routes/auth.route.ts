import { Router } from "express";
import { authController } from "../controller/auth.controller";

const authRouter = Router();
authRouter.post("/login", (req, res) => authController.login(req, res));
authRouter.post("/refresh", (req, res) => authController.refresh(req, res));
export default authRouter;
