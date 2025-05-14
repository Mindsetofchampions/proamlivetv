"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Heart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  likes?: number;
  creator?: string;
  className?: string;
}

export function VideoCard({
  id,
  title,
  thumbnail,
  duration,
  likes,
  creator,
  className
}: VideoCardProps) {
  return (
    <Link href={`/videos/${id}`}>
      <motion.div
        className={cn(
          "group relative rounded-2xl shadow-apple-card overflow-hidden bg-card",
          className
        )}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative aspect-video">
          <img
            src={thumbnail}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {duration}
            </div>
          )}
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
              <Play className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
          <h3 className="font-medium text-white line-clamp-1 mb-1">{title}</h3>
          <div className="flex items-center justify-between text-sm text-white/80">
            {creator && <span>{creator}</span>}
            {likes !== undefined && (
              <span className="flex items-center">
                <Heart className="h-3 w-3 mr-1" />
                {likes.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}