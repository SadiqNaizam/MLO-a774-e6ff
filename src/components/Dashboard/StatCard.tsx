import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  IconComponent: LucideIcon;
  iconBgClass: string; // e.g., 'bg-green-100'
  statusColorClass: string; // e.g., 'bg-green-500' for the top-right dot
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  IconComponent,
  iconBgClass,
  statusColorClass,
  className,
}) => {
  return (
    <Card className={cn("p-4 relative", className)}>
      <CardContent className="p-0 flex items-center space-x-4">
        <div className={cn("p-3 rounded-full flex items-center justify-center", iconBgClass)}>
          <IconComponent className="h-6 w-6 text-primary" /> {/* text-primary can be adjusted or passed as prop */}
        </div>
        <div>
          <p className="text-sm text-muted-foreground uppercase">{title}</p>
          <p className="text-2xl font-semibold text-card-foreground">{value}</p>
        </div>
      </CardContent>
      <div className={cn("absolute top-3 right-3 h-3 w-3 rounded-full", statusColorClass)} />
    </Card>
  );
};

export default StatCard;
