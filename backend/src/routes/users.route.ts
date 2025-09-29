import { Router } from "express";
import { userController } from "../controller/users.controller";
import { validate } from "../middleware/validation.middleware";
import { createUserSchema } from "../dtos/users.dto";

const userRouter = Router();

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: User signup
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: password123
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Username already exists hoặc dữ liệu không hợp lệ
 */
userRouter.post("/signup", validate(createUserSchema), (req, res) =>
  userController.createUser(req, res),
);

export default userRouter;
