// src/controllers/dashboard.controller.ts
import { Request, Response } from "express";
import {
  getDashboardSummaryService,
  getRevenueTrendService,
  getTopSellingCoursesService,
} from "../services/dashboard.service";

export const getDashboardSummary = async (req: Request, res: Response) => {
  try {
    const { value } = req.query;

    const summary = await getDashboardSummaryService(value as string);

    res.status(200).json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching dashboard summary" });
  }
};
export const getRevenueTrend = async (req: Request, res: Response) => {
  try {
    const { period = "month" } = req.query;
    if (!["month", "week", "year"].includes(period as string)) {
      return res.status(400).json({ message: "Invalid period" });
    }

    const trend = await getRevenueTrendService(period as "month" | "week" | "year");
    res.status(200).json(trend);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching revenue trend" });
  }
};
export const getTopSellingCourses = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const topCourses = await getTopSellingCoursesService(limit);
    res.status(200).json(topCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching top selling courses" });
  }
};
