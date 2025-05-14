"use client";

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VideoCard } from '@/components/ui/video-card';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  views?: number;
  likes?: number;
  creator?: string;
  createdAt?: string;
}

interface VideoCarouselProps {
  title: string;
  videos: Video[];
}

export function VideoCarousel({ title, videos }: VideoCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!videos.length) return null;

  return (
    <div className="relative py-8">
      <h2 className="text-2xl font-medium tracking-wide mb-6 px-4">{title}</h2>
      
      <div className="group relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 px-4 pb-4 scroll-smooth hide-scrollbar"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}