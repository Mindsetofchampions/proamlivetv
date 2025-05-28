'use client';

import { useEffect, useRef } from 'react';
import { createReactPlayer } from 'amazon-ivs-player';

interface IVSPlayerProps {
  playbackUrl: string;
  onReady?: () => void;
  onError?: (error: Error) => void;
}

export default function IVSPlayer({ playbackUrl, onReady, onError }: IVSPlayerProps) {
  const playerRef = useRef<HTMLVideoElement>(null);
  const ivsPlayerRef = useRef<any>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    try {
      const player = createReactPlayer();
      player.attachHTMLVideoElement(playerRef.current);
      player.load(playbackUrl);
      player.play();

      ivsPlayerRef.current = player;

      if (onReady) {
        player.addEventListener('ready', onReady);
      }

      return () => {
        if (ivsPlayerRef.current) {
          ivsPlayerRef.current.delete();
        }
      };
    } catch (error) {
      console.error('Error initializing IVS player:', error);
      if (onError && error instanceof Error) {
        onError(error);
      }
    }
  }, [playbackUrl, onReady, onError]);

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={playerRef}
        className="w-full h-full"
        playsInline
        controls
      />
    </div>
  );
}