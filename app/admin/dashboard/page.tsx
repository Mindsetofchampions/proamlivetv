"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Video, 
  Users, 
  Building2, 
  Radio,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, hasRole } = useAuth();
  const [stats, setStats] = useState({
    totalVideos: 0,
    pendingVideos: 0,
    partnerInquiries: 0,
    sponsorApplications: 0,
    liveEvents: 0,
    systemHealth: true
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('videos');

  useEffect(() => {
    if (!user || !hasRole('admin')) {
      router.push('/login');
      return;
    }

    fetchDashboardStats();
  }, [user, hasRole, router]);

  const fetchDashboardStats = async () => {
    try {
      // Fetch video stats
      const { data: videoStats, error: videoError } = await supabase
        .from('videos')
        .select('status', { count: 'exact' });

      if (!videoError) {
        setStats(prev => ({
          ...prev,
          totalVideos: videoStats.length,
          pendingVideos: videoStats.filter(v => v.status === 'PENDING_REVIEW').length
        }));
      }

      // Fetch partner inquiries
      const { count: partnerCount } = await supabase
        .from('partner_leads')
        .select('*', { count: 'exact' });

      // Fetch sponsor applications
      const { count: sponsorCount } = await supabase
        .from('sponsor_leads')
        .select('*', { count: 'exact' });

      // Fetch live events
      const { count: eventCount } = await supabase
        .from('streams')
        .select('*', { count: 'exact' })
        .eq('status', 'live');

      // Check system health
      const healthResponse = await fetch('/api/health');
      const healthData = await healthResponse.json();

      setStats(prev => ({
        ...prev,
        partnerInquiries: partnerCount || 0,
        sponsorApplications: sponsorCount || 0,
        liveEvents: eventCount || 0,
        systemHealth: healthData.status === 'healthy'
      }));
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
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
    <div className="min-h-screen bg-background/95 pb-8">
      <header className="bg-primary p-8 mb-8 rounded-b-[2rem] shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/80">Manage content, users, and system settings</p>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <Card className="col-span-1">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <Badge variant={stats.totalVideos > 0 ? "default" : "secondary"}>
                  {stats.totalVideos}
                </Badge>
              </div>
              <h3 className="font-medium">Total Videos</h3>
              <p className="text-sm text-muted-foreground">All time</p>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-500/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <Badge variant="secondary">{stats.pendingVideos}</Badge>
              </div>
              <h3 className="font-medium">Pending Review</h3>
              <p className="text-sm text-muted-foreground">Videos awaiting approval</p>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-500/10 p-3 rounded-full">
                  <Building2 className="h-6 w-6 text-blue-500" />
                </div>
                <Badge variant="secondary">{stats.partnerInquiries}</Badge>
              </div>
              <h3 className="font-medium">Partner Inquiries</h3>
              <p className="text-sm text-muted-foreground">New applications</p>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-500/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <Badge variant="secondary">{stats.sponsorApplications}</Badge>
              </div>
              <h3 className="font-medium">Sponsor Apps</h3>
              <p className="text-sm text-muted-foreground">Pending review</p>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-red-500/10 p-3 rounded-full">
                  <Radio className="h-6 w-6 text-red-500" />
                </div>
                <Badge variant="secondary">{stats.liveEvents}</Badge>
              </div>
              <h3 className="font-medium">Live Events</h3>
              <p className="text-sm text-muted-foreground">Currently streaming</p>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-500/10 p-3 rounded-full">
                  <Activity className="h-6 w-6 text-purple-500" />
                </div>
                <Badge variant={stats.systemHealth ? "default" : "destructive"}>
                  {stats.systemHealth ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                </Badge>
              </div>
              <h3 className="font-medium">System Health</h3>
              <p className="text-sm text-muted-foreground">All services operational</p>
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full justify-start border-b rounded-none p-0">
            <TabsTrigger value="videos" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Videos
            </TabsTrigger>
            <TabsTrigger value="partners" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Partners
            </TabsTrigger>
            <TabsTrigger value="sponsors" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Sponsors
            </TabsTrigger>
            <TabsTrigger value="live-events" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Live Events
            </TabsTrigger>
            <TabsTrigger value="audit-logs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              Audit Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Recent Videos</h2>
              <Button onClick={() => router.push('/admin/videos')}>
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Video rows would be mapped here */}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="partners" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Partner Applications</h2>
              <Button onClick={() => router.push('/admin/partners')}>
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Partner rows would be mapped here */}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="sponsors" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Sponsor Applications</h2>
              <Button onClick={() => router.push('/admin/sponsors')}>
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Sponsor rows would be mapped here */}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="live-events" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Live Events</h2>
              <Button onClick={() => router.push('/admin/live-events')}>
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Scheduled At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Event rows would be mapped here */}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="audit-logs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Recent Activity</h2>
              <Button onClick={() => router.push('/admin/audit-logs')}>
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Audit log rows would be mapped here */}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}