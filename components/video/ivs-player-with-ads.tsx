'use client';

import { useEffect, useRef, useState } from 'react';
import { createReactPlayer } from 'amazon-ivs-player';
import Hls from 'hls.js';

interface IVSPlayerWithAdsProps {
  playbackUrl: string;
  eventId: string;
  onReady?: () => void;
  onError?: (error: Error) => void;
}

export default function IVSPlayerWithAds({ 
  playbackUrl, 
  eventId,
  onReady, 
  onError 
}: IVSPlayerWithAdsProps) {
  const playerRef = useRef<HTMLVideoElement>(null);
  const ivsPlayerRef = useRef<any>(null);
  const adPlayerRef = useRef<HTMLVideoElement>(null);
  const [showingAd, setShowingAd] = useState(false);
  const [playedPreRoll, setPlayedPreRoll] = useState(false);

  useEffect(() => {
    if (!playerRef.current) return;

    try {
      const player = createReactPlayer();
      player.attachHTMLVideoElement(playerRef.current);
      player.load(playbackUrl);

      // Handle metadata cues for ads
      player.addEventListener('TextMetadataCue', (cue: any) => {
        try {
          const data = JSON.parse(cue.text);
          if (data.type === 'pre-roll' && !playedPreRoll) {
            playAd(data.adManifestUrl);
            setPlayedPreRoll(true);
          } else if (data.type === 'mid-roll') {
            playAd(data.adManifestUrl);
          }
        } catch (error) {
          console.error('Error handling metadata cue:', error);
        }
      });

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

  const playAd = async (adManifestUrl: string) => {
    if (!adPlayerRef.current || !ivsPlayerRef.current) return;

    try {
      // Pause main stream
      ivsPlayerRef.current.pause();
      setShowingAd(true);

      // Play ad
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(adManifestUrl);
        hls.attachMedia(adPlayerRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          adPlayerRef.current?.play();
        });
      } else if (adPlayerRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        adPlayerRef.current.src = adManifestUrl;
        await adPlayerRef.current.play();
      }

      // Resume main stream after ad
      adPlayerRef.current.onended = () => {
        setShowingAd(false);
        ivsPlayerRef.current.play();
      };
    } catch (error) {
      console.error('Error playing ad:', error);
      setShowingAd(false);
      ivsPlayerRef.current.play();
    }
  };

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={playerRef}
        className={`w-full h-full ${showingAd ? 'hidden' : ''}`}
        playsInline
        controls
      />
      <video
        ref={adPlayerRef}
        className={`w-full h-full ${showingAd ? '' : 'hidden'}`}
        playsInline
      />
    </div>
  );
}