"use client";

import { useEffect, useRef, useState } from 'react';
import { WebRTCClient } from '@/lib/webrtc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Video, Mic, MicOff, VideoOff } from 'lucide-react';

export default function StreamPage() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [streamTitle, setStreamTitle] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const webrtcRef = useRef<WebRTCClient | null>(null);

  useEffect(() => {
    webrtcRef.current = new WebRTCClient();
    
    return () => {
      if (webrtcRef.current) {
        webrtcRef.current.disconnect();
      }
    };
  }, []);

  const startStream = async () => {
    if (!webrtcRef.current || !videoRef.current || !streamTitle) return;
    
    try {
      await webrtcRef.current.startStream(videoRef.current);
      setIsStreaming(true);
    } catch (error) {
      console.error('Failed to start stream:', error);
    }
  };

  const stopStream = () => {
    if (!webrtcRef.current) return;
    
    webrtcRef.current.stopStream();
    setIsStreaming(false);
  };

  const toggleVideo = () => {
    if (!videoRef.current?.srcObject) return;
    
    const videoTrack = (videoRef.current.srcObject as MediaStream)
      .getVideoTracks()[0];
    videoTrack.enabled = !videoEnabled;
    setVideoEnabled(!videoEnabled);
  };

  const toggleAudio = () => {
    if (!videoRef.current?.srcObject) return;
    
    const audioTrack = (videoRef.current.srcObject as MediaStream)
      .getAudioTracks()[0];
    audioTrack.enabled = !audioEnabled;
    setAudioEnabled(!audioEnabled);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <Card className="mb-4">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                
                {isStreaming && (
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="destructive" className="animate-pulse">
                      LIVE
                    </Badge>
                    <Badge variant="secondary">
                      <Users className="h-3 w-3 mr-1" />
                      {viewerCount} viewers
                    </Badge>
                  </div>
                )}
                
                {!isStreaming && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
            </Card>

            <div className="flex gap-2 mb-4">
              <Button
                variant={videoEnabled ? 'outline' : 'destructive'}
                size="icon"
                onClick={toggleVideo}
              >
                {videoEnabled ? (
                  <Video className="h-4 w-4" />
                ) : (
                  <VideoOff className="h-4 w-4" />
                )}
              </Button>
              
              <Button
                variant={audioEnabled ? 'outline' : 'destructive'}
                size="icon"
                onClick={toggleAudio}
              >
                {audioEnabled ? (
                  <Mic className="h-4 w-4" />
                ) : (
                  <MicOff className="h-4 w-4" />
                )}
              </Button>
              
              <div className="flex-1">
                <Input
                  placeholder="Stream title"
                  value={streamTitle}
                  onChange={(e) => setStreamTitle(e.target.value)}
                  disabled={isStreaming}
                />
              </div>
              
              <Button
                variant={isStreaming ? 'destructive' : 'default'}
                onClick={isStreaming ? stopStream : startStream}
                disabled={!streamTitle && !isStreaming}
              >
                {isStreaming ? 'End Stream' : 'Start Stream'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}