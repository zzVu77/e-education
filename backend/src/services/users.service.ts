import { CreateUserDto } from "../dtos/users.dto";
import { UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";
export const userService = {
  async createUser(userData: CreateUserDto) {
    const { fullName, username, password } = userData;
    const isExisting = await UserModel.findOne({ username });
    if (isExisting) {
      throw new Error("Username already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;
    const newUser = new UserModel({ fullName, username, password: hashedPassword });
    await newUser.save();
  },
};
