// Response DTO for Order model
//Request DTO for Order model
import { z } from "zod";
import { toIdString } from "../utils";
import { Types } from "mongoose";

// Request DTO for Order model

export const createOrderSchema = z.object({
  user: z.string("User ID must be a string").nonempty("User ID is required"),
  courses: z
    .array(z.string("Course ID must be a string"))
    .min(1, "At least one course must be provided"),
  totalAmount: z.number().nonnegative("totalAmount must be a positive number"),
  paymentMethod: z.enum(["CreditCard", "Paypal", "BankTransfer"]),
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>;

// Response DTO for Order model (what the API returns)
export const CourseInOrderSchemaForGetAllOrders = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
});
export type CourseInOrderDtoForGetAllOrders = z.infer<typeof CourseInOrderSchemaForGetAllOrders>;
// --- User trong order (cho getAll) ---
export const UserInOrderSchemaForGetAllOrders = z.object({
  id: z.string(),
  username: z.string(),
});

export type UserInOrderDtoForGetAllOrders = z.infer<typeof UserInOrderSchemaForGetAllOrders>;
export const OrderResponseSchemaForGetAllOrders = z.object({
  id: z.string(),
  user: UserInOrderSchemaForGetAllOrders,
  courses: z.array(CourseInOrderSchemaForGetAllOrders),
  totalAmount: z.number(),
  paymentStatus: z.enum(["Pending", "Paid", "Failed"]),
  paymentMethod: z.enum(["CreditCard", "Paypal", "BankTransfer"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type OrderResponseDtoForGetAllOrders = z.infer<typeof OrderResponseSchemaForGetAllOrders>;
// Response DTO for Order model (what the API returns)
export const OrderResponseSchema = z.object({
  id: z.any().transform((v) => String(v)),
  user: z.instanceof(Types.ObjectId).transform((v) => toIdString(v)), //  from ObjectId to string
  courses: z.array(z.instanceof(Types.ObjectId).transform((c) => toIdString(c))), // from list of ObjectId to string
  totalAmount: z.number().default(0),
  paymentStatus: z.enum(["Pending", "Paid", "Failed"]).default("Pending"),
  paymentMethod: z.enum(["CreditCard", "Paypal", "BankTransfer"]).default("CreditCard"),
  createdAt: z.preprocess((v) => new Date(v as string | number | Date), z.date()),
  updatedAt: z.preprocess((v) => new Date(v as string | number | Date), z.date()),
});

export type OrderResponseDto = z.infer<typeof OrderResponseSchema>;
