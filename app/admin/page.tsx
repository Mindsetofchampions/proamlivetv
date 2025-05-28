"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AddAdminDialog } from '@/components/admin/add-admin-dialog';
import { 
  Clock,
  CheckCircle,
  XCircle,
  Clock3,
  Users
} from 'lucide-react';

const stats = [
  {
    name: "Pending Videos",
    value: "24",
    icon: <Clock className="h-6 w-6 text-yellow-500" />,
    description: 'Awaiting review'
  },
  {
    name: "Approved Videos",
    value: "156",
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
    description: 'Last 30 days'
  },
  {
    name: "Rejected Videos",
    value: "12",
    icon: <XCircle className="h-6 w-6 text-red-500" />,
    description: 'Last 30 days'
  },
  {
    name: "Active Users",
    value: "1,234",
    icon: <Users className="h-6 w-6 text-blue-500" />,
    description: 'Total registered'
  }
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <AddAdminDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-green-500/10 p-2 rounded">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Video Approved</p>
                  <p className="text-sm text-muted-foreground">Championship Finals Highlights</p>
                </div>
                <span className="text-sm text-muted-foreground ml-auto">2m ago</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500/10 p-2 rounded">
                  <Clock3 className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <p className="font-medium">New Submission</p>
                  <p className="text-sm text-muted-foreground">Dance Competition 2025</p>
                </div>
                <span className="text-sm text-muted-foreground ml-auto">15m ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Video Processing</span>
                </div>
                <span className="text-sm text-muted-foreground">Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Content Delivery</span>
                </div>
                <span className="text-sm text-muted-foreground">Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>User Authentication</span>
                </div>
                <span className="text-sm text-muted-foreground">Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <span>Analytics</span>
                </div>
                <span className="text-sm text-muted-foreground">Partial Outage</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}