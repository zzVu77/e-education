// Response DTO for Order model
//Request DTO for Order model
import { z } from "zod";

// Request DTO for Order model
// - user: ObjectId string of the user who places the order
// - courses: array of ObjectId strings for the purchased courses
// - totalAmount: total price for the order (must be >= 0)
// - paymentMethod: one of allowed payment methods
export const createOrderSchema = z.object({
  user: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid user id (must be a 24 hex characters ObjectId)"),
  courses: z
    .array(
      z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid course id (must be a 24 hex characters ObjectId)"),
    )
    .min(1, "At least one course must be provided"),
  totalAmount: z.number().nonnegative("totalAmount must be a positive number"),
  paymentMethod: z.enum(["CreditCard", "Paypal", "BankTransfer"]),
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>;

// Response DTO for Order model (what the API returns)
export type OrderResponseDto = {
  id: string;
  user: string; // user id
  courses: string[]; // course ids
  totalAmount: number;
  paymentStatus: "Pending" | "Paid" | "Failed";
  paymentMethod: "CreditCard" | "Paypal" | "BankTransfer";
  createdAt: Date;
  updatedAt: Date;
};
