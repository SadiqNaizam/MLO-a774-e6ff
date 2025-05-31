import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { BarChartBig, Radar as RadarIcon } from 'lucide-react'; // Renamed Radar to RadarIcon to avoid conflict

// Sales Forecast Data
const salesForecastData = [
  { name: 'Goal', value: 37, fill: 'hsl(var(--primary))' }, // Using primary color from CSS vars
  { name: 'Pending', value: 12, fill: 'hsl(var(--velzon-accent-green))' },
  { name: 'Revenue', value: 18, fill: 'hsl(var(--velzon-accent-red))' }, // Mapped to revenue color in image
];

// Deal Type Radar Chart Data
const dealTypeData = [
  { subject: '2018', Pending: 60, Loss: 30, Won: 80, fullMark: 150 },
  { subject: '2019', Pending: 80, Loss: 20, Won: 100, fullMark: 150 },
  { subject: '2020', Pending: 50, Loss: 45, Won: 75, fullMark: 150 },
  { subject: '2021', Pending: 70, Loss: 15, Won: 110, fullMark: 150 },
  { subject: '2022', Pending: 95, Loss: 25, Won: 90, fullMark: 150 },
  { subject: '2023', Pending: 65, Loss: 35, Won: 120, fullMark: 150 },
];

const SalesCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sales Forecast Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center">
            <BarChartBig className="h-5 w-5 text-muted-foreground mr-2" />
            <CardTitle className="text-lg font-medium">Sales Forecast</CardTitle>
          </div>
          <Select defaultValue="nov-2021">
            <SelectTrigger className="w-[160px] text-xs">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nov-2021">Nov 2021</SelectItem>
              <SelectItem value="oct-2021">Oct 2021</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesForecastData} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} tickFormatter={(value) => `$${value}k`} />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => {
                    const { color } = entry as unknown as { color: string }; // Type assertion for Recharts legend entry
                    return <span style={{ color }}>{value}</span>;
                }}
              />
              <Bar dataKey="value" nameKey="name" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <CardDescription className="text-center text-xs text-muted-foreground mt-2">
            Total Forecasted Value
          </CardDescription>
        </CardContent>
      </Card>

      {/* Deal Type Radar Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center">
            <RadarIcon className="h-5 w-5 text-muted-foreground mr-2" />
            <CardTitle className="text-lg font-medium">Deal Type</CardTitle>
          </div>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[160px] text-xs">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dealTypeData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" fontSize={12} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} fontSize={10} tickCount={4} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
              />
              <Legend verticalAlign="bottom" height={36} />
              <Radar name="Pending" dataKey="Pending" stroke="hsl(var(--velzon-accent-blue))" fill="hsl(var(--velzon-accent-blue))" fillOpacity={0.6} />
              <Radar name="Loss" dataKey="Loss" stroke="hsl(var(--velzon-accent-red))" fill="hsl(var(--velzon-accent-red))" fillOpacity={0.6} />
              <Radar name="Won" dataKey="Won" stroke="hsl(var(--velzon-accent-green))" fill="hsl(var(--velzon-accent-green))" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesCharts;
