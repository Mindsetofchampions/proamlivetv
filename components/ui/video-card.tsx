import Link from 'next/link';
import { Play, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  creator: string;
  likes?: number;
  className?: string;
}

export function VideoCard({
  id,
  title,
  thumbnail,
  duration,
  creator,
  likes,
  className
}: VideoCardProps) {
  return (
    <Link href={`/videos/${id}`}>
      <motion.div
        className={cn(
          "group relative aspect-video rounded-2xl shadow-apple-card overflow-hidden",
          className
        )}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <img
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg font-medium text-white mb-1 line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center justify-between text-sm text-white/80">
            <span>{creator}</span>
            {likes !== undefined && (
              <span className="flex items-center">
                <Heart className="h-3 w-3 mr-1" fill="currentColor" />
                {likes.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>

        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      </motion.div>
    </Link>
  );
}