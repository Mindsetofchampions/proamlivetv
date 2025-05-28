"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Play, 
  DollarSign, 
  Users, 
  Shield, 
  Zap,
  ArrowRight,
  X,
  Clock,
  CheckCircle,
  Clock3,
  Edit,
  Heart,
  Video,
  Settings,
  Eye,
  BarChart
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
} from "@/components/ui/tabs";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CREATOR_RATE = parseFloat(process.env.NEXT_PUBLIC_CREATOR_RATE_PER_IMPRESSION || '0.001');

export default function CreatorDashboard() {
  const router = useRouter();
  const { user, hasRole } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [videos, setVideos] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalEarnings: 0,
    recentEarnings: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !hasRole('creator')) {
      router.push('/login');
      return;
    }

    fetchVideos();
    fetchAnalytics();
  }, [user, hasRole, router]);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('creator_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const { data: viewData, error: viewError } = await supabase
        .from('video_analytics')
        .select('*')
        .eq('creator_id', user?.id);

      if (viewError) throw viewError;

      const totalViews = viewData?.length || 0;
      const totalEarnings = totalViews * CREATOR_RATE;

      // Calculate earnings by date
      const earningsByDate = viewData?.reduce((acc, view) => {
        const date = new Date(view.watched_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + CREATOR_RATE;
        return acc;
      }, {});

      setAnalytics({
        totalViews,
        totalEarnings,
        recentEarnings: Object.entries(earningsByDate || {}).map(([date, amount]) => ({
          date,
          amount
        }))
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
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
              <a href="/creator/upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Video
              </a>
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
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                        <p className="text-2xl font-bold">{videos.length}</p>
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
                        <p className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</p>
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
                        <p className="text-2xl font-bold">
                          ${analytics.totalEarnings.toFixed(2)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Videos</CardTitle>
                    <CardDescription>Your latest uploads</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {videos.slice(0, 5).map((video) => (
                        <div key={video.id} className="flex gap-4 items-center p-4 rounded-lg border">
                          <div className="relative aspect-video w-40 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={video.thumbnail_url} 
                              alt={video.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">{video.title}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant={video.status === 'APPROVED' ? 'default' : 'secondary'}>
                                {video.status === 'APPROVED' ? (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                ) : (
                                  <Clock3 className="h-3 w-3 mr-1" />
                                )}
                                {video.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {new Date(video.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="videos">
                <Card>
                  <CardHeader>
                    <CardTitle>My Videos</CardTitle>
                    <CardDescription>Manage your video content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {videos.map((video) => (
                        <div key={video.id} className="flex gap-4 items-center p-4 rounded-lg border">
                          <div className="relative aspect-video w-40 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={video.thumbnail_url} 
                              alt={video.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{video.title}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={video.status === 'APPROVED' ? 'default' : 'secondary'}>
                                {video.status === 'APPROVED' ? (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                ) : (
                                  <Clock3 className="h-3 w-3 mr-1" />
                                )}
                                {video.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {new Date(video.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <Button variant="outline" size="sm" asChild>
                                <a href={`/videos/${video.id}`}>
                                  <Play className="h-4 w-4 mr-2" />
                                  Watch
                                </a>
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                    <CardDescription>Track your content engagement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <Line 
                        data={{
                          labels: analytics.recentEarnings.map(e => e.date),
                          datasets: [{
                            label: 'Daily Earnings',
                            data: analytics.recentEarnings.map(e => e.amount),
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                          }]
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            y: {
                              beginAtZero: true,
                              ticks: {
                                callback: (value) => `$${value}`
                              }
                            }
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="earnings">
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                    <CardDescription>Your revenue and payouts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-secondary/20 rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">Total Earnings</p>
                          <p className="text-2xl font-bold">${analytics.totalEarnings.toFixed(2)}</p>
                        </div>
                        <div className="bg-secondary/20 rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">This Month</p>
                          <p className="text-2xl font-bold">
                            ${analytics.recentEarnings
                              .reduce((sum, e) => sum + e.amount, 0)
                              .toFixed(2)}
                          </p>
                        </div>
                        <div className="bg-secondary/20 rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">Rate Per View</p>
                          <p className="text-2xl font-bold">${CREATOR_RATE}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Recent Earnings</h3>
                        <div className="space-y-2">
                          {analytics.recentEarnings.map((earning, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
                              <span>{earning.date}</span>
                              <span className="font-medium">${earning.amount.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Creator Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback>{user?.email?.[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{user?.user_metadata?.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{user?.email}</p>
                  
                  <div className="flex gap-2 mb-4">
                    <Badge variant="secondary">Creator</Badge>
                    <Badge variant="outline">Level 1</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{videos.length}</p>
                      <p className="text-xs text-muted-foreground">Videos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{analytics.totalViews}</p>
                      <p className="text-xs text-muted-foreground">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">
                        ${analytics.totalEarnings.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">Earned</p>
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