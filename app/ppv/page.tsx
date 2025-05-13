"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { 
  Calendar,
  Clock,
  Users,
  Trophy,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ppvEvents = [
  {
    id: 'championship-finals-2025',
    title: 'Championship Finals 2025',
    thumbnail: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg',
    date: '2025-04-15T18:00:00Z',
    price: 29.99,
    description: 'Watch the ultimate showdown as top teams compete for the championship title.',
    venue: 'Virtual Arena',
    expectedViewers: '50K+',
    category: 'Esports'
  },
  {
    id: 'dance-competition-2025',
    title: 'National Dance Competition 2025',
    thumbnail: 'https://images.pexels.com/photos/2188012/pexels-photo-2188012.jpeg',
    date: '2025-04-20T19:30:00Z',
    price: 24.99,
    description: 'Experience the artistry and skill of youth dancers from across the country.',
    venue: 'Performance Center',
    expectedViewers: '35K+',
    category: 'Dance'
  },
  {
    id: 'talent-showcase-2025',
    title: 'Youth Talent Showcase 2025',
    thumbnail: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
    date: '2025-05-01T20:00:00Z',
    price: 19.99,
    description: 'Discover the next generation of performers in this live talent showcase.',
    venue: 'Creative Hub',
    expectedViewers: '25K+',
    category: 'Performance'
  }
];

export default function PPVPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [purchasingEvent, setPurchasingEvent] = useState<string | null>(null);

  const handlePurchase = async (eventId: string) => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    try {
      setPurchasingEvent(eventId);
      const response = await fetch('/api/ppv/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      setPurchasingEvent(null);
    }
  };

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

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Pay-Per-View Events
          </h1>
          <p className="text-lg text-muted-foreground">
            Get exclusive access to live premium events
          </p>
        </div>

        <div className="grid gap-8">
          {ppvEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-6">
                <img 
                  src={event.thumbnail}
                  alt={event.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="mb-3">{event.category}</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {event.title}
                  </h2>
                  <p className="text-white/90 text-lg mb-4">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-white/80">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {formatTime(event.date)}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {event.expectedViewers} expected viewers
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border rounded-lg p-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span className="font-medium">Venue:</span>
                    <span className="text-muted-foreground">{event.venue}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <span className="text-2xl font-bold">${event.price}</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" asChild>
                    <Link href={`/ppv/${event.id}`}>Learn More</Link>
                  </Button>
                  <Button 
                    onClick={() => handlePurchase(event.id)}
                    disabled={purchasingEvent === event.id}
                  >
                    {purchasingEvent === event.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Purchase Access'
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}