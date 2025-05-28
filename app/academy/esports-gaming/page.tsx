"use client";

import { motion } from 'framer-motion';
import { Gamepad2, Trophy, Users, Broadcast, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const tracks = [
  {
    title: 'Competitive Gaming',
    icon: <Trophy className="h-8 w-8 text-primary" />,
    description: 'Develop your skills as a competitive player',
    topics: [
      'Tournament Preparation',
      'Team Communication',
      'Strategy Development',
      'Mental Conditioning'
    ]
  },
  {
    title: 'Game Commentary',
    icon: <Broadcast className="h-8 w-8 text-primary" />,
    description: 'Learn to cast and analyze games',
    topics: [
      'Play-by-Play Casting',
      'Game Analysis',
      'Audience Engagement',
      'Technical Knowledge'
    ]
  },
  {
    title: 'Content Creation',
    icon: <Gamepad2 className="h-8 w-8 text-primary" />,
    description: 'Create engaging gaming content',
    topics: [
      'Stream Setup',
      'Highlight Creation',
      'Community Building',
      'Brand Development'
    ]
  },
  {
    title: 'Team Management',
    icon: <Users className="h-8 w-8 text-primary" />,
    description: 'Lead and manage esports teams',
    topics: [
      'Team Building',
      'Practice Planning',
      'Performance Analysis',
      'Event Organization'
    ]
  }
];

export default function EsportsGamingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Esports & Gaming</h1>
        <p className="text-lg text-muted-foreground">
          Build your career in competitive gaming and content creation
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tracks.map((track, index) => (
          <motion.div
            key={track.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 h-full">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                {track.icon}
              </div>
              <h2 className="text-2xl font-semibold mb-2">{track.title}</h2>
              <p className="text-muted-foreground mb-6">{track.description}</p>
              <div className="space-y-3 mb-6">
                {track.topics.map((topic) => (
                  <div key={topic} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}