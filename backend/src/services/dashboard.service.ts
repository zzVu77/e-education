import { OrderModel } from "../models/order.model";
import {
  DashboardSummaryDto,
  RevenueTrendItemDto,
  TopCourseItemDto,
  Period,
} from "../dtos/dashboard.dto";

/**
 * --- Dashboard Summary Service ---
 */
export const getDashboardSummaryService = async (
  value: string, // "MM-YYYY" hoặc "YYYY"
): Promise<DashboardSummaryDto> => {
  const now = new Date();

  let startDate: Date;
  let endDate: Date;

  if (/^\d{2}-\d{4}$/.test(value)) {
    // === Trường hợp month-year ===
    const [m, y] = value.split("-").map(Number);
    startDate = new Date(y, m - 1, 1);
    endDate = new Date(y, m, 0, 23, 59, 59, 999);
  } else if (/^\d{4}$/.test(value)) {
    // === Trường hợp chỉ có year ===
    const y = Number(value);
    startDate = new Date(y, 0, 1);
    endDate = new Date(y, 11, 31, 23, 59, 59, 999);
  } else {
    throw new Error("Giá trị không hợp lệ, phải là 'MM-YYYY' hoặc 'YYYY'");
  }

  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);

  interface OrderAggResult {
    totalOrders: number;
    totalRevenue: number;
  }

  interface CountResult {
    newUsers?: number;
    returningUsersTotal?: number;
  }

  const [ordersAgg, newUsersAgg, returningUsersAgg] = await Promise.all([
    OrderModel.aggregate<OrderAggResult>([
      { $match: { createdAt: { $gte: startDate, $lte: endDate }, paymentStatus: "Paid" } },
      { $group: { _id: null, totalOrders: { $sum: 1 }, totalRevenue: { $sum: "$totalAmount" } } },
    ]),
    OrderModel.aggregate<CountResult>([
      { $match: { createdAt: { $gte: startDate, $lte: endDate }, paymentStatus: "Paid" } },
      { $group: { _id: "$user", firstOrderAt: { $min: "$createdAt" } } },
      { $match: { firstOrderAt: { $gte: startDate, $lte: endDate } } },
      { $count: "newUsers" },
    ]),
    OrderModel.aggregate<CountResult>([
      { $match: { createdAt: { $gte: startDate, $lte: endDate }, paymentStatus: "Paid" } },
      { $group: { _id: "$user" } },
      { $count: "returningUsersTotal" },
    ]),
  ]);

  const totalOrders = ordersAgg[0]?.totalOrders || 0;
  const totalRevenue = ordersAgg[0]?.totalRevenue || 0;
  const newUsers = newUsersAgg[0]?.newUsers || 0;
  const returningUsersTotal = returningUsersAgg[0]?.returningUsersTotal || 0;
  const returningUsers = Math.max(0, returningUsersTotal - newUsers);

  return { totalOrders, totalRevenue, newUsers, returningUsers };
};

/**
 * --- Revenue Trend Service ---
 */
export const getRevenueTrendService = async (period: Period): Promise<RevenueTrendItemDto[]> => {
  interface GroupId {
    year: number;
    month?: number;
    week?: number;
  }

  interface RevenueAggResult {
    _id: GroupId;
    revenue: number;
  }

  let groupId: Record<string, unknown>;
  let formatLabel: (doc: RevenueAggResult) => string;

  switch (period) {
    case "month":
      groupId = { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } };
      formatLabel = (doc) => `${doc._id.year}-${String(doc._id.month).padStart(2, "0")}`;
      break;

    case "week":
      groupId = { year: { $year: "$createdAt" }, week: { $isoWeek: "$createdAt" } };
      formatLabel = (doc) => `${doc._id.year}-W${String(doc._id.week).padStart(2, "0")}`;
      break;

    case "year":
      groupId = { year: { $year: "$createdAt" } };
      formatLabel = (doc) => `${doc._id.year}`;
      break;

    default:
      throw new Error("Invalid period");
  }

  const result = await OrderModel.aggregate<RevenueAggResult>([
    { $match: { paymentStatus: "Paid" } },
    { $group: { _id: groupId, revenue: { $sum: "$totalAmount" } } },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.week": 1 } },
  ]);

  return result.map((r) => ({
    period: formatLabel(r),
    revenue: r.revenue,
  }));
};

/**
 * --- Top Selling Courses Service ---
 */
export const getTopSellingCoursesService = async (limit = 5): Promise<TopCourseItemDto[]> => {
  interface TopCourseAgg {
    _id: string;
    totalOrders: number;
    totalRevenue: number;
    courseInfo: { title: string };
  }

  const result = await OrderModel.aggregate<TopCourseAgg>([
    { $match: { paymentStatus: "Paid" } },
    { $unwind: "$courses" },
    {
      $group: {
        _id: "$courses",
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
    { $sort: { totalRevenue: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: "courses",
        localField: "_id",
        foreignField: "_id",
        as: "courseInfo",
      },
    },
    {
      $unwind: {
        path: "$courseInfo",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
  console.log(result);
  return result.map((item) => ({
    courseId: item._id.toString(),
    title: item.courseInfo?.title ?? "Unknown Course",
    totalOrders: item.totalOrders,
    totalRevenue: item.totalRevenue,
  }));
};
