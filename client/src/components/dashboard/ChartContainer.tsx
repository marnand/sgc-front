import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function ChartContainer({
  title,
  children,
  action,
  className,
}: ChartContainerProps) {
  return (
    <Card className={cn("border border-border dark:border-border", className)}>
      <CardHeader className="px-4 py-3 border-b border-border flex flex-row items-center justify-between space-y-0">
        <CardTitle className="font-medium text-base">{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  );
}

// Sample data for the charts
const monthlyData = [
  { name: "Jan", receita: 78000, despesa: 65000 },
  { name: "Fev", receita: 82000, despesa: 68000 },
  { name: "Mar", receita: 91000, despesa: 72000 },
  { name: "Abr", receita: 95000, despesa: 75000 },
  { name: "Mai", receita: 102000, despesa: 78000 },
  { name: "Jun", receita: 117000, despesa: 85000 },
  { name: "Jul", receita: 125000, despesa: 88000 },
  { name: "Ago", receita: 137000, despesa: 92000 },
  { name: "Set", receita: 142000, despesa: 95000 },
  { name: "Out", receita: 151000, despesa: 98000 },
  { name: "Nov", receita: 165000, despesa: 102000 },
  { name: "Dez", receita: 187000, despesa: 115000 },
];

const pieData = [
  { name: "Residencial", value: 58 },
  { name: "Comercial", value: 27 },
  { name: "Industrial", value: 15 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"];

export function FinancialChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthlyData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => `R$ ${value / 1000}k`} 
            axisLine={false}
          />
          <Tooltip 
            formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, undefined]}
            labelFormatter={(label) => `${label}/2023`}
          />
          <Legend />
          <Bar 
            name="Receita" 
            dataKey="receita" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]} 
          />
          <Bar 
            name="Despesa" 
            dataKey="despesa" 
            fill="hsl(var(--accent))" 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PropertyDistributionChart() {
  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value}%`, undefined]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
