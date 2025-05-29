"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock featured videos data
const featuredVideos = [
  {
    id: "video1",
    title: "Urban Dance Championship Highlights",
    thumbnail: "https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg",
    duration: "12:34",
    likes: 1245,
    creator: "DanceProdigy",
    category: "Dance"
  },
  {
    id: "video2",
    title: "New York Skateboarding Adventures",
    thumbnail: "https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg",
    duration: "8:17",
    likes: 987,
    creator: "SkateLife",
    category: "Sports"
  },
  {
    id: "video3",
    title: "DIY Room Makeover Under $100",
    thumbnail: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg",
    duration: "15:42",
    likes: 2563,
    creator: "CreativeSoul",
    category: "DIY"
  },
  {
    id: "video4",
    title: "Making Music With Household Items",
    thumbnail: "https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg",
    duration: "7:29",
    likes: 1876,
    creator: "SoundWizard",
    category: "Music"
  }
];

const FeaturedVideos = () => {
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Featured <span className="text-primary">Videos</span></h2>
        <Link href="/videos">
          <Button variant="ghost">
            View All
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <Link href={`/videos/${video.id}`}>
              <div 
                className="relative aspect-video rounded-lg overflow-hidden mb-3"
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index < 2}
                />
                
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.div
                    animate={hoveredVideo === video.id ? { scale: 1.2 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button size="icon" className="rounded-full bg-primary/90 hover:bg-primary">
                      <Play className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>
                
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {video.duration}
                </div>
                
                <div className="absolute top-2 left-2 bg-primary/90 text-white text-xs px-2 py-1 rounded">
                  {video.category}
                </div>
              </div>
              
              <h3 className="font-medium text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{video.creator}</span>
                <span className="flex items-center">
                  <Heart className="h-3 w-3 mr-1" fill="currentColor" />
                  {video.likes.toLocaleString()}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedVideos;