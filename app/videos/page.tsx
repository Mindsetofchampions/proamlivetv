"use client";

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { VideoCard } from '@/components/ui/video-card';
import { VideoCarousel } from '@/components/ui/video-carousel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock videos data
const videos = [
  {
    id: "video1",
    title: "Urban Dance Championship Highlights",
    thumbnail: "https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "12:34",
    likes: 1245,
    creator: "DanceProdigy",
    category: "Dance"
  },
  {
    id: "video2",
    title: "New York Skateboarding Adventures",
    thumbnail: "https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: "8:17",
    likes: 987,
    creator: "SkateLife",
    category: "Sports"
  },
  // ... other videos
];

const categories = [
  "All Categories",
  "Dance",
  "Sports",
  "DIY",
  "Music",
  "Art",
  "Food",
  "Film",
  "Education"
];

export default function VideosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('newest');

  const filteredVideos = videos
    .filter(video => 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      video.creator.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(video => 
      selectedCategory === 'All Categories' || video.category === selectedCategory
    );

  const groupedVideos = filteredVideos.reduce((acc, video) => {
    const category = video.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(video);
    return acc;
  }, {} as Record<string, typeof videos>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-8 pt-24 pb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Video Library</h1>
            <p className="text-muted-foreground">
              Discover amazing content from our creators
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search videos..."
                className="pl-9 bg-white/5 backdrop-blur-sm border-white/10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px] bg-white/5 backdrop-blur-sm border-white/10">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {Object.entries(groupedVideos).map(([category, videos]) => (
          <VideoCarousel key={category} title={category}>
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                {...video}
                className="min-w-[300px] md:min-w-[400px]"
              />
            ))}
          </VideoCarousel>
        ))}

        {Object.keys(groupedVideos).length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-xl mb-4">No videos found</p>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}