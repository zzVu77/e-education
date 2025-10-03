import {
  CreateOrderDto,
  OrderResponseDto,
  OrderResponseSchema,
  CourseInOrderSchema,
  OrderResponseDtoForGetAllOrders,
  CourseInOrderDtoForGetAllOrders,
  OrderResponseSchemaForGetAllOrders,
} from "../dtos/orders.dto";
import { OrderModel } from "../models/order.model";
import { CourseModel, ICourse } from "../models/course.model";
import { Types } from "mongoose";
import { IUser } from "../models/user.model";

export const orderService = {
  async createOrder(orderData: CreateOrderDto) {
    const { user, courses, totalAmount, paymentMethod } = orderData;
    // Ensure all courses exist
    const foundCourses = await CourseModel.find({ _id: { $in: courses } });
    if (foundCourses.length !== courses.length) {
      throw new Error("Some courses not found");
    }
    // Verify totalAmount matches sum of course prices (tolerance for floating point)
    const computedTotal = foundCourses.reduce((sum, c) => sum + (c.price ?? 0), 0);
    if (Math.abs(computedTotal - totalAmount) > 0.0001) {
      throw new Error("Total amount does not match sum of course prices");
    }

    const newOrder = new OrderModel({
      user,
      courses,
      totalAmount,
      paymentMethod,
      paymentStatus: "Pending",
    });
    await newOrder.save();
  },

  async getAllOrders(): Promise<OrderResponseDtoForGetAllOrders[]> {
    const orders = await OrderModel.find()
      .populate({
        path: "courses",
        select: "title price",
      })
      .populate({
        path: "user",
        select: "username",
      });
    return orders.map((order) => {
      const orderObj = order.toJSON();

      // check courses
      const courses: {
        id: string;
        name: string;
        price: number;
      }[] = ((orderObj.courses as (ICourse | Types.ObjectId)[]) ?? []).map((c) => {
        if (c instanceof Types.ObjectId) {
          return { id: c.toString(), name: "", price: 0 }; // fallback nếu chưa populate
        }
        return {
          id: c.id.toString(),
          name: c.title,
          price: c.price,
        };
      });

      // user
      const user: { id: string; username: string } = (() => {
        const u = orderObj.user as { id?: Types.ObjectId; username?: string } | Types.ObjectId;
        if (u instanceof Types.ObjectId) {
          return { id: u.toString(), username: "" }; // fallback nếu chưa populate
        }
        console.log("User in order:", u);
        return {
          id: u.id?.toString() ?? "Id not found",
          username: u.username ?? "Username not found",
        };
      })();

      const createdAt = orderObj.createdAt?.toISOString() ?? "";
      const updatedAt = orderObj.updatedAt?.toISOString() ?? "";
      return OrderResponseSchemaForGetAllOrders.parse({
        ...orderObj,
        user,
        courses,
        createdAt,
        updatedAt,
      });
    });
  },

  async getOrderById(id: string): Promise<OrderResponseDto | null> {
    const order = await OrderModel.findById(id);
    if (!order) return null;
    return OrderResponseSchema.parse(order.toJSON());
  },

  async getOrdersByUser(userId: string): Promise<OrderResponseDto[]> {
    const orders = await OrderModel.find({ user: userId });
    return orders.map((order) => OrderResponseSchema.parse(order.toJSON()));
  },

  async getOrdersByStatus(status: "Pending" | "Paid" | "Failed"): Promise<OrderResponseDto[]> {
    const orders = await OrderModel.find({ paymentStatus: status });
    return orders.map((order) => OrderResponseSchema.parse(order.toJSON()));
  },
};
