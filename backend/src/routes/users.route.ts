import { Router } from "express";
import { userController } from "../controller/users.controller";
import { validate } from "../middleware/validation.middleware";
import { createUserSchema } from "../dtos/users.dto";

const userRouter = Router();
userRouter.post("/signup", validate(createUserSchema), (req, res) =>
  userController.createUser(req, res),
);
export default userRouter;
