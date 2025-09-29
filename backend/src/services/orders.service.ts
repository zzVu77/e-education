import { CreateOrderDto, OrderResponseDto, OrderResponseSchema } from "../dtos/orders.dto";
import { OrderModel } from "../models/order.model";
import { CourseModel } from "../models/course.model";

export const orderService = {
  async createOrder(orderData: CreateOrderDto): Promise<OrderResponseDto> {
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
    const saved = await newOrder.save();
    return OrderResponseSchema.parse(saved.toJSON());
  },

  async getAllOrders(): Promise<OrderResponseDto[]> {
    const orders = await OrderModel.find();
    return orders.map((order) => OrderResponseSchema.parse(order.toJSON()));
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
