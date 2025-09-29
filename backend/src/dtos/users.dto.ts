import { z } from "zod";
// Response DTO for User model
//Request DTO for User model
//create user schema
export const createUserSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    fullName: z.string().min(2, "Full name must be at least 2 characters long"),
  })
  .strict();
// login user request dto
export const loginUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type LoginUserDto = z.infer<typeof loginUserSchema>;
