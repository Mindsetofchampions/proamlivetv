import VideoClient from './video-client';
import { supabase } from '@/lib/supabase';
import type { Video } from '@/types/supabase';

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
    return [];
  }
}

export default async function VideoPage({ params }: { params: { id: string } }) {
  try {
    // Fetch video with creator data
    const { data: video, error } = await supabase
      .from('videos')
      .select(`
        *,
        creator:creator_id (
          username,
          display_name,
          avatar_url
        )
      `)
      .eq('id', params.id)
      .single();

    if (error) throw error;

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
  } catch (error) {
    console.error('Error fetching video:', error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Error loading video</h1>
        <p className="mb-6">Something went wrong. Please try again later.</p>
        <a href="/videos" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Back to Videos
        </a>
      </div>
    );
  }
}