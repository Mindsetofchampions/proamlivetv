"use client";

import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { trackVideoView } from '@/lib/analytics';

interface VideoPlayerProps {
  videoId: string;
  url: string;
  onProgress?: (state: { played: number; playedSeconds: number }) => void;
}

export default function VideoPlayer({ videoId, url, onProgress }: VideoPlayerProps) {
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);
  const lastTrackingTime = useRef(0);
  const trackingInterval = 10; // Track every 10 seconds

  useEffect(() => {
    return () => {
      // Track final view data when component unmounts
      const player = playerRef.current;
      if (player) {
        const state = player.getCurrentTime();
        trackViewData(state);
      }
    };
  }, []);

  const trackViewData = (currentTime: number) => {
    if (!duration) return;

    const watchPercentage = (currentTime / duration) * 100;
    
    trackVideoView(videoId, {
      watchDuration: Math.floor(currentTime),
      watchPercentage: Math.min(watchPercentage, 100),
      deviceType: navigator.platform,
      browser: navigator.userAgent
    });
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    // Track view data every X seconds
    if (state.playedSeconds - lastTrackingTime.current >= trackingInterval) {
      trackViewData(state.playedSeconds);
      lastTrackingTime.current = state.playedSeconds;
    }

    if (onProgress) {
      onProgress(state);
    }
  };

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        controls
        playing
        onDuration={setDuration}
        onProgress={handleProgress}
        config={{
          file: {
            attributes: {
              crossOrigin: "anonymous"
            }
          }
        }}
      />
    </div>
  );
}