import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { LineChart as LineChartIcon } from 'lucide-react';

const balanceData = [
  { name: 'Jan', revenue: 20, expenses: 15 },
  { name: 'Feb', revenue: 35, expenses: 25 },
  { name: 'Mar', revenue: 50, expenses: 30 },
  { name: 'Apr', revenue: 40, expenses: 35 },
  { name: 'May', revenue: 60, expenses: 40 },
  { name: 'Jun', revenue: 75, expenses: 50 },
  { name: 'Jul', revenue: 90, expenses: 60 },
  { name: 'Aug', revenue: 80, expenses: 70 },
  { name: 'Sep', revenue: 110, expenses: 80 },
  { name: 'Oct', revenue: 130, expenses: 90 },
  { name: 'Nov', revenue: 120, expenses: 105 },
  { name: 'Dec', revenue: 150, expenses: 110 },
];

const BalanceOverview: React.FC = () => {
  const totalRevenue = balanceData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = balanceData.reduce((sum, item) => sum + item.expenses, 0);
  const profitRatio = totalExpenses > 0 ? ((totalRevenue - totalExpenses) / totalExpenses) * 100 : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
            <div className="flex items-center mb-1">
                <LineChartIcon className="h-5 w-5 text-muted-foreground mr-2" />
                <CardTitle className="text-lg font-medium">Balance Overview</CardTitle>
            </div>
            <div className="flex space-x-6 text-sm mt-4">
                <div>
                    <span className="font-bold text-primary text-xl">${totalRevenue}k</span>
                    <span className="text-muted-foreground ml-1">Revenue</span>
                </div>
                <div>
                    <span className="font-bold text-destructive text-xl">${totalExpenses}k</span>
                    <span className="text-muted-foreground ml-1">Expenses</span>
                </div>
                <div>
                    <span className={cn("font-bold text-xl", profitRatio >= 0 ? 'text-velzon-accentGreen' : 'text-velzon-accentRed')}>
                      {profitRatio.toFixed(1)}%
                    </span>
                    <span className="text-muted-foreground ml-1">Profit Ratio</span>
                </div>
            </div>
        </div>
        <Select defaultValue="current-year">
          <SelectTrigger className="w-[160px] text-xs">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current-year">Current Year</SelectItem>
            <SelectItem value="last-year">Last Year</SelectItem>
            <SelectItem value="last-6-months">Last 6 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={balanceData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: 'hsl(var(--border))' }} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} tickFormatter={(value) => `$${value}k`} />
            <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                labelStyle={{ fontWeight: 'bold' }}
                formatter={(value: number, name: string) => [`$${value}k`, name.charAt(0).toUpperCase() + name.slice(1)]}
            />
            <Legend verticalAlign="bottom" height={36} />
            <Line type="monotone" dataKey="revenue" stroke="hsl(var(--velzon-accent-green))" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} name="Revenue" />
            <Line type="monotone" dataKey="expenses" stroke="hsl(var(--velzon-accent-red))" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} name="Expenses" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BalanceOverview;
