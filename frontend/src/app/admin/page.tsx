import { CourseRevenueChartWithLabel } from "@/components/admin/CourseRevenueChart";
import { RevenueChartByPeriod } from "@/components/admin/RevenueChartByPeriod";
import { StatisticSection } from "@/components/admin/StatisticSection";
export default function DashboardStats() {
  return (
    <div className="px-2 py-1 pt-1">
      <StatisticSection />
      {/* Charts */}
      <div className="p-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <CourseRevenueChartWithLabel />
        <RevenueChartByPeriod />
      </div>
    </div>
  );
}
