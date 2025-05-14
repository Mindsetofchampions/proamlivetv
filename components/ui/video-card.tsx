"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Clock, Heart } from 'lucide-react';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  views?: number;
  likes?: number;
  creator?: string;
  className?: string;
}

export function VideoCard({
  id,
  title,
  thumbnail,
  duration,
  views,
  likes,
  creator,
  className = ''
}: VideoCardProps) {
  return (
    <Link href={`/videos/${id}`}>
      <motion.div 
        className={`group relative rounded-2xl shadow-apple-card overflow-hidden ${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative aspect-video">
          <img 
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {duration}
            </div>
          )}
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="h-6 w-6 text-black" />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform">
          <h3 className="text-white font-medium mb-1 line-clamp-1">{title}</h3>
          {creator && (
            <div className="flex items-center justify-between text-sm text-white/80">
              <span>{creator}</span>
              {likes !== undefined && (
                <span className="flex items-center">
                  <Heart className="h-3 w-3 mr-1" />
                  {likes.toLocaleString()}
                </span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}