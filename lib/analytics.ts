import { supabase } from './supabase';

export interface VideoAnalytics {
  watchDuration: number;
  watchPercentage: number;
  deviceType: string;
  browser: string;
}

export async function trackVideoView(
  videoId: string, 
  analytics: VideoAnalytics
) {
  try {
    const { error } = await supabase
      .from('video_analytics')
      .insert([{
        video_id: videoId,
        watch_duration: analytics.watchDuration,
        watch_percentage: analytics.watchPercentage,
        device_type: analytics.deviceType,
        browser: analytics.browser,
        country: 'Unknown', // Could be enhanced with IP geolocation
        region: 'Unknown'
      }]);

    if (error) throw error;
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
      .insert([{
        video_id: videoId,
        engagement_type: engagementType
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Failed to track engagement:', error);
  }
}

export async function getVideoAnalytics(videoId: string) {
  try {
    // Get view count
    const { data: viewData, error: viewError } = await supabase
      .from('video_analytics')
      .select('id')
      .eq('video_id', videoId);
    
    if (viewError) throw viewError;

    // Get engagement counts
    const { data: engagementData, error: engagementError } = await supabase
      .from('video_engagement')
      .select('engagement_type')
      .eq('video_id', videoId);
    
    if (engagementError) throw engagementError;

    // Calculate engagement metrics
    const views = viewData.length;
    const likes = engagementData.filter(e => e.engagement_type === 'like').length;
    const shares = engagementData.filter(e => e.engagement_type === 'share').length;
    const comments = engagementData.filter(e => e.engagement_type === 'comment').length;

    return {
      views,
      likes,
      shares,
      comments,
      engagementRate: views > 0 ? ((likes + shares + comments) / views) * 100 : 0
    };
  } catch (error) {
    console.error('Failed to get video analytics:', error);
    return null;
  }
}