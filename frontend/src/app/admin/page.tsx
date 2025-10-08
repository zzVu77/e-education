"use client";

import { StatisticCard } from "@/components/admin/StatisticCard";
import { useOnlineUsers } from "@/context/OnlineUserContext";
import { formatCurrency } from "@/utils/client/formatCurrency";
import { DollarSign, Package, UserPlus, UserRound } from "lucide-react"; // Import các icon cần dùng
import { useState } from "react";

export default function DashboardStats() {
  const [stats] = useState({
    totalOrders: 120,
    totalRevenue: 15000.5,
    newUsers: 35,
    returningUsers: 85,
  });

  const { onlineUsers } = useOnlineUsers();

  const statsList = [
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
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
      {statsList.map((stat) => (
        <StatisticCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
