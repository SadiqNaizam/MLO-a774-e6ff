import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, Users } from 'lucide-react';

interface Deal {
  id: string;
  name: string;
  lastContacted: string;
  salesRepresentative: {
    name: string;
    avatarUrl?: string;
    fallback: string;
  };
  status: 'Deal Won' | 'Intro Call' | 'Stuck' | 'Negotiation';
  dealValue: string;
}

const dealsData: Deal[] = [
  {
    id: '1',
    name: 'Absternet LLC',
    lastContacted: 'Sep 20, 2021',
    salesRepresentative: { name: 'Donald Risher', avatarUrl: 'https://i.pravatar.cc/40?u=donald', fallback: 'DR' },
    status: 'Deal Won' as const,
    dealValue: '$100.1K',
  },
  {
    id: '2',
    name: 'Raitech Soft',
    lastContacted: 'Sep 23, 2021',
    salesRepresentative: { name: 'Sofia Cunha', avatarUrl: 'https://i.pravatar.cc/40?u=sofia', fallback: 'SC' },
    status: 'Intro Call' as const,
    dealValue: '$150K',
  },
  {
    id: '3',
    name: 'William PVT',
    lastContacted: 'Sep 27, 2021',
    salesRepresentative: { name: 'Luis Rocha', avatarUrl: 'https://i.pravatar.cc/40?u=luis', fallback: 'LR' },
    status: 'Stuck' as const,
    dealValue: '$78.18K',
  },
  {
    id: '4',
    name: 'Loiusee LLP',
    lastContacted: 'Sep 30, 2021',
    salesRepresentative: { name: 'Vitoria Rodrigues', avatarUrl: 'https://i.pravatar.cc/40?u=vitoria', fallback: 'VR' },
    status: 'Deal Won' as const,
    dealValue: '$180K',
  },
  {
    id: '5',
    name: 'Tech Solutions Inc.',
    lastContacted: 'Oct 05, 2021',
    salesRepresentative: { name: 'Pedro Alvarez', avatarUrl: 'https://i.pravatar.cc/40?u=pedro', fallback: 'PA' },
    status: 'Negotiation' as const,
    dealValue: '$220K',
  },
];

const getStatusBadgeClass = (status: Deal['status']): string => {
  switch (status) {
    case 'Deal Won':
      return 'bg-velzon-accentGreen/20 text-velzon-accentGreen border-velzon-accentGreen/30';
    case 'Intro Call':
      return 'bg-yellow-400/20 text-yellow-600 border-yellow-400/30';
    case 'Stuck':
      return 'bg-velzon-accentRed/20 text-velzon-accentRed border-velzon-accentRed/30';
    case 'Negotiation':
      return 'bg-velzon-accentBlue/20 text-velzon-accentBlue border-velzon-accentBlue/30';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
};

const DealsStatusTable: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center">
          <ClipboardList className="h-5 w-5 text-muted-foreground mr-2" />
          <CardTitle className="text-lg font-medium">Deals Status</CardTitle>
        </div>
        <Select defaultValue="nov-dec-2021">
          <SelectTrigger className="w-[230px] text-xs">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nov-dec-2021">02 Nov 2021 to 31 Dec 2021</SelectItem>
            <SelectItem value="last-30-days">Last 30 Days</SelectItem>
            <SelectItem value="last-90-days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Last Contacted</TableHead>
              <TableHead>Sales Representative</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Deal Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealsData.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-medium">{deal.name}</TableCell>
                <TableCell className="text-muted-foreground">{deal.lastContacted}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={deal.salesRepresentative.avatarUrl} alt={deal.salesRepresentative.name} />
                      <AvatarFallback>{deal.salesRepresentative.fallback}</AvatarFallback>
                    </Avatar>
                    <span>{deal.salesRepresentative.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("capitalize", getStatusBadgeClass(deal.status))}>
                    {deal.status.toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold">{deal.dealValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DealsStatusTable;
