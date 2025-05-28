"use client";

import { motion } from 'framer-motion';
import { Mic2, Video, Users, Radio, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const modules = [
  {
    title: 'Camera Presence',
    icon: <Video className="h-8 w-8 text-primary" />,
    description: 'Learn the fundamentals of on-camera performance',
    lessons: [
      'Body Language & Posture',
      'Eye Contact & Engagement',
      'Voice Modulation',
      'Teleprompter Reading'
    ]
  },
  {
    title: 'Interview Skills',
    icon: <Mic2 className="h-8 w-8 text-primary" />,
    description: 'Master the art of conducting engaging interviews',
    lessons: [
      'Question Preparation',
      'Active Listening',
      'Follow-up Techniques',
      'Guest Management'
    ]
  },
  {
    title: 'Live Broadcasting',
    icon: <Radio className="h-8 w-8 text-primary" />,
    description: 'Handle live broadcasts with confidence',
    lessons: [
      'Show Preparation',
      'Time Management',
      'Technical Awareness',
      'Crisis Handling'
    ]
  },
  {
    title: 'Audience Engagement',
    icon: <Users className="h-8 w-8 text-primary" />,
    description: 'Connect with your viewers effectively',
    lessons: [
      'Social Media Integration',
      'Live Chat Interaction',
      'Community Building',
      'Viewer Retention'
    ]
  }
];

export default function OnAirPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">On-Air Talent</h1>
        <p className="text-lg text-muted-foreground">
          Develop your broadcasting and hosting skills
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((module, index) => (
          <motion.div
            key={module.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 h-full">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                {module.icon}
              </div>
              <h2 className="text-2xl font-semibold mb-2">{module.title}</h2>
              <p className="text-muted-foreground mb-6">{module.description}</p>
              <div className="space-y-3 mb-6">
                {module.lessons.map((lesson) => (
                  <div key={lesson} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{lesson}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}