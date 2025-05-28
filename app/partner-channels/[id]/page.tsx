"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Filter, Play, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockVideos = [
  {
    id: 1,
    title: "Championship Game Highlights",
    thumbnail: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg",
    duration: "12:34",
    views: 1245,
    category: "Sports"
  },
  {
    id: 2,
    title: "Student Art Exhibition",
    thumbnail: "https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg",
    duration: "8:17",
    views: 987,
    category: "Arts"
  },
  {
    id: 3,
    title: "Science Fair Projects",
    thumbnail: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg",
    duration: "15:42",
    views: 2563,
    category: "Education"
  }
];

const categories = ["All", "Sports", "Arts", "Education", "Technology", "Leadership"];

export default function PartnerChannelDetail() {
  const params = useParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [approvalFilter, setApprovalFilter] = useState("pending");

  const partnerId = params.id as string;
  const partnerName = partnerId.charAt(0).toUpperCase() + partnerId.slice(1);

  const filteredVideos = mockVideos.filter(video =>
    selectedCategory === "All" || video.category === selectedCategory
  );

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{partnerName} Channel</h1>
            <p className="text-muted-foreground">
              Manage and approve content for {partnerName}
            </p>
          </div>

          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={approvalFilter} onValueChange={setApprovalFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Approval status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending Approval</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="icon" className="rounded-full">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {video.views.toLocaleString()} views
                    </span>
                    <span>{video.category}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1">
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1">
                      Reject
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );