import { Router } from "express";
import { orderController } from "../controller/orders.controller";
import { validate } from "../middleware/validation.middleware";
import { createOrderSchema } from "../dtos/orders.dto";
import { authenticate, isAdmin } from "../middleware/auth.middleware";

const orderRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 example: 652c2f1d8a9c8c1a5b4d1234
 *               courses:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["652c2f1d8a9c8c1a5b4d1111", "652c2f1d8a9c8c1a5b4d2222"]
 *               totalAmount:
 *                 type: number
 *                 example: 199.99
 *               paymentMethod:
 *                 type: string
 *                 enum: [CreditCard, Paypal, BankTransfer]
 *                 example: CreditCard
 *     responses:
 *       201:
 *         description: Order created
 */
orderRouter.post("/", authenticate, isAdmin, validate(createOrderSchema), (req, res) =>
  orderController.createOrder(req, res),
);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 */
orderRouter.get("/", authenticate, isAdmin, (req, res) => orderController.getAllOrders(req, res));

/**
 * @swagger
 * /api/orders/status/{status}:
 *   get:
 *     summary: Get orders by status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Pending, Paid, Failed]
 *     responses:
 *       200:
 *         description: List of orders with given status
 */
orderRouter.get("/status/:status", authenticate, isAdmin, (req, res) =>
  orderController.getOrdersByStatus(req, res),
);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */
orderRouter.get("/:id", authenticate, isAdmin, (req, res) =>
  orderController.getOrderById(req, res),
);

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Get orders by user ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders for the user
 */
orderRouter.get("/user/:userId", authenticate, isAdmin, (req, res) =>
  orderController.getOrdersByUser(req, res),
);

export default orderRouter;
