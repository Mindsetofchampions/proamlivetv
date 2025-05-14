import { supabase } from './supabase';

export interface Stream {
  id: string;
  creator_id: string;
  title: string;
  status: 'offline' | 'live' | 'ended';
  viewer_count: number;
  started_at: string | null;
  ended_at: string | null;
}

export async function createStream(title: string) {
  try {
    const { data, error } = await supabase
      .from('streams')
      .insert({
        title,
        status: 'offline'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating stream:', error);
    throw error;
  }
}

export async function startStream(streamId: string) {
  try {
    const { error } = await supabase
      .from('streams')
      .update({
        status: 'live',
        started_at: new Date().toISOString(),
        ended_at: null
      })
      .eq('id', streamId);

    if (error) throw error;
  } catch (error) {
    console.error('Error starting stream:', error);
    throw error;
  }
}

export async function endStream(streamId: string) {
  try {
    const { error } = await supabase
      .from('streams')
      .update({
        status: 'ended',
        ended_at: new Date().toISOString()
      })
      .eq('id', streamId);

    if (error) throw error;
  } catch (error) {
    console.error('Error ending stream:', error);
    throw error;
  }
}

export async function updateViewerCount(streamId: string, count: number) {
  try {
    const { error } = await supabase
      .from('streams')
      .update({ viewer_count: count })
      .eq('id', streamId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating viewer count:', error);
    throw error;
  }
}

export async function joinStream(streamId: string) {
  try {
    const { error } = await supabase
      .from('stream_viewers')
      .insert({
        stream_id: streamId,
        joined_at: new Date().toISOString()
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error joining stream:', error);
    throw error;
  }
}

export async function leaveStream(streamId: string) {
  try {
    const { error } = await supabase
      .from('stream_viewers')
      .update({
        left_at: new Date().toISOString()
      })
      .eq('stream_id', streamId)
      .is('left_at', null);

    if (error) throw error;
  } catch (error) {
    console.error('Error leaving stream:', error);
    throw error;
  }
}

export async function getLiveStreams() {
  try {
    const { data, error } = await supabase
      .from('streams')
      .select(`
        *,
        creator:creator_id (
          username,
          avatar_url
        )
      `)
      .eq('status', 'live')
      .order('viewer_count', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting live streams:', error);
    throw error;
  }
}