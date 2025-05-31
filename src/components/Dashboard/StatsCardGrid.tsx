import React from 'react';
import StatCard from './StatCard';
import {
  Send,
  DollarSign,
  TrendingUp,
  Wallet,
  Heart // Example, requirements stated 4 cards, image had 5
} from 'lucide-react';

interface StatsCardGridProps {
  className?: string;
}

const statsData = [
  {
    id: 'campaigns',
    title: 'CAMPAIGN SENT',
    value: '197',
    IconComponent: Send,
    iconBgClass: 'bg-velzon-accentBlue/10',
    statusColorClass: 'bg-velzon-accentGreen',
  },
  {
    id: 'annualProfit',
    title: 'ANNUAL PROFIT',
    value: '$489.4k',
    IconComponent: DollarSign,
    iconBgClass: 'bg-velzon-accentGreen/10',
    statusColorClass: 'bg-velzon-accentGreen',
  },
  {
    id: 'leadConversion',
    title: 'LEAD CONVERSATION',
    value: '32.89%',
    IconComponent: TrendingUp,
    iconBgClass: 'bg-velzon-accentRed/10',
    statusColorClass: 'bg-velzon-accentRed',
  },
  {
    id: 'dailyAverageIncome',
    title: 'DAILY AVERAGE INCOME',
    value: '$1,596.5',
    IconComponent: Wallet, // Using Wallet as a stand-in for the piggy bank like icon
    iconBgClass: 'bg-yellow-100', // Using a generic yellow as no specific Velzon yellow provided
    statusColorClass: 'bg-velzon-accentGreen',
  },
  // Example if 5th card was needed, based on image: 
  // {
  //   id: 'annualDeals',
  //   title: 'ANNUAL DEALS',
  //   value: '2,659',
  //   IconComponent: Heart,
  //   iconBgClass: 'bg-pink-100',
  //   statusColorClass: 'bg-velzon-accentRed',
  // },
];

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          IconComponent={stat.IconComponent}
          iconBgClass={stat.iconBgClass}
          statusColorClass={stat.statusColorClass}
        />
      ))}
    </div>
  );
};

export default StatsCardGrid;
