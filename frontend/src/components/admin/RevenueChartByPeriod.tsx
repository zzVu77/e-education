"use client";
import { useState, useEffect } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import axiosInstance from "@/config/axiosConfig";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(38.82,100.00%,50.00%)",
  },
} satisfies ChartConfig;

export function RevenueChartByPeriod() {
  const [timeUnit, setTimeUnit] = useState<"week" | "month">("week");
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setTimeout(async () => {
        try {
          const response = await axiosInstance.get(
            `/dashboard/revenue-trend?period=${timeUnit}`,
          );
          setChartData(response);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      }, 500);
    };

    fetchData();
  }, [timeUnit]);

  const formatXAxisTick = (tick: string) => {
    if (timeUnit === "week") {
      return tick.substring(tick.indexOf(""));
    } else {
      const month = new Date(tick + "-01").toLocaleString("en-US", {
        month: "short",
      });
      return month.charAt(0).toUpperCase() + month.slice(1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trend </CardTitle>
        <CardDescription>
          Chart show the revenue trend over the selected period.
        </CardDescription>
        <Tabs
          defaultValue="week"
          className="mt-4"
          onValueChange={(value) => setTimeUnit(value as "week" | "month")}
        >
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-[250px] w-full" />
            <div className="flex justify-between">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-8" />
              ))}
            </div>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={formatXAxisTick}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    formatter={(value) =>
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(Number(value))
                    }
                  />
                }
              />
              <Line
                dataKey="revenue"
                type="natural"
                stroke="var(--color-revenue)"
                strokeWidth={2}
                dot={{ fill: "var(--color-revenue)" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
