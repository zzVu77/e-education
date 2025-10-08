"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOnlineUsers } from "@/context/OnlineUserContext";

export default function DashboardStats() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stats, setStats] = useState({
    totalOrders: 120,
    totalRevenue: 15000.5,
    newUsers: 35,
    returningUsers: 85,
  });

  const { onlineUsers } = useOnlineUsers();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{stats.totalOrders}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">${stats.totalRevenue}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>New Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{stats.newUsers}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Returning Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{stats.returningUsers}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Online Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{onlineUsers}</p>
        </CardContent>
      </Card>
    </div>
  );
}
