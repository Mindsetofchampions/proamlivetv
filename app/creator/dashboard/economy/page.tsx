"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Eye,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data - replace with real API calls
const mockData = {
  totalEarnings: 1234.56,
  totalImpressions: 45678,
  averagePerImpression: 0.027,
  recentVideos: [
    {
      id: 'video1',
      title: 'Gaming Tournament Highlights',
      thumbnail: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg',
      impressions: 12345,
      earnings: 123.45,
      publishedAt: '2025-03-10T15:30:00Z'
    },
    {
      id: 'video2',
      title: 'Esports Commentary Tutorial',
      thumbnail: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg',
      impressions: 8765,
      earnings: 87.65,
      publishedAt: '2025-03-08T14:20:00Z'
    }
  ],
  monthlyEarnings: [
    { month: 'Jan', amount: 856.23 },
    { month: 'Feb', amount: 923.45 },
    { month: 'Mar', amount: 1234.56 }
  ]
};

export default function CreatorEconomyDashboard() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    // Simulate API call
    setTimeout(() => setLoading(false), 1000);
  }, [isSignedIn, timeRange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Creator Earnings</h1>
            <p className="text-muted-foreground">
              Track your video performance and revenue
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
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary" className="flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12.5%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
              <h3 className="text-2xl font-bold">
                {formatCurrency(mockData.totalEarnings)}
              </h3>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary" className="flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +8.3%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Total Impressions</p>
              <h3 className="text-2xl font-bold">
                {formatNumber(mockData.totalImpressions)}
              </h3>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary" className="flex items-center">
                  <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                  -2.1%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Avg. Per Impression</p>
              <h3 className="text-2xl font-bold">
                {formatCurrency(mockData.averagePerImpression)}
              </h3>
            </div>
          </Card>
        </div>

        {/* Recent Videos Performance */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Recent Videos Performance</h2>
            <div className="space-y-6">
              {mockData.recentVideos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-6 border-b pb-6 last:border-0 last:pb-0"
                >
                  <div className="relative aspect-video w-48 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={video.thumbnail}
                      alt={video.title}
                      className="object-cover w-full h-full"
                    />
                    <Button 
                      size="icon"
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium mb-2">{video.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(video.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {formatNumber(video.impressions)} impressions
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {formatCurrency(video.earnings)} earned
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>

        {/* Monthly Earnings */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Monthly Earnings</h2>
            <div className="h-[200px] flex items-end gap-2">
              {mockData.monthlyEarnings.map((month, index) => (
                <div key={month.month} className="flex-1 flex flex-col items-center">
                  <motion.div 
                    className="w-full bg-primary/20 rounded-t-lg"
                    initial={{ height: 0 }}
                    animate={{ height: `${(month.amount / 1500) * 100}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                  <p className="text-sm font-medium mt-2">{month.month}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(month.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}