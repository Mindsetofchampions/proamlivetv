"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Play, 
  DollarSign, 
  Users, 
  Shield, 
  Zap,
  ArrowRight,
  Video,
  Eye,
  BarChart,
  Settings,
  Clock,
  CheckCircle,
  Edit,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Link from 'next/link';

// Mock data for demonstration
const mockData = {
  stats: {
    totalVideos: 24,
    totalViews: 45678,
    totalEarnings: 1234.56,
    subscribers: 1200
  },
  recentVideos: [
    {
      id: 1,
      title: "Gaming Tournament Highlights",
      thumbnail: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg",
      status: "APPROVED",
      views: 12543,
      uploadDate: "2025-03-10",
      duration: "12:34"
    },
    {
      id: 2,
      title: "Behind the Scenes Vlog",
      thumbnail: "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
      status: "PENDING_REVIEW",
      views: 8765,
      uploadDate: "2025-03-08",
      duration: "8:17"
    },
    {
      id: 3,
      title: "Tutorial: Video Editing Tips",
      thumbnail: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
      status: "APPROVED",
      views: 15432,
      uploadDate: "2025-03-05",
      duration: "15:42"
    }
  ],
  analytics: {
    monthlyViews: [
      { month: 'Jan', views: 12000 },
      { month: 'Feb', views: 18000 },
      { month: 'Mar', views: 25000 }
    ],
    topPerformers: [
      { title: "Gaming Highlights", views: 15432, engagement: "12.5%" },
      { title: "Tutorial Series", views: 12543, engagement: "15.2%" },
      { title: "Behind Scenes", views: 8765, engagement: "13.8%" }
    ]
  }
};

const learningPaths = [
  {
    id: 'on-air',
    title: 'On-Air Talent & Hosts',
    description: 'Learn broadcasting, hosting, and on-camera skills',
    icon: <Video className="h-8 w-8" />,
    color: 'from-purple-500 to-indigo-500',
    href: '/academy/on-air'
  },
  {
    id: 'content',
    title: 'Content Production',
    description: 'Master video editing, motion graphics, and storytelling',
    icon: <Edit className="h-8 w-8" />,
    color: 'from-blue-500 to-cyan-500',
    href: '/academy/content-production'
  },
  {
    id: 'esports',
    title: 'Esports & Gaming',
    description: 'Compete and create content in competitive gaming',
    icon: <Play className="h-8 w-8" />,
    color: 'from-green-500 to-emerald-500',
    href: '/academy/esports-gaming'
  },
  {
    id: 'live',
    title: 'Live Production',
    description: 'Learn to produce and direct live events',
    icon: <Shield className="h-8 w-8" />,
    color: 'from-orange-500 to-red-500',
    href: '/academy/live-production'
  }
];

export default function CreatorPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  // Mock user data
  const user = {
    name: 'Demo Creator',
    email: 'creator@example.com',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
    level: 'Level 2 Creator',
    joinDate: '2024-01-15'
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Creator Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Manage your content, track performance, and grow your audience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="academy">Academy</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Video className="h-6 w-6 text-primary" />
                        </div>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Total Videos</p>
                        <p className="text-2xl font-bold">{mockData.stats.totalVideos}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Eye className="h-6 w-6 text-primary" />
                        </div>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Total Views</p>
                        <p className="text-2xl font-bold">{mockData.stats.totalViews.toLocaleString()}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <DollarSign className="h-6 w-6 text-primary" />
                        </div>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Total Earnings</p>
                        <p className="text-2xl font-bold">${mockData.stats.totalEarnings.toFixed(2)}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Subscribers</p>
                        <p className="text-2xl font-bold">{mockData.stats.subscribers.toLocaleString()}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Videos */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Recent Videos</CardTitle>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/creator/upload">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload New
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockData.recentVideos.map((video) => (
                        <div key={video.id} className="flex gap-4 items-center p-4 rounded-lg border">
                          <div className="relative aspect-video w-32 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                              {video.duration}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{video.title}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={video.status === 'APPROVED' ? 'default' : 'secondary'}>
                                {video.status === 'APPROVED' ? (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                ) : (
                                  <Clock className="h-3 w-3 mr-1" />
                                )}
                                {video.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {new Date(video.uploadDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {video.views.toLocaleString()} views
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Play className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="videos" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>My Videos</CardTitle>
                      <Button asChild>
                        <Link href="/creator/upload">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Video
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockData.recentVideos.map((video) => (
                        <div key={video.id} className="flex gap-4 items-center p-4 rounded-lg border">
                          <div className="relative aspect-video w-40 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{video.title}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={video.status === 'APPROVED' ? 'default' : 'secondary'}>
                                {video.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {new Date(video.uploadDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <Button variant="outline" size="sm">
                                <Play className="h-4 w-4 mr-2" />
                                Watch
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                <BarChart className="h-4 w-4 mr-2" />
                                Analytics
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Views</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockData.analytics.monthlyViews.map((month) => (
                          <div key={month.month} className="flex justify-between items-center">
                            <span>{month.month}</span>
                            <span className="font-medium">{month.views.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockData.analytics.topPerformers.map((video, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{video.title}</p>
                              <p className="text-sm text-muted-foreground">{video.views.toLocaleString()} views</p>
                            </div>
                            <Badge variant="secondary">{video.engagement}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="academy" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-4">Creator Academy</h2>
                  <p className="text-muted-foreground">
                    Enhance your skills with our professional training programs
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {learningPaths.map((path, index) => (
                    <motion.div
                      key={path.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link href={path.href} className="block">
                        <div className={`group relative overflow-hidden rounded-xl bg-gradient-to-r ${path.color} p-1 h-full transition-transform hover:scale-[1.02] cursor-pointer`}>
                          <div className="relative overflow-hidden rounded-lg bg-background p-6 h-full">
                            <div className="rounded-full bg-primary/10 p-3 w-fit text-primary mb-4">
                              {path.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                              {path.title}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              {path.description}
                            </p>
                            <div className="flex items-center text-primary">
                              <span className="mr-2">Learn More</span>
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Creator Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Creator Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
                  
                  <div className="flex gap-2 mb-4">
                    <Badge variant="secondary">Creator</Badge>
                    <Badge variant="outline">{user.level}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 w-full text-center">
                    <div>
                      <p className="text-xl font-bold">{mockData.stats.totalVideos}</p>
                      <p className="text-xs text-muted-foreground">Videos</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">{(mockData.stats.totalViews / 1000).toFixed(1)}K</p>
                      <p className="text-xs text-muted-foreground">Views</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">${mockData.stats.totalEarnings.toFixed(0)}</p>
                      <p className="text-xs text-muted-foreground">Earned</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/creator/upload">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Video
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/creator/dashboard/live">
                    <Shield className="h-4 w-4 mr-2" />
                    Go Live
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/creator/dashboard/analytics">
                    <BarChart className="h-4 w-4 mr-2" />
                    View Analytics
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/10 p-2 rounded">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Video Approved</p>
                      <p className="text-xs text-muted-foreground">Gaming Highlights</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded">
                      <Heart className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New Subscriber</p>
                      <p className="text-xs text-muted-foreground">+15 this week</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-500/10 p-2 rounded">
                      <DollarSign className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Earnings Update</p>
                      <p className="text-xs text-muted-foreground">$45.67 this month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}