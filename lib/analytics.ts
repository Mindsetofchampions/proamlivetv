import { supabase } from './supabase';
import type { VideoAnalytics } from '@/types/supabase';

export interface VideoAnalyticsInput {
  watchDuration: number;
  watchPercentage: number;
  deviceType: string;
  browser: string;
}

export async function trackVideoView(
  videoId: string, 
  analytics: VideoAnalyticsInput
) {
  try {
    // Insert analytics record
    const { error: analyticsError } = await supabase
      .from('video_analytics')
      .insert({
        video_id: videoId,
        watch_duration: analytics.watchDuration,
        watch_percentage: analytics.watchPercentage,
        device_type: analytics.deviceType,
        browser: analytics.browser
      });

    if (analyticsError) throw analyticsError;

    // Increment video impressions atomically
    const { error: updateError } = await supabase.rpc('increment_impressions', {
      video_id: videoId,
      increment_by: 1
    });

    if (updateError) throw updateError;
  } catch (error) {
    console.error('Failed to track video view:', error);
  }
}

export async function trackEngagement(
  videoId: string,
  engagementType: 'like' | 'share' | 'comment'
) {
  try {
    const { error } = await supabase
      .from('video_engagement')
      .insert({
        video_id: videoId,
        engagement_type: engagementType
      });

    if (error) throw error;
  } catch (error) {
    console.error('Failed to track engagement:', error);
  }
}

export async function getVideoAnalytics(videoId: string) {
  try {
    // Get view count and analytics
    const { data: analyticsData, error: analyticsError } = await supabase
      .from('video_analytics')
      .select('*')
      .eq('video_id', videoId);
    
    if (analyticsError) throw analyticsError;

    // Get engagement counts
    const { data: engagementData, error: engagementError } = await supabase
      .from('video_engagement')
      .select('engagement_type')
      .eq('video_id', videoId);
    
    if (engagementError) throw engagementError;

    // Calculate metrics
    const views = analyticsData.length;
    const likes = engagementData.filter(e => e.engagement_type === 'like').length;
    const shares = engagementData.filter(e => e.engagement_type === 'share').length;
    const comments = engagementData.filter(e => e.engagement_type === 'comment').length;

    // Calculate average watch duration and percentage
    const avgWatchDuration = analyticsData.reduce((acc, curr) => acc + curr.watch_duration, 0) / views || 0;
    const avgWatchPercentage = analyticsData.reduce((acc, curr) => acc + curr.watch_percentage, 0) / views || 0;

    return {
      views,
      likes,
      shares,
      comments,
      avgWatchDuration,
      avgWatchPercentage,
      engagementRate: views > 0 ? ((likes + shares + comments) / views) * 100 : 0
    };
  } catch (error) {
    console.error('Failed to get video analytics:', error);
    return null;
  }
}