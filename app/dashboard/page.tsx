"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
import { EarningsAnalytics } from '@/components/dashboard/earnings-analytics';
import { StudentProfile } from '@/components/dashboard/student-profile';

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

export default function DashboardPage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("week");
  
  // Dummy user data
  const isSignedIn = true;
  const user = {
    firstName: 'Demo',
    lastName: 'User',
    imageUrl: 'https://avatars.githubusercontent.com/u/1',
  };

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
            <Button asChild>
              <Link href="/dashboard/upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Video
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="earnings">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="earnings">Earnings</TabsTrigger>
                  <TabsTrigger value="videos">My Videos</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
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

              <TabsContent value="earnings">
                <EarningsAnalytics />
              </TabsContent>
              
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
                                <Button size="sm" variant="outline">
                                  <Play className="h-3 w-3 mr-1" />
                                  Watch
                                </Button>
                              )}
                              <Button size="sm" variant="outline">
                                <Settings className="h-3 w-3 mr-1" />
                                Manage
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="text-center pt-2">
                        <Button variant="link">
                          View All Videos
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
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
            </Tabs>
          </div>
          
          {/* Student Profile Sidebar */}
          <div>
            <StudentProfile user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}