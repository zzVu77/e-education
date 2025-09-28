import { Router } from "express";
import { orderController } from "../controller/orders.controller";
import { validate } from "../middleware/validation.middleware";
import { createOrderSchema } from "../dtos/orders.dto";

const orderRouter = Router();

// Create order
orderRouter.post("/", validate(createOrderSchema), (req, res) =>
	orderController.createOrder(req, res),
);

// Get all orders
orderRouter.get("/", (req, res) => orderController.getAllOrders(req, res));

// Get order by id
orderRouter.get("/:id", (req, res) => orderController.getOrderById(req, res));

// Get orders by user id
orderRouter.get("/user/:userId", (req, res) => orderController.getOrdersByUser(req, res));

export default orderRouter;
