"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const upcomingEvent = {
  id: 'championship-finals-2025',
  title: 'Championship Finals 2025',
  thumbnail: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg',
  date: '2025-04-15T18:00:00Z',
  price: 29.99,
  description: 'Watch the ultimate showdown as top teams compete for the championship title.',
  expectedViewers: '50K+'
};

const PPVEvents = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Upcoming <span className="text-primary">PPV Events</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get exclusive access to premium live events and championships
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <Link href="/ppv">
          <div className="group relative aspect-[21/9] rounded-xl overflow-hidden">
            <img 
              src={upcomingEvent.thumbnail}
              alt={upcomingEvent.title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <Badge className="mb-3">Featured Event</Badge>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {upcomingEvent.title}
              </h3>
              <p className="text-white/90 text-lg mb-4">
                {upcomingEvent.description}
              </p>
              <div className="flex flex-wrap gap-4 text-white/80">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(upcomingEvent.date)}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {upcomingEvent.expectedViewers} expected viewers
                </div>
              </div>
            </div>

            <div className="absolute top-6 right-6">
              <Button 
                size="lg" 
                className="bg-primary/90 hover:bg-primary"
              >
                Purchase Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Link>
      </motion.div>

      <div className="text-center mt-8">
        <Button variant="outline" size="lg" asChild>
          <Link href="/ppv">
            View All PPV Events
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default PPVEvents;