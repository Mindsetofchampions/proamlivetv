"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { 
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Play,
  DollarSign,
  Building2
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import type { Video } from '@/types/supabase';

interface VideoWithCreator extends Video {
  creator: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
}

export default function AdminVideosPage() {
  const router = useRouter();
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  const [videos, setVideos] = useState<VideoWithCreator[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<VideoStatus | 'ALL'>('ALL');
  const [rejectionReason, setRejectionReason] = useState('');
  const [processing, setProcessing] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [selectedSponsor, setSelectedSponsor] = useState<string>('');
  const [sponsorPlacement, setSponsorPlacement] = useState<string>('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showSponsorDialog, setShowSponsorDialog] = useState(false);

  const fetchVideos = useCallback(async () => {
    try {
      const query = supabase
        .from('videos')
        .select(`
          *,
          creator:creator_id (
            first_name,
            last_name,
            email
          )
        `);

      if (statusFilter !== 'ALL') {
        query.eq('status', statusFilter);
      }

      query.order('created_at', { ascending: false });

      const { data, error } = await query;
      
      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch videos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [statusFilter, toast]);

  const fetchSponsors = async () => {
    try {
      const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .order('name');

      if (error) throw error;
      setSponsors(data || []);
    } catch (error) {
      console.error('Error fetching sponsors:', error);
    }
  };

  useEffect(() => {
    if (!user || !hasRole('admin')) {
      router.push('/login');
      return;
    }

    fetchVideos();
    fetchSponsors();
  }, [user, hasRole, router, fetchVideos]);

  const handleApprove = async (videoId: string) => {
    try {
      setProcessing(true);
      const response = await fetch(`/api/admin/videos/${videoId}/approve`, {
        method: 'PATCH'
      });

      if (!response.ok) throw new Error('Failed to approve video');
      
      toast({
        title: "Success",
        description: "Video approved successfully",
      });
      
      fetchVideos();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to approve video",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedVideo || !rejectionReason.trim()) return;

    try {
      setProcessing(true);
      const response = await fetch(`/api/admin/videos/${selectedVideo}/reject`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rejectionReason })
      });

      if (!response.ok) throw new Error('Failed to reject video');
      
      toast({
        title: "Success",
        description: "Video rejected successfully",
      });
      
      setShowRejectDialog(false);
      setRejectionReason('');
      setSelectedVideo(null);
      fetchVideos();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to reject video",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleAssignSponsor = async () => {
    if (!selectedVideo || !selectedSponsor || !sponsorPlacement) return;

    try {
      setProcessing(true);
      const response = await fetch(`/api/admin/videos/${selectedVideo}/sponsor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sponsorId: selectedSponsor,
          placement: sponsorPlacement
        })
      });

      if (!response.ok) throw new Error('Failed to assign sponsor');
      
      toast({
        title: "Success",
        description: "Sponsor assigned successfully",
      });
      
      setShowSponsorDialog(false);
      setSelectedSponsor('');
      setSponsorPlacement('');
      setSelectedVideo(null);
      fetchVideos();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to assign sponsor",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
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
            <h1 className="text-3xl font-bold mb-2">Video Approval Queue</h1>
            <p className="text-muted-foreground">
              Review and manage video submissions
            </p>
          </div>

          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as VideoStatus | 'ALL')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Videos</SelectItem>
              <SelectItem value="PENDING_REVIEW">Pending Review</SelectItem>
              <SelectItem value="PROCESSING">Processing</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <div className="p-6">
                  <div className="flex gap-6">
                    <div className="relative aspect-video w-64 rounded-lg overflow-hidden flex-shrink-0">
                      <Image 
                        src={video.thumbnail_url || '/placeholder.jpg'} 
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{video.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            By {video.creator.firstName} {video.creator.lastName}
                          </p>
                        </div>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {video.status === 'PENDING_REVIEW' && <Clock className="h-3 w-3" />}
                          {video.status === 'APPROVED' && <CheckCircle className="h-3 w-3" />}
                          {video.status === 'REJECTED' && <XCircle className="h-3 w-3" />}
                          {video.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {video.description}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        {video.status === 'PENDING_REVIEW' && (
                          <>
                            <Button
                              onClick={() => handleApprove(video.id)}
                              disabled={processing}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            
                            <Button 
                              variant="destructive"
                              onClick={() => {
                                setSelectedVideo(video.id);
                                setShowRejectDialog(true);
                              }}
                              disabled={processing}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}

                        {video.status === 'APPROVED' && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedVideo(video.id);
                              setShowSponsorDialog(true);
                            }}
                            disabled={processing}
                          >
                            <Building2 className="h-4 w-4 mr-2" />
                            Assign Sponsor
                          </Button>
                        )}
                        
                        <Button variant="outline" asChild>
                          <a href={video.url || '#'} target="_blank" rel="noopener noreferrer">
                            <Play className="h-4 w-4 mr-2" />
                            Preview
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {videos.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No videos found</h3>
              <p className="text-muted-foreground">
                {statusFilter === 'ALL' 
                  ? 'There are no videos in the system yet.'
                  : `No videos with status "${statusFilter.replace('_', ' ')}".`}
              </p>
            </div>
          )}
        </div>

        {/* Reject Dialog */}
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Video</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting this video.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                placeholder="Enter rejection reason..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowRejectDialog(false)}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={!rejectionReason.trim() || processing}
              >
                {processing ? 'Rejecting...' : 'Confirm Rejection'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Sponsor Dialog */}
        <Dialog open={showSponsorDialog} onOpenChange={setShowSponsorDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Sponsor</DialogTitle>
              <DialogDescription>
                Select a sponsor and placement type for this video.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Sponsor</label>
                <Select value={selectedSponsor} onValueChange={setSelectedSponsor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sponsor" />
                  </SelectTrigger>
                  <SelectContent>
                    {sponsors.map((sponsor) => (
                      <SelectItem key={sponsor.id} value={sponsor.id}>
                        {sponsor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Placement</label>
                <Select value={sponsorPlacement} onValueChange={setSponsorPlacement}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select placement type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-roll">Pre-Roll</SelectItem>
                    <SelectItem value="overlay">Overlay</SelectItem>
                    <SelectItem value="end-card">End Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowSponsorDialog(false)}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAssignSponsor}
                disabled={!selectedSponsor || !sponsorPlacement || processing}
              >
                {processing ? 'Assigning...' : 'Assign Sponsor'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}