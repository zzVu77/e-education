import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react"; // Import ReactNode

interface StatisticCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export function StatisticCard({ title, value, icon }: StatisticCardProps) {
  return (
    <Card className="px-2">
      <div className="flex flex-row items-center space-x-1">
        {icon}
        <div className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-normal tracking-wide">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-black/70 tracking-tighter">
              {value}
            </span>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
