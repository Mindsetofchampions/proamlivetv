"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Users, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const liveEvents = [
  {
    id: 'event1',
    title: 'National High School Esports Finals',
    thumbnail: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg',
    viewers: 12543,
    startTime: '2024-03-15T18:00:00Z',
    category: 'Esports',
    description: 'Watch the top high school teams compete for the national championship.',
    isLive: true
  },
  {
    id: 'event2',
    title: 'Youth Dance Competition 2024',
    thumbnail: 'https://images.pexels.com/photos/2188012/pexels-photo-2188012.jpeg',
    viewers: 8976,
    startTime: '2024-03-16T15:30:00Z',
    category: 'Dance',
    description: 'Live coverage of the annual youth dance competition featuring talented performers.',
    isLive: true
  },
  {
    id: 'event3',
    title: 'Regional Gaming Tournament',
    thumbnail: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg',
    startTime: '2024-03-18T20:00:00Z',
    category: 'Esports',
    description: 'Regional qualifiers for the upcoming national gaming championship.',
    isLive: false
  },
  {
    id: 'event4',
    title: 'Tech Innovation Showcase',
    thumbnail: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg',
    startTime: '2024-03-20T17:00:00Z',
    category: 'Technology',
    description: 'Live demonstrations of innovative projects by young tech enthusiasts.',
    isLive: false
  }
];

export default function LivePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const filteredEvents = selectedCategory
    ? liveEvents.filter(event => event.category === selectedCategory)
    : liveEvents;

  const categories = Array.from(new Set(liveEvents.map(event => event.category)));

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Live Events
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Watch live esports tournaments, competitions, and special events
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
          >
            All Events
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img 
                  src={event.thumbnail}
                  alt={event.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {event.isLive ? (
                  <div className="absolute top-4 left-4 flex items-center">
                    <Badge variant="destructive\" className="animate-pulse">
                      <Radio className="h-3 w-3 mr-1" />
                      LIVE
                    </Badge>
                    {event.viewers && (
                      <Badge variant="secondary" className="ml-2">
                        <Eye className="h-3 w-3 mr-1" />
                        {formatNumber(event.viewers)} watching
                      </Badge>
                    )}
                  </div>
                ) : (
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">
                      <Clock className="h-3 w-3 mr-1" />
                      Upcoming
                    </Badge>
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge>{event.category}</Badge>
                    {event.isLive ? (
                      <Button size="sm" variant="secondary">
                        Watch Now
                      </Button>
                    ) : (
                      <span className="text-sm text-white/80">
                        Starts {formatDate(event.startTime)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}