"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { 
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Play,
  DollarSign
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
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';

type VideoStatus = 'PENDING_REVIEW' | 'PROCESSING' | 'APPROVED' | 'REJECTED' | 'FAILED' | 'READY';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  status: VideoStatus;
  createdAt: string;
  creator: {
    firstName: string;
    lastName: string;
    email: string;
  };
  sponsorSpots: Array<{
    id: string;
    type: string;
    status: string;
    sponsor: {
      name: string;
      logoUrl: string;
    };
  }>;
}

export default function AdminVideosPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<VideoStatus | 'ALL'>('ALL');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    fetchVideos();
  }, [isSignedIn, statusFilter]);

  const fetchVideos = async () => {
    try {
      const url = statusFilter === 'ALL' 
        ? '/api/videos'
        : `/api/videos?status=${statusFilter}`;
        
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch videos');
      
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (videoId: string) => {
    try {
      setProcessing(true);
      const response = await fetch(`/api/videos/${videoId}/approve`, {
        method: 'POST'
      });

      if (!response.ok) throw new Error('Failed to approve video');
      
      fetchVideos();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (videoId: string) => {
    try {
      setProcessing(true);
      const response = await fetch(`/api/videos/${videoId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason: rejectionReason })
      });

      if (!response.ok) throw new Error('Failed to reject video');
      
      setRejectionReason('');
      setSelectedVideo(null);
      fetchVideos();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: VideoStatus) => {
    const statusConfig = {
      PENDING_REVIEW: { icon: Clock, color: 'bg-yellow-500/20 text-yellow-700' },
      PROCESSING: { icon: Clock, color: 'bg-blue-500/20 text-blue-700' },
      APPROVED: { icon: CheckCircle, color: 'bg-green-500/20 text-green-700' },
      REJECTED: { icon: XCircle, color: 'bg-red-500/20 text-red-700' },
      FAILED: { icon: AlertCircle, color: 'bg-red-500/20 text-red-700' },
      READY: { icon: Play, color: 'bg-green-500/20 text-green-700' }
    };

    const { icon: Icon, color } = statusConfig[status];
    
    return (
      <Badge variant="secondary" className={`flex items-center gap-1 ${color}`}>
        <Icon className="h-3 w-3" />
        {status.replace('_', ' ')}
      </Badge>
    );
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
                      <img 
                        src={video.thumbnailUrl} 
                        alt={video.title}
                        className="object-cover w-full h-full"
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
                        {getStatusBadge(video.status)}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {video.description}
                      </p>
                      
                      {video.sponsorSpots.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Sponsor Spots:</p>
                          <div className="flex flex-wrap gap-2">
                            {video.sponsorSpots.map((spot) => (
                              <Badge key={spot.id} variant="outline" className="flex items-center">
                                <DollarSign className="h-3 w-3 mr-1" />
                                {spot.sponsor.name} - {spot.type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
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
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="destructive">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject
                                </Button>
                              </DialogTrigger>
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
                                <div className="flex justify-end gap-4">
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleReject(video.id)}
                                    disabled={!rejectionReason.trim() || processing}
                                  >
                                    Confirm Rejection
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                        
                        <Button variant="outline" asChild>
                          <a href={video.thumbnailUrl} target="_blank" rel="noopener noreferrer">
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
      </div>
    </div>
  );
}