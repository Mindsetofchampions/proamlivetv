"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Users, 
  Clock, 
  Target, 
  Play,
  ArrowRight,
  LineChart,
  PieChart,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Mock data for demo purposes
const mockMetrics = {
  totalViews: 125789,
  uniqueViewers: 45123,
  avgWatchTime: "4:32",
  clickThroughRate: "3.2%",
  recentCampaigns: [
    {
      name: "Summer Gaming Event",
      views: 25678,
      clicks: 876,
      ctr: "3.4%"
    },
    {
      name: "Back to School Tech",
      views: 18432,
      clicks: 543,
      ctr: "2.9%"
    },
    {
      name: "Esports Tournament",
      views: 32145,
      clicks: 1234,
      ctr: "3.8%"
    }
  ]
};

export default function AdvertisePage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock sign in - in a real app this would validate credentials
    if (email && password) {
      setIsSignedIn(true);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <form onSubmit={handleSignIn} className="p-6">
                <h1 className="text-2xl font-bold mb-6">Advertiser Login</h1>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <Input 
                      type="email" 
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Password</label>
                    <Input 
                      type="password" 
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                  <p className="text-sm text-center text-muted-foreground">
                    Don't have an account?{" "}
                    <Button variant="link" className="p-0">Contact us</Button>
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Advertising Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your campaign performance and engagement
            </p>
          </div>
          
          <Button>
            <Play className="h-4 w-4 mr-2" />
            Launch New Campaign
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <LineChart className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Total Views</p>
              <h3 className="text-2xl font-bold">{mockMetrics.totalViews.toLocaleString()}</h3>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <Activity className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Unique Viewers</p>
              <h3 className="text-2xl font-bold">{mockMetrics.uniqueViewers.toLocaleString()}</h3>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <LineChart className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Avg. Watch Time</p>
              <h3 className="text-2xl font-bold">{mockMetrics.avgWatchTime}</h3>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <PieChart className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Click-Through Rate</p>
              <h3 className="text-2xl font-bold">{mockMetrics.clickThroughRate}</h3>
            </div>
          </Card>
        </div>

        {/* Recent Campaigns */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Recent Campaigns</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-4">Campaign Name</th>
                    <th className="text-left pb-4">Views</th>
                    <th className="text-left pb-4">Clicks</th>
                    <th className="text-left pb-4">CTR</th>
                    <th className="text-left pb-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockMetrics.recentCampaigns.map((campaign, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-4">{campaign.name}</td>
                      <td className="py-4">{campaign.views.toLocaleString()}</td>
                      <td className="py-4">{campaign.clicks.toLocaleString()}</td>
                      <td className="py-4">{campaign.ctr}</td>
                      <td className="py-4">
                        <Button variant="ghost" size="sm">
                          View Details
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="p-6">
              <h3 className="font-semibold mb-2">Campaign Settings</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Adjust targeting, budget, and creative assets
              </p>
              <Button variant="outline" className="w-full">
                Manage Settings
              </Button>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="font-semibold mb-2">Creative Library</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload and manage your ad creatives
              </p>
              <Button variant="outline" className="w-full">
                View Library
              </Button>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="font-semibold mb-2">Generate Report</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Download detailed campaign analytics
              </p>
              <Button variant="outline" className="w-full">
                Create Report
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}