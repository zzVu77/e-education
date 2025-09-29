import { Request, Response } from "express";
import { userService } from "../services/users.service";
import { CreateUserDto } from "../dtos/users.dto";

export const userController = {
  async createUser(req: Request, res: Response) {
    const body = req.body as CreateUserDto;
    try {
      await userService.createUser(body);
      res.status(201).json({ message: "User created successfully" });
      console.log("User created successfully");
    } catch (error) {
      console.error("Error creating user:");
      res.status(400).json({ error: (error as Error).message });
    }
  },
};
