import { z } from "zod";
// Response DTO for User model
export const jwtPayloadSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  role: z.enum(["user", "admin"]),
});

export type JwtPayloadDto = z.infer<typeof jwtPayloadSchema>;
