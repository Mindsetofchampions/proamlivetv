"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart,
  LineChart,
  PieChart,
  Users,
  Clock,
  Eye,
  Heart,
  Share2,
  MessageSquare,
  Globe,
  Monitor,
  Smartphone
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/lib/supabase';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7days');
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalViews: 45678,
    totalWatchTime: 234567,
    avgWatchDuration: "4:32",
    engagementRate: "12.5%",
    deviceBreakdown: {
      desktop: 45,
      mobile: 40,
      tablet: 15
    },
    topVideos: [
      {
        id: 1,
        title: "Gaming Tournament Finals",
        views: 12543,
        watchTime: "1,234 hours",
        engagement: "15.2%"
      },
      {
        id: 2,
        title: "Behind the Scenes",
        views: 8765,
        watchTime: "876 hours",
        engagement: "13.8%"
      }
    ],
    recentEngagement: [
      {
        type: 'like',
        count: 234,
        trend: '+12%'
      },
      {
        type: 'share',
        count: 123,
        trend: '+8%'
      },
      {
        type: 'comment',
        count: 87,
        trend: '+15%'
      }
    ]
  });

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      // Fetch analytics data from Supabase
      const { data: viewData, error: viewError } = await supabase
        .from('video_analytics')
        .select('*')
        .gte('watched_at', getDateFromRange(timeRange));

      if (viewError) throw viewError;

      // Process data and update state
      // This is where you'd aggregate the data
      setLoading(false);
    } catch (error) {
      console.error('Error loading analytics:', error);
      setLoading(false);
    }
  };

  const getDateFromRange = (range: string) => {
    const date = new Date();
    switch (range) {
      case '7days':
        date.setDate(date.getDate() - 7);
        break;
      case '30days':
        date.setDate(date.getDate() - 30);
        break;
      case '90days':
        date.setDate(date.getDate() - 90);
        break;
      default:
        date.setDate(date.getDate() - 7);
    }
    return date.toISOString();
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Track your content performance and audience engagement
            </p>
          </div>

          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <LineChart className="h-4 w-4 text-muted-foreground" />
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
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Avg. Watch Time</p>
                <p className="text-2xl font-bold">{analytics.avgWatchDuration}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Engagement Rate</p>
                <p className="text-2xl font-bold">{analytics.engagementRate}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Watch Time</p>
                <p className="text-2xl font-bold">{(analytics.totalWatchTime / 3600).toFixed(0)}h</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Videos</CardTitle>
              <CardDescription>Videos with highest engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topVideos.map((video) => (
                  <div key={video.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className="font-medium mb-1">{video.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {video.views.toLocaleString()} views
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {video.watchTime}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{video.engagement}</div>
                      <div className="text-sm text-muted-foreground">Engagement</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
              <CardDescription>Viewer device distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Monitor className="h-4 w-4 mr-2" />
                    <span>Desktop</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${analytics.deviceBreakdown.desktop}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{analytics.deviceBreakdown.desktop}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Smartphone className="h-4 w-4 mr-2" />
                    <span>Mobile</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${analytics.deviceBreakdown.mobile}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{analytics.deviceBreakdown.mobile}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Monitor className="h-4 w-4 mr-2" />
                    <span>Tablet</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${analytics.deviceBreakdown.tablet}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{analytics.deviceBreakdown.tablet}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Engagement</CardTitle>
            <CardDescription>User interactions with your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {analytics.recentEngagement.map((engagement) => (
                <div key={engagement.type} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {engagement.type === 'like' && <Heart className="h-5 w-5 text-red-500" />}
                    {engagement.type === 'share' && <Share2 className="h-5 w-5 text-blue-500" />}
                    {engagement.type === 'comment' && <MessageSquare className="h-5 w-5 text-green-500" />}
                    <div>
                      <p className="font-medium capitalize">{engagement.type}s</p>
                      <p className="text-sm text-muted-foreground">{engagement.count.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-sm text-green-500">{engagement.trend}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}