import { Request, Response } from "express";
import { orderService } from "../services/orders.service";
import { CreateOrderDto } from "../dtos/orders.dto";

export const orderController = {
  async createOrder(req: Request, res: Response) {
    const body = req.body as CreateOrderDto;
    try {
      const created = await orderService.createOrder(body);
      res.status(201).json(created);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(400).json({ error: (error as Error).message });
    }
  },

  async getAllOrders(_req: Request, res: Response) {
    try {
      const orders = await orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getOrderById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const order = await orderService.getOrderById(id);
      if (!order) return res.status(404).json({ error: "Order not found" });
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getOrdersByUser(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const orders = await orderService.getOrdersByUser(userId);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching user's orders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getOrdersByStatus(req: Request, res: Response) {
    const { status } = req.params;
    // acp case sensitive
    const normalized = typeof status === "string" ? status.trim().toLowerCase() : "";
    const allowed = ["Pending", "Paid", "Failed"];
    const canonical = allowed.find((s) => s.toLowerCase() === normalized);
    if (!canonical) {
      return res.status(400).json({ error: "Invalid status" });
    }
    try {
      const orders = await orderService.getOrdersByStatus(
        canonical as "Pending" | "Paid" | "Failed",
      );
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders by status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
