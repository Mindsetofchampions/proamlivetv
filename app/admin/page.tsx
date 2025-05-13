"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Video,
  Users,
  Flag,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      name: 'Pending Videos',
      value: '24',
      icon: <Clock className="h-6 w-6 text-yellow-500" />,
      description: 'Awaiting review'
    },
    {
      name: 'Approved Videos',
      value: '156',
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      description: 'Last 30 days'
    },
    {
      name: 'Rejected Videos',
      value: '12',
      icon: <XCircle className="h-6 w-6 text-red-500" />,
      description: 'Last 30 days'
    },
    {
      name: 'Active Users',
      value: '1,234',
      icon: <Users className="h-6 w-6 text-blue-500" />,
      description: 'Total registered'
    }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}