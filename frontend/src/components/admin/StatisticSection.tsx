"use client";
import { useState, useEffect } from "react";
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

export function StatisticSection() {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

  const [value, setValue] = useState(String(currentYear));
  const [stats, setStats] = useState<{
    totalOrders: number;
    totalRevenue: number;
    newUsers: number;
  } | null>({
    totalOrders: 0,
    totalRevenue: 0,
    newUsers: 0,
  });
  const [loading, setLoading] = useState(false);

  const { onlineUsers } = useOnlineUsers();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`dashboard/summary?value=${value}`)
      .then((res) => {
        const { totalOrders, totalRevenue, newUsers } = res;
        setStats({ totalOrders, totalRevenue, newUsers });
      })
      .catch((error) => {
        console.error("Failed to fetch dashboard summary:", error);
        setStats(null);
      })
      .finally(() => setLoading(false));
  }, [value]);
  useEffect(() => {
    console.log("Re-rendered StatisticSection with onlineUsers:", onlineUsers);
  }, [onlineUsers]);

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
    <div className="flex flex-col gap-2 p-2">
      {/* Dropdown chọn Year / Month-Year */}
      <div className="self-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="min-w-[100px]" variant="outline">
              {value}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>Choose Year / Month</DropdownMenuLabel>
            <DropdownMenuGroup>
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
                        Month {m}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Stats cards */}
      {loading && <div className="text-center p-4">Loading statistics...</div>}

      {!loading && stats && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsList.map((stat) => (
            <StatisticCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
      )}

      {!loading && !stats && (
        <div className="text-center p-4 text-muted-foreground">
          Could not load data.
        </div>
      )}
    </div>
  );
}
