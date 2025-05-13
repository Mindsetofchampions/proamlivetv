"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Eye, 
  DollarSign,
  Clock,
  Settings,
  BarChart,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Placeholder data
  const stats = [
    {
      title: "Total Videos",
      value: "—",
      icon: <Video className="h-6 w-6 text-primary" />
    },
    {
      title: "Total Impressions",
      value: "—",
      icon: <Eye className="h-6 w-6 text-primary" />
    },
    {
      title: "Total Earnings",
      value: "—",
      icon: <DollarSign className="h-6 w-6 text-primary" />
    }
  ];

  const recentUploads = [
    {
      title: "—",
      status: "—",
      date: "—"
    },
    {
      title: "—",
      status: "—",
      date: "—"
    },
    {
      title: "—",
      status: "—",
      date: "—"
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Creator Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome, Creator
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload New Video
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="economy">Economy</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
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
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold">
                          {stat.value}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Uploads</CardTitle>
                <CardDescription>
                  Your latest video submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Video Title
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Status
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          Upload Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUploads.map((upload, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4 align-middle">{upload.title}</td>
                          <td className="p-4 align-middle">{upload.status}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              {upload.date}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>
                  Manage and organize your videos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Content management features coming soon
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="economy">
            <Card>
              <CardHeader>
                <CardTitle>Creator Economy</CardTitle>
                <CardDescription>
                  Track your earnings and revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Economy features coming soon
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your creator account preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Settings features coming soon
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}