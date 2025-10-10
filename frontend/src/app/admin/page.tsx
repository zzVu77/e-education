"use client";

import { useState, useEffect } from "react";
import { CourseRevenueChartWithLabel } from "@/components/admin/CourseRevenueChart";
import { RevenueChartByPeriod } from "@/components/admin/RevenueChartByPeriod";
import { StatisticCard } from "@/components/admin/StatisticCard";
import { useOnlineUsers } from "@/context/OnlineUserContext";
import { formatCurrency } from "@/utils/client/formatCurrency";
import axiosInstance from "@/config/axiosConfig";
import { DollarSign, Package, UserPlus, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
export default function DashboardStats() {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i); // 5 năm gần nhất
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

  const [value, setValue] = useState(String(currentYear));
  const [stats, setStats] = useState<{
    totalOrders: number;
    totalRevenue: number;
    newUsers: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const { onlineUsers } = useOnlineUsers();

  // Fetch stats khi value thay đổi
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`dashboard/summary?value=${value}`)
      .then((res) => {
        console.log(res);

        const { totalOrders, totalRevenue, newUsers } = res;
        setStats({ totalOrders, totalRevenue, newUsers });
      })
      .finally(() => setLoading(false));
  }, [value]);

  const statsList = stats
    ? [
        {
          title: "Total Orders",
          value: stats.totalOrders,
          icon: (
            <div className="p-2 rounded-full bg-amber-600/10">
              <Package className="h-7 w-7 text-amber-300" />
            </div>
          ),
        },
        {
          title: "Total Revenue",
          value: formatCurrency(stats.totalRevenue),
          icon: (
            <div className="p-2 rounded-full bg-green-600/10">
              <DollarSign className="h-7 w-7 text-green-300" />
            </div>
          ),
        },
        {
          title: "New Users",
          value: stats.newUsers,
          icon: (
            <div className="p-2 rounded-full bg-blue-600/10">
              <UserPlus className="h-7 w-7 text-blue-300" />
            </div>
          ),
        },
        {
          title: "Online Users",
          value: onlineUsers,
          icon: (
            <div className="relative">
              <UserRound className="h-7 w-7 text-emerald-400 " />
              <div className="absolute top-0 left-7 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
          ),
        },
      ]
    : [];

  return (
    <div>
      {/* Dropdown chọn Year / Month-Year */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-2 mb-4">
        <div className="lg:col-start-4 flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{value}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Choose Year / Month</DropdownMenuLabel>
              <DropdownMenuGroup className="grid grid-cols-4 gap-2">
                {yearOptions.map((year) => (
                  <DropdownMenuSub key={year}>
                    <DropdownMenuSubTrigger>{year}</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {/* Chọn year trực tiếp */}
                      <DropdownMenuItem onClick={() => setValue(String(year))}>
                        {year}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {/* Chọn month-year */}
                      {months.map((m) => (
                        <DropdownMenuItem
                          key={m}
                          onClick={() => setValue(`${m}-${year}`)}
                        >
                          {m}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats cards */}
      {loading && <div>Loading...</div>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 p-2 py-4">
        {statsList.map((stat) => (
          <StatisticCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <CourseRevenueChartWithLabel />
        <RevenueChartByPeriod />
      </div>
    </div>
  );
}
