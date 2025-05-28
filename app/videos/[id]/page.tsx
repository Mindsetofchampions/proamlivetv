import VideoClient from './video-client';
import { supabase } from '@/lib/supabase';
import type { Video } from '@/types/supabase';

// Mock videos data for static generation since we can't make DB calls
const mockVideos = [
  {
    id: 'tech1',
    title: 'Coding 101: Web Development',
    thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
    duration: '22:15',
    views: 48920,
    creator: 'Code Academy',
    description: 'Learn the basics of web development'
  },
  {
    id: 'tech2',
    title: 'Future Tech Review',
    thumbnail: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    duration: '16:40',
    views: 35670,
    creator: 'Tech Insider',
    description: 'Exploring the latest gadgets and innovations'
  },
  {
    id: 'tech3',
    title: 'AI & Machine Learning Explained',
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    duration: '28:55',
    views: 42180,
    creator: 'Future Labs',
    description: 'Understanding artificial intelligence'
  }
];

export function generateStaticParams() {
  // Return all possible video IDs for static generation
  return mockVideos.map((video) => ({
    id: video.id
  }));
}

export default async function VideoPage({ params }: { params: { id: string } }) {
  // Find the video in our mock data
  const video = mockVideos.find(v => v.id === params.id);

  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Video not found</h1>
        <p className="mb-6">The video you're looking for doesn't exist or has been removed.</p>
        <a href="/videos" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Back to Videos
        </a>
      </div>
    );
  }

  return <VideoClient video={video} />;
}