"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import axiosInstance from "@/config/axiosConfig";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

interface CourseData {
  courseId: string;
  title: string;
  totalOrders: number;
  totalRevenue: number;
}

const chartConfig = {
  totalRevenue: {
    label: "Revenue",
    color: "hsl(38.82,100.00%,50.00%)",
  },
  label: {
    color: "rgb(255, 255, 255)",
  },
} satisfies ChartConfig;

export function CourseRevenueChartWithLabel() {
  const [topN, setTopN] = useState(5);
  const [chartData, setChartData] = useState<CourseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `/dashboard/top-selling-courses?limit=${topN}`,
        );
        setChartData(response);
      } catch (error) {
        console.error("Failed to fetch top selling courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [topN]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Courses by Revenue</CardTitle>
        <CardDescription>
          This chart displays the top courses with the highest revenue.
        </CardDescription>
        <Select
          onValueChange={(value) => setTopN(Number(value))}
          defaultValue={String(topN)}
        >
          <SelectTrigger className="w-[180px] h-9 mt-2">
            <SelectValue placeholder={`Top ${topN}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">Top 3</SelectItem>
            <SelectItem value="5">Top 5</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-[90%] bg-[hsl(38.82,100.00%,50.00%)] " />
            <Skeleton className="h-8 w-[70%] bg-[hsl(38.82,100.00%,50.00%)] " />
            <Skeleton className="h-8 w-[50%] bg-[hsl(38.82,100.00%,50.00%)] " />
            <Skeleton className="h-8 w-[30%] bg-[hsl(38.82,100.00%,50.00%)] " />
            <Skeleton className="h-8 w-[20%] bg-[hsl(38.82,100.00%,50.00%)] " />
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{ right: 16 }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis dataKey="title" type="category" hide />
              <XAxis dataKey="totalRevenue" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="totalRevenue"
                layout="vertical"
                fill="var(--color-totalRevenue)"
                radius={4}
              >
                <LabelList
                  dataKey="title"
                  position="insideLeft"
                  offset={8}
                  className="fill-white font-medium text-[12px]"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
