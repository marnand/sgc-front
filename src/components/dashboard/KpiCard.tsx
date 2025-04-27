import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { KpiData } from "@/lib/types";

interface KpiCardProps {
  data: KpiData;
}

export default function KpiCard({ data }: KpiCardProps) {
  const { title, value, change, icon, iconBgColor, iconColor, changeType } = data;

  const IconComponent = () => {
    return (
      <div 
        className={cn(
          "flex h-8 w-8 rounded-full items-center justify-center",
          iconBgColor
        )}
        dangerouslySetInnerHTML={{ __html: icon }}
      />
    );
  };

  return (
    <Card className="border border-border dark:border-border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <IconComponent />
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold">{value}</span>
          <span className={cn(
            "ml-2 text-sm flex items-center",
            changeType === "increase" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          )}>
            {changeType === "increase" ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}
            {change}% <span className="text-muted-foreground ml-1">vs mês anterior</span>
          </span>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          <a href="#" className="flex items-center text-primary dark:text-primary hover:underline">
            Ver detalhes 
            <svg
              className="ml-1 h-3 w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
