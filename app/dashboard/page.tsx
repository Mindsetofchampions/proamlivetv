"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  Layers,
  Upload,
  Users,
  Settings,
  Video,
  Eye,
  Heart,
  Clock,
  ChevronRight,
  Play
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for dashboard
const mockVideos = [
  {
    id: "vid1",
    title: "Urban Dance Championship Highlights",
    views: 25678,
    likes: 1245,
    status: "published",
    createdAt: "2025-02-15",
    thumbnail: "https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "12:34",
  },
  {
    id: "vid2",
    title: "Behind the Scenes: Choreography Session",
    views: 4321,
    likes: 532,
    status: "published",
    createdAt: "2025-02-10",
    thumbnail: "https://images.pexels.com/photos/358010/pexels-photo-358010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "8:45",
  },
  {
    id: "vid3",
    title: "Dance Studio Tour 2025",
    views: 0,
    likes: 0,
    status: "processing",
    createdAt: "2025-03-12",
    thumbnail: "https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "0:00",
    progress: 65
  }
];

const mockStats = {
  total_views: 47523,
  total_likes: 3245,
  subscribers: 1432,
  videos: 12,
  watch_time: 437892,
  new_subscribers_week: 127,
  views_change: +12.5,
  monthly_revenue: 372.50
};

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("week");
  
  // Ensure user is signed in
  if (!isSignedIn) {
    router.push('/sign-in');
    return null;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Creator Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your content and track performance
            </p>
          </div>
          
          <div className="flex gap-3">
            <Link href="/dashboard/upload">
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload New Video
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.total_views.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+{mockStats.views_change}%</span> from last {timeRange}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.subscribers.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+{mockStats.new_subscribers_week}</span> new this {timeRange}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.floor(mockStats.watch_time / 60).toLocaleString()} hours
              </div>
              <p className="text-xs text-muted-foreground">
                Across {mockStats.videos} videos
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Earnings</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${mockStats.monthly_revenue.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Estimated earnings this month
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Tab */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="videos">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="videos">My Videos</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>
                
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <TabsContent value="videos">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Content</CardTitle>
                    <CardDescription>
                      Manage and monitor your videos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockVideos.map((video) => (
                        <div key={video.id} className="flex gap-4 border-b pb-4">
                          <div className="relative aspect-video w-40 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title} 
                              className="object-cover w-full h-full"
                            />
                            {video.status === "processing" ? (
                              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-2">
                                <p className="text-xs text-white mb-1">Processing...</p>
                                <Progress value={video.progress} className="h-1 w-full" />
                              </div>
                            ) : (
                              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                                {video.duration}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium">{video.title}</h4>
                            <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" /> 
                                {new Date(video.createdAt).toLocaleDateString()}
                              </span>
                              {video.status === "published" && (
                                <>
                                  <span className="flex items-center">
                                    <Eye className="h-3 w-3 mr-1" /> 
                                    {video.views.toLocaleString()} views
                                  </span>
                                  <span className="flex items-center">
                                    <Heart className="h-3 w-3 mr-1" /> 
                                    {video.likes.toLocaleString()} likes
                                  </span>
                                </>
                              )}
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                video.status === "published" 
                                  ? "bg-green-500/20 text-green-600" 
                                  : "bg-yellow-500/20 text-yellow-600"
                              }`}>
                                {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                              </span>
                            </div>
                            
                            <div className="flex gap-2 mt-3">
                              {video.status === "published" && (
                                <Link href={`/videos/${video.id}`}>
                                  <Button size="sm" variant="outline">
                                    <Play className="h-3 w-3 mr-1" />
                                    Watch
                                  </Button>
                                </Link>
                              )}
                              <Link href={`/dashboard/videos/${video.id}`}>
                                <Button size="sm" variant="outline">
                                  <Settings className="h-3 w-3 mr-1" />
                                  Manage
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="text-center pt-2">
                        <Link href="/dashboard/videos">
                          <Button variant="link">
                            View All Videos
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                    <CardDescription>
                      View detailed metrics about your content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Advanced analytics will be available once you have more content and viewer data.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="comments">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Comments</CardTitle>
                    <CardDescription>
                      Manage feedback from your audience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground">
                        No comments yet. Comments will appear here as viewers engage with your content.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Account Info */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Creator Profile</CardTitle>
                <CardDescription>
                  Manage your account and subscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user?.fullName}</h3>
                    <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                      Creator
                    </span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Subscription Plan</h4>
                    <div className="bg-secondary/30 rounded-lg p-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Premium Creator</span>
                        <span className="text-green-500">Active</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Renews on April 15, 2025
                      </p>
                      <Link href="/dashboard/billing">
                        <Button size="sm" variant="outline" className="w-full">
                          Manage Subscription
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Quick Links</h4>
                    <div className="space-y-2">
                      <Link href="/dashboard/upload" className="flex items-center p-2 hover:bg-secondary/50 rounded-lg transition-colors">
                        <Upload className="h-4 w-4 mr-2" />
                        <span className="text-sm">Upload New Video</span>
                      </Link>
                      <Link href="/dashboard/videos" className="flex items-center p-2 hover:bg-secondary/50 rounded-lg transition-colors">
                        <Layers className="h-4 w-4 mr-2" />
                        <span className="text-sm">Manage Videos</span>
                      </Link>
                      <Link href="/dashboard/analytics" className="flex items-center p-2 hover:bg-secondary/50 rounded-lg transition-colors">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        <span className="text-sm">View Analytics</span>
                      </Link>
                      <Link href="/dashboard/settings" className="flex items-center p-2 hover:bg-secondary/50 rounded-lg transition-colors">
                        <Settings className="h-4 w-4 mr-2" />
                        <span className="text-sm">Account Settings</span>
                      </Link>
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