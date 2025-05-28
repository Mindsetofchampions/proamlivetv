import VideoClient from './video-client';
import { supabase } from '@/lib/supabase';
import type { Video } from '@/types/supabase';

// Mock video data for static generation
const videos = {
  "video1": {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    title: "Urban Dance Championship Highlights",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg",
    duration: "12:34",
    views: 25678,
    likes: 1245,
    creator: "DanceProdigy",
    creatorAvatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    publishedAt: "2025-02-15",
    category: "Dance",
    description: "Watch the incredible performances from the 2025 Urban Dance Championship featuring talented youth dancers from around the country.",
    tags: ["dance", "championship", "youth", "urban", "competition"]
  },
  // ... other mock videos
};

export async function generateStaticParams() {
  try {
    // Get all public videos
    const { data: videos } = await supabase
      .from('videos')
      .select('id')
      .eq('visibility', 'PUBLIC')
      .eq('status', 'READY');

    return (videos || []).map((video) => ({
      id: video.id
    }));
  } catch (error) {
    console.error('Error fetching videos:', error);
    // Return mock IDs as fallback
    return Object.keys(videos).map((id) => ({ id }));
  }
}

export default async function VideoPage({ params }: { params: { id: string } }) {
  try {
    // Try to fetch video from Supabase
    const { data: video, error } = await supabase
      .from('videos')
      .select(`
        *,
        creator:creator_id (
          username,
          avatar_url
        )
      `)
      .eq('id', params.id)
      .single();

    if (error) throw error;

    if (!video) {
      // Fall back to mock data if video not found
      const mockVideo = videos[params.id as keyof typeof videos];
      if (!mockVideo) {
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
      return <VideoClient video={mockVideo} />;
    }

    return <VideoClient video={video} />;
  } catch (error) {
    console.error('Error fetching video:', error);
    // Fall back to mock data on error
    const mockVideo = videos[params.id as keyof typeof videos];
    return <VideoClient video={mockVideo || videos.video8} />;
  }
}