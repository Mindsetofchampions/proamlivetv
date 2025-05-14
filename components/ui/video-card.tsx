"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Play, Heart, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  views?: number;
  likes?: number;
  creator?: string;
  createdAt?: string;
}

export function VideoCard({
  id,
  title,
  thumbnail,
  duration,
  views,
  likes,
  creator,
  createdAt
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = (num?: number) => {
    if (!num) return '0';
    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
  };

  return (
    <Link href={`/videos/${id}`}>
      <motion.div
        className="relative w-72 rounded-2xl shadow-apple-card overflow-hidden scroll-snap-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative aspect-video">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {duration}
            </div>
          )}
          <div
            className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Button size="icon" className="rounded-full bg-white/20 hover:bg-white/30">
              <Play className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
        
        <div className={`absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-xs text-white p-4 transition-transform duration-200 ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <h3 className="font-medium text-sm mb-1 line-clamp-2">{title}</h3>
          {creator && (
            <p className="text-xs text-white/80">{creator}</p>
          )}
          <div className="flex items-center gap-3 mt-2 text-xs text-white/70">
            {views !== undefined && (
              <span>{formatNumber(views)} views</span>
            )}
            {likes !== undefined && (
              <span className="flex items-center">
                <Heart className="w-3 h-3 mr-1" />
                {formatNumber(likes)}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}