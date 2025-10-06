// src/routes/dashboard.routes.ts
import { Router } from "express";
import {
  getDashboardSummary,
  getRevenueTrend,
  getTopSellingCourses,
} from "../controller/dashboard.controller";

const dashboardRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Admin dashboard statistics
 */

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get summary statistics (total orders, revenue, new vs returning users)
 *     description: Returns key performance metrics for the selected period.
 *     tags: [Dashboard]
 *     parameters:
 *       - in: query
 *         name: period
 *         required: false
 *         schema:
 *           type: string
 *           enum: [month, week, all]
 *           default: month
 *         description: Time period for summary.
 *       - in: query
 *         name: value
 *         required: false
 *         schema:
 *           type: string
 *           example: "2025-10"
 *         description: Month (YYYY-MM) or week number, depending on period.
 *       - in: query
 *         name: year
 *         required: false
 *         schema:
 *           type: integer
 *           example: 2025
 *         description: Optional year, used when period=week.
 *     responses:
 *       200:
 *         description: Dashboard summary retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalOrders:
 *                   type: integer
 *                   example: 120
 *                 totalRevenue:
 *                   type: number
 *                   format: float
 *                   example: 15000.5
 *                 newUsers:
 *                   type: integer
 *                   example: 35
 *                 returningUsers:
 *                   type: integer
 *                   example: 85
 *       500:
 *         description: Server error when fetching dashboard summary.
 */
dashboardRouter.get("/summary", getDashboardSummary);

/**
 * @swagger
 * /api/dashboard/revenue-trend:
 *   get:
 *     summary: Get revenue trend over time
 *     description: Returns revenue grouped by day, week, or month depending on period.
 *     tags: [Dashboard]
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [day, week, month]
 *           default: month
 *         description: Grouping period for revenue trend.
 *     responses:
 *       200:
 *         description: Revenue trend data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     example: "2025-10-01"
 *                   revenue:
 *                     type: number
 *                     example: 2500
 *       500:
 *         description: Server error when fetching revenue trend.
 */
dashboardRouter.get("/revenue-trend", getRevenueTrend);

/**
 * @swagger
 * /api/dashboard/top-selling-courses:
 *   get:
 *     summary: Get top-selling courses
 *     description: Returns the top N courses ranked by total sales or revenue.
 *     tags: [Dashboard]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of top courses to return.
 *     responses:
 *       200:
 *         description: Top-selling courses retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   courseId:
 *                     type: string
 *                     example: "64a8cbaeeaf9d3e4b2b1f43a"
 *                   courseName:
 *                     type: string
 *                     example: "React Masterclass"
 *                   totalRevenue:
 *                     type: number
 *                     example: 3500
 *                   totalOrders:
 *                     type: integer
 *                     example: 120
 *       500:
 *         description: Server error when fetching top-selling courses.
 */
dashboardRouter.get("/top-selling-courses", getTopSellingCourses);

export default dashboardRouter;
