"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import ReactPlayer from 'react-player';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Calendar, Clock, Users } from 'lucide-react';

const ppvEvents = {
  'championship-finals-2025': {
    id: 'championship-finals-2025',
    title: 'Championship Finals 2025',
    thumbnail: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg',
    streamUrl: 'https://example.com/stream/finals-2025.m3u8', // Replace with actual HLS stream URL
    date: '2025-04-15T18:00:00Z',
    price: 29.99,
    description: 'Watch the ultimate showdown as top teams compete for the championship title. This exclusive event features the best players from around the world competing for the grand prize.',
    venue: 'Virtual Arena',
    expectedViewers: '50K+',
    category: 'Esports'
  },
  'dance-competition-2025': {
    id: 'dance-competition-2025',
    title: 'National Dance Competition 2025',
    thumbnail: 'https://images.pexels.com/photos/2188012/pexels-photo-2188012.jpeg',
    streamUrl: 'https://example.com/stream/dance-2025.m3u8', // Replace with actual HLS stream URL
    date: '2025-04-20T19:30:00Z',
    price: 24.99,
    description: 'Experience the artistry and skill of youth dancers from across the country. Watch as they showcase their talent and compete for top honors.',
    venue: 'Performance Center',
    expectedViewers: '35K+',
    category: 'Dance'
  },
  'talent-showcase-2025': {
    id: 'talent-showcase-2025',
    title: 'Youth Talent Showcase 2025',
    thumbnail: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
    streamUrl: 'https://example.com/stream/showcase-2025.m3u8', // Replace with actual HLS stream URL
    date: '2025-05-01T20:00:00Z',
    price: 19.99,
    description: 'Discover the next generation of performers in this live talent showcase. From musicians to magicians, witness incredible young talent.',
    venue: 'Creative Hub',
    expectedViewers: '25K+',
    category: 'Performance'
  }
};

export default function PPVEventPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const searchParams = useSearchParams();
  const { isSignedIn } = useUser();
  const [hasPurchased, setHasPurchased] = useState(false);
  
  const event = ppvEvents[id as keyof typeof ppvEvents];
  
  useEffect(() => {
    // In a real app, verify purchase status from your backend
    const success = searchParams.get('success');
    if (success === 'true') {
      setHasPurchased(true);
    }
  }, [searchParams]);

  if (!event) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <p className="mb-6">The event you're looking for doesn't exist or has ended.</p>
          <Button asChild>
            <a href="/ppv">Back to Events</a>
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    });
  };

  const isLive = new Date(event.date) <= new Date();

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {hasPurchased && isLive ? (
            <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
              <ReactPlayer
                url={event.streamUrl}
                width="100%"
                height="100%"
                controls
                playing
                config={{
                  file: {
                    forceHLS: true,
                  }
                }}
              />
            </div>
          ) : (
            <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
              <img 
                src={event.thumbnail}
                alt={event.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl text-white font-semibold mb-2">
                    {hasPurchased ? 'Event starts soon' : 'Purchase required'}
                  </h3>
                  <p className="text-white/80 mb-4">
                    {hasPurchased 
                      ? 'This event will be available to watch when it starts.'
                      : 'Buy a ticket to watch this event.'}
                  </p>
                  {!hasPurchased && (
                    <Button asChild>
                      <a href="/ppv">Purchase Access</a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge>{event.category}</Badge>
              {isLive && <Badge variant="destructive">LIVE NOW</Badge>}
            </div>
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">
              {event.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{formatDate(event.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{formatTime(event.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Expected Viewers</p>
                  <p className="font-medium">{event.expectedViewers}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}