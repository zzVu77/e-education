// src/models/order.model.ts
import { Schema, model, Document, Types } from "mongoose";
import { IUser } from "./user.model";
import { ICourse } from "./course.model";

export interface IOrder extends Document {
  user: Types.ObjectId | IUser; // người mua
  courses: (Types.ObjectId | ICourse)[]; // danh sách khóa học mua
  totalAmount: number; // tổng tiền
  paymentStatus: "Pending" | "Paid" | "Failed";
  paymentMethod: "CreditCard" | "Paypal" | "BankTransfer";
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course", required: true }],
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["CreditCard", "Paypal", "BankTransfer"],
      required: true,
    },
  },
  { timestamps: true }
);

OrderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

export const OrderModel = model<IOrder>("Order", OrderSchema);
