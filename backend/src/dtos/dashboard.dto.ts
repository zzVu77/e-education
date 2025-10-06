// src/dto/dashboard.dto.ts

/** --- Dashboard Summary --- */
export interface DashboardSummaryDto {
  totalOrders: number;
  totalRevenue: number;
  newUsers: number;
  returningUsers: number;
}

/** --- Revenue Trend --- */
export type Period = "month" | "week" | "year" | "all";

export interface RevenueTrendItemDto {
  period: string; // ví dụ: "2025-10" hoặc "2025-W41" hoặc "2025"
  revenue: number;
}

/** --- Top Selling Courses --- */
export interface TopCourseItemDto {
  courseId: string;
  title: string;
  totalOrders: number;
  totalRevenue: number;
}
