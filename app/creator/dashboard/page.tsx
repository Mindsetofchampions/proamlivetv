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
  Upload,
  User,
  CheckCircle,
  Clock3,
  Play,
  Edit,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
      value: "24",
      icon: <Video className="h-6 w-6 text-primary" />
    },
    {
      title: "Total Impressions",
      value: "45.2K",
      icon: <Eye className="h-6 w-6 text-primary" />
    },
    {
      title: "Total Earnings",
      value: "$1,234",
      icon: <DollarSign className="h-6 w-6 text-primary" />
    }
  ];

  const pendingVideos = [
    {
      id: 1,
      title: "Urban Dance Championship Finals",
      thumbnail: "https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg",
      status: "PENDING_REVIEW",
      uploadedAt: "2025-03-15",
      duration: "12:34"
    },
    {
      id: 2,
      title: "Skateboarding Tutorial Series - Episode 1",
      thumbnail: "https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg",
      status: "PROCESSING",
      uploadedAt: "2025-03-14",
      duration: "08:45"
    }
  ];

  const approvedVideos = [
    {
      id: 3,
      title: "Street Art Documentary",
      thumbnail: "https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg",
      status: "APPROVED",
      publishedAt: "2025-03-10",
      views: 12543,
      likes: 856,
      duration: "15:20"
    },
    {
      id: 4,
      title: "Music Production Masterclass",
      thumbnail: "https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg",
      status: "APPROVED",
      publishedAt: "2025-03-08",
      views: 8976,
      likes: 654,
      duration: "22:15"
    }
  ];

  const creatorProfile = {
    name: "Alex Thompson",
    handle: "@alexcreates",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    bio: "Digital creator passionate about urban culture and youth empowerment",
    stats: {
      subscribers: "2.5K",
      totalViews: "45.2K",
      avgEngagement: "12%"
    },
    badges: ["Verified Creator", "Rising Star", "Top Contributor"]
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Creator Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {creatorProfile.name}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
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

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Uploads</CardTitle>
                      <CardDescription>Your latest video submissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[...pendingVideos, ...approvedVideos].slice(0, 3).map((video) => (
                          <div key={video.id} className="flex gap-4 items-center p-4 rounded-lg border">
                            <div className="relative aspect-video w-40 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={video.thumbnail} 
                                alt={video.title}
                                className="object-cover w-full h-full"
                              />
                              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {video.duration}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{video.title}</h4>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant={video.status === 'APPROVED' ? 'default' : 'secondary'}>
                                  {video.status === 'APPROVED' ? (
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                  ) : (
                                    <Clock3 className="h-3 w-3 mr-1" />
                                  )}
                                  {video.status.replace('_', ' ')}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {video.publishedAt || video.uploadedAt}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="pending">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Videos</CardTitle>
                    <CardDescription>Videos awaiting review or processing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingVideos.map((video) => (
                        <div key={video.id} className="flex gap-4 items-center p-4 rounded-lg border">
                          <div className="relative aspect-video w-40 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{video.title}</h4>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary">
                                <Clock3 className="h-3 w-3 mr-1" />
                                {video.status.replace('_', ' ')}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Uploaded on {video.uploadedAt}
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="approved">
                <Card>
                  <CardHeader>
                    <CardTitle>Approved Videos</CardTitle>
                    <CardDescription>Published and available for viewing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {approvedVideos.map((video) => (
                        <div key={video.id} className="flex gap-4 items-center p-4 rounded-lg border">
                          <div className="relative aspect-video w-40 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{video.title}</h4>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                APPROVED
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Published on {video.publishedAt}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {video.views.toLocaleString()} views
                              </span>
                              <span className="flex items-center">
                                <Heart className="h-3 w-3 mr-1" />
                                {video.likes.toLocaleString()} likes
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Watch
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>Track your content performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-8">
                      Analytics features coming soon
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Creator Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={creatorProfile.avatar} />
                    <AvatarFallback>{creatorProfile.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{creatorProfile.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{creatorProfile.handle}</p>
                  <p className="text-sm mb-4">{creatorProfile.bio}</p>
                  
                  <div className="flex gap-2 mb-4">
                    {creatorProfile.badges.map((badge, index) => (
                      <Badge key={index} variant="secondary">{badge}</Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{creatorProfile.stats.subscribers}</p>
                      <p className="text-xs text-muted-foreground">Subscribers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{creatorProfile.stats.totalViews}</p>
                      <p className="text-xs text-muted-foreground">Total Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{creatorProfile.stats.avgEngagement}</p>
                      <p className="text-xs text-muted-foreground">Engagement</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Video
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}