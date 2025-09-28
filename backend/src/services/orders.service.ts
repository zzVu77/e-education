import { CreateOrderDto, OrderResponseDto } from "../dtos/orders.dto";
import { OrderModel } from "../models/order.model";
import { CourseModel } from "../models/course.model";

function toIdString(value: unknown): string {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object") {
        const obj = value as { id?: unknown; _id?: unknown };
        if (typeof obj.id === "string") return obj.id;
        if (obj._id !== undefined) return String(obj._id);
    }
    try {
        return String(value);
    } catch {
        return "";
    }
}

function mapDocToDto(doc: unknown): OrderResponseDto {
    // Normalize document: if it has toJSON, use it; otherwise assume it's a plain object
    const json: any = (doc && typeof (doc as any).toJSON === "function") ? (doc as any).toJSON() : doc;

    const id = json?.id ?? (json?._id ? String(json._id) : "");
    const user = toIdString(json?.user);
    const courses = Array.isArray(json?.courses) ? json.courses.map((c: unknown) => toIdString(c)) : [];

    const totalAmount = typeof json?.totalAmount === "number" ? json.totalAmount : 0;
    const paymentStatus = json?.paymentStatus as OrderResponseDto["paymentStatus"] ?? "Pending";
    const paymentMethod = json?.paymentMethod as OrderResponseDto["paymentMethod"] ?? "CreditCard";
    const createdAt = json?.createdAt ? new Date(json.createdAt) : new Date();
    const updatedAt = json?.updatedAt ? new Date(json.updatedAt) : new Date();

    return {
        id,
        user,
        courses,
        totalAmount,
        paymentStatus,
        paymentMethod,
        createdAt,
        updatedAt,
    } as OrderResponseDto;
}

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
            throw new Error("totalAmount does not match sum of course prices");
        }

        const newOrder = new OrderModel({
            user,
            courses,
            totalAmount,
            paymentMethod,
        // paymentStatus will use schema default (Pending)
        });

        const saved = await newOrder.save();
            return mapDocToDto(saved);
        },

        async getAllOrders(): Promise<OrderResponseDto[]> {
            const orders = await OrderModel.find();
            return orders.map(mapDocToDto);
        },

        async getOrderById(id: string): Promise<OrderResponseDto | null> {
            const order = await OrderModel.findById(id);
            if (!order) return null;
            return mapDocToDto(order);
        },

        async getOrdersByUser(userId: string): Promise<OrderResponseDto[]> {
            const orders = await OrderModel.find({ user: userId });
            return orders.map(mapDocToDto);
        },
};
